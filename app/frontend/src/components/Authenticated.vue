<template>
  <div v-if="$keycloak.authenticated">
    <slot />
  </div>
  <div v-else>
    <h2 class="text-center">{{ message }}</h2>
  </div>
</template>

<script>
export default {
  name: 'authenticated',
  data() {
    return {
      message: 'You must be logged in to use this feature. Please login.'
    };
  }
};
</script>
