<template>
  <div id="login">
    <h1> Log In </h1>
    <input v-bind:class="{ error: error && username==''}" v-model="username" type="text" placeholder="Username">
    <input v-bind:class="{ error: error && password==''}" v-model="password" type="password" placeholder="Password">
    <p v-if="error">{{ error }}</p>
    <button @click="login">Login</button>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async login () {
      try {
        console.log('Logging In...');
        this.error = await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        });
        await this.$router.replace({name: 'Secure'}).catch(error => {
          console.log(error);
        })
        console.log("Logged In!");
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
  }
}
</script>
<style scoped>

</style>