<template>
  <v-bottom-sheet inset v-model="sheet">
    <template v-slot:activator="{ on }">
      <v-btn v-if="response && health" color="success" rounded v-on="on">
        <v-icon :left="$vuetify.breakpoint.smAndUp">check</v-icon>
        <span v-if="$vuetify.breakpoint.smAndUp">Health</span>
      </v-btn>
      <v-btn v-else-if="response && !health" color="error" rounded v-on="on">
        <v-icon :left="$vuetify.breakpoint.smAndUp">report_problem</v-icon>
        <span v-if="$vuetify.breakpoint.smAndUp">Health</span>
      </v-btn>
      <v-btn v-else :loading="true" rounded v-on="on">
        <v-icon :left="$vuetify.breakpoint.smAndUp">refresh</v-icon>
        <span v-if="$vuetify.breakpoint.smAndUp">Health</span>
      </v-btn>
    </template>
    <v-sheet class="text-center">
      <v-btn class="sheet-close ma-2" color="primary" @click="sheet = !sheet">close</v-btn>
      <v-card class="sheet-debug pa-2 ma-2" raised>
        <v-card-text>
          <strong>CDOGS Health Endpoint Response</strong>
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
        this.response && this.response === 'OK'
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
