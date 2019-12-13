<template>
  <v-app id="app">
    <v-progress-circular v-if="!$router" color="primary" indeterminate size="64" />
    <div v-else>
      <Header />
      <NavigationBar />
      <router-view id="router-view-content" />
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
