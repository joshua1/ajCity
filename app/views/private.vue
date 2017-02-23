<template>
  <div id="private">
    <h1>This page is private.</h1>
    <router-link to="/" class="btn btn-secondary" exact>Go home</router-link>
  </div>
</template>

<script>
  // In-component guard example
//  import { restrictToAuthenticated } from '../router/guards';
//  export default {
//    beforeRouteEnter: restrictToAuthenticated
//  }
</script>
