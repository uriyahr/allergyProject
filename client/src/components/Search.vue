<template>
  <div class="search">
    <button @click="showFoodProducts('ramen')"> food product </button>
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
    showFoodProducts(plan) {
      this.$store.dispatch('getFoodProducts', plan)
    }
  }
};
</script>
<style scoped>
</style>

