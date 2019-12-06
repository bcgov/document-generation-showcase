<template>
  <v-bottom-sheet inset v-model="sheet">
    <template v-slot:activator="{ on }">
      <v-btn v-if="health" color="success" rounded v-on="on">
        <v-icon left>mdi-check-circle-outline</v-icon>Health
      </v-btn>
      <v-btn v-else color="error" rounded v-on="on">
        <v-icon left>mdi-close-circle-outline</v-icon>Health
      </v-btn>
    </template>
    <v-sheet class="text-center">
      <v-btn class="sheet-close ma-2" color="primary" @click="sheet = !sheet">close</v-btn>
      <v-card class="sheet-debug pa-2 ma-2" raised>
        <v-card-text>
          <b>CDOGS Health Endpoint Response</b>
          <p>{{ response }}</p>
        </v-card-text>
      </v-card>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: 'health',
  computed: {
    health: function() {
      return (
        this.response &&
        this.response.endpoints &&
        this.response.endpoints[0]
      );
    }
  },
  data() {
    return {
      response: null,
      sheet: false
    };
  },
  mounted() {
    this.$httpApi
      .get('/health')
      .then(response => {
        this.response = response.data;
      })
      .catch(err => {
        this.response = err;
      });
  }
};
</script>
