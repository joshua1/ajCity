import _ from "lodash";
import FlightModel from "../../models/flight_model";
import emailHelper from "../../utils/emailHelper";

const flightBookingUtil = {
    processFlightBooking(result, bookingParams){
        try {
            if (result.CreatePassengerNameRecordRS.Error) {
                let errString = '';
                _.each(result.CreatePassengerNameRecordRS.Error.Errors, (err) => {
                    errString = errString + '  ' + err.content
                });
                console.log(errString);
                return {
                    hasError: false, //TODO:true
                    content: errString
                }
            }
            else {
                var appResult = result.CreatePassengerNameRecordRS.ApplicationResults;

                if (appResult && appResult.status === 'Complete') {
                    let travelItinResult = result.CreatePassengerNameRecordRS.TravelItineraryRead;
                    let pnr = result.CreatePassengerNameRecordRS.ItineraryRef.ID;
                    let airBookResult = result.CreatePassengerNameRecordRS.AirBook;
                    let flightDetails = bookingParams.flightDetails;
                    let passengerDetails = bookingParams.passengerDetails;
                    let payOption = bookingParams.paymOption;
                    bookingParams.pnr = pnr;
                    bookingParams.dueDate = Date.create().addHours(24);
                    bookingParams.invoiceDate = Date.create();
                    let flightBookingObj = {
                        totalFare: flightDetails.totalFare,
                        totalTax: flightDetails.totalTax,
                        totalFareNormal: flightDetails.totalFareNormal,
                        totalTaxNormal: flightDetails.totalTaxNormal,
                        currencyCode: flightDetails.currencyCode,
                        itinerary: flightDetails.itinerary,
                        pricingDetails: flightDetails.pricingDetails,
                        airline: flightDetails.airline,
                        airlineCode: flightDetails.airlineCode,
                        travelCabin: flightDetails.travelCabin,
                        equivFare: flightDetails.equivFare,
                        numStopsDepart: flightDetails.numStopsDepart,
                        numStopsReturn: flightDetails.numStopsReturn,
                        stops: flightDetails.stops,
                        totalDepartDuration: flightDetails.totaldepartDuration,
                        totalDepartElapsed: flightDetails.totalDepartElapsed,
                        departElapsedRate: flightDetails.departElapsedRate,
                        totalReturnDuration: flightDetails.totalReturnDuration,
                        totalReturnElapsed: flightDetails.totalReturnElapsed,
                        returnElapsedRate: flightDetails.returnElapsedRate,
                        departTime: flightDetails.departTime,
                        rph: flightDetails.rph,
                        pnr: pnr,
                        numAdult: passengerDetails.adults.length,
                        numChild: passengerDetails.children.length,
                        numInfant: passengerDetails.infants.length,
                        userId: null //TODO:for capturing user details later
                    };
                    let paymentObject = {
                        paymentOption: payOption,
                        isPaid: false,
                        ticketIssued: false,
                        dueDate: bookingParams.dueDate,
                        invoiceDate: bookingParams.invoiceDate
                    };
                    var flightPass = [];
                    //save adults
                    _.each(passengerDetails.adults, (p) => {
                        var customer = {
                            title: p.title,
                            firstName: p.firstName,
                            surname: p.surname,
                            middleName: p.middleName,
                            gender: p.gender,
                            country: p.country,
                            address: p.address,
                            email: p.email,
                            phone: p.phone,
                            dob: p.dob,
                            isPrimary: p.isPrimary
                        };

                        flightPass.push(customer);
                    });

                    _.each(passengerDetails.infants, function (p) {
                        var customer = {
                            title: p.title,
                            firstName: p.firstName,
                            surname: p.surname,
                            middleName: p.middleName,
                            gender: p.gender,
                            country: p.country,
                            address: p.address,
                            email: p.email,
                            phone: p.phone,
                            isPrimary: p.isPrimary
                        };
                        flightPass.push(customer);
                    });
                    //save infants
                    lodash.each(passengerDetails.children, function (p) {
                        var customer = {
                            title: p.title,
                            firstName: p.firstName,
                            surname: p.surname,
                            middleName: p.middleName,
                            gender: p.gender,
                            country: p.country,
                            address: p.address,
                            email: p.email,
                            phone: p.phone,
                            isPrimary: p.isPrimary
                        };
                        flightPass.push(customer);
                    });


                    let newFlight = {
                        createDate: Date.create(),
                        userId: params.appUser,
                        booking: flightBookingObj,
                        passengers: flightPass,
                        payment: paymentObject,

                        location: bookingParams.location,
                        destination: bookingParams.destination

                    };
                    const newFlightObject = new FlightModel(newFlight);
                    newFlightObject.save();
                    console.log(JSON.stringify(newFlightObject));
                    emailHelper.sendReservationEmail(bookingParams);
                    return {
                        haserror: false,
                        content: newFlightObject
                    };
                }
            }
        }
        catch (ex) {
            return {
                hasError: false, //TODO:true
                content: ex
            }
        }
    }
};
export default flightBookingUtil;