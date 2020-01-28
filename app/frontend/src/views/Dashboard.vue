<template>
  <v-container class="dashboard text-center">
    <h1>Performance Dashboard</h1>
    <div v-if="dashboardUrl" class="dashboard-container">
      <iframe :src="dashboardUrl" />
    </div>
    <div v-else>
      <p>No dashboard has been configured.</p>
      <router-link :to="{ name: 'home' }">
        <v-btn color="primary" class="home-btn" id="dashboard-home" large>
          <v-icon left>home</v-icon>
          <span>Home</span>
        </v-btn>
      </router-link>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'dashboard',
  computed: {
    dashboardUrl() {
      return this.$configService.get('dashboardUrl');
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  @media only screen and (min-width: 810px) {
    height: calc(100vh);
  }
  @media only screen and (max-width: 809px) {
    height: calc(100vh * 2.5);
  }
}

.dashboard-container iframe {
  border: 0;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
