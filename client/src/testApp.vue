<template>
  <div id="app">
    <v-app-bar dense color="white" elevation="1" height="67">
      <button id="nav-title" @click="route('/')" :class="{ activeButton: onAllergy }"> Allergy </button>
      <v-spacer></v-spacer>
      <v-text-field  tile solo label="Search by product name or brand" single-line outlined ></v-text-field>
      <v-spacer></v-spacer>
      <div id="rightNav">
        <button @click="route('/howItWorks')" :class="{ activeButton: onSearch }">How it Works</button>
        <button @click="route('/join')" :class="{ activeButton: onJoin }" >Join</button>
        <button @click="route('/signIn')" :class="{ activeButton: onSignin }" >Sign In</button>
      </div>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: 'App',
  data: () => ({

  }),
  methods: {
    route(path) {
      if (this.$route.path != path) { this.$router.push(path);}
    },
  },
  computed: {
    onSafeBite() { return this.$router.path == '/';},

  },
};
</script>
<style scoped>
.v-toolbar-title {

}
.v-text-field {
  text-align: center;
}
</style>