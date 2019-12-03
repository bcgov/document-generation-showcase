<template>
  <v-container class="secure">
    <Authenticated>
      <p>This is a secured page. {{$keycloak.fullName}} ({{$keycloak.userName}}) is logged in.</p>
      <FileInput />
      <Health />
    </Authenticated>
  </v-container>
</template>

<script>
import Authenticated from '../components/Authenticated';
import FileInput from '../components/FileInput';
import Health from '../components/Health';
export default {
  name: 'secure',
  components: {
    Authenticated,
    FileInput,
    Health
  }
};
</script>

<style scoped>
</style>
