<template>
  <v-container>
    <div v-if="$keycloak.authenticated">
      <slot />
    </div>
    <div v-else>{{ message }}</div>
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
