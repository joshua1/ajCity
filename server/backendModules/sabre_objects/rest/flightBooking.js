import helpers from "../../utils/helpers";
import _ from "lodash";

const flightBooking = function (params) {
    let ticketTimeDate = Date.create().addHours(24);
    let passData = params.passengerDetails;
    let fareData = params.flightDetails;
    let adt = 1.0, chd = 2.0, inf = 3.0;
    let personsDetails = [];
    let flightSegments = [];
    _.each(passData.adults, (ad) => {
        personsDetails.push({
            NameNumber: adt,
            PassengerType: 'ADT',
            GivenName: ad.firstName,
            Surname: ad.surname
        });
    });
    _.each(passData.children, (ch) => {
        personsDetails.push({
            NameNumber: chd,
            PassengerType: 'C11',
            GivenName: ch.firstName,
            Surname: ch.surname
        })
    });
    _.each(passData.infants, (infant) => {
        personsDetails.push({
            NameNumber: chd,
            PassengerType: 'C11',
            GivenName: infant.firstName,
            Surname: infant.surname
        })
    });

    _.each(fareData.itinerary, (seg) => {
        flightSegments.push({
            ArrivalDateTime: seg.arrivalDateTime,
            DepartureDateTime: seg.departureDateTime,
            FlightNumber: seg.flightNumber,
            NumberInParty: params.totalPassengers,
            ResBookDesigCode: seg.airbookDesigCode,
            Status: 'NN',
            DestinationLocation: {
                LocationCode: seg.destinationCode
            },
            MarketingAirline: {
                Code: seg.marketingAirlineCode,
                FlightNumber: seg.flightNumber
            },
            Equipment: {
                AirEquipType: seg.equipment
            },
            OriginLocation: {
                LocationCode: seg.locationCode
            },
        });
    });
    let fbObject = {
        CreatePassengerNameRecordRQ: {
            targetCity: process.env.SABRE_IPCC,
            TravelItineraryAddInfo: {
                AgencyInfo: {
                    Address: {
                        AddressLine: 'Quantum Travels ltd',
                        CityName: 'Lagos',
                        CountryCode: 'NIGERIA',
                        StateCountyProv: {
                            StateCode: 'LAG'
                        },
                        StreetNmbr: '184A CORPORATION DRIVE,DOLPHIN ESTATE',
                        VendorPrefs: {
                            Airline: {
                                Hosted: true
                            }
                        }
                    },
                    Ticketing: {
                        TicketType: helpers.getTicketTime(ticketTimeDate),
                        PseudoCityCode: process.env.SABRE_IPCC,
                        TicketTimeLimit: ticketTimeDate.format('{MM}-{dd}T{hh}:{mm}')
                    }
                },
                CustomerInfo: {
                    ContactNumbers: {
                        ContactNumber: [{
                            NameNumber: '1.1',
                            Phone: passData.adults[0].phone,
                            PhoneUseType: 'O'
                        }]
                    },
                    PersonName: personsDetails,
                }
            },
            AirBook: {
                OriginDestinationInformation: {
                    FlightSegment: flightSegments
                }
            },
            PostProcessing: {
                RedisplayReservation: false
            }
        }
    };
    return fbObject;
};
export default flightBooking;