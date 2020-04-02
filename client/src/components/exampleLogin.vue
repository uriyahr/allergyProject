<template>
  <div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height >
        <v-layout align-center justify-center >
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-card-text>
                <v-form>
                  <v-text-field label="Login" name="login" prepend-icon="person" type="text"></v-text-field>

                  <v-text-field id="password" label="Password" name="password" prepend-icon="lock" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>
<script>
export default {
  name: 'exampleLogin',
  data: () => ({

  });
}
</script>
<style scoped>

</style>