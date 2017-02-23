import airportList from '../utils/airportList';
export default class AirportListLogic{
    find(params){
    	console.log('Searching for Airport list ');
      params=params||{};
      return Promise.resolve(airportList);
    }
}