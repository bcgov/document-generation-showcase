<template>
  <v-container class="secure">
    <v-alert
      class="mt-5 mb-5 pl-7 alert"
      type="warning"
      icon="mdi-alert"
      border="left"
      color="#d9a300"
      colored-border
      outlined
      dismissible
    >
      <p class="text-h6 mb-2">This website is to be used only for test purposes</p>
      <p class="mb-1">
        This is a demonstration tool meant to be used with test data.
        Do not use it to create documents with sensitive information.
      </p>
      <p class="mb-1">
        For that, you will call the CDOGS API from within your own application (using your own service account) and
        complete a <strong>Privacy Impact Assessment (PIA)</strong> and <strong>Threat and Risk Assessment (STRA)</strong>.
      </p>
    </v-alert>
    <Authenticated>
      <h1 class="text-center">
        Common Document Generation Service (v2)
        <Health />
      </h1>
      <p class="text-center">
        The Document Generation Showcase demonstrates the capabilities of the
        <a
          href="https://github.com/bcgov/common-document-generation-service"
          target="_blank"
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

<!-- Vuetify uses !important internally, so we have to override ALL of them same way -->
<style lang="scss" scoped>
.alert {
  color: #6c4a00 !important;
  border-color: #faebcc !important;
  background-color: #f9f1c6 !important;
}
</style>
