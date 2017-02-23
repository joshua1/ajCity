'use strict';

const dataService = require('../db_config');
const thinky = dataService.thinky;
const type = thinky.type;


const FlightModel = thinky.createModel('Flight', {
  _id: type.string().optional(),
  createDate: type.date(),
  location: type.string(),
  destination: type.string(),
  userId: type.string(),
  booking: type.object().schema({
    totalFare: type.number(),
    totalTax: type.number(),
    totalFareNormal: type.number(),
    totalTaxNormal: type.number(),
    currencyCode: type.string(),
    itinerary: type.object().schema({

    }).optional(),
    pricingDetails: type.object().schema({

    }).optional(),
    airline: type.string(),
    airlineCode: type.string(),
    travelCabin: type.string(),
    equivFare: type.string().optional(),
    numStopsDepart: type.number().optional(),
    numStopsReturn: type.number().optional(),
    stops: type.number(),
    totalDepartDuration: type.number(),
    totalDepartElapsed: type.number(),
    departElapsedRate: type.string(),
    totalReturnDuration: type.number(),
    totalReturnElapsed: type.number(),
    returnElapsedRate: type.string(),
    departTime: type.date(),
    rph: type.number(),
    pnr: type.string(),

    numAdult: type.number(),
    numChild: type.number(),
    numInfant: type.number()
  }).optional(),
  passengers: type.object().schema({
    title: type.string().optional(),
    firstName: type.string().optional(),
    surname: type.string().optional(),
    middleName: type.string().optional(),
    gender: type.string().optional(),
    country: type.string().optional(),
    address: type.string().optional(),
    email: type.string().optional(),
    phone: type.string().optional(),

    isPrimary: type.boolean().default(false)
  }).optional(),
  payment: type.object().schema({
    transRef: type.string().optional(),
    paymentDate: type.date().optional(),
    paymentStatus: type.string().optional(),
    amountPaid: type.number(),
    timesQueried: type.number().optional(),
    ticketIssued: type.boolean().default(false),
    paymentOption: type.string(),
    isPaid: type.boolean().default(false),
    dueDate: type.date(),
    invoiceDate: type.date(),
    currency: type.string().optional(),
    ticketNumber: type.string().optional(true)
  }).optional(),
  isCancelled: type.boolean().default(false)
});

export default FlightModel;
