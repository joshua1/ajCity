const bfm = function(params) {
  let fB = params.flightBooking;
  let fD = params.flightDetails;
  inspect(params);
  let tripType = 'OneWay';
  if (fB.isOneWay)
    tripType = 'OneWay';
  else if (fB.isReturn)
    tripType = 'Return';
  else if (fB.isMulti)
    tripType = 'OpenJaw';
  let passengerQuantity = [];
  if (fB.numAdults > 0) {
    let adultCode = {
      Code: 'ADT',
      Quantity: parseInt(fB.numAdults)
    };
    passengerQuantity.push(adultCode);
  }
  if (fB.numChildren > 0) {
    passengerQuantity.push({
      Code: 'C11',
      Quantity: parseInt(fB.numChildren)
    });
  }
  if (fB.numInfants > 0) {
    passengerQuantity.push({
      Code: 'INF',
      Quantity: parseInt(fB.numInfants)
    });
  }

  let originDI = [];
  if (fB.isOneWay) {
    fD.forEach((origDest) => {
      originDI.push({
        DepartureDateTime: origDest.departDate,
        OriginLocation: {
          LocationCode: origDest.location
        },
        DestinationLocation: {
          LocationCode: origDest.destination
        },
        TPA_Extensions: {
          ConnectionTime: {
            Max: 0
          }
        }
      });
    });
  } else if (fB.isReturn) {
    fD.forEach((origDest) => {
      originDI.push({
        DepartureDateTime: origDest.departDate,
        OriginLocation: {
          LocationCode: origDest.location
        },
        DestinationLocation: {
          LocationCode: origDest.destination
        },
        TPA_Extensions: {
          ConnectionTime: {
            Max: 0
          }
        }
      });
    });
    fD.forEach((origDest) => {
      originDI.push({
        DepartureDateTime: origDest.returnDate,
        OriginLocation: {
          LocationCode: origDest.destination
        },
        DestinationLocation: {
          LocationCode: origDest.location
        },
        TPA_Extensions: {
          ConnectionTime: {
            Max: 0
          }
        }
      });
    });
  } else if (fB.isMulti) {
    fD.forEach((origDest) => {
      originDI.push({
        DepartureDateTime: origDest.departDate,
        OriginLocation: {
          LocationCode: origDest.location
        },
        DestinationLocation: {
          LocationCode: origDest.destination
        },
        TPA_Extensions: {
          ConnectionTime: {
            Max: 0
          }
        }
      });
    });
  }

  let bfmObject = {
    OTA_AirLowFareSearchRQ: {
      AvailableFlightsOnly: true,
      Version: '3.0.0',
      POS: {
        Source: [{
          PseudoCityCode: process.env.SABRE_IPCC,
          RequestorID: {
            Type: '1',
            ID: '1',
            CompanyName: {
              Code: 'TN',
              CodeContext: 'Context'
            }
          }
        }]
      },
      OriginDestinationInformation: originDI,
      TravelPreferences: {
        ValidInterlineTicket: true,
        MaxStopsQuantity: 2,
        CabinPref: [{
          Cabin: fB.travelClass,
          PreferLevel: 'Preferred'
        }],
        FlightTypePref: {
          MaxConnections: '2'
        },
        TPA_Extensions: {
          NumTrips: {
            Number: 40
          },
          OnlineIndicator: {
            Ind: true
          },
          TripType: {
            Value: tripType
          },
          InterlineIndicator: {
            Ind: true
          }
        }
      },
      TravelerInfoSummary: {
        AirTravelerAvail: [{
          PassengerTypeQuantity: passengerQuantity
        }],
        PriceRequestInformation: {
          CurrencyCode: params.flightBooking.currency
        }
      },
      TPA_Extensions: {
        IntelliSellTransaction: {
          RequestType: {
            Name: 'AD1'
          },
          CompressResponse: {
            Value: true
          }
        }
      }
    }
  };
  inspect(bfmObject);
  return bfmObject;
};
export default bfm;
