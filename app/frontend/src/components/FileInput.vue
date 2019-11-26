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
      name="contexts-input"
      persistent-hint
      v-model="contexts"
    />
    <v-textarea
      hint="JWT Token string to be sent in Authentication: Bearer"
      label="JWT Token"
      name="contexts-input"
      persistent-hint
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
      jwt: null
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
        let base64;
        if (this.files && this.files instanceof File) {
          base64 = await this.toBase64(this.files);
        }

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
            // mode: 'no-cors',
            headers: {
              Authorization: `Bearer ${this.jwt}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          }
        )
          .then(resp => resp.blob())
          .then(blob => {
            console.log(blob);
            alert(blob);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'testFile';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            alert('your file has downloaded!');
          })
          .catch(e => {
            throw e;
          });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
</style>
