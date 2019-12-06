<template>
  <v-container class="secure">
    <Authenticated>
      <h2 class="text-center">
        Common Document Generation Service (v1)
        <Health />
      </h2>
      <FileInput />
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
