<template>
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
    <div class="container">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
              aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <router-link to="/" class="navbar-brand" exact>{{ brand }}</router-link>
        <ul class="navbar-nav mr-auto">
          <router-link tag="li" to="/private" v-if="isAuthenticated" class="nav-item">
            <a class="nav-link">Private</a>
          </router-link>
        </ul>
        <ul class="navbar-nav">
          <li v-if="!isAuthenticated" class="nav-item">
            <router-link to="/login" class="btn btn-secondary">Login</router-link>
          </li>
          <li v-if="!isAuthenticated" class="nav-item">
            <router-link to="/register" class="btn btn-secondary">Register</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link to="/logout" class="btn btn-secondary">Logout {{ userEmail }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    props: ['brand'],
    computed: {
      ...mapGetters(['isAuthenticated']),
      userEmail () {
        return this.$store.state.authentication.user.email;
      }
    }
  }
</script>
