<template>

    <div class="row">
        <div class="panel panel-primary panel-color">
            <div class="panel-heading">
                <div class="panel-title">
                    <img src="~assets/images/travel_icons/airplane.svg"/> Where would you like to go?
                </div>
            </div>
            <div class="panel-body">
                <form action="#" class="form-horizontal">
                    <div class="btn-group btn-group-justified m-b-10">
                        <a role="button" class="btn btn-primary" @click.prevent="returnSelected">Return</a>
                        <a role="button" class="btn btn-success" @click.prevent="oneWaySelected">One way</a>
                        <a role="button" class="btn btn-inverse" @click.prevent="multiSelected">Multi city</a>
                    </div>
                    <hr/>
                    <div class="form-group">
                        <label class="col-sm-3 col-md-3 col-lg-3 control-label">Location</label>
                        <div class="col-sm-7 col-md-7 col-lg-7">
                            <multiselect SelectLabel="" v-model="locationObj" :options="airports"
                                         placeholder="Departing from ..." label="text" track-by="id"></multiselect>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Destination</label>
                        <div class="col-sm-7">
                            <multiselect name="destination" v-model="destinationObj" :options="airports"
                                         placeholder="Arriving at ..." label="text" track-by="id"></multiselect>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Depart Date</label>
                        <div class="col-sm-7">
                            <FlatPickr id="departDate" v-model="departDate" :options="datePickrOptions"
                                       placeholder="Departure Date"/>
                        </div>
                    </div>
                    <div class="form-group" v-if="isReturn">
                        <label class="col-sm-3 control-label">Return Date</label>
                        <div class="col-sm-7">
                            <FlatPickr id="returnDate" v-model="returnDate" :options="datePickrOptions"
                                       placeholder="Return Date"/>
                        </div>
                    </div>
                    <div class="form-group" v-if="isMulti">
                        <label class="col-sm-3 control-label">From</label>
                        <div class="col-sm-7">
                            <multiselect name="destination2" v-model="destination2Obj" :options="airports"
                                         placeholder="From ..." label="text" track-by="id"></multiselect>
                        </div>
                    </div>
                    <!-- multiple start -->
                    <div class="form-group" v-if="isMulti">
                        <label class="col-sm-3 control-label">To</label>
                        <div class="col-sm-7">
                            <multiselect name="destination3" v-model="destination3Obj" :options="airports"
                                         placeholder="To ..." label="text" track-by="id"></multiselect>
                        </div>
                    </div>
                    <div class="form-group" v-if="isMulti">
                        <label class="col-sm-3 control-label">Depart Date</label>
                        <div class="col-sm-7">
                            <FlatPickr id="departDate2" v-model="departDate2" :options="datePickrOptions"
                                       placeholder="Date"/>
                        </div>
                    </div>
                    <div class="form-group" v-if="isMulti">
                        <label class="col-sm-3 control-label">From</label>
                        <div class="col-sm-7">
                            <multiselect name="destination4" v-model="destination3Obj" :options="airports"
                                         placeholder="From ..." label="text" track-by="id"></multiselect>
                        </div>
                    </div>
                    <div class="form-group" v-if="isMulti">
                        <label class="col-sm-3 control-label">To</label>
                        <div class="col-sm-7">
                            <multiselect name="destination5" v-model="destination5Obj" :options="airports"
                                         placeholder="To ..." label="text" track-by="id"></multiselect>
                        </div>
                    </div>
                    <div class="form-group" v-if="isMulti">
                        <label class="col-sm-3 control-label">Depart Date</label>
                        <div class="col-sm-7">
                            <FlatPickr id="departDate3" v-model="departDate3" :options="datePickrOptions"
                                       placeholder="Date"/>
                        </div>
                    </div>

                    <!-- multiple end -->
                    <!-- number of Adults -->
                    <div class="form-group">
                        <label class="control-label col-md-3">Number of Adults (12+ yrs)</label>
                        <div class="col-md-9">
                            <div class="input-group" style="width:150px;">
                                <div class="spinner-buttons input-group-btn">
                                    <button type="button" class="btn spinner-up btn-primary"
                                            @click.prevent="numToggleUp('1')">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                                <input type="text" class="spinner-input form-control" v-model="numAdults" maxlength="3"
                                       readonly>
                                <div class="spinner-buttons input-group-btn">
                                    <button type="button" class="btn spinner-down btn-pink"
                                            @click.prevent="numToggleDown('1')">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- number of children -->
                    <div class="form-group ">
                        <label class="control-label col-md-3">Number of Children (
                            <=1 2 yrs)</label>
                        <div class="col-md-9">
                            <div class="input-group" style="width:150px;">
                                <div class="spinner-buttons input-group-btn">
                                    <button type="button" class="btn spinner-up btn-primary"
                                            @click.prevent="numToggleUp('2')">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                                <input type="text" class="spinner-input form-control" v-model="numChildren"
                                       maxlength="3" readonly>
                                <div class="spinner-buttons input-group-btn">
                                    <button type="button" class="btn spinner-down btn-pink"
                                            @click.prevent="numToggleDown('2')">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- num infants -->
                    <div class="form-group">
                        <label class="control-label col-md-3">Number of Infants (
                            < 2 yrs)</label>
                        <div class="col-md-9">
                            <div class="input-group" style="width:150px;">
                                <div class="spinner-buttons input-group-btn">
                                    <button type="button" class="btn spinner-up btn-primary"
                                            @click.prevent="numToggleUp('3')">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                                <input type="text" class="spinner-input form-control" v-model="numInfants" maxlength="3"
                                       readonly>
                                <div class="spinner-buttons input-group-btn">
                                    <button type="button" class="btn spinner-down btn-pink"
                                            @click.prevent="numToggleDown('3')">
                                        <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- travel Class -->
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Ticket Class</label>
                        <div class="col-sm-7 col-md-7 col-lg-7">
                            <multiselect name="ticketClass" v-model="ticketClassObj"
                                         :options="this.$helpers.ticketClassList" placeholder="Ticket Class"
                                         label="label" track-by="value"></multiselect>
                        </div>
                    </div>
                    <!-- payment Currency -->
                    <div class="form-group">
                        <label class="col-sm-3 control-label">Ticket Currency</label>
                        <div class="col-sm-7 col-md-7 col-lg-7">
                            <multiselect name="ticketClass" v-model="currencyObj" :options="this.$helpers.currencyList"
                                         placeholder="Currency..." label="label" track-by="value"></multiselect>
                        </div>
                    </div>
                    <div class="col-sm-offset-3 col-sm-9">
                        <button class="btn btn-success" @click.prevent="doFlightSearch()">Search</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script>

    import Vue from 'vue';
    import {
        mapMutations
    }
        from 'vuex';


    export default {
        transition(to, from) {
            if (!from) return 'slide-left'
            return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
        },
        data() {

            let today = new Date();
            return {
                location: 'LOS',
                disabled: true,
                destination: '',
                destination1: '',
                destination2: '',
                destination3: '',
                destination4: '',
                destination5: '',
                departDate: today.short(),
                returnDate: today.addDays(5).short(),
                departDate2: today.addDays(8).short(),
                departDate3: today.addDays(12).short(),
                numAdults: 1,
                numInfants: 0,
                numChildren: 0,
                ticketClass: 'Y',
                currency: 'NGN',
                ticketClassObj:null,
                currencyObj:null,
                isReturn: true,
                isOneWay: false,
                isMulti: false,
                datePickrOptions: {
                    altFormat: 'F j, Y',
                    altInput: true,
                },
                destinationObj: null,
                destination1Obj: null,
                destination2Obj: null,
                destination3Obj: null,
                destination4Obj: null,
                destination5Obj: null,
                locationObj: null,
                airports: null,
                ticketClassList: null,
                currencyList: null
            };
        },
        created(){
            this.ticketClassList = this.$helpers.ticketClassList;
            this.currencyList = this.$helpers.currencyList;
            this.airports = this.localStorage.airportList
        },
        watch: {
            destinationObj(newVal){
                this.destination = newVal.id;
            },
            destination1Obj(newval){
                this.destination1 = newVal.id;
            },
            destination2Obj(newval){
                this.destination2 = newVal.id;
            },
            destination3Obj(newval){
                this.destination3 = newVal.id;
            },
            destination4Obj(newval){
                this.destination4 = newVal.id;
            },
            destination5Obj(newval){
                this.destination5 = newVal.id;
            },
            locationObjObj(newval){
                this.location = newVal.id;
            },
            currencyObj(newVal){
              this.currency=newVal.value;
            },
            ticketClassObj(newVal){
              this.ticketClass=newVal.value;
            }
        },
        methods: { //harv3ila
            ...mapMutations([
                'setValue'
            ]),

            oneWaySelected() {
                console.log('one way selected');
                this.isOneWay = true;
                this.isReturn = false;
                this.isMulti = false;
            },
            multiSelected() {
                console.log('multi selected');
                this.isReturn = false;
                this.isOneWay = false;
                this.isMulti = true;
            },
            returnSelected() {
                console.log('return selected');
                this.isReturn = true;
                this.isOneWay = false;
                this.isMulti = false;
            },
            placeCode(placeString) {
                return placeString.substring(str.lastIndexOf('(') + 1, str.lastIndexOf(')'));
            },
            departChange(leg) {
                //update the return or next date
                switch (leg) {
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        break;
                }
            },
            numToggleUp(val) {
                console.log(`Toggled by ${val}`);
                switch (parseInt(val)) {
                    case 1:
                        this.numAdults = parseInt(this.numAdults) + 1;
                        break
                    case 2:
                        this.numChildren = parseInt(this.numChildren) + 1;
                        break;
                    case 3:
                        this.numInfants = parseInt(this.numInfants) + 1;
                        break;
                }
            },
            numToggleDown(val) {
                switch (parseInt(val)) {
                    case 1:
                        this.numAdults = this.numAdults > 0 ? this.numAdults -= 1 : 0;
                        break
                    case 2:
                        this.numChildren = this.numChildren > 0 ? this.numChildren -= 1 : 0;
                        break;
                    case 3:
                        this.numInfants = this.numInfants > 0 ? this.numInfants -= 1 : 0;
                        break;
                }
            },
            isEntryValid() {
                let isValid = false;
                if (!this.location || !this.destination)
                    this.validationMessage = 'Current location and destination fields  are required';
                else if (!_.isDate(Date.create(this.departDate)))
                    this.validationMessage = 'Departure Date is required';
                else if (this.isMulti && (this.destination2 && !this.destination3))
                    this.validationMessage = 'Destination location 2 cannot be empty';
                else if (this.isMulti && (this.destination4 && !this.destination5))
                    this.validationMessage = 'Destination location 3 cannot be empty';
                else if (this.isMulti && (this.desination2 && !_.isDate(Date.create(this.departDate2))))
                    this.validationMessage = 'Please enter departure date 2';
                else if (this.isMulti && (this.destination4 && !_.isDate(Date.create(this.departDate3))))
                    this.validationMessage = 'Please enter departure date 3';
                else if (this.isReturn && !_.isDate(Date.create(this.returnDate)))
                    this.validationMessage = 'Please choose a return date';
                else if (parseInt(this.numAdults) === 0 && parseInt(this.numChildren) === 0 && parseInt(this.numInfants) === 0)
                    this.validationMessage = 'you must specify at least one adult for this trip';
                else if (parseInt(this.numAdults) === 0 && (parseInt(this.numInfants) > 0 || parseInt(this.numChildren) > 0))
                    this.validationMessage = 'you must specify at least one adult for this trip';
                else if (!this.ticketClass)
                    this.validationMessage = 'Please select Travel Class';
                else if (!this.currency)
                    this.validationMessage = 'Please select the preferred Currency type for results';
                else {
                    this.validationMessage = '';
                    isValid = true;
                }
                return isValid;
            },
            doFlightSearch() {
                const apl = this.airports;
                if (!this.isEntryValid()) {
                    swal('Oops...', this.validationMessage, 'error');
                } else {
                    this.localStorage.loadingModal={
                        message: 'Please wait while we get you the best results',
                        isOpen: 'md-show'
                    };

                    let paramObj = {
                        flightDetails: [],
                        flightBooking: null
                    };
                    const theToken=this.localStorage.tokenId || null;
                    if(!theToken){
                      this.$flightService.preloadData(this.localStorage);
                    }
                    const fBooking = {
                        isOneWay: this.isOneWay,
                        isReturn: this.isReturn,
                        isMulti: this.isMulti,
                        sessionId: this.localStorage.sessionId,
                        travelClass: this.ticketClass,
                        currency: this.currency,
                        numAdults: this.numAdults,
                        numChildren: this.numChildren,
                        numInfants: this.numInfants,
                        tokenId:this.localStorage.tokenId
                    };
                    var fDetails = [];

                    let fullDate = this.$helpers.fullDate(this.departDate);
                    if (this.isOneWay === true) {
                        fDetails.push({
                            location: this.location,
                            destination: this.destination,
                            returnDate: null
                        });
                        this.localStorage.startLocation=this.$helpers.findCity(apl, this.location);
                        this.localStorage.endDestination=this.$helpers.findCity(apl, this.destination);
                    } else if (this.isMulti === true) {
                        fDetails.push({
                            location: this.location,
                            destination: this.destination,
                            departDate: this.$helpers.fullDate(this.departDate),
                            returnDate: null
                        });
                        fDetails.push({
                            location: this.destination2,
                            destination: this.destination3,
                            departDate: this.$helpers.fullDate(this.departDate2),
                            returnDate: null
                        });
                        if (!_.isEmpty(des5))
                            fDetails.push({
                                location: this.destination4,
                                destination: this.destination5,
                                departDate: this.$helpers.fullDate(this.departDate3),
                                returnDate: null
                            });

                        this.localStorage.startLocation=this.$helpers.findCity(apl, location);
                        this.localStorage.endDestination= 'multiple';
                    } else if (this.isReturn) {
                        fDetails.push({
                            location: this.location,
                            destination: this.destination,
                            departDate: this.$helpers.fullDate(this.departDate),
                            returnDate: this.$helpers.fullDate(this.returnDate)
                        });
                        this.localStorage.startLocation=this.$helpers.findCity(apl, this.location);
                        this.localStorage.endDestination=this.$helpers.findCity(apl, this.destination);
                    }
                    console.log(fDetails);
                    console.log(fBooking);
                    paramObj.flightBooking = fBooking;
                    paramObj.flightDetails = fDetails;
                    this.localStorage.flightSearchParams=paramObj;
                    this.localStorage.departDate= this.departDate;

                    this.$flightService.searchFlights(paramObj).then((searchResult) => {
                        console.log(JSON.stringify(searchResult));
                        this.localStorage.loadingModal={
                            message: null,
                            isOpen: ''
                        };
                        this.localStorage.flightSearchResult= searchResult;
                        this.$router.replace({
                            path: 'flightresult'
                        });
                    })
                        .catch((error) => {
                            this.localStorage.loadingModal= {
                                message: null,
                                isOpen: ''
                            };
                            swal('Ooops', `An error Occured : ${error}`, 'error');
                        });
                }
            }

        }
    }

</script>
