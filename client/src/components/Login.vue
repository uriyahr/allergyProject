<template>
  <div id="login">
    <h2> Login </h2>
    <form>
      <fieldset>
        <h2> Log In </h2>
        <input v-model="username" type="text" placeholder="Username">
        <input v-model="password" type="password" placeholder="Password">
        <p v-if="error"> {{ error }} </p>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      name: '',
      error: ''
    }
  },
  methods: {
    async login () {
      try {
        this.press();
        console.log('Logging In...');
        this.error = await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        });
        console.log('Logged In!');
      } catch (error) {
        console.log(error);
      }
    },
    toggleLoginRegister() {
      this.press();
      this.$store.dispatch('toggleLoginRegister');
    },
    async loginOld () {
      if(this.username != "" && this.password != "") {
        if(this.username == this.$parent.mockAccount.username && this.password == this.$parent.mockAccount.password){
          console.log(this.username);
          console.log(this.password);
           await this.$emit("authenticated", true);
        }else {
          console.log("The username and/or password is incorrect");
        }
      }else {
        console.log("A username and password must be present");
      }
    },
  },
  computed: {

  },
}
</script>
<style scoped>
  #login{
    width: 500px;
    border: 1px solid #CCCCCC;
    background-color: #ffffff;
    margin: auto;
    margin-top: 200px;
    padding: 20px;
  }
</style>