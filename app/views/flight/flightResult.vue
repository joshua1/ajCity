<template>
    <div>
        <div class="page-title">
            <h3 class="title">Flight Search Results</h3>
        </div>
        <div class="row" v-if="hasResult">

            <div class="col-sm-12">
                <ul class="nav nav-tabs ">
                    <li class="">
                        <a href="#dateBefore" data-toggle="tab" aria-expanded="false">
                            <span>{{dateBefore}}</span>
                        </a>
                    </li>
                    <li class="active">
                        <a href="#actualDate" data-toggle="tab" aria-expanded="true">
                            <span>{{actualDate}}</span>
                        </a>
                    </li>
                    <li class="">
                        <a href="#dateAfter" data-toggle="tab" aria-expanded="false">
                            <span>{{dateAfter}}</span>
                        </a>
                    </li>
                </ul>

                <div class="tab-content">
                    <div class="tab-pane" id="dateBefore">

                        <div class="col-lg-8 col-lg-offset-2 col-md-offset-2">
                            <div class="btn-group btn-group-justified m-b-10" data-toggle="buttons">
                                <a role="button" class="btn btn-info" @click="beforeFilter('amDepart')">a.m
                                    Departure</a>
                                <a role="button" class="btn btn-success" @click="beforeFilter('pmDepart')">p.m
                                    Departure</a>
                                <a role="button" class="btn btn-warning" @click="beforeFilter('amArrive')">a.m
                                    Arrival</a>
                                <a role="button" class="btn btn-inverse" @click="beforeFilter('pmArrive')">p.m
                                    Arrival</a>
                                <a role="button" class="btn btn-default" @click="beforeFilter(null)">Clear Filter</a>
                            </div>
                        </div>

                        <div class="table table-responsive">
                            <table
                                    id="before"
                                    class="table table-hover table-bordered table-striped "
                                    data-search="true"
                                    data-show-toggle="true"
                                    data-show-columns="true"
                            >
                            </table>
                        </div>

                    </div>


                    <div class="tab-pane active" id="actualDate">

                        <div class="col-lg-8 col-lg-offset-2">
                            <div class="btn-group btn-group btn-group-justified  m-b-10" data-toggle="buttons">
                                <a role="button" class="btn btn-info" @click="actualFilter('amDepart')">a.m
                                    Departure</a>
                                <a role="button" class="btn btn-success" @click="actualFilter('pmDepart')">p.m
                                    Departure</a>
                                <a role="button" class="btn btn-warning" @click="actualFilter('amArrive')">a.m
                                    Arrival</a>
                                <a role="button" class="btn btn-inverse" @click="actualFilter('pmArrive')">p.m
                                    Arrival</a>
                                <a role="button" class="btn btn-default" @click="actualFilter(null)">Clear Filter</a>
                            </div>
                        </div>


                        <div class="table table-responsive">
                            <table
                                    id="actual"
                                    class="table table-hover table-bordered table-striped"
                                    data-search="true"
                                    data-show-toggle="true"
                                    data-show-columns="true"

                            >
                            </table>
                        </div>


                    </div>
                    <div class="tab-pane" id="dateAfter">

                        <div class="col-lg-8 col-lg-offset-2 col-md-offset-2">
                            <div class="btn-group btn-group-justified m-b-10" data-toggle="buttons">
                                <a role="button" class="btn btn-info" @click="afterFilter('amDepart')">a.m Departure</a>
                                <a role="button" class="btn btn-success" @click="afterFilter('pmDepart')">p.m
                                    Departure</a>
                                <a role="button" class="btn btn-warning" @click="afterFilter('amArrive')">a.m
                                    Arrival</a>
                                <a role="button" class="btn btn-inverse" @click="afterFilter('pmArrive')">p.m
                                    Arrival</a>
                                <a role="button" class="btn btn-default" @click="afterFilter(null)">Clear Filter</a>
                            </div>
                        </div>

                        <div class="table table-responsive" data-show-toggle="true">
                            <table
                                    id="after"
                                    class="table table-hover table-bordered table-striped"
                                    data-search="true"
                                    data-show-toggle="true"
                                    data-show-columns="true"
                            >
                            </table>
                        </div>

                    </div>
                </div>
            </div>
            <!--</div>-->
            <!--</div>-->
        </div>
        <div class="row" v-if="!hasResult">
            <div class="jumbotron bg-white sm">
                <h1>No Data Available</h1>
                <p class="error"><strong>No Available Itinerary for your search date(s) and destination at this
                    time</strong>
                </p>
            </div>
        </div>
        <!-- Modal details window -->
        <div class="modal fade " role="dialog" id="modal-details" aria-hidden="true">
            <div class="modal-dialog modal-full">
                <div class="modal-content">
                    <div class="modal-body">
                        <h4><strong>Itinerary</strong> Details</h4>
                        <div>
                            <!-- Tabs -->
                            <ul class="nav nav-pills nav-justified">
                                <li class="active">
                                    <a href="#fullItin" data-toggle="tab" aria-expanded="true">
                                        <span>Full Itinerary</span>
                                    </a>
                                </li>
                                <li class="">
                                    <a href="#fullPrice" data-toggle="tab" aria-expanded="false">
                                        <span>Pricing</span>
                                    </a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane animated fadeInRight active" id="fullItin">
                                    <h3><span><strong>{{totalPrice}}</strong>&nbsp; &nbsp; {{faresAndFees}}</span>
                                    </h3>

                                    <table class="table table-striped table-responsive" >
                                      <tbody v-for="cr in currentFlightItinerary">
                                        <tr >
                                            <td rowspan="2">
                                                <p><strong>{{cr.marketingAirline}}</strong></p>
                                                <p>{{cr.flightNumber}} {{cr.travelClass}}</p>
                                            </td>
                                            <td>
                                                <p>{{cr.originLocation}}</p>

                                            </td>
                                            <td>
                                                <p>{{cr.destinationLocation}}</p>
                                            </td>
                                            <td>
                                                <p>{{cr.stops}} Stops</p>
                                            </td>
                                            <td>
                                                <p>{{cr.seatsRemaining}} seats Remaining</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><p>{{cr.departureDateTimeFormatted}}</p></td>
                                            <td><p>{{cr.arrivalDateTimeFormatted}}</p></td>
                                            <td><p>{{cr.flightDuration}} depart duration</p></td>
                                        </tr>

                                        </tbody>
                                    </table>

                                </div>
                                <div class="tab-pane animated fadeInRight " id="fullPrice">

                                    <h4><span><strong>Pricing</strong> Details</span></h4>
                                    <table class="table table-hover table-responsive">
                                        <thead class="info">
                                        <th><strong>Passenger Type</strong></th>
                                        <th><strong>No. of Persons</strong></th>
                                        <th><strong>Price per</strong></th>
                                        <th><strong>Total</strong></th>
                                        </thead>
                                        <tbody>

                                        <tr v-for="cpd in currentPricingDetails">
                                            <td>{{cpd.passengerType}}</td>
                                            <td>{{cpd.passengerQuantity}}</td>
                                            <td>{{cpd.equivFareM}}</td>
                                            <td>{{cpd.totalEquivFareM}}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="3">Taxes and Fees</td>
                                            <td>{{faresAndFeesDetail}}</td>
                                        </tr>
                                        <tr class="info">
                                            <td colspan="3">Sum Total (Fare and Fees)</td>
                                            <td>{{totalPriceDetail}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <!--  <div class="panel-footer">This is open for booking and ticketing until  ${validUntil}}</div> -->


                                </div>
                            </div>
                            <hr>
                            <button class="btn btn-default pull-left" @click.prevent="$root.$emit('closeModal')">Close!</button>
                            <button class="btn btn-primary pull-right" @click.prevent="$root.$emit('doBooking')">Book This</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
