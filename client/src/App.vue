<template>
  <v-app id="inspire">
    <v-card color="grey lighten-4" flat height="6px" tile>
      <v-toolbar class="elevation-0">
        <v-btn text :ripple="false" id="nav-title" class="font-weight-regular" :to="'/'"> Allergy </v-btn>
        <v-spacer></v-spacer>
        <div id="rightNav">
          <v-btn shaped text small :ripple="false" id="nav-link" class="font-weight-regular " :to="'/search'"> Search </v-btn>
          <v-btn shaped text small :ripple="false" id="nav-link" class="font-weight-regular" :to="'/signin'"> Sign In </v-btn>
          <v-btn shaped text small :ripple="false" id="nav-link" class="font-weight-regular" :to="'/about'"> About </v-btn>
        </div>
      </v-toolbar>
    </v-card>
      <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({

  }),
  methods: {
    showLoginModal() {
      this.$store.state.showingLogin = true;
    }
  },
  computed: {
    showLogin() {
      console.log(this.$store.state.showingLogin);
      return this.$store.state.showingLogin;
    }
  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
@import url('https://fonts.googleapis.com/css2?family=M+PLUS+1p&display=swap');
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
#inspire{
  background-color: #d4f1e8;
}
#nav-title {
  background-color: white !important;
  text-transform: none !important;
  font-family: 'Playfair Display', serif;
  letter-spacing: 5px;
  margin-left: 110px;
  font-size: 16px;
  color: black;
}

#nav-link{
  text-transform: none !important;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 1px;
  margin-right: 5px;

}
/* .v-btn:focus #nav-link{
  background-color: teal;
}
#rightNav {
  margin-right: 100px;
} */


</style>
