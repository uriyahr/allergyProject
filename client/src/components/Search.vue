<template>
  <div class="search">
    <button @click="showFoodProducts('apple')"> food product </button>
  </div>
</template>
<script>
export default {
  name: "Search",

  data: () => ({
    items: [],
    query: ""
  }),
  methods: {
    showFoodProducts(query) {
      this.$store.dispatch('getFoodProducts', query)
    }
  }
};
</script>
<style scoped>
</style>

