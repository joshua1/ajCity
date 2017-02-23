import _ from "lodash";
import airlineList from "./airlineList";
import airportList from "./airportList";
const helpers = {
    naira: '₦',
    dollars: '$',
    PassengerTypes: [
        {typeName: 'Adult', typeCode: 'ADT'},
        {typeName: 'Child', typeCode: 'C11'},
        {typeName: 'Infant', typeCode: 'INF'}
    ],
    findAirline(airlineCode){
        var airlineObj = _.find(airlineList, (airline) => {
            return _.includes(airline, airlineCode);
        });
        if (airlineObj) {
            return airlineObj.airlineName;
        }
        else {
            return '';
        }
    },
    findCity(cityCode) {
        var cityObj = _.find(airportList, function (ap) {
            return _.includes(ap.text, cityCode);
        });
        if (cityObj)
            return cityObj.text.replace('(' + cityCode + '),', '');
        else
            return '';
    },
    findPassengerType(passCode) {
        var passObj = _.find(this.PassengerTypes, function (pt) {
            return _.includes(pt.typeCode, passCode);
        });
        return passObj.typeName;
    },
    flightDuration(k) {
        var flightDuration = Math.floor(k / 60) + 'h ' + Math.floor(k % 60) + 'm';
        console.log(flightDuration);
        return flightDuration;
    },
    moneyFormat(money) {
        return (money).format(2);
    },
    codeIn(destinationList, destination) {
        return _.intersection(destinationList, destination).length > 0 || destinationList[0] === 'all';
    },
    codeNotIn(destinationList, destination) {
        return _.intersection(destinationList, destination).length > 0;
    },
    classIn(travelClass, cabin) {
        return _.includes(travelClass, cabin) || _.includes(travelClass, 'all');
    },
    classNotIn(travelClass, cabin) {
        return _.includes(travelClass, cabin);
    },
    getTicketTime(d) {
        var toRet = '8' + this.formatTime(d.getHours()) + this.formatTime(d.getMinutes()) + '/' + d.getDate() + this.monthName(d);
        return toRet;
    },
    formatTime(d) {
        return (d < 10 ? '0' : '') + d;
    }, monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"],
    monthName(d) {
        console.log(d);
        let mn = this.monthNames[d.getMonth()];
        return mn.substring(0, 3);
    },
    getTicketNumber(tickString) {
        let ticket = tickString.split(" ");
        return ticket[1];
    }
};
export default  helpers;