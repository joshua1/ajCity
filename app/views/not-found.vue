<template>
  <div id="not-found" class="card col-lg-6 text-center mx-auto">
    <div class="card-block">
      <h1 class="card-title">404</h1>
      <p class="card-text lead">Page not found.</p>
      <button @click="goBack" class="btn btn-secondary">Go back</button>
      <router-link to="/" class="btn btn-secondary" exact>Go home</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      goBack () { this.$router.go(-1); }
    }
  }
</script>

<style>
  h1 {
    font-size: 72px;
  }
</style>
