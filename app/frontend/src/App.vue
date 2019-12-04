<template>
  <v-app id="app">
    <Header />
    <NavigationBar />
    <div class="container--fluid" id="router-view-content">
      <router-view />
    </div>
    <Footer />
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
  },
  mounted() {
    this.$router.push({ name: 'home' }).catch(() => {});
  }
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#router-view-content {
  /* position: relative; */
  padding-top: 1rem;
  padding-bottom: 3rem;
  top: 40px;
}
</style>
