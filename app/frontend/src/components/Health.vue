<template>
  <v-card class="health pa-2 my-2">
    <v-card-title>
      <p>CDOGS Endpoint Health</p>
    </v-card-title>

    <v-card-text>
      <p>{{health}}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'health',
  data() {
    return {
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
