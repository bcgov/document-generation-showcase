<template>
  <v-card class="health pa-2 my-2">
    <v-card-title>
      <p>CDOGS Health</p>
    </v-card-title>
    <v-card-text>
      <p>{{health}}</p>
    </v-card-text>
    <v-card v-if="devMode" class="jwtDebug pa-2 my-2">
      <v-card-title>
        <p>JWT Debug</p>
      </v-card-title>
      <v-card-text>
        <p>{{$keycloak.tokenParsed}}</p>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: 'health',
  data() {
    return {
      devMode: process.env.NODE_ENV === 'development',
      health: null
    };
  },
  mounted() {
    this.$httpApi
      .get('/health')
      .then(response => {
        this.health = response.data;
      })
      .catch(err => {
        this.health = err;
      });
  }
};
</script>

<style scoped>
</style>
