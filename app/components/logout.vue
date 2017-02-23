<template>
  <div id="logout"></div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    mounted () {
      this.logout()
        .then(() => { this.$router.replace('/'); })
        .catch(() => {});
    },
    methods: mapActions(['logout'])
  }
</script>
