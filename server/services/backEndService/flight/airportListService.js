import AirportListLogic from '../../../backendModules/flights/airportListLogic';
export default function(){
    const app=this;
    app.use('/airportList',new AirportListLogic());
    const airportListService=app.service('/airportList');
}