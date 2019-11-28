<template>
  <div>
    <v-file-input
      counter
      label="Upload your file"
      prepend-icon="mdi-paperclip"
      show-size
      v-model="files"
    />
    <v-text-field
      hint="Desired output filename"
      label="Filename"
      :rules="notEmpty"
      v-model="filename"
    />
    <v-textarea
      auto-grow
      hint="JSON format for key-value pairs"
      label="Contexts"
      :mandatory="true"
      :rules="notEmpty"
      v-model="contexts"
    />
    <v-textarea
      hint="JWT Token string to be sent in Authentication: Bearer"
      label="JWT Token"
      :mandatory="true"
      :rules="notEmpty"
      v-model="jwt"
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
      jwt: null,
      notEmpty: [v => !!v || 'Cannot be empty']
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

    async upload() {
      const a = document.createElement('a');
      a.style.display = 'none';

      try {
        if (
          this.files &&
          this.files instanceof File &&
          this.contexts &&
          this.jwt
        ) {
          // Parse Contents
          const parsedContexts = JSON.parse(this.contexts);
          const content = await this.toBase64(this.files);
          const body = this.createBody(parsedContexts, content, this.filename);

          // Perform API Call
          const response = await fetch(
            'https://cdogs-manual-idcqvl-dev.pathfinder.gov.bc.ca/api/v1/docGen',
            {
              method: 'POST',
              cache: 'no-cache',
              headers: {
                Authorization: `Bearer ${this.jwt}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
            }
          );
          const blob = await response.blob();

          // Generate Temporary Download Link
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = this.filename || this.files.name;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        }
      } catch (e) {
        console.log(e);
      } finally {
        a.remove();
      }
    }
  }
};
</script>

<style scoped>
</style>
