<template>
  <div class="login">
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    username: '',
    password: '',
    error: '',
  }),
  methods: {
    async login () {
      try {
        console.log('Logging In...');
        this.error = await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        });
        console.log('Logged In');
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>