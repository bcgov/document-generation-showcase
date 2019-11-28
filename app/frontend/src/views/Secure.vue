<template>
  <v-container class="secure">
    <authentication-check>
      <div>This is a secured page, {{$keycloak.userName}} is logged in.</div>
      <FileInput />
      <!-- <div><p>{{health}}</p></div> -->
      <!-- <div><p>{{$keycloak.tokenParsed}}</p></div> -->
    </authentication-check>
  </v-container>
</template>

<script>
import AuthenticationCheck from '../components/AuthenticationCheck';
import FileInput from '../components/FileInput';
export default {
  name: 'secure',
  data() {
    return {
      health: null
    };
  },
  components: {
    AuthenticationCheck,
    FileInput
  },
  mounted() {
    // this.$httpApi.get('/health').then((response) => { this.health = response.data; }).catch((err) => { this.health = err; });
  }
};
</script>
