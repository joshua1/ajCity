import FlightPaymentLogic from '../../../backendModules/flights/flightPaymentLogic';

module.exports=function(){
    const app=this;
    app.use('/flight/paymnets', new FlightPaymentLogic());
}
