<template>
  <v-container class="secure">
    <Authenticated>
      <p>This is a secured page, {{$keycloak.userName}} is logged in.</p>
      <FileInput />
      <v-card class="my-4" >
        <v-container>
          <p>{{health}}</p>
          <div>
            <p>Parsed JWT Token</p>
            <p>{{$keycloak.tokenParsed}}</p>
          </div>
        </v-container>
      </v-card>
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
    this.$httpApi
      .get('/health')
      .then(response => {
        this.health = response.data;
      })
      .catch(err => {
        this.health = err;
      });
  }
};
</script>

<style scoped>
</style>
