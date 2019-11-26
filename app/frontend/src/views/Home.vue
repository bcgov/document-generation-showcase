<template>
  <v-container class="home">
    <div>Home</div>
    <FileInput />
  </v-container>
</template>

<script>
import FileInput from '../components/FileInput';
export default {
  name: 'home',
  components: {
    FileInput
  }
};
</script>
