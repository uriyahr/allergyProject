<template>
  <div class="search">
    <v-app>
      <!-- <v-col cols="12" sm="6" md="4">
          <v-text-field filled label="Search Food Products" v-on:keyup.enter="getProducts()"></v-text-field>
          <p v-if="productList.length != 0">{{ productList }}</p>
      </v-col>-->

      <!-- <div class="search-bar">
        <v-text-field filled centered label="Search Food Products" v-on:keyup.enter="getProducts()"></v-text-field>
        <p v-if="productList.length != 0">{{ productList }}</p>
      </div>-->
      <FilterResultsTab :selectedFilter="selectedRestrictions" :selectedPreference="selectedPreference"/>
      <!-- page title -->
      <div id="containter">
        <!-- left filter navigation drawer -->
        <div class="product-display" id="nav-bar">
          <v-navigation-drawer width='200' style='top: 65px' fixed left floating>
            <v-list>
              <v-list-item>Filters</v-list-item>
              <v-divider></v-divider>
              <v-list-item v-for="(filter, i) in navBarFilters" :key="i">
                <v-list-item-content>
                  <v-list-item-title>{{ filter.title }}</v-list-item-title>
                  <!-- Restrictions  -->
                  <v-list-item-subtitle v-if="filter.filterType == 'checkbox'">
                    <v-checkbox class='checkbox'
                      v-for="(filter, i) in navBarFilters[1].filters"
                      v-model="selectedRestrictions"
                      :key="i"
                      :label="filter.title"
                      :value="filter.title"
                      color="success"
                    ></v-checkbox>
                  </v-list-item-subtitle>
                  <!-- Dietary Preference -->
                  <v-list-item-subtitle v-else>
                    <v-radio-group>
                      <v-radio
                        v-for="(filter, i) in navBarFilters[0].filters"
                        :key="i"
                        :label="filter.title"
                        :value="filter.title"
                      ></v-radio>
                    </v-radio-group>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </div>

        <!-- right results product display -->
        <div class="product-display" id="prod-dis">
          <v-item-group mandatory>
            <v-container>
              <v-row>
                <v-col v-for="(product,i) in productList" :key="i" cols="15" md="3">
                  <v-item>
                    <v-card height="230" width="200">
                      <v-img src height="100px"></v-img>
                      <v-card-title>{{ product.branded_food_category }}</v-card-title>
                      <v-card-subtitle>Brand Owner: {{ product.brand_owner }}</v-card-subtitle>
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </div>
      </div>
    </v-app>
  </div>
</template>
<script>
import FilterResultsTab from "../components/FilterResultsTab.vue"
export default {
  name: "Search",
  components: {
    FilterResultsTab
  },
  data: () => ({
    productList: [],
    productAmount: 0,
    selectedRestrictions: [],
    navBarFilters: [
      {
        title: "By Dietary Preference",
        filterType: "radio",
        filters: [
          { title: "Vegan", active: false },
          { title: "Vegitatian", active: false },
        ]
      },
      {
        title: "By Restrictions",
        filterType: "checkbox",
        filters: [
          { title: "Dairy Free ", active: false },
          { title: "Egg Free", active: false },
          { title: "Tree Nut Free", active: false },
          { title: "Peanut Free", active: false },
          { title: "Shellfish", active: false },
          { title: "Wheat", active: false },
          { title: "Soy", active: false },
          { title: "Fish", active: false }
        ]
      }
    ]
  }),
  mounted: function() {
    this.getProducts();
  },

  methods: {
    async getProducts() {
      try {
        console.log("getting products from search comp");
        await this.$store.dispatch("getProducts");
        console.log(this.$store.state.products);
        this.productList = this.$store.state.products;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style scoped>
v-navigation-drawer{
  position: relative !important;
}
#containter > .product-display {
  display: inline-flexbox;
}
#container {
  margin: 0px auto;
  width: 40%;
}
#prod-dis {
  width: 70%;
  margin-left: 250px;
}
.checkbox {
  height: 30px !important
}
.v-card__title {
  font-size: 13px !important;
}

</style>

