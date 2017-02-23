<template>
<div class="row animated fadeIn">
    <div class="col-md-12">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Passenger(s) Details for Booking and Ticketing</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <Div class="col-sm-12">
                        <span>If you are logged in your details will be populated here</span>
                    </Div>
                </div>
                <form id="passenger-data" action="#">
                    <section class="step" data-step-title="Main Passenger">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-group clearfix">
                                    <label class="col-lg-3 control-label ">title *</label>
                                    <div class="col-lg-9">
                                        <multiselect SelectLabel="" v-model="titleObj" :options="passengerTitles" placeholder="Title" label="label" track-by="value"></multiselect>

                                    </div>
                                </div>
                                <div class="form-group clearfix">
                                    <label class="col-lg-3 control-label ">MiddleName</label>
                                    <div class="col-lg-9">
                                        <input id="middleName" type="text" class="form-control" v-model="middleName">
                                    </div>
                                </div>

                                <div class="form-group clearfix">
                                    <label class="col-lg-3 control-label ">Gender *</label>
                                    <div class="col-lg-9">
                                        <multiselect SelectLabel="" v-model="genderObj" :options="genderList" placeholder="Gender" label="label" track-by="value"></multiselect>

                                    </div>
                                </div>
                                <div class="form-group clearfix">
                                    <label class="col-lg-3 control-label">Email *</label>
                                    <div class="col-lg-9">
                                        <input id="email" type="email" v-model="email" class="required form-control">
                                    </div>
                                </div>
                                <div class="form-group clearfix">
                                    <label class="col-lg-3 control-label">Address *</label>
                                    <div class="col-lg-9">
                                        <textarea id="contactAd" type="text" v-model="contactAddress" class="required form-control"></textarea>
                                    </div>
                                </div>
                                <div class="form-group clearfix">
                                    <label class="col-lg-12 control-label ">(*) Mandatory</label>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group clearfix">
                                    <label class="col-lg-3 control-label">First Name *</label>
                                    <div class="col-lg-9">
                                        <input id="firstName" type="text" v-model="firstName" class="required form-control">
                                    </div>
                                </div>
                                <div class="form-group clearfix">
                                    <label class="col-lg-3 control-label">Last Name *</label>
                                    <div class="col-lg-9">
                                        <input id="lastName" type="text" v-model="lastName" class="required form-control">
                                    </div>
                                </div>
                                <div class="form-group clearfix">
                                    <label class="col-lg-3 control-label">Date of Birth *</label>
                                    <div class="col-lg-9">
                                        <FlatPickr class="form-control" id="dob" v-model="dateOfBirth" :options="datePickrOptions" placeholder="Date Of Birth" />
                                    </div>
                                </div>
                                <div class="form-group clearfix">
                                    <label class="col-lg-3 control-label">Phone *</label>
                                    <div class="col-lg-9">
                                        <input id="phoneNumber" type="text" v-model="phoneNumber" class="required form-control">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <adults v-if="adults" adults="adults"></adults>
                    <children v-if="children" children="children"></children>
                    <infants v-if="infants" infants="infants"></infants>
                    <section class="step" data-step-title="Payment Options">
                        <p>Please select the payment option you would like to use
                            <div class="form-group clearfix">
                                <label class="col-lg-3 control-label">Payment Preference</label>
                                <div class="col-lg-9 col-md-9">
                                    <div v-for="pOption of paymentOptions">
                                        <label class="cr-styled">
                                            <input type="radio" name="payment-radio" v-model="paymentOption" :value="pOption.id">
                                            <i class="fa fa-fw " v-bind:class="iconClass(pOption.icon)"></i> {{pOption.name}}
                                        </label>
                                    </div>

                                </div>
                            </div>
                    </section>
                    <section class="step" data-step-title="Terms">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <div class="col-sm-offset-2 col-sm-10">
                                        <div class="input-wrapper">
                                            <input id="chkAgree" type="checkbox" checked.bind="agreedTerms" required>
                                            <label for="chkAgree">I Agree to the fare Rules and Ajala Terms and Conditions</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="notes">
                                    {{terms}}
                                </div>
                            </div>
                        </div>
                    </section>

                </form>
            </div>
            <!-- End panel-body -->
        </div>
        <!-- End panel -->

    </div>
    <!-- end col -->

