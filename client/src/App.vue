<template>
  <div id="app">
    <div id="nav">
      <router-view></router-view>
      <!-- <router-link id="Home" to="/">Allrg</router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
      return {
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
