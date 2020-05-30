<template>
  <div>
    <div class="filter-tab">
      <v-row justify="space-around">
        <v-col cols="20" sm="6" md="4" lg="7">
          <v-sheet elevation="0" class="py-0 px-1">
            <!-- display dietary preference -->

            <!-- display restrictions -->
            <v-chip-group mandetory column active-class="primary-text">
              <v-chip class="ma-2" close label outlined color="success"
              v-for="filter in selectedFilter"
              :key="filter"
              @click:close="remove(filter)">
              {{ filter }}
              </v-chip>
            </v-chip-group>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterResultsTab',
  props: ['selectedFilter', 'selectedPreference'],
  data: () => ({

  }),
  methods: {
    async remove(filter) {
      this.$props.selectedFilter.splice(this.$props.selectedFilter.indexOf(filter),1);
      this.$props.selectedFilter = [...this.$props.selectedFilter];
    }
  }
}
</script>

<style scoped>
#filter-tab{
  width: 100%;
  margin-left: 200px;
}
v-chip-group{
  widows: 100%;
  margin-left: 200px;
}

</style>