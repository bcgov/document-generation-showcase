<template>
  <v-card class="file-input pa-2 my-2">
    <v-card-title>
      <p>Document Generation</p>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="validFileInput">
        <v-file-input
          counter
          :clearable=false
          label="Upload your file"
          :mandatory="true"
          prepend-icon="mdi-paperclip"
          :rules="notEmpty"
          show-size
          v-model="files"
        />
        <v-text-field
          hint="(Optional) Desired output filename"
          label="Filename"
          v-model="filename"
        />
        <v-textarea
          auto-grow
          hint="JSON format for key-value pairs"
          label="Contexts"
          :mandatory="true"
          required
          :rules="notEmpty"
          v-model="contexts"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            color="info"
            class="btn-file-input-reset"
            id="file-input-reset"
            @click="reset"
            v-on="on"
          >
            <v-icon left>mdi-refresh</v-icon>Reset
          </v-btn>
        </template>
        <span>Reset Form</span>
      </v-tooltip>
      <v-spacer />
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            class="btn-file-input-submit"
            :disabled="!validFileInput"
            id="file-input-submit"
            @click="upload"
            v-on="on"
          >
            <v-icon left>mdi-content-save</v-icon>Submit
          </v-btn>
        </template>
        <span>Submit to CDOGS and Download</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'fileInput',
  data() {
    return {
      contexts: null,
      files: null,
      filename: null,
      notEmpty: [v => !!v || 'Cannot be empty'],
      validFileInput: false
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
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    },

    reset() {
      this.$refs.form.reset();
    },

    async upload() {
      try {
        if (this.files && this.files instanceof File && this.contexts) {
          // Parse Contents
          const parsedContexts = JSON.parse(this.contexts);
          const content = await this.toBase64(this.files);
          const body = this.createBody(parsedContexts, content, this.filename);
          const filename = this.filename || this.files.name;

          // Perform API Call
          const response = await this.$httpApi.post('/docGen', body, {
            responseType: 'arraybuffer' // Needed for binaries unless you want pain
          });

          const blob = new Blob([response.data], {
            type: 'attachment'
          });

          // Generate Temporary Download Link
          this.createDownload(blob, filename);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
</style>
