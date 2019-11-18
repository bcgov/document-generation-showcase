<template>
  <v-container class="secure">
    <authentication-check><div>This is a secured page, {{$keycloak.userName}} is logged in.</div></authentication-check>
  </v-container>
</template>

<script>
import AuthenticationCheck from '../components/AuthenticationCheck';
export default {
  name: 'secure',
  components: {
    AuthenticationCheck
  }
};
</script>
