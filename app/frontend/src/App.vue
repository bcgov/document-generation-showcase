<template>
  <v-app id="app">
    <Header />
    <v-progress-circular v-if="!$router" color="primary" indeterminate size="64" />
    <div v-else>
      <NavigationBar />
      <transition name="component-fade" mode="out-in">
        <router-view id="router-view-content" />
      </transition>
    </div>
    <Footer />
    <v-snackbar
      v-model="snack"
      absolute
      bottom
      color="error"
      :timeout="-1"
    >Something important failed while loading... :(</v-snackbar>
  </v-app>
</template>

<script>
import Header from '@/components/bcgov/Header';
import NavigationBar from '@/components/bcgov/NavigationBar';
import Footer from '@/components/bcgov/Footer';

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
      if (!this.$router && this.$keycloak && !this.$keycloak.ready) {
        console.error('Keycloak failed to initialize'); // eslint-disable-line no-console
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

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
