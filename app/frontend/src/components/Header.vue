<template>
  <header class="gov-header">
    <v-toolbar color="rgb(0, 51, 102)" flat>
      <!-- Navbar content -->
      <a href="https://www2.gov.bc.ca">
        <v-img
          src="@/assets/images/17_gov3_bc_logo.svg"
          alt="B.C. Government Logo"
        />
      </a>

      <v-toolbar-title>
        <v-btn class="title hidden-sm-and-down" color="text" text>{{ appTitle }}</v-btn>
      </v-toolbar-title>

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
import JWTDebug from './JWTDebug';
export default {
  computed: {
    kcReady() {
      return !!this.$keycloak && this.$keycloak.ready;
    }
  },
  data() {
    return {
      appTitle: process.env.VUE_APP_TITLE
    };
  },
  components: {
    JWTDebug
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

<style scoped>
.gov-header {
  border-bottom: 2px solid rgb(252, 186, 25);
}

.title {
  color: rgb(255, 255, 255);
}
</style>
