<template>
  <v-bottom-sheet v-if="devMode" inset v-model="sheet">
    <template v-slot:activator="{ on }">
      <v-btn outlined dark v-on="on">
        <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-wrench</v-icon>
        <span v-if="$vuetify.breakpoint.smAndUp">Debug</span>
      </v-btn>
    </template>
    <v-sheet class="text-center">
      <v-btn class="sheet-close ma-2" color="primary" @click="sheet = !sheet">close</v-btn>
      <v-card class="sheet-debug pa-2 ma-2" raised>
        <v-card-text>
          <strong
            v-if="$keycloak.authenticated"
          >JWT Debug - {{$keycloak.fullName}} ({{$keycloak.userName}}) is logged in.</strong>
          <strong v-else>JWT Debug - Not logged in.</strong>
          <p>{{$keycloak.tokenParsed}}</p>
        </v-card-text>
      </v-card>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: 'jwtDebug',
  data() {
    return {
      // TODO: Consider slot pattern or determining logic higher up in layout chain
      devMode: process.env.NODE_ENV === 'development',
      sheet: false
    };
  }
};
</script>
