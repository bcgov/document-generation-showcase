<template>
  <v-container>
    <div v-if="$keycloak.authenticated"><slot></slot></div>
    <div v-if="!$keycloak.authenticated">{{ message }}</div>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      message: 'Please login.'
    };
  }
};
</script>
