import helpers from "../utils/helpers";
import FlightModel from "../models/flight_model";
import paymentHelper from "./paymentHelper";
import SessionMethod from "../sessions/sessionMethods";
import serviceProxy from "../utils/serviceProxy";
import contextChange from "../sabre_objects/soap/contextChange";
import passengerDetailsRQ2 from "../sabre_objects/soap/passengerDetailsRQ2";
import designatePrinter2 from "../sabre_objects/soap/designateprinter2";
import itinRead from "../sabre_objects/soap/itinRead";
import xml2json from "basic-xml2json";

export default class PaymentGatewayLogic {
    find(params) {
        let sabreUrl = process.env.SABRE_URL;

        let query = params.query;
        let paramsObj = {transRef: query.txnref, status: query.status};
        let toret = FlightModel.filter({payment: {transRef: params.transRef}}).limit(1).run()
            .then((result) => {

                let veri = paymentHelper.verifyPayment({
                    transRef: params.transRef,
                    amount: result.booking.totalFare
                });
                console.log(veri + ' ' + result.booking.totalFare);
                if (veri.status) {
                    console.log('returned true');
                    let thepnr = result.payment.transRef.substring(0, 6);
                    console.log(p);
                    var booking = result.booking;
                    var fPass = result.passengers;

                    if (result.payment.paymentStatus === 'Paid' && result.payment.ticketIssued === true) {
                        return {
                            transRef: params.transRef,
                            status: 'Successful',
                            transDate: new Date(),
                            paymentOption: 'Card Payment',
                            transAmount: result.payment.amountPaid,
                            transCurrency: result.payment.currency,
                            pnr: booking.pnr,
                            flightId: result.id
                        };

                    } else {
                        // Do Ticket Issue after booking call or mail backend to book ticket
                        let tok = SessionMethod.getNewSession().then(newSess => {
                            return newSess;
                        });
                        console.log(tok.tokenId);
                        let chContext = {
                            request: contextChange(tok.tokenId),
                            url: sabreUrl,
                            action: 'ContextChangeLLSRQ',
                            contentType: 'text/xml'
                        };
                        serviceProxy(chContext)
                            .then((contextResult) => {
                                let itinGet = {
                                    pnr: booking.pnr,
                                    tokenId: tok.tokenId
                                };
                                let itinReadCtx = {
                                    request: itinRead(itinGet),
                                    url: sabreUrl,
                                    action: 'TravelItineraryReadLLSRQ',
                                    contentType: 'text/xml; charset=utf-8'
                                };
                                serviceProxy(itinReadCtx)
                                    .then((itinReadResult) => {
                                        const ticketInfo = xml2json.getContent(itinReadResult.root, ['Envelope',
                                            'Body', 'TravelItineraryReadRS', 'TravelItinerary', 'TravelItineraryInfo', 'Ticketing']);
                                        if (ticketInfo && ticketInfo.eticketNumber) {
                                            let ticketNumber = helpers.getTicketNumber(ticketInfo.eticketNumber);
                                            if (ticketNumber) {
                                                result.payment.isPaid = true;
                                                result.payment.ticketIssued = true;
                                                result.payment.currency = 'NGN';
                                                result.payment.paymentOption = 'Card Payment';
                                                result.payment.paymentStatus = 'Paid';
                                                result.payment.paymentDate = Date.create();
                                                result.payment.timesQueried = result.payment.timesQueried + 1;
                                                result.payment.ticketNumber = ticketNumber;
                                                result.save();

                                                return {
                                                    transRef: params.transRef,
                                                    status: 'Successful',
                                                    transDate: Date.create(),
                                                    paymentOption: 'Card Payment',
                                                    transAmount: result.payment.amountPaid,
                                                    transCurrency: result.payment.currency,
                                                    pnr: booking.pnr,
                                                    flightId: result.id,
                                                    ticketNumber: ticketNumber
                                                };


                                            }

                                        }
                                        else {
                                            let PassengerDetailsCtx = {
                                                request: passengerDetailsRQ2({tokenId: tok.tokenId}),
                                                url: sabreUrl,
                                                action: 'PassengerDetailsRQ',
                                                contentType: 'text/xml;charset=utf-8'
                                            };
                                            serviceProxy(PassengerDetailsCtx).then((passengerDetailsResult) => {
                                                console.log('first passenger Details rq done');
                                                let printer2Ctx = {
                                                    request: designatePrinter2({tokenId: tok.tokenId}),
                                                    url: sabreUrl,
                                                    action: 'DesignatePrinterLLSRQ',
                                                    contentType: 'text/xml; charset=utf-8'
                                                };
                                                serviceProxy(printer2Ctx)
                                                    .then((printer2Result) => {
                                                        console.log('printer rq done');
                                                        const ticketReq = {
                                                            pnr: booking.pnr,
                                                            airlineCode: booking.airlineCode,
                                                            tokenId: tok.tokenId
                                                        };
                                                        const ticketCtx = {
                                                            request: airTicket(ticketReq),
                                                            url: sabreUrl,
                                                            action: 'AirTicketLLSRQ',
                                                            contentType: 'text/xml; charset=utf-8'
                                                        };
                                                        serviceProxy(ticketCtx).then((ticketResult) => {
                                                            console.log('ticket RQ done');
                                                            const response = xml2json.getContent(ticketResult.root,
                                                                ['Envelope', 'Body', 'AirTicketRS', 'ApplicationResults']);
                                                            if (response.status === 'Complete' && response.Success) {
                                                                const itinGet2 = {
                                                                    pnr: booking.pnr,
                                                                    tokenId: tok.tokenId
                                                                };
                                                                const itinReadCtx2 = {
                                                                    request: itinRead(itinGet),
                                                                    url: sabreUrl,
                                                                    action: 'TravelItineraryReadLLSRQ',
                                                                    contentType: 'text/xml; charset=utf-8'
                                                                };
                                                                serviceProxy(itinReadCtx2).then((itinRead2Result) => {
                                                                    console.log('second itinRead RQ done');
                                                                    const itinRead2Response = xml2json.getContent(itinRead2Result.root,
                                                                        ['Envelope', 'Body', 'PassengerDetailsRS', 'TravelItineraryReadRS', 'TravelItinerary', 'ItineraryInfo']);
                                                                    const successStat = xml2json.getContent(itinRead2Result.root,
                                                                        ['Envelope', 'Body', 'passengerDetailsRS', 'ApplicationResults']);
                                                                    if (successStat && successStat.status === 'Complete') {
                                                                        const ticketObj = xml2json.getContent(itinRead2Result.root,
                                                                            ['Envelope', 'Body', 'TravelItineraryReadRS', 'TravelItinerary', 'TravelItineraryInfo', 'Ticketing']);
                                                                        if (ticketObj && ticketObj.eticketNumber) {
                                                                            let ticketNo = helpers.getTicketNumber(ticketObj.eticketNumber);
                                                                            if (ticketNo) {
                                                                                result.payment.isPaid = true;
                                                                                result.payment.ticketIssued = true;
                                                                                result.payment.currency = 'NGN';
                                                                                result.payment.paymentOption = 'Card Payment';
                                                                                result.payment.paymentStatus = 'Paid';
                                                                                result.payment.paymentDate = Date.create();
                                                                                result.payment.timesQueried = result.payment.timesQueried + 1;
                                                                                result.payment.ticketNumber = ticketNo;
                                                                                result.save();

                                                                                //TODO: mail Ticket out
                                                                                return {
                                                                                    transRef: params.transRef,
                                                                                    status: 'Successful',
                                                                                    transDate: Date.create(),
                                                                                    paymentOption: 'Card Payment',
                                                                                    transAmount: result.payment.amountPaid,
                                                                                    transCurrency: result.payment.currency,
                                                                                    pnr: booking.pnr,
                                                                                    flightId: result.id,
                                                                                    ticketNumber: ticketNo
                                                                                };

                                                                            }

                                                                        }
                                                                        else {
                                                                            return {
                                                                                transRef: params.transRef,
                                                                                status: 'Failed',
                                                                                transDate: new Date(),
                                                                                paymentOption: 'Card Payment',
                                                                                transAmount: fl.payment.amountPaid,
                                                                                transCurrency: fl.payment.currency,
                                                                                flightId: null,
                                                                                pnr: null,
                                                                                ticketNumber: null
                                                                            };
                                                                        }
                                                                    }

                                                                })
                                                                    .catch(error => {
                                                                        console.log(`itin read 2 error ${error}`);
                                                                    });
                                                            }
                                                        })
                                                            .catch(err => {
                                                                console.log(`ticket RQ error ${err}`);
                                                            });

                                                    })
                                                    .catch(error => {
                                                        console.log(`printer RQ error ${error}`);
                                                    });
                                            })
                                                .catch(e => {
                                                    console.log(`Passenger details 1 error ${e}`);
                                                });
                                        }

                                    })
                                    .catch((error) => {
                                        console.log(`itin read error ${error}`);
                                    })

                            })
                            .catch(error => {
                                console.log(error); //TODO: error service
                            });
                    }
                }
            })
            .catch(error => {
                console.log(`get flight detail error ${error}`); //TODO: error logging service to mail out error
            });
        if (toret.ticketNumber) {
            //TODO:send email
            //TODO: route to client side page with query parameters
        }

    }
}