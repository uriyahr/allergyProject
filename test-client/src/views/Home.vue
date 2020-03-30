<template>
  <div class="home">
    <h1> Welcome to Home (not secure) </h1>
    <Login/>

  </div>
</template>

<script>
// @ is an alias to /src
import Login from '../components/Login'

export default {
  name: 'Home',
  components: {
    Login
  },
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {

  }

}
</script>
