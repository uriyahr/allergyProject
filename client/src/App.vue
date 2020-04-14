<template>
  <v-app id="inspire">
    <v-app-bar id="app-bar" color="white" elevation="2" app>
      <v-toolbar-title>
        <button @click="route('/')" :class="{ activeButton: onAllergy }" id="nav-title">safe bite</button>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div id="rightNav">
        <button @click="route('/search')" :class="{ activeButton : onSearch }">Search</button>
        <button @click="route('/about')" :class="{ activeButton : onAbout }">About</button>
        <button @click="route('/signin')" :class="{ activeButton : onSignIn }">Sign In</button>
      </div>
    </v-app-bar>

    <v-content fluid>
      <!-- <Search
        source='https://jsonplaceholder.typicode.com/posts'
        placeholder="Search for Food"
        filter-key="title"
        :start-at="2"
      ></Search> -->
      <Search></Search>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Search from '../src/components/Search.vue';
export default {
  name: "App",
  components: {
    Search
  },
  data: () => ({
  }),
  methods: {
    route(path) {
      if (this.$route.path != path) {
        this.$router.push(path);
      }
    }
  },
  computed: {
    onAllergy() {
      return this.$route.path == "/";
    },
    onSearch() {
      return this.$route.path == "/search";
    },
    onSignIn() {
      return this.$route.path == "/signin";
    },
    onAbout() {
      return this.$route.path == "/about";
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Trocchi&display=swap");
@import url("https://fonts.googleapis.com/css?family=Oswald&display=swap");
@import url("https://fonts.googleapis.com/css?family=Old+Standard+TT:400,400i,700&display=swap");
#inspire {
  background-color: white;
}
#app-bar {
  position: fixed;
}

#nav-title {
  font-family: "Old Standard TT", serif;
  font-weight: bold;
  text-transform: lowercase !important;
  color: black;
  font-size: 28px;
  letter-spacing: 0px;
  margin-left: 110px;
  border-radius: 0px;
  border-bottom: none;
}

#rightNav {
  margin-right: 100px;
  font-family: "Old Standard TT", serif;
}

button {
  font-size: 13px;
  letter-spacing: 3px;
  text-transform: none !important;
  color: black;
  margin: 13px;
  padding-bottom: 3px;
}
button:focus {
  outline: 0;
}

/* Navigation Bar Animation  */
#rightNav > button {
  position: relative;
  color: #0b382c;
  text-decoration: none;
}

#rightNav > button:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0px;
  left: 0;
  background-color: #0b382c;
  visibility: hidden;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}

#rightNav > button:hover:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0px;
  left: 0;
  background-color: #0b382c;
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}
</style>