import 'bootstrap-table/dist/bootstrap-table';

    export default{
        transition(to, from) {
            if (!from) return 'slide-left'
            return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
        },
        data(){
            return {
                flightResult: null,
                beforeDateResult: [],
                actualDateResult: [],
                afterDateResult: [],
                currentFlightSelection: null,
                currentFlightItinerary: null,
                currentPricingDetails: null,
                faresAndFeesDetail: null,
                totalPriceDetail: null,
                myModal: null,
                overLayClass: '',
                totalPrice:null,
                faresAndFees:null,
                doBookingClick:null
            };
        },
        created(){


            this.dateBefore = Date.create(this.localStorage.departDate).addDays(-1).medium();
            this.actualDate = Date.create(this.localStorage.departDate).medium();
            this.dateAfter = Date.create(this.localStorage.departDate).addDays(1).medium();
            if (!this.flightResult)
                this.flightResult = this.localStorage.flightSearchResult;
            this.beforeDateResult = this.flightResult.beforeDateResult;
            this.actualDateResult = this.flightResult.actualDateResult;
            this.afterDateResult = this.flightResult.afterDateResult;

        },
        mounted(){
          let vm=this;
            this.myModal = $('#modal-details');
            this.myModal.modal({
                backdrop: 'static',
                keyboard: false,
                show: false
            });
            this.$root.$on('closeModal',()=>{
              console.log('close emitted');
              $('#modal-details').modal('hide');
            });
            this.$root.$on('doBooking',function(){
                $('#modal-details').modal('hide');
                this.$options.router.push('flightbooking');
            });
            const tableColumns = [
                {
                    field: 'airline',
                    title: 'Airline',
                    sortable: true
                },
                {
                    field: 'totalFare',
                    title: 'Fare',
                    sortable: true
                },
                {
                    field: 'numStopsDepart',
                    title: 'No. of Stops',
                    sortable: true
                },
                {
                    field: 'totalDepartElapsed',
                    title: 'Duration',
                    sortable: true
                },
                {
                    field: 'totalDepartLayover',
                    title: 'Layover',
                    sortable: true
                },
                {
                    field: 'departTime',
                    title: 'Departure Time',
                    sortable: true
                },
                {
                    title: 'Action',
                    align: 'center',
                    events: {
                        'click .active': function (e, value, row, index) {
                        console.log(row);
                        console.log(this);
                            vm.currentFlightSelection = row;
                            vm.localStorage.currentFlightSelection=vm.currentFlightSelection;
                            let fs = row
                            vm.currentFlightItinerary = row.itinerary;
                            console.log(vm.currentFlightItinerary);
                            vm.currentPricingDetails = row.pricingDetails;
                            vm.totalPriceDetail = `${fs.currencyCode} ${fs.totalFare}`;
                            vm.faresAndFeesDetail = `${fs.currencyCode} ${fs.totalTax}`;
                            vm.totalPrice = `Base Fare: ${fs.currencyCode} ${fs.baseFare}`;
                            vm.faresAndFees = `Taxes and Fees: ${fs.currencyCode} ${fs.totalTax}`;
                            $('#modal-details').modal('show');
                        }
                    },
                    formatter(value, row, index) {
                        return ` <a role="button" class="btn btn-success active" href="javascript:void(0)">Details</a>`;
                    }
                }
            ];
            $('#before').bootstrapTable({
                data: this.beforeDateResult,
                columns: tableColumns
            });
            $('#actual').bootstrapTable({
                data: this.actualDateResult,
                columns: tableColumns
            });
            $('#after').bootstrapTable({
                data: this.afterDateResult,
                columns: tableColumns
            });
            $('#detailTable').bootstrapTable({
              data:this.currentFlightItinerary
            });
        },
        computed:{
          hasResult() {
              return this.flightResult.actualDateResult.length > 0;
          }
        },
        method: {
            actualFilter(param) {
                switch (param) {
                    case 'amDepart':
                        var amDep = _.filter(this.flightResult.actualDateResult, (d) => {
                            var departDateTime = d.itinerary[0].departureDateTime;
                            return !(Date.parse(departDateTime).getHours() >= 12);
                        });
                        break;
                    case 'pmDepart':
                        break;
                    case 'amArrive':
                        break;
                    case 'pmArrive':
                        break;
                    default:
                        this.actualDateResult = this.flightResult.actualDateResult;
                        break;

                }
            },
            afterFilter(param) {
                switch (param) {
                    case 'amDepart':
                        var amDep = _.filter(this.flightResult.afterDateResult, (d) => {
                            var departDateTime = d.itinerary[0].departureDateTime;
                            return !(Date.parse(departDateTime).getHours() >= 12);
                        });
                        break;
                    case 'pmDepart':
                        break;
                    case 'amArrive':
                        break;
                    case 'pmArrive':
                        break;
                    default:
                        this.afterDateResult = this.flightResult.afterDateResult;
                        break;

                }
            },
            beforeFilter(param) {
                switch (param) {
                    case 'amDepart':
                        var amDep = _.filter(this.flightResult.beforeDateResult, (d) => {
                            var departDateTime = d.itinerary[0].departureDateTime;
                            return !(Date.parse(departDateTime).getHours() >= 12);
                        });
                        break;
                    case 'pmDepart':
                        break;
                    case 'amArrive':
                        break;
                    case 'pmArrive':
                        break;
                    default:
                        this.beforeDateResult = this.flightResult.beforeDateResult;
                        break;

                }
            },

            doBooking() {
                this.localStorage.currentFlightSelection=this.currentFlightSelection;
                this.closeModal();
                this.router.navigateToRoute('flightbooking');
            },
            closeModal() {
                $('#modal-details').modal('hide');
            }
        }
    }
</script>
