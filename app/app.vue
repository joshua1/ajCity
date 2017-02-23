<template>
  <section class="content">
    <header class="top-head container-fluid navbar-fixed-top">
      <div class="logo pull-left">
        <a href="index.html" class="logo-expanded">
          <img class="img-responsive" src="~assets/svg/ajala.svg" alt="AJAlA" />
          <!--<span class="nav-label">AJala</span>-->
        </a>
      </div>
      <nav class=" navbar-default" role="navigation">
        <!-- Right navbar -->
        <ul class="nav navbar-nav navbar-right top-menu top-right-menu">
          <!-- the different offering -->
          <li class="dropdown">
            <a data-toggle="dropdown" class="dropdown-toggle" href="index.html#">
              <i class="fa fa-address-card "></i>
              <span class="pull-right">&nbsp;  Offerings</span>
            </a>
            <ul class="dropdown-menu extended fadeInUp animated nicescroll" tabindex="5001">
              <li>
                <a href="index.html#">
                  <span class="pull-left"><i class="fa fa-plane fa-2x text-info"></i></span>
                  <span class="block"><strong>Flight Booking</strong></span>
                  <span class="media-body block">New tasks needs to be done<br><small
                          class="text-muted">10 seconds ago</small></span>
                </a>
              </li>
              <li>
                <a href="index.html#">
                  <span class="pull-left"><i class="fa fa-bed fa-2x text-info"></i></span>
                  <span class="block"><strong>Hotels</strong></span>
                  <span class="media-body block">New tasks needs to be done<br><small
                          class="text-muted">3 minutes ago</small></span>
                </a>
              </li>
              <li>
                <a href="index.html#">
                  <span class="pull-left"><i class="fa fa-ship fa-2x text-info"></i></span>
                  <span class="block"><strong>Cruise</strong></span>
                  <span class="media-body block">New tasks needs to be done<br><small
                          class="text-muted">10 minutes ago</small></span>
                </a>
              </li>
              <li>
                <a href="index.html#">
                  <span class="pull-left"><i class="fa fa-user-plus fa-2x text-info"></i></span>
                  <span class="block"><strong>Cruise</strong></span>
                  <span class="media-body block">New tasks needs to be done<br><small
                          class="text-muted">10 minutes ago</small></span>
                </a>
              </li>
            </ul>
          </li>
          <li class="dropdown">
            <a data-toggle="dropdown" class="dropdown-toggle" href="index.html#">
              <i class="fa fa-bell-o"></i>
              <span class="pull-right">&nbsp;  Deals</span>
            </a>
            <ul class="dropdown-menu extended fadeInUp animated nicescroll" tabindex="5002">
              <li>
                <a href="index.html#">
                  <span class="pull-left"><i class="fa fa-user-plus fa-2x text-info"></i></span>
                  <span>Flight Ticket Deals<br></span>
                </a>
              </li>
              <li>
                <a href="index.html#">
                  <span class="pull-left"><i class="fa fa-diamond fa-2x text-primary"></i></span>
                  <span>Hotel Deals<br></span>
                </a>
              </li>
              <li>
                <a href="index.html#">
                  <span class="pull-left"><i class="fa fa-bell-o fa-2x text-danger"></i></span>
                  <span>Vacation Deals<br></span>
                </a>
              </li>

              <li>
                <p><a href="index.html#" class="text-right">See all Deals</a></p>
              </li>
            </ul>
          </li>
          <!-- /Notification -->

          <!-- user login dropdown start When not logged In Show the login show.bind-->
          <li class="dropdown text-center">
            <a data-toggle="dropdown" class="dropdown-toggle" href="index.html#">

              <span class="username">John Deo </span> <span class="caret"></span>
            </a>
            <ul class="dropdown-menu pro-menu fadeInUp animated" tabindex="5003" style="overflow: hidden; outline: none;">
              <li><a href="profile.html"><i class="fa fa-briefcase"></i>Profile</a></li>
              <li><a href="index.html#"><i class="fa fa-cog"></i> Settings</a></li>
              <li><a href="index.html#"><i class="fa fa-bell"></i>My Orders<span
                      class="label label-info pull-right mail-info">5</span></a></li>
              <li><a href="index.html#"><i class="fa fa-sign-out"></i> Log Out</a></li>
            </ul>
          </li>

        </ul>
      </nav>
    </header>
    <div class="wrapper container-fluid">
      <router-view></router-view>
    </div>
    <!-- TODO: Footer Start switch 2016 to a year function -->
    <footer class="footer">
      2017 © Ajala.
    </footer>
    <!-- Footer Ends -->
    <loading-modal></loading-modal>
  </section>

</template>

<script>

    import 'bootstrap';
    import { mapActions } from 'vuex';
    import loadingModal from './components/loadingModal.vue';
    export default {
        name: 'app',
        components:{
            loadingModal
        },
        methods: mapActions(['authenticate']),
        created () {
            this.authenticate().catch(err => {});
            this.$flightService.preloadData(this.localStorage);
            this.localStorage.loadingModal={isOpen:'',message:null};
        }
    }
</script>
<style>
  @import '~assets/styles/ajala.css';
</style>
