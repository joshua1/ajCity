<template>
    <div id="index">
        <div class="page-title">
            <h3 class="title">Welcome to Ajala Go!</h3>
        </div>

        <div class="row">
            <div class="col-lg-6">
                <!-- flight things here -->
                <flight-search></flight-search>
            </div>
            <div class="col-lg-6">
                <hotel-landing></hotel-landing>
            </div>
            <!-- hotel -->
        </div>
        <div class="row">
            <div class="col-lg-6">
                <!-- Cruise things  -->
                <cruise-landing></cruise-landing>
            </div>
            <div class="col-lg-6">
                <vacation-landing></vacation-landing>
            </div>
            <!-- Holiday Packages-->
        </div>
        <div class="row">
            <div class="col-lg-12">
                <!-- Deals things  -->
                <deals-landing></deals-landing>
            </div>
        </div>

    </div>

</template>
<script>

    import FlightSearch from '../components/flightSearch.vue';
    import HotelLanding from '../components/hotel-landing.vue';
    import CruiseLanding from '../components/cruise-landing.vue';
    import VacationLanding from '../components/vacation-landing.vue';
    import DealsLanding from '../components/deals-landing.vue';
    import Vue from 'vue';
    export default {
        components: {
            FlightSearch,
            HotelLanding,
            CruiseLanding,
            VacationLanding,
            DealsLanding
        },
        middleware: 'preloadData',
        data() {
            return {
                title: 'Home'
            };
        },

    }

</script>
