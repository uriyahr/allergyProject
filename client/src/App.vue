<template>
  <v-app id="inspire">
    <!-- <v-card color="transparent" flat height="0px"> -->
      <v-toolbar class="elevation-0" color="transparent" height="100px">
        <!-- <v-btn text :ripple="false" id="nav-title" class="font-weight-regular" :to="'/'"> Allergy </v-btn> -->
        <button id="nav-title" @click="route('/')" :class="{ activeButton: onAllergy }"> Allergy </button>
        <v-spacer></v-spacer>
        <div id="rightNav">
          <!-- <button :class="{activeButton : onSearch}"> Search</button> -->
          <button @click="route('/search')" :class="{ activeButton : onSearch }">  Search </button>
          <button @click="route('/signin')" :class="{ activeButton : onSignIn }"> Sign In</button>
          <button @click="route('/about')" :class="{ activeButton : onAbout }"> About</button>

          <!-- <v-btn text small :ripple="false" id="nav-link" class="font-weight-regular" :to="'/search'"> Search </v-btn>
          <v-btn text small :ripple="false" id="nav-link" class="font-weight-regular" :to="'/signin'"> Sign In </v-btn>
          <v-btn text small :ripple="false" id="nav-link" class="font-weight-regular" :to="'/about'"> About </v-btn> -->
        </div>
      </v-toolbar>
    <!-- </v-card> -->
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
    route(path) {
      if (this.$route.path != path) {
        this.$router.push(path);
      }
    },
  },
  computed: {
    onAllergy() { return this.$route.path == '/'; },
    onSearch() { return this.$route.path == '/search'; },
    onSignIn() { return this.$route.path == '/signin'; },
    onAbout() { return this.$route.path == '/about'; }

  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Judson:700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Oswald&display=swap');
#inspire{
  background-color: #d4f1e8;
}
/* .nav-toolbar {
  background-color: transparent !important;
} */
#nav-title {
  font-family: 'Judson', serif;
  text-transform: lowercase !important;
  color:#18a499;
  font-size: 45px;
  letter-spacing: 1px;
  margin-left: 110px;
  border-radius: 0px;
  border-bottom: none;
}

#rightNav {
  margin-right: 100px;
  font-family: 'Oswald', sans-serif;

}

button {
  font-size: 15px;
  letter-spacing: 3px;
  text-transform: uppercase !important;
  border-bottom: 2px solid rgba(0, 0, 0, 0);
  color: #0b382c;
  margin: 13px;
}

button.activeButton{
  border-bottom: 2px solid teal;
  color: teal;

}
button:focus {
  outline: 0;
}
</style>
