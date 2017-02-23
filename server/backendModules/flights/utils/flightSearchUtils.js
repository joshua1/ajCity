import _ from "lodash";
import helpers from "../../utils/helpers";
import markupsLogic from "../../markups/markupsMethods";

const flightSearchUtils = {
    processFlightSearchResult(result, searchParams){
        console.log(JSON.stringify(result));
        try {
            if (result.OTA_AirLowFareSearchRS.Errors) {
                var errString = '';
                _.each(result.OTA_AirLowFareSearchRS.Errors.Error, (err) => {
                    errString = errString + '  ' + err.content
                });
                return {
                    hasError: true,
                    content: errString
                }
            }
            else if (result.OTA_AirLowFareSearchRS.PricedItinCount > 0) {
                var outputItinerary = result.OTA_AirLowFareSearchRS.PricedItineraries.PricedItinerary;
                var returnResult = [];
                var clientResult = [];
                var destination = [];
                var departureDate = Date.create(searchParams.flightDetails[0].departDate);
                var outCount = 0;
                _.each(searchParams.flightDetails, (d) => {
                    destination.push(d.destination);
                });
                _.each(outputItinerary, (fs) => {
                    outCount = outCount + 1;
                    var cc = fs.AirItineraryPricingInfo[0].ItinTotalFare.EquivFare.CurrencyCode === 'NGN' ? helpers.naira : helpers.dollars;
                    var odo = fs.AirItinerary.OriginDestinationOptions.OriginDestinationOption;
                    var flightObj = {};
                    var travelCabin = [];
                    var pricingSegments = [];
                    var airlineCode = '';
                    var itinPricing = fs.AirItineraryPricingInfo;
                    var totalTax = 0, totalFare = 0, totalTaxNormal = 0, totalFareNormal = 0, baseFare = 0, baseFareNormal = 0;
                    var legs = 0, legs2 = 0, duration = 0, duration2 = 0, flightSegments = [], departTime = '', noOfStops = 0, noOfStopsRet = 0;
                    var valCount = 1, segCount = 0, totalDepartLayover = 0;
                    airlineCode = odo[0].FlightSegment[0].MarketingAirline.Code;
                    var airline = helpers.findAirline(airlineCode);
                    travelCabin = fs.AirItineraryPricingInfo[0].FareInfos.FareInfo[0].TPA_Extensions.Cabin.Cabin;
                    var seatsRemaining = fs.AirItineraryPricingInfo[0].FareInfos.FareInfo[0].TPA_Extensions.SeatsRemaining.Number;
                    departTime = Date.create(odo[0].FlightSegment[0].DepartureDateTime).full();
                    _.each(odo, (originDest) => {  //flightSegmentArray
                        var prev = null;

                        if (valCount === 1)
                            noOfStops = originDest.FlightSegment.length - 1;
                        if (valCount > 1)
                            noOfStops = originDest.FlightSegment.length - 1;
                        _.each(originDest.FlightSegment, (flightSeg) => {
                            var itinerary = {};
                            itinerary.travelClass = travelCabin;
                            itinerary.seatsRemaining = seatsRemaining;
                            itinerary.originLocation = helpers.findCity(flightSeg.DepartureAirport.LocationCode);
                            itinerary.locationCode = flightSeg.DepartureAirport.LocationCode;
                            itinerary.destinationLocation = helpers.findCity(flightSeg.ArrivalAirport.LocationCode);
                            itinerary.destinationCode = flightSeg.ArrivalAirport.LocationCode;
                            itinerary.stops = flightSeg.StopQuantity;
                            itinerary.flightDuration = Math.round(flightSeg.ElapsedTime / 60) + ' hours';
                            itinerary.flightNumber = flightSeg.FlightNumber;
                            itinerary.operatingAirline = helpers.findAirline(flightSeg.OperatingAirline.Code);
                            itinerary.operatingAirlineCode = flightSeg.OperatingAirline.Code;
                            itinerary.marketingAirline = helpers.findAirline(flightSeg.MarketingAirline.Code);
                            itinerary.marketingAirlineCode = flightSeg.MarketingAirline.Code;
                            itinerary.departureDateTimeFormatted = Date.create(flightSeg.DepartureDateTime).full();//.format('{Mon} {Do} {YYYY}, {h}:{mm}:{ss} {t}');
                            itinerary.arrivalDateTimeFormatted = Date.create(flightSeg.ArrivalDateTime).full();//.format('{Mon} {Do} {YYYY}, {h}:{mm}:{ss} {t}');
                            itinerary.departureDateTime = flightSeg.DepartureDateTime;
                            itinerary.arrivalDateTime = flightSeg.ArrivalDateTime;
                            itinerary.equipment = flightSeg.Equipment[0].AirEquipType;
                            itinerary.airbookDesigCode = flightSeg.ResBookDesigCode;
                            itinerary.rph = valCount;

                            flightSegments.push(itinerary);

                            if (valCount > 1) //return
                            {
                                duration2 = parseInt(duration2) + parseInt(flightSeg.ElapsedTime);
                                legs2 = legs2 + 1;
                            }


                            if (valCount === 1) //depart
                            {
                                duration = parseInt(duration) + parseInt(flightSeg.ElapsedTime);
                                legs = legs + 1;

                                if (!prev) { //can compute layover
                                    //take note of departure time
                                    prev = flightSeg.ArrivalDateTime;
                                    itinerary.layover = 0;
                                    itinerary.layoverFmt = helpers.flightDuration(0);
                                }
                                else {
                                    var ms = Date.create(flightSeg.DepartureDateTime).minutesSince(Date.create(prev));
                                    //moment.duration(moment(seed.DepartureDateTime).diff(moment(prev))).asMinutes();

                                    itinerary.layover = ms;
                                    itinerary.layoverFmt = helpers.flightDuration(ms);
                                    totalDepartLayover = parseFloat(totalDepartLayover) + parseFloat(ms);
                                }

                            }
                            segCount = segCount + 1;
                        });
                        valCount = valCount + 1;
                    });
                    _.each(itinPricing, (ip) => {
                        var pricingDetail = {};
                        var totalFareAmount = ip.ItinTotalFare.TotalFare.Amount;
                        var equivFareAmount = ip.ItinTotalFare.EquivFare.Amount;
                        var unitFare = markupsLogic.applySabreMarking({
                            airlineCode: airlineCode,
                            amount: totalFareAmount,
                            destination: destination,
                            cabin: travelCabin
                        });
                        var unitTax = markupsLogic.applySabreMarking({
                            airlineCode: airlineCode,
                            amount: parseFloat(totalFareAmount) - parseFloat(equivFareAmount),
                            destination: destination,
                            cabin: travelCabin
                        });
                        var passQuantity = _.sumBy(ip.PTC_FareBreakdowns.PTC_FareBreakdown, (breakDown) => {
                            return breakDown.PassengerTypeQuantity.Quantity
                        }); //summation of quantity
                        var unitFareNormal = parseFloat(equivFareAmount);
                        var unitTaxNormal = parseFloat(totalFareAmount) - parseFloat(equivFareAmount);
                        var equivFare = markupsLogic.applySabreMarking({
                            airlineCode: airlineCode,
                            amount: equivFareAmount,
                            destination: destination,
                            cabin: travelCabin
                        });
                        //pricingDetail.totalFare =totalFare
                        pricingDetail.unitFareNormal = helpers.moneyFormat(totalFareAmount);
                        pricingDetail.unitFare = helpers.moneyFormat(unitFare);
                        pricingDetail.unitFareM = cc + helpers.moneyFormat(unitFare);
                        pricingDetail.equivFareNormal = helpers.moneyFormat(unitFareNormal);
                        pricingDetail.equivFare = helpers.moneyFormat(equivFare);
                        pricingDetail.equivFareM = cc + helpers.moneyFormat(equivFare);
                        pricingDetail.unitTax = helpers.moneyFormat(unitTax);
                        pricingDetail.unitTaxNormal = helpers.moneyFormat(unitTaxNormal);
                        pricingDetail.passengerType = helpers.findPassengerType(ip.PTC_FareBreakdowns.PTC_FareBreakdown[0].PassengerTypeQuantity.Code);
                        pricingDetail.passengerQuantity = passQuantity;
                        pricingDetail.totalTax = helpers.moneyFormat(parseFloat(unitTax * passQuantity));
                        pricingDetail.totalFare = helpers.moneyFormat(parseFloat(unitFare * passQuantity));
                        pricingDetail.totalFareM = cc + helpers.moneyFormat(parseFloat(unitFare * passQuantity));
                        pricingDetail.totalEquivFare = helpers.moneyFormat(parseFloat(equivFare * passQuantity));
                        pricingDetail.totalEquivFareM = cc + helpers.moneyFormat(parseFloat(equivFare * passQuantity));
                        pricingDetail.totalTaxNormal = helpers.moneyFormat(parseFloat(passQuantity * unitTaxNormal));
                        pricingDetail.totalFareNormal = helpers.moneyFormat(parseFloat(passQuantity * unitFareNormal));
                        totalTax = totalTax + parseFloat(unitTax * passQuantity);
                        totalFare = totalFare + parseFloat(unitFare * passQuantity);

                        totalFareNormal = totalFareNormal + parseFloat(unitFareNormal * passQuantity);
                        totalTaxNormal = totalTaxNormal + parseFloat(unitTaxNormal * passQuantity);

                        pricingSegments.push(pricingDetail);
                    });

                    flightObj.totalFare = (totalFare).format(2);
                    flightObj.totalTax = (totalTax).format(2);
                    flightObj.totalFareNormal = (totalFareNormal).format(2);
                    flightObj.totalTaxNormal = (totalTaxNormal).format(2);
                    flightObj.baseFare = (totalFare - totalTax).format(2);
                    flightObj.baseFareNormal = (totalFareNormal - totalTaxNormal).format(2);
                    flightObj.currencyCode = cc;
                    flightObj.itinerary = flightSegments; //originDestination;
                    flightObj.pricingDetails = pricingSegments;
                    flightObj.airline = airline;
                    flightObj.airlineCode = airlineCode;
                    flightObj.travelCabin = travelCabin;
                    flightObj.equivFare = pricingSegments[0].equivFare;
                    flightObj.numStopsDepart = noOfStops > 0 ? noOfStops + ' Stop(s)' : 'Direct Flight';
                    flightObj.numStopsReturn = noOfStopsRet > 0 ? noOfStopsRet + ' Stop(s)' : 'Direct Flight';
                    flightObj.stops = parseInt(noOfStops);
                    flightObj.returnStops = parseInt(noOfStopsRet);
                    flightObj.totalDepartDuration = helpers.flightDuration(duration);
                    flightObj.totalDepartElapsed = parseFloat(duration.toFixed(2));
                    flightObj.departElapsedRate = (duration / 24) * 100 + '%';
                    flightObj.totalReturnDuration = helpers.flightDuration(duration2);
                    flightObj.totalReturnElapsed = duration2.toFixed(2);
                    flightObj.returnElapsedRate = (duration2 / 24) * 100 + '%';
                    flightObj.totalDepartLayover = totalDepartLayover;
                    flightObj.totalDepartLayoverFormatted = helpers.flightDuration(totalDepartLayover);
                    var dt = _.find(flightObj.itinerary, (d) => {
                        return parseInt(d.rph) === 1;
                    });

                    flightObj.departTime = departTime;
                    if (noOfStops === 1) flightObj.success = 'info';
                    else if (noOfStops > 1) flightObj.success = 'warning';
                    else if (noOfStops === 0) flightObj.success = 'success';
                    flightObj.rph = outCount;// fs.RPH[0];
                    clientResult.push(flightObj);
                });

                var uniqueResults = _.uniq(clientResult, (n) => {
                    return n.totalFare && n.airlineCode && n.itinerary[0].departureDateTime;
                });
                var paramDate = Date.create(searchParams.flightDetails[0].departDate);
                var searchResults = {};
                searchResults.beforeDateResult = [];
                searchResults.actualDateResult = [];
                searchResults.afterDateResult = [];
                _.each(uniqueResults, (result) => {
                    var resultDepartDate = Date.create(result.itinerary[0].departureDateTime);
                    console.log(result.itinerary[0].departureDateTime);
                    if (resultDepartDate.isBefore(paramDate))
                        searchResults.beforeDateResult.push(result);
                    else if (paramDate.hoursUntil(resultDepartDate) > 24)
                        searchResults.afterDateResult.push(result);
                    else
                        searchResults.actualDateResult.push(result);
                });


                return {
                    hasError: false,
                    content: searchResults
                }
            }


        }
        catch (ex) {
            return {
                hasError: true,
                content: ex
            }
        }
    }
};
export default flightSearchUtils;