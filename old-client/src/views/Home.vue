<template>
  <div id="home">
    <h1> Home Page </h1>
    <Login/>
  </div>
</template>
<script>
import Login from '../components/Login'
export default {
  name: 'Home',
  components: {
    Login
  },
  data () {
    return {

    }
  }
}
</script>
<style scoped>

</style>