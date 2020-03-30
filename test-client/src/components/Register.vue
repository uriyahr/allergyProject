<template>
  <div id="register">
    <h1>Register</h1>
    <input v-bind:class="{error: error && username==''}" v-model="username" type="text" placeholder='Username'>
    <input v-bind:class="{error: error && password==''}" v-model="password" type="password" placeholder="Password">
    <p v-if="error"> {{ error }} </p>
    <button @click="register">Register!</button>

  </div>
</template>
<script>
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async register () {
      try {
        console.log('Registering User...');
        this.error = await this.$store.dispatch('register', {
          username: this.username,
          password: this.password
        });
        console.log('User Registered!');
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
<style scoped>

</style>