<template>
  <v-app id="app">
    <v-progress-circular v-if="!$router" color="primary" indeterminate size="64" />
    <div v-else>
      <Header />
      <NavigationBar />
      <div class="container--fluid" id="router-view-content">
        <router-view />
      </div>
      <Footer />
    </div>
  </v-app>
</template>

<script>
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

export default {
  name: 'app',
  components: {
    Header,
    NavigationBar,
    Footer
  }
};
</script>

<style lang="scss" scoped>
body {
  // margin: 0;
  // padding: 0;
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
  // padding-top: 1rem;
  padding-bottom: 6.5rem;
}
</style>
