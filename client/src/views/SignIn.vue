<template>
  <div class="signIn">
    <v-content>
      <v-container grid-list-xl>
        <v-layout>
          <v-flex xs12 sm6>
            <v-card light class="elevation-0" id="login-card" color="rgba(255, 255, 255, 0.58)">
              <v-card-title md id="login-title"> Log In </v-card-title>
            </v-card>
          </v-flex>

          <v-flex>
            <v-card light class="elevation-0" id="register-card" color="rgba(255, 255, 255, 0.58)">
              <v-card-title md id="register-title"> Register </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>
<script>

export default {
  name: 'signIn',
}
</script>
<style scoped>
v-card-title{
  color:#18a499;
  font-size: 25px;
}
</style>