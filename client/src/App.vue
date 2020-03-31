<template>
  <v-app id="inspire">
    <v-card color="grey lighten-4" flat height="5px" tile>
      <v-toolbar>
        <v-toolbar-title id="nav-title" class="font-weight-regular"> allergy </v-toolbar-title>
        <v-spacer></v-spacer>
        <div id="rightNav">
              <v-btn  text small id="nav-link" class="font-weight-regular" v-for="routes in links" v-bind:key="routes.id" :to="'${routes.page}'">{{ routes.text }}</v-btn>
        </div>
      </v-toolbar>
    </v-card>
    <!-- <v-content> -->
      <!-- <router-view></router-view>
    </v-content> -->
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    links: [
      {
        id: 0,
        text: 'Search',
        page: '/search'
      },
      {
        id: 1,
        text: 'Login',
        page: '/login'
      },
      {
        id: 2,
        text: 'Register',
        page: '/register'
      },
    ]
  }),
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
  font-family: 'Playfair Display', serif;
  letter-spacing: 5px;
  margin-left: 110px;
  font-size: 16px;
}
#nav-link {
  text-transform: none !important;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  letter-spacing: 1px;
}
#rightNav {
  margin-right: 100px;
}


</style>
