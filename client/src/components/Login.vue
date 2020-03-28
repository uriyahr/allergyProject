<template>
  <div id="login">
    <h2> Login </h2>
    <input type="text" name="username" v-model="username" placeholder="Username">
    <input type="text" name="password" v-model="password" placeholder="Password">
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      name: ''
    }
  },
  methods: {
    async login () {
      console.log('logging in');
      // generate vue store ...

    },
    async loginOld () {
      if(this.username != "" && this.password != "") {
        if(this.username == this.$parent.mockAccount.username && this.password == this.$parent.mockAccount.password){
          console.log(this.username);
          console.log(this.password);
           await this.$emit("authenticated", true);
           await this.$router.replace({name: 'Secure'}).catch(err => { console.log(err)});
        }else {
          console.log("The username and/or password is incorrect");
        }
      }else {
        console.log("A username and password must be present");
      }
    },

  }
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