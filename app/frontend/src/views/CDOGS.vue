<template>
  <v-container class="secure">
    <Authenticated>
      <h2 class="text-center">
        Common Document Generation Service (v1)
        <Health />
      </h2>
      <p class="text-center">
        The Document Generation Showcase demonstrates the capabilities of the
        <a
          href="https://bcgov.github.io/common-document-generation-service/"
        >Common Document Generation Service API (CDOGS)</a>.
      </p>
      <FileInput />
      <Examples />
    </Authenticated>
  </v-container>
</template>

<script>
import Authenticated from '../components/Authenticated';
import Examples from '../components/Examples';
import FileInput from '../components/FileInput';
import Health from '../components/Health';

export default {
  name: 'cdogs',
  components: {
    Authenticated,
    Examples,
    FileInput,
    Health
  }
};
</script>
