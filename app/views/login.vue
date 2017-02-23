<template>
  <div id="login" class="card text-xs-center container">
    <div class="card-block">
      <h1 class="card-title">Please sign in</h1>
      <div v-if="error" class="alert alert-danger">
        <span>{{ error }}</span>
      </div>
      <div class="card-text">
        <label for="email" class="sr-only">Email address</label>
        <input v-model="email" id="email" class="form-control" placeholder="Email address" required="" autofocus="" type="email">
        <label for="password" class="sr-only">Password</label>
        <input v-model="password" @keyup.enter="login" id="password" class="form-control" placeholder="Password" required="" type="password">
      </div>
      <button @click="login" class="btn btn-lg btn-primary w-100">Login</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    methods: {
      login () {
      console.log(this);
        this.$store.dispatch('login', {email: this.email, password: this.password})
          .then(() => {
            var url = require('url');
            var redirect = url.parse(this.$router.currentRoute.fullPath, true).query.redirect;
            this.$router.replace(redirect ? redirect : '/');
          })
          .catch(err => { this.error = err.message; });
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #login {
    max-width: 400px;
    input#email {
      margin-bottom: -1px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
    input#password {
      margin-bottom: 20px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
</style>
