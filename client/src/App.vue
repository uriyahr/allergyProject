<template>
  <div id="app">
    <div id="nav">
      <router-link id="Home" to="/">Allrg</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
      return {
      }
  },
  mounted () {
    if(!this.authenticated) {
      this.$router.replace({name: 'Login'});
    }
  },
  methods: {
    setAuthenticated (status) {
      this.authenticated = status;
    },
    logout () {
      this.authenticated = false;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
