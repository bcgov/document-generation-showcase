<template>
  <v-container class="not-found text-center">
    <h1>404: Page not found. :(</h1>
    <router-link :to="{ name: 'home' }">
      <v-btn color="primary" class="home-btn" id="not-found-home" large>
        <v-icon left>home</v-icon>
        <span>Home</span>
      </v-btn>
    </router-link>
  </v-container>
</template>

<script>
export default {
  name: 'notFound'
};
</script>
