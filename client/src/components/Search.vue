<template>
  <div class="search">
    <button> vegan plan </button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "Search",

  data: () => ({
    items: [],
    query: ""
  }),
  methods: {
    showData(query) {
      axios
        .get("https://api.edamam.com/search", {
          params: {
            q: query,
            app_id: "5630becb",
            app_key: "6ba6d7b0dc9ce09a0fc68a0b05d3c4cf",
            from: 0,
            to: 9
          }
        })
        .then(response => {
          response = response.data;
          this.items = response.hits;
        })
        .catch(() => {
          this.items = [];
        });
    }
  }
};
</script>
<style scoped>
</style>

