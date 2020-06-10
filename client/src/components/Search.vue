<template>
  <div class="search">
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
        <div class="product-display" id="nav-bar" >
          <v-navigation-drawer width='200'  fixed left floating>
            <v-list >
              <v-list-item id="filterHeader">Filters</v-list-item>
              <v-divider></v-divider>
              <v-list-item v-for="(filter, i) in navBarFilters" :key="i">
                <v-list-item-content id="filterContent">
                  <v-list-item-title id="filterTitle">{{ filter.title }}</v-list-item-title>

                  <!-- Restrictions  -->
                  <v-list-item-subtitle v-if="filter.filterType == 'checkbox'">
                    <v-checkbox class='checkbox'
                      v-for="(filter, i) in navBarFilters[1].filters"
                      v-model="selectedRestrictions"
                      :key="i"
                      :label="filter.title"
                      :value="filter.title"
                      color="success">
                    </v-checkbox>
                  </v-list-item-subtitle>

                  <!-- Dietary Preference -->
                  <v-list-item-subtitle v-else>
                    <v-radio-group v-model="selectedPreference">
                      <v-radio
                        v-for="(filter, i) in navBarFilters[0].filters"
                        :key="i"
                        :label="filter.title"
                        :value="filter.title"
                        color="success"
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
              <!-- testing -->
              <p> {{ filteredData.length }} </p>
              <v-row>
                <v-col v-for="(product,i) in productList" :key="i" cols="15" md="3">
                  <v-item>
                    <v-card height="230" width="200">
                      <v-img src height="100px"></v-img>
                      <!-- <v-card-title>{{ product.branded_food_category }}</v-card-title> -->
                      <v-card-subtitle>Brand Owner: {{ product.brand_owner }}</v-card-subtitle>
                      <v-card-text> UPC: {{ product.gtin_upc }} </v-card-text>
                    </v-card>
                  </v-item>
                </v-col>
              </v-row>
            </v-container>
          </v-item-group>
        </div>
      </div>
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
    selectedPreference: "None",
    navBarFilters: [
      {
        title: "By Dietary Preference",
        filterType: "radio",
        filters: [
          { title: "None", active: true},
          { title: "Vegan", active: false },
          { title: "Vegetarian", active: false },
        ]
      },
      {
        title: "By Restrictions",
        filterType: "checkbox",
        filters: [
          { title: "Milk", active: false },
          { title: "Egg", active: false },
          { title: "Tree Nut", active: false },
          { title: "Peanut", active: false },
          { title: "Shellfish", active: false },
          { title: "Wheat", active: false },
          { title: "Soy", active: false },
          { title: "Fish", active: false },
          { title: 'Meat', active: false},
          { title: 'Animal Byproduct', active: false},
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
    },
  },
  computed: {
    filteredData: function() { // REFACTOR
      let filteredProductList = [];

      if (this.selectedPreference == "None") {
        filteredProductList = this.productList;
      }

      if (this.selectedPreference == "Vegan") {
        for(let i = 0; i < this.productList.length; i++){
          if (this.productList[i].isVegan) {
            filteredProductList.push(this.productList[i]);
          }
        }
      }

      if (this.selectedPreference == "Vegetarian") {
        for(let i = 0; i < this.productList.length; i++){
          if (this.productList[i].isVegetarian) {
            filteredProductList.push(this.productList[i]);
          }
        }
      }

      if (this.selectedRestrictions.length != 0) {
        for(let i = 0; i < filteredProductList.length; i++){
          if(this.selectedRestrictions.includes("Milk") && filteredProductList[i].contains_milk) {
            filteredProductList.splice(i,1);
            i--;
          }
          if (this.selectedRestrictions.includes('Egg') && filteredProductList[i].contains_egg) {
            filteredProductList.splice(i,1);
            i--;
          }
          if (this.selectedRestrictions.includes('Tree Nut') && filteredProductList[i].contains_treenut) {
            filteredProductList.splice(i,1);
            i--;
          }
          if (this.selectedRestrictions.includes('Peanut') && filteredProductList[i].contains_peanut) {
            filteredProductList.splice(i,1);
            i--;
          }
          if (this.selectedRestrictions.includes('Shellfish') && filteredProductList[i].contains_shellfish) {
            filteredProductList.splice(i,1);
            i--;
          }
          if (this.selectedRestrictions.includes("Wheat") && filteredProductList[i].contains_wheat) {
            filteredProductList.splice(i,1);
            i--;
          }
          if (this.selectedRestrictions.includes("Soy") && filteredProductList[i].contains_soy) {
            filteredProductList.splice(i,1);
            i--;
          }
          if (this.selectedRestrictions.includes("Fish") && filteredProductList[i].contains_fish) {
            filteredProductList.splice(i,1);
            i--;
          }
          if (this.selectedRestrictions.includes("Meat") && filteredProductList[i].contains_meat) {
            filteredProductList.splice(i,1);
            i--;
          }
          if(this.selectedRestrictions.includes("Animal Byproduct") && filteredProductList[i].contains_altMeat) {
            filteredProductList.splice(i, 1);
            i--;
          }
        }
      }
      return filteredProductList;


    //   if(this.selectedRestrictions.length != 0){
    //     for(let i = 0; i < this.productList.length; i++) {
    //       // contains dairy
    //       if (this.selectedRestrictions.includes('Milk') && !this.productList[i].contains_milk) {
    //         filteredProductList.push(this.productList[i]);
    //       }
    //       if (this.selectedRestrictions.includes('Egg') && !this.productList[i].contains_egg) {
    //         filteredProductList.push(this.productList[i]);
    //       }
    //       if (this.selectedRestrictions.includes('Tree Nut') && !this.productList[i].contains_treenut) {
    //         filteredProductList.push(this.productList[i]);
    //       }
    //       if (this.selectedRestrictions.includes('Peanut') && !this.productList[i].contains_peanut) {
    //         filteredProductList.push(this.productList[i]);
    //       }
    //       if (this.selectedRestrictions.includes('Shellfish') && !this.productList[i].contains_shellfish) {
    //         filteredProductList.push(this.productList[i]);
    //       }
    //       if (this.selectedRestrictions.includes("Wheat") && !this.productList[i].contains_wheat) {
    //         filteredProductList.push(this.productList[i]);
    //       }
    //       if (this.selectedRestrictions.includes("Soy") && !this.productList[i].contains_soy) {
    //         filteredProductList.push(this.productList[i]);
    //       }
    //       if (this.selectedRestrictions.includes("Fish") && !this.productList[i].contains_fish) {
    //         filteredProductList.push(this.productList[i]);
    //       }
    //       if (this.selectedRestrictions.includes("Meat") && !this.productList[i].contains_meat) {
    //         filteredProductList.push(this.productList[i]);
    //       }
    //     }
    //   }
    //   return filteredProductList;
    }
  },
  watch: {
    selectedPreference: function() {
      if (this.selectedPreference == "None") {
        this.selectedRestrictions = [];
      }
      if (this.selectedPreference == "Vegan") {
        this.selectedRestrictions = [];
        this.selectedRestrictions.push("Milk");
        this.selectedRestrictions.push("Egg");
        this.selectedRestrictions.push("Fish");
        this.selectedRestrictions.push('Shellfish');
        this.selectedRestrictions.push("Meat");
        this.selectedRestrictions.push('Animal Byproduct');
      }
      if (this.selectedPreference == "Vegetarian") {
        this.selectedRestrictions = [];
        this.selectedRestrictions.push("Meat");
        this.selectedRestrictions.push("Fish");
        this.selectedRestrictions.push("Shellfish");
      }
    },
    // selectedRestrictions: function() {
    //   let veganRestrictions = this.selectedRestrictions.includes("Milk")
    //                       && this.selectedRestrictions.includes("Egg")
    //                       && this.selectedRestrictions.includes("Fish")
    //                       && this.selectedRestrictions.includes("Shellfish")
    //                       && this.selectedRestrictions.includes("Meat")
    //                       && this.selectedRestrictions.includes("Animal Byproduct");

    //   let vegetarianRestrictions = this.selectedRestrictions.includes("Meat")
    //                       && this.selectedRestrictions.includes("Fish")
    //                       && this.selectedRestrictions.includes("Shellfish");

    //   if (veganRestrictions) {
    //     this.selectedPreference = "Vegan";
    //   }
    //   if (vegetarianRestrictions) {
    //     this.selectedPreference = "Vegetarian";
    //   }
    //   if (!veganRestrictions && !vegetarianRestrictions) {
    //     this.selectedPreference = "None";
    //   }

    //  }

  }
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap');
#filterHeader {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-style: italic;
}
#filterTitle {
  font-family: 'Playfair Display', serif;
  font-size: 15px;
}
#filterContent {
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
}
.v-input--selection-controls__ripple {
  border-radius: 0;
  cursor: pointer;
  height: 0px;
  position: absolute;
  -webkit-transition: inherit;
  transition: inherit;
  width: 0;
  left: -12px;
  top: calc(50% - 24px);
  margin: 7px;

}
v-checkbox {
  background-color: transparent;
  appearance: none;
  outline: none;
}
v-checkbox:hover {
  background-color: transparent;
  appearance: none;
   box-shadow: inset 0 -3px 3px rgba(0, 0, 0, 0.025), 0 1px 4px rgba(0, 0, 0, 0.15), 0 4px 4px rgba(0, 0, 0, 0.1);
}
v-navigation-drawer{
  position: relative !important;
  top: 65px;
}
#containter > .product-display {
  display: inline-flexbox;
  position: static;
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

