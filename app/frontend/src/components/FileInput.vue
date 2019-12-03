<template>
  <div class="file-input">
    <v-file-input
      counter
      label="Upload your file"
      :mandatory="true"
      prepend-icon="mdi-paperclip"
      show-size
      v-model="files"
    />
    <v-text-field hint="(Optional) Desired output filename" label="Filename" v-model="filename" />
    <v-textarea
      auto-grow
      hint="JSON format for key-value pairs"
      label="Contexts"
      :mandatory="true"
      :rules="notEmpty"
      v-model="contexts"
    />
    <v-btn class="file-input-btn" color="primary" id="file-input-submit" @click="upload">Submit</v-btn>
  </div>
</template>

<script>
export default {
  name: 'fileInput',
  components: {},
  data() {
    return {
      contexts: null,
      files: null,
      filename: null,
      notEmpty: [v => !!v || 'Cannot be empty'],
      temp: null
    };
  },
  methods: {
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.replace(/^.*,/, ''));
        reader.onerror = error => reject(error);
      });
    },

    createBody(contexts, content, filename = undefined) {
      return {
        contexts: [contexts],
        template: {
          content: content,
          contentEncodingType: 'base64',
          filename: filename
        }
      };
    },

    createDownload(blob, filename = undefined) {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    },

    async upload() {
      try {
        console.log('methods', this.$httpApi.get);
        console.log('methods', this.$keycloak);
        console.log('methods', this.$keycloak.authenticated);
        console.log('methods', this.$keycloak.token);
        await this.$httpApi.get('/health').then((response) => { this.temp = response.data; }).catch((err) => { this.temp = err; });

        // if (this.files && this.files instanceof File && this.contexts) {
        //   // Parse Contents
        //   const parsedContexts = JSON.parse(this.contexts);
        //   const content = await this.toBase64(this.files);
        //   const body = this.createBody(parsedContexts, content, this.filename);
        //   const filename = this.filename || this.files.name;

        //   // Perform API Call
        //   const response = await this.$httpApi.post('/docGen', body, {
        //     responseType: 'arraybuffer' // Needed for binaries unless you want pain
        //   });

        //   const blob = new Blob([response.data], {
        //     type: 'attachment'
        //   });

        //   // Generate Temporary Download Link
        //   this.createDownload(blob, filename);
        // }
      } catch (e) {
        console.log(e);
      }
    }
  },

  mounted() {
    console.log('mounted', this.$httpApi);
    console.log('mounted', this.$keycloak);
    console.log('mounted', this.$keycloak.authenticated);
    console.log('mounted', this.$keycloak.token);
    this.$httpApi.get('/health').then((response) => { this.temp = response.data; }).catch((err) => { this.temp = err; });
  }
};
</script>

<style scoped>
</style>
