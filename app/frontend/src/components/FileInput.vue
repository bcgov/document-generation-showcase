<template>
  <v-card class="file-input pa-2 my-2">
    <v-card-title>
      <p>Document Generation Form</p>
    </v-card-title>

    <v-card-text>
      <p>A successful submission requires both a template file and a valid JSON object in an array.</p>
      <v-form ref="form" v-model="validFileInput">
        <v-row>
          <v-col cols="12" md="4">
            <v-card>
              <v-toolbar light flat>
                <v-tabs>
                  <v-tab>Template Upload</v-tab>
                </v-tabs>
              </v-toolbar>
              <v-card-text>
                <v-file-input
                  counter
                  :clearable="false"
                  label="Upload template file"
                  mandatory
                  prepend-icon="attachment"
                  required
                  :rules="notEmpty"
                  show-size
                  v-model="form.files"
                />

                <v-text-field
                  hint="(Optional) Desired output filename"
                  label="Output File Name"
                  persistent-hint
                  v-model="form.outputFileName"
                />

                <v-text-field
                  hint="(Optional) Desired output filetype (i.e. pdf)"
                  label="Output File Type"
                  persistent-hint
                  v-model="form.outputFileType"
                />
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="8">
            <v-card>
              <v-toolbar light flat>
                <v-tabs v-model="contextTab">
                  <v-tab>JSON Builder</v-tab>
                  <v-tab>Contexts JSON</v-tab>
                </v-tabs>
              </v-toolbar>

              <v-card-text>
                <v-tabs-items v-model="contextTab">
                  <v-tab-item>
                    <JsonBuilder @json-object="updateContexts" ref="jsonBuilder" />
                  </v-tab-item>

                  <v-tab-item>
                    <v-file-input
                      counter
                      :clearable="false"
                      hint="(Optional) JSON file with key-value pairs"
                      label="Upload contexts file"
                      persistent-hint
                      prepend-icon="attachment"
                      show-size
                      v-model="form.contextFiles"
                    />

                    <v-textarea
                      auto-grow
                      hint="JSON format for key-value pairs"
                      label="Contexts"
                      mandatory
                      required
                      rows="1"
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

    <v-snackbar v-model="snack" timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
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
    contextFiles() {
      return this.form.contextFiles;
    },
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
      contextTab: null,
      form: {
        contexts: null,
        contextFiles: null,
        files: null,
        contentFileType: null,
        outputFileName: null,
        outputFileType: null
      },
      loading: false,
      notEmpty: [v => !!v || 'Cannot be empty'],
      snack: false,
      snackColor: '',
      snackText: '',
      validFileInput: false
    };
  },
  methods: {
    createBody(contexts, content) {
      return {
        contexts: contexts,
        template: {
          content: content,
          contentEncodingType: 'base64',
          contentFileType: this.form.contentFileType,
          outputFileName: this.form.outputFileName,
          outputFileType: this.form.outputFileType
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
    getDispositionFilename(disposition) {
      let filename = undefined;
      if (disposition) {
        filename = disposition.substring(disposition.indexOf('filename=') + 9);
      }
      return filename;
    },
    notifyError(errMsg) {
      this.snack = true;
      this.snackColor = 'error';
      this.snackText = errMsg;
    },
    notifyInfo(infoMsg) {
      this.snack = true;
      this.snackColor = 'info';
      this.snackText = infoMsg;
    },
    notifySuccess(msg) {
      this.snack = true;
      this.snackColor = 'success';
      this.snackText = msg;
    },
    async parseContextFiles() {
      try {
        if (this.form.contextFiles && this.form.contextFiles instanceof File) {
          // Parse Contents
          const content = await this.toTextObject(this.form.contextFiles);
          this.updateContexts(JSON.parse(content));
          this.notifySuccess('Parsed successfully');
        }
      } catch (e) {
        console.log(e);
        this.notifyError(e.message);
      }
    },
    reset() {
      // Reset all values to starting null
      Object.keys(this.form).forEach(key => {
        this.form[key] = null;
      });
      this.$refs.jsonBuilder.reset();
      // Reset validation results
      this.$refs.form.resetValidation();
      this.notifyInfo('Form reset');
    },
    splitFileName(filename = undefined) {
      let name = undefined;
      let extension = undefined;

      if (filename) {
        const filenameArray = filename.split('.');
        name = filenameArray.slice(0, -1).join('.');
        extension = filenameArray.slice(-1).join('.');
      }

      return { name, extension };
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.replace(/^.*,/, ''));
        reader.onerror = error => reject(error);
      });
    },
    toTextObject(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    updateContexts(obj) {
      try {
        this.form.contexts = JSON.stringify(obj);
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
          const body = this.createBody(parsedContexts, content);

          // Perform API Call
          const response = await this.$httpApi.post('/docGen', body, {
            responseType: 'arraybuffer' // Needed for binaries unless you want pain
          });

          const filename = this.getDispositionFilename(
            response.headers['content-disposition']
          );

          const blob = new Blob([response.data], {
            type: 'attachment'
          });

          // Generate Temporary Download Link
          this.createDownload(blob, filename);
          this.notifySuccess('Submitted successfully');
        }
      } catch (e) {
        console.log(e);
        this.notifyError(e.message);
      } finally {
        this.loading = false;
      }
    }
  },
  watch: {
    contextFiles() {
      this.parseContextFiles();
    },
    files() {
      if (this.form.files && this.form.files instanceof File) {
        const { extension } = this.splitFileName(this.files.name);
        this.form.contentFileType = extension;
      }
    }
  }
};
</script>
