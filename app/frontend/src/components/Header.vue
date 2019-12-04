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

      <v-bottom-sheet v-if="devMode" inset v-model="sheet">
        <template v-slot:activator="{ on }">
          <v-btn outlined dark v-on="on">Debug</v-btn>
        </template>
        <v-sheet class="text-center">
          <v-btn class="sheet-close ma-2" color="primary" @click="sheet = !sheet">close</v-btn>
          <v-card class="sheet-debug pa-2 ma-2" raised>
            <v-card-text>
              <b v-if="$keycloak.authenticated">JWT Debug - {{$keycloak.fullName}} ({{$keycloak.userName}}) is logged in.</b>
              <b v-else>JWT Debug - Not logged in.</b>
              <p>{{$keycloak.tokenParsed}}</p>
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-bottom-sheet>

      <v-btn
        v-if="$keycloak.authenticated"
        class="login-btn"
        id="nav-logout"
        text
        @click="logout"
      >Logout</v-btn>
      <v-btn v-else class="login-btn" id="nav-login" text @click="login">Login</v-btn>
    </v-toolbar>
  </header>
</template>

<script>
export default {
  data() {
    return {
      appTitle: process.env.VUE_APP_TITLE,
      devMode: process.env.NODE_ENV === 'development',
      sheet: false
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
