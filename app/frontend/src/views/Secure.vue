<template>
  <v-container class="secure">
    <Authenticated>
      <div>This is a secured page, {{$keycloak.userName}} is logged in.</div>
      <FileInput />
      <div><p>{{health}}</p></div>
      <div><p>{{$keycloak.authenticated}}</p></div>
      <div><p>{{$keycloak.tokenParsed}}</p></div>
    </Authenticated>
  </v-container>
</template>

<script>
import Authenticated from '../components/Authenticated';
import FileInput from '../components/FileInput';
export default {
  name: 'secure',
  data() {
    return {
      health: null
    };
  },
  components: {
    Authenticated,
    FileInput
  },
  mounted() {
    // console.log('mounted', this.$httpApi);
    // this.$httpApi.get('/health').then((response) => { this.health = response.data; }).catch((err) => { this.health = err; });
  }
};
</script>
