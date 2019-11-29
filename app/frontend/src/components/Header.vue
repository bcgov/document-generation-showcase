<template>
  <header class="gov-header">
    <v-toolbar>
      <!-- Navbar content -->
      <a href="https://www2.gov.bc.ca">
        <img
          src="@/assets/images/17_gov3_bc_logo.svg"
          width="152"
          height="55"
          alt="B.C. Government Logo"
        />
      </a>

      <v-toolbar-title>
        <v-btn class="title hidden-sm-and-down" color="text" text>{{ appTitle }}</v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div v-if="$keycloak.authenticated">
        <v-btn text class="login-btn" id="nav-logout" @click="logout">Logout</v-btn>
      </div>
      <v-btn v-else class="login-btn" text id="nav-login" @click="login">Login</v-btn>
    </v-toolbar>
  </header>
</template>

<script>
export default {
  data() {
    return {
      appTitle: process.env.VUE_APP_TITLE
    };
  },
  computed: {},
  methods: {
    login() {
      const basePath = this.$configService.get('basePath');
      const redirectUri = `${location.origin}${basePath}`;
      const loginUrl = this.$keycloak.createLoginUrl({
        redirectUri: redirectUri
      });
      window.location.replace(loginUrl);
    },
    logout() {
      const basePath = this.$configService.get('basePath');
      const redirectUri = `${location.origin}${basePath}`;
      const logoutUrl = this.$keycloak.createLogoutUrl({
        redirectUri: redirectUri
      });
      window.location.replace(logoutUrl);
    }
  }
};
</script>

<style scoped>
.gov-header .title {
  color: #fff;
  text-decoration: none;
}

.gov-header .v-toolbar {
  background-color: rgb(0, 51, 102);
  border-bottom: 2px solid rgb(252, 186, 25);
}

.gov-header .v-btn,
.v-btn--active.title:before,
.v-btn.title:focus:before,
.v-btn.title:hover:before {
  color: #fff;
  background: none;
}

.gov-header .v-btn.login-btn {
  color: #fff;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1em;
  line-height: 1.5;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  display: inline-block;
  background-color: #fcba19;
  text-transform: none;
}

.secondary_color {
  background-color: var(--v-secondary-base);
}
</style>
