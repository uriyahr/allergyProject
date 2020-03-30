<template>
  <div id="register">
    <form>
      <fieldset>

      </fieldset>
    </form>
    <h2> Register </h2>
    <input type="text" name="username" v-model="input.username" placeholder="Username">
    <input type="text" name="password" v-model="input.password" placeholder="Password">
    <button type="button" v-on:click="register()">Register</button>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {

    }
  },
  methods: {
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