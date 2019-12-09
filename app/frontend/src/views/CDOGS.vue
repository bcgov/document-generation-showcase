<template>
  <v-container class="secure">
    <Authenticated>
      <h2 class="text-center">
        Common Document Generation Service (v1)
        <Health />
      </h2>
      <JsonBuilder />
      <FileInput />
    </Authenticated>
  </v-container>
</template>

<script>
import Authenticated from '../components/Authenticated';
import FileInput from '../components/FileInput';
import Health from '../components/Health';
import JsonBuilder from '../components/JsonBuilder';
export default {
  name: 'secure',
  components: {
    Authenticated,
    FileInput,
    Health,
    JsonBuilder
  }
};
</script>
