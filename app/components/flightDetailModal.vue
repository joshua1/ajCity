<template>
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
                      <button class="btn btn-default pull-left" @click.prevent="closeModal()">Close!</button>
                      <button class="btn btn-primary pull-right" @click.prevent="doBooking()">Book This</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
import 'bootstrap-table/dist/bootstrap-table';
import Hub from '../utils/Hub';
    export default{
      props:['totalPrice','faresAndFees','currentPricingDetails','faresAndFeesDetail','totalPriceDetail',
    'currentFlightItinerary'],
    methods:{
      doBooking(){
        console.log('do booking fired');
        Hub.$emit('doBooking');
      },
      showModal(){
        $('#modal-details').modal('show');
      },
      closeModal(){
        $('#modal-details').modal('hide');
      }
    },
    mounted(){
      Hub.$on('show-modal',this.showModal)
    Hub.$on('hide-modal',this.closeModal);
    }
    destroyed(){
      Hub.$off('show-modal',this.showModal)
    Hub.$off('hide-modal',this.closeModal);
    }
    };
</script>
