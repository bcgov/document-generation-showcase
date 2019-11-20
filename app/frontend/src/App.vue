<template>
  <v-app id="app">
    <Header />
    <NavigationBar />
    <div class="container--fluid"
         id="router-view-content">
      <router-view/>
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
  computed: {
  },
  mounted() {
    this.$router.push({ name: 'home'});
  }
};
</script>
<style lang="scss">

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
    position: relative;
    top: 39px;
  }

</style>
