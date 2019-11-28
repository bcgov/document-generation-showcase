<template>
  <div>
    <v-file-input
      counter
      label="Upload your file"
      prepend-icon="mdi-paperclip"
      show-size
      v-model="files"
    />
    <v-textarea
      auto-grow
      hint="JSON format for key-value pairs"
      label="Contexts"
      :mandatory="true"
      name="contexts-input"
      persistent-hint
      :rules="notEmpty"
      v-model="contexts"
    />
    <v-textarea
      hint="JWT Token string to be sent in Authentication: Bearer"
      label="JWT Token"
      :mandatory="true"
      name="contexts-input"
      persistent-hint
      :rules="notEmpty"
      v-model="jwt"
    />
    <v-btn class="login-btn" text id="nav-login" @click="upload">Submit</v-btn>
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
      jwt: null,
      notEmpty: [v => !!v | 'Cannot be empty']
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

    async upload() {
      try {
        if (
          this.files &&
          this.files instanceof File &&
          this.contexts &&
          this.jwt
        ) {
          console.log(this.files);
          const base64 = await this.toBase64(this.files);

          const body = {
            contexts: [JSON.parse(this.contexts)],
            template: {
              content: base64,
              contentEncodingType: 'base64'
            }
          };

          fetch(
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
          )
            .then(resp => resp.blob())
            .then(blob => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.style.display = 'none';
              a.href = url;
              a.download = `out-${this.files.name}`;
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              a.remove();
            })
            .catch(e => {
              console.log(e);
              throw e;
            });
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
