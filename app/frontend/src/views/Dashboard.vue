<template>
  <v-container class="dashboard text-center">
    <h1>Performance Dashboard</h1>
    <p>The dashboard is still under construction but will appear here soon</p>
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
  name: 'dashboard'
};
</script>