</div>
<!-- End row -->
</template>
<script>
    import adults from '../../components/adults.vue';
    import children from '../../components/children.vue';
    import infants from '../../components/infants.vue';
    import _ from 'lodash';
    import '../../utils/wizard.js';
    
    
    export default{
        components:{
            adults,
            infants,
            children
        },
        data(){
            return {
                flightSearchParams:null,
                validationMessage:null,
                firstName:null,
                lastName:null,
                middleName:null,
                title:null,
                gender:null,
                dateOfBirth:null,
                email:null,
                phoneNumber:null,
                contactAddress:null,
                passportCountry:null,
                paymentOption:null,
                numAdults:null,
                agreedTerms:null,
                numChildren:null,
                numInfants:null,
                passengerTitles:null,
                passengerGender:null,
                countries:null,
                terms:null,
                adults:null,
                children:null,
                infants:null, 
                paymentOptions:null,
                genderList:null,
                titleObj:null,
                genderObj:null,
                datePickrOptions:null
            } 
        },
        mounted(){
            let self = this;
            let $form_container = $('#passenger-data');
            $form_container.easyWizard({
                buttonsClass: 'btn btn-primary',
                submitButtonClass: 'btn btn-success',
                debug: true
            });
            $form_container.find('[type="submit"]').bind('click.easyWizard', function (e) {
                e.preventDefault();
                console.log(self.isFormValid);
                if (self.validationMessage) {
                     return swal('Oops...', self.validationMessage, 'error');
                   
                }
                else
                    return self.doPassengerReg();
                });
        },
        created(){
            this.flightSearchParams = this.localStorage.flightSearchParams;
            this.numAdults = this.localStorage.flightSearchParams.flightBooking.numAdults;
            this.agreedTerms = false;
            this.numChildren = this.localStorage.flightSearchParams.flightBooking.numChildren || 0;
            this.numInfants = this.localStorage.flightSearchParams.flightBooking.numInfants || 0;
            this.passengerTitles = this.$helpers.passengerTitle;
            this.passengerGender = this.$helpers.gender;
            this.countries = this.$helpers.countries;
            this.terms = this.$helpers.termsAndConditions();
            this.adults = this.adultsObject;
            this.children = this.childrenObject;
            this.infants = this.infantsObject;
            this.genderList=[
                {value: 0, label: 'Male'},
                {value: 1, label: 'Female'}
            ];
            this.paymentOptions = [
                {id: 1, name: 'Pay with Debit / Credit Card', icon: 'credit-card'},
                {id: 2, name: 'Via internet Banking Transfer (within 12 hours from this booking)', icon: 'laptop'},
                {id: 3, name: 'Pay cash at Bank (within 24 hours from this booking)', icon: 'bank'},
                {id: 4, name: 'Pay Cash at our office (Within 24 Hours from this Booking)', icon: 'money'}
            ];
            this.datePickrOptions=this.$helpers.datePickrOptions;
        },
        computed:{
            
            adultsObject() {
                return this.numAdults > 1 ? _.times(this.numAdults - 1, (n) => {
                    return {
                        num: n + 1,
                        firstName: 'adtFirstName' + n + 1,
                        middleName: 'adtMiddleName' + n + 1,
                        surname: 'adtSurname' + n + 1,
                        gender: 'gender' + n + 1,
                        title: 'adtTitle' + n + 1
                    }
                }) : null;
            },
            childrenObject() {
                return this.numChildren > 0 ? _.times(this.numChildren, (n) => {
                    return {
                        num: n + 1,
                        firsName: 'chFirstName' + n + 1,
                        lastName: 'chMiddleName' + n + 1,
                        surname: 'chSurname' + n + 1,
                        gender: 'gender' + n + 1
                    };
                }) : null;
            },
            infantsObject() {
                return this.numInfants > 0 ? _.times(this.numInfants, (n) => {
                    return {
                        num: n + 1,
                        firsName: 'infFirstName' + n + 1,
                        lastName: 'infMiddleName' + n + 1,
                        surname: 'infSurname' + n + 1,
                        gender: 'gender' + n + 1
                    };
                }) : null;
            }
        },
        watch:{
            titleObj(newValue){
                this.title=newValue.value;
            },
            genderObj(newValue){
                this.gender=newValue.value;
            }, 
            isFormValid() {
                let isValid = false;
                if (!this.title)
                    this.validationMessage = 'Main Passenger: Title required';
                else if (!this.firstName)
                    this.validationMessage = 'Main Passenger: First Name required';
                else if (!(this.email && this.$helpers.isValidEmail(this.email)))
                    this.validationMessage = 'Main Passenger: A valid email is required';
                else if (!this.contactAddress)
                    this.validationMessage = 'Main Passenger: Contact Address required';
                else if (!this.firstName)
                    this.validationMessage = 'Main Passenger: First Name required';
                else if (!this.lastName)
                    validationMessage = 'Main Passenger: Last Name required';
                else if (!_.isDate(Date.create(this.dateOfBirth)))
                    validationMessage = 'Main Passenger: Date of birth required';
                else if (!this.phoneNumber)
                    this.validationMessage = 'Main Passenger: Phone number required';
                else if (!(this.dateOfBirth && _.isDate(Date.create(this.dateOfBirth)) && this.$helpers.isDobValid(Date.create(this.dateOfBirth))))
                    this.validationMessage = 'a Valid Date of Birth is required';
                else if (!(parseInt(this.paymentOption) >=0)){
                         console.log(this.paymentOption);
                          this.validationMessage = 'Please select a Payment Option';
                         }                   
                else if (this.adults && this.adults.length > 1) {
                    for (var nd = 1; nd <= this.adults.length - 1; nd++) {
                        if ($('#adtTitle' + nd + 1).select2('val') === '' || $('#gender' + nd + 1).select2('val') === '') {
                            this.validationMessage = ' Title and Gender are required for Adult passenger ' + nd + 1;
                        }
                    }
                }
                else if (this.children && this.children.length > 0) {
                    for (var nd = 1; nd <= numCh; nd++) {
                        if ($('#gender' + nd + 1).select2('val') === '') {
                            this.validationMessage = ' Gender is required for Child passenger ' + nd + 1;
                        }
                    }
                }
                else if (this.infants && this.infants.length > 0) {
                    for (var nd = 1; nd <= numAd - 1; nd++) {
                        if ($('#adtTitle' + nd + 1).select2('val') === '' || $('#sex' + nd + 1).select2('val') === '') {
                            this.validationMessage = ' Title and Gender are required for Adult passenger ' + nd + 1;
                        }
                    }
                }
                else if (!this.agreedTerms) {
                    this.validationMessage = 'You have to agree to the terms and conditions to proceed';
                }
                else {
                    this.validationMessage = '';
                    isValid = true;
                }
                return isValid;
            },
        },
        methods:{
            iconClass(iconObj){
                return `fa-${iconObj}`;
            },
         
            doPassengerReg() {
                this.localStorage.loadingModal={
                        message: 'Please wait while we book down this itinerary',
                        isOpen: 'md-show'
                    };
                
                let passengerDetails = {};
                let adultPassengers = [];
                let infantPassengers = [];
                let childPassengers = [];
                let bookingReg = {};
                passengerDetails.location = this.localStorage.startLocation;
                passengerDetails.destination = this.localStorage.endDestination;
                passengerDetails.title = this.title;
                passengerDetails.firstName = this.firstName;
                passengerDetails.middleName = this.middleName;
                passengerDetails.surname = this.lastName;
                passengerDetails.gender = this.gender;
                passengerDetails.country = this.passportCountry;
                passengerDetails.address = this.address;
                passengerDetails.email = this.email;
                passengerDetails.phone = this.phoneNumber;
                passengerDetails.isPrimary = true;
                passengerDetails.dateOfBirth = this.dateOfBirth;
                adultPassengers.push(passengerDetails);
                //TODO: if main passenger is an existing user add id
                if (this.adults)
                    if (this.adults.length > 1) {
                        _.times(this.adults.length - 1, (nd) => {
                            var otherAdult = {};
                            otherAdult.title = '';
                            otherAdult.email = '';
                            otherAdult.phone = '';
                            otherAdult.isprimary = false;
                            otherAdult.isprimary = false;
                            otherAdult.title = $('#adtTitle' + nd + 1).val();
                            otherAdult.firstName = $('#adtFirstName' + nd + 1).val();
                            otherAdult.middleName = $('#adtMiddleName' + nd + 1).val();
                            otherAdult.surname = $('#adtSurname' + nd + 1).val();
                            otherAdult.gender = $('#gender' + nd + 1).select2('val');
                            adultPassengers.push(otherAdult);
                        });
                    }
                if (this.children)
                    if (this.children.length > 0) {
                        _.times(this.children.length, (nd) => {
                            var cD = {};
                            cD.title = '';
                            cD.email = '';
                            cD.phone = '';
                            cD.isprimary = false;
                            cD.firstName = $('#chFirstName' + nd + 1).val();
                            cD.middleName = $('#chMiddleName' + nd + 1).val();
                            cD.surname = $('#chSurname' + nd + 1).val();
                            cD.gender = $('#sex' + nd + 1).select2('val');
                            childPassengers.push(cD);
                        });
                    }
                if (this.infants)
                    if (this.infants.length > 0) {
                        _.times(this.infants.length, (nd) => {
                            var iD = {};
                            iD.title = '';
                            iD.email = '';
                            iD.phone = '';
                            iD.isprimary = false;
                            iD.firstName = $('#infFirstName' + nd + 1).val();
                            iD.middleName = $('#infMiddleName' + nd + 1).val();
                            iD.surname = $('#infSurname' + nd + 1).val();
                            iD.gender = $('#sex' + nd + 1).select2('val');
                            infantPassengers.push(iD);
                        })
                    }
                bookingReg.adults = adultPassengers;
                bookingReg.children = childPassengers;
                bookingReg.infants = infantPassengers;
                let paramsObject = {
                    passengerDetails: bookingReg,
                    flightDetails: this.localStorage.currentFlightSelection,
                    tokenId: this.localStorage.tokenId,
                    totalPassengers: adultPassengers.length + childPassengers.length + infantPassengers.length,
                    pnr: null,
                    location: this.localStorage.startLocation,
                    destination: this.localStorage.endDestination,
                    payOption: this.paymentOption,
                    appUser: null
                };


                this.$flightService.bookAndRegister(paramsObject).then((result) => {
                     this.localStorage.loadingModal={
                        message: null,
                        isOpen: ''
                    };
                    let thePnr = 'X0PRGQ'; //TODO: result.booking.pnr
                    if (thePnr) {
                        swal('Flight reserved successfully. An email with the reservation details has been sent to you.kindly process payment now');
                        this.localStorage.flightBooking=result;
                        switch ('1') {//TODO:(result.payment.paymentOption.id.toString()) {
                            case '1': //route to zenith payment interface card
                                //Router.go('tplFlightPayment');
                                let pass = _.first(adultPassengers, (fp) => !!fp.isPrimary);//TODO:_.first(result.passengers, (fp) => !!fp.isPrimary);

                                let day = Date.create('today').short();
                                let transRef = this.$helpers.createTransactionRef(thePnr);
                                let amt = this.$helpers.amountToPay(120000);//TODO:this.$helpers.amountToPay(parseFloat(result.booking.totalFare));
                                this.localStorage.transactionRef=transRef;
                                let params = {
                                    id: '0989087',//TODO:result.id,
                                    transRef: transRef,
                                    amt: amt,
                                    pass: pass
                                };

                                let fPay = {
                                    transRef: transRef,
                                    paymentDate: day,
                                    paymentStatus: 'pending',
                                    amountPaid: amt,
                                    timesQueried: 0,
                                    ticketIssued: false,
                                    pnr: thePnr
                                };
                                //TODO this.flightService.createFlightPayment({fPay: fPay, id: result.id}).then((result) => {
                                let payData = {
                                    merchantid: this.$helpers.merchantId,
                                    names: pass.surname + ' ' + pass.firstName + ' ' + pass.middleName,
                                    amount: amt,
                                    currency: 'NGN',
                                    email_address: pass.email,
                                    phone_number: pass.phone,
                                    merch_txnref: transRef
                                };
                                try {
                                    this.$helpers.globalPost('https://demo.globalpay.com.ng/globalpay_demo/paymentgatewaycapture.aspx', payData);
                                } catch (e) {
                                    console.log(e);
                                    swal('Oops..', `An error occurred while trying to contact the payment gateway ${e}`, 'error');
                                }
                                //TODO }).catch((error) => {
                                //TODO  swal('Oops...', `An error occured ${error}`, 'error');
                                //TODO  });
                                break;
                            default: //others route to bookingConfirmation
                                this.router.navigateToRoute('flightBookingInvoice');
                                break;
                        }
                    }

                }).catch((error) => {
                     this.localStorage.loadingModal={
                        message: null,
                        isOpen: ''
                    };
                    swal('Error', `An error occured ${error}`, 'error');
                });

        }


    }
    }
</script>
