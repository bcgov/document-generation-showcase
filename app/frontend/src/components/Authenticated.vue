<template>
  <div v-if="$keycloak.authenticated">
    <slot />
  </div>
  <div v-else>{{ message }}</div>
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

<style scoped>
</style>
