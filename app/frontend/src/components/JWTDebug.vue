<template>
  <v-bottom-sheet v-if="devMode" inset v-model="sheet">
    <template v-slot:activator="{ on }">
      <v-btn outlined dark v-on="on">Debug</v-btn>
    </template>
    <v-sheet class="text-center">
      <v-btn class="sheet-close ma-2" color="primary" @click="sheet = !sheet">close</v-btn>
      <v-card class="sheet-debug pa-2 ma-2" raised>
        <v-card-text>
          <b
            v-if="$keycloak.authenticated"
          >JWT Debug - {{$keycloak.fullName}} ({{$keycloak.userName}}) is logged in.</b>
          <b v-else>JWT Debug - Not logged in.</b>
          <p>{{$keycloak.tokenParsed}}</p>
        </v-card-text>
      </v-card>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: 'jwtdebug',
  data() {
    return {
      devMode: process.env.NODE_ENV === 'development',
      sheet: false
    };
  },
};
</script>

<style scoped>

</style>
