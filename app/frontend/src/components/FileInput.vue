<template>
  <v-card class="file-input pa-2 my-2">
    <v-card-title>
      <p>Document Generation Form</p>
    </v-card-title>

    <v-card-text>
      <p>A successful submission requires a template file and a valid JSON object in an array.</p>
      <v-form ref="form" v-model="validFileInput">
        <v-row>
          <v-col cols="12" md="4">
            <v-file-input
              counter
              :clearable="false"
              label="Upload your file"
              :mandatory="true"
              prepend-icon="attachment"
              required
              :rules="notEmpty"
              show-size
              v-model="form.files"
            />

            <v-text-field
              hint="(Optional) Desired output filename"
              label="Filename"
              v-model="form.filename"
            />
          </v-col>

          <v-col cols="12" md="8">
            <v-card>
              <v-toolbar light flat>
                <v-tabs v-model="tab">
                  <v-tab>JSON Builder</v-tab>
                  <v-tab>Contexts JSON</v-tab>
                </v-tabs>
              </v-toolbar>

              <v-card-text>
                <v-tabs-items v-model="tab">
                  <v-tab-item>
                    <JsonBuilder :tab="tab" @json-object="updateContexts" ref="jsonBuilder" />
                  </v-tab-item>

                  <v-tab-item>
                    <v-textarea
                      auto-grow
                      hint="JSON format for key-value pairs"
                      label="Contexts"
                      :mandatory="true"
                      required
                      :rules="contextsRules"
                      v-model="form.contexts"
                    />
                  </v-tab-item>
                </v-tabs-items>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
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
            <v-icon :left="$vuetify.breakpoint.smAndUp">refresh</v-icon>
            <span v-if="$vuetify.breakpoint.smAndUp">Reset</span>
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
            :loading="loading"
            @click="upload"
            v-on="on"
          >
            <v-icon :left="$vuetify.breakpoint.smAndUp">save</v-icon>
            <span v-if="$vuetify.breakpoint.smAndUp">Submit</span>
          </v-btn>
        </template>
        <span>Submit to CDOGS and Download</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
import JsonBuilder from './JsonBuilder.vue';

export default {
  name: 'fileInput',
  components: {
    JsonBuilder
  },
  computed: {
    files() {
      return this.form.files;
    }
  },
  data() {
    return {
      contextsRules: [
        v => !!v || 'Cannot be empty',
        v => {
          try {
            return !!JSON.parse(v);
          } catch (e) {
            return 'Must be valid JSON';
          }
        },
        v => {
          try {
            if (!Array.isArray(JSON.parse(v))) throw new Error();
            return true;
          } catch (e) {
            return 'Must be an Array object';
          }
        },
        v => {
          try {
            if (!JSON.parse(v).length) throw new Error();
            return true;
          } catch (e) {
            return 'Array must have at least one element';
          }
        }
      ],
      form: {
        contexts: null,
        files: null,
        filename: null
      },
      loading: false,
      notEmpty: [v => !!v || 'Cannot be empty'],
      tab: null,
      validFileInput: false
    };
  },
  methods: {
    createBody(contexts, content, filename = undefined) {
      return {
        contexts: contexts,
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
      // Reset all values to starting null
      Object.keys(this.form).forEach(key => {
        this.form[key] = null;
      });
      this.$refs.jsonBuilder.reset();
      // Reset validation results
      this.$refs.form.resetValidation();
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.replace(/^.*,/, ''));
        reader.onerror = error => reject(error);
      });
    },
    updateContexts(obj) {
      try {
        this.form.contexts = JSON.stringify([obj]);
        console.log('Built Context', this.form.contexts);
      } catch (e) {
        console.log(e, obj);
      }
    },
    async upload() {
      try {
        this.loading = true;

        if (this.form.files && this.form.files instanceof File) {
          // Parse Contents
          const parsedContexts = JSON.parse(this.form.contexts);
          const content = await this.toBase64(this.form.files);
          const filename = this.form.filename || this.form.files.name;
          const body = this.createBody(parsedContexts, content, filename);

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
      } finally {
        this.loading = false;
      }
    }
  },
  watch: {
    files() {
      // Only update the filename field if it is empty
      if (
        this.form.files &&
        this.form.files instanceof File &&
        !this.form.filename
      ) {
        this.form.filename = this.files.name;
      }
    }
  }
};
</script>
