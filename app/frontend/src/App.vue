<template>
  <v-app id="app">
    <Header />
    <v-progress-circular v-if="!$router" color="primary" indeterminate size="64" />
    <div v-else>
      <NavigationBar />
      <router-view id="router-view-content" />
    </div>
    <Footer />
    <v-snackbar
      v-model="snack"
      :absolute="true"
      :bottom="true"
      color="error"
      :timeout="0"
    >Loading has failed. Please check the console for details.</v-snackbar>
  </v-app>
</template>

<script>
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

export default {
  name: 'app',
  data() {
    return {
      snack: false
    };
  },
  components: {
    Header,
    NavigationBar,
    Footer
  },
  mounted() {
    setTimeout(() => {
      this.snack = !this.$router;
      if (!this.$router && (this.$keycloak && !this.$keycloak.ready)) {
        console.error('Keycloak failed to initialize');
      }
    }, 5000);
  }
};
</script>

<style lang="scss" scoped>
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.v-progress-circular {
  margin: auto;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#router-view-content {
  @media only screen and (min-width: 960px) {
    margin-bottom: 2.5rem;
  }
  @media only screen and (min-width: 600px) and (max-width: 959px) {
    margin-bottom: 5rem;
  }
  @media only screen and (min-width: 320px) and (max-width: 599px) {
    margin-bottom: 7.5rem;
  }
  @media only screen and (max-width: 319px) {
    margin-bottom: 10rem;
  }
}
</style>
