<template>
  <div id="login">
    <h2> Login </h2>
    <input type="text" name="username" v-model="input.username" placeholder="Username">
    <input type="text" name="password" v-model="input.password" placeholder="Password">
    <button type="button" v-on:click="login()">Login</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      input: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    async login () {
      if(this.input.username != "" && this.input.password != "") {
        if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password){
          console.log(this.input.username);
          console.log(this.input.password);
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