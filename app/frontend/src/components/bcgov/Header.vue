<template>
  <header class="gov-header">
    <v-toolbar color="rgb(0, 51, 102)" flat>
      <!-- Navbar content -->
      <a href="https://www2.gov.bc.ca" data-test="btn-header-logo">
        <v-img
          alt="B.C. Government Logo"
          class="d-none d-sm-flex d-md-none"
          contain
          height="3.5rem"
          src="@/assets/images/bc_logo_square.svg"
          width="3.5rem"
        />
        <v-img
          alt="B.C. Government Logo"
          class="d-none d-md-flex"
          contain
          height="3.5rem"
          src="@/assets/images/bc_logo.svg"
          width="10rem"
        />
      </a>
      <h1 data-test="btn-header-title" class="font-weight-bold title-text">{{ appTitle }}</h1>
      <v-spacer />
      <div v-if="kcReady">
        <JWTDebug />
        <v-btn v-if="$keycloak.authenticated" color="secondary" class="login-btn" id="header-logout" @click="logout">
          <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-logout</v-icon>
          <span v-if="$vuetify.breakpoint.smAndUp">Logout</span>
        </v-btn>
        <v-btn v-else color="secondary" class="login-btn" id="header-login" @click="login">
          <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-login</v-icon>
          <span v-if="$vuetify.breakpoint.smAndUp">Login</span>
        </v-btn>
      </div>
    </v-toolbar>
  </header>
</template>

<script>
import JWTDebug from '@/components/JWTDebug';
export default {
  name: 'bcgovHeader',
  components: {
    JWTDebug
  },
  computed: {
    appTitle() {
      return this.$route && this.$route.meta && this.$route.meta.title
        ? this.$route.meta.title
        : process.env.VUE_APP_TITLE;
    },
    kcReady() {
      return !!this.$keycloak && this.$keycloak.ready;
    }
  },
  methods: {
    login() {
      window.location.replace(this.$keycloak.createLoginUrl());
    },
    logout() {
      window.location.replace(this.$keycloak.createLogoutUrl());
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/styles.sass';

.gov-header {
  border-bottom: 2px solid #fcba19;
  .title-text {
    font-family: inherit !important;
    color: #ffffff;
    overflow: hidden;
    padding: 1rem;
    @media #{map-get($display-breakpoints, 'sm-and-down')} {
      font-size: 1rem !important;
    }
  }
}
</style>
