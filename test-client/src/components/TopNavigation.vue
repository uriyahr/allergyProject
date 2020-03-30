<template>
  <div id="topNavigation">
    <div class="navbar-fixed">
      <router-link v-for="routes in leftLinks" v-bind:key="routes.id" :to="'${routes.page}'"> {{ routes.text }} </router-link>
    </div>
    <h2 id="header"> {{ header }} </h2>
    <div id="navRight">
      <router-link v-for="routes in rightLinks" v-bind:key="routes.id" :to="'${routes.page}'"> {{ routes.text }} </router-link>
    </div>
  </div>
</template>
<script>

export default {
  name: 'TopNavigation',
  data() {
    return {
      header: 'Allergy',

      leftLinks: [
        {
          id: 0,
          text: 'Search',
          page: '/search'
        },
        {
          id: 1,
          text: 'Misson',
          page: '/mission'
        },
        {
          id: 2,
          text: 'Blog',
          page: '/blog'
        }
      ],
      rightLinks: [
        {
          id: 0,
          text: 'Login',
          page: '/login'
        },
        {
          id: 1,
          text: 'Register',
          page: '/register'
        },
      ],

    }
  }
}
</script>
<style scoped>
#topNavigation {
  color:aquamarine;
}
</style>