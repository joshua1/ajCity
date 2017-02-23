import FlightSearchLogic from '../../../backendModules/flights/flightSearchLogic';

export default function () {
    const app = this;

    // Initialize our service with any options it requires
    app.use('/flight/search', new FlightSearchLogic());
};
