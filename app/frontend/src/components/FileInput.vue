<template>
  <v-card class="file-input pa-2 my-2">
    <v-card-title>Document Generation Form</v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="validFileInput">
        <v-row class="docgen-row">
          <v-col cols="12" lg="6">
            <h3 class="pb-3">STEP 1: Add your Template</h3>
            <v-card>
              <v-toolbar light flat>
                <v-tabs v-model="templateTab">
                  <v-tab>Template Upload</v-tab>
                  <v-tab>Template Builder</v-tab>
                </v-tabs>
              </v-toolbar>
              <v-card-text>
                <v-tabs-items v-model="templateTab">
                  <v-tab-item>
                    <p>Upload your template file.</p>
                    <v-file-input
                      counter
                      :clearable="true"
                      label="Upload template file"
                      prepend-icon="attachment"
                      required
                      :rules="notEmpty"
                      show-size
                      v-model="form.files"
                    />
                  </v-tab-item>
                  <v-tab-item md6>
                    <p>
                      Type in your Template contents containing 'contexts' that are defined in the next step. For example: 'Welcome {d.firstName}!'. See
                      <a
                        href="https://ssbc-client.gov.bc.ca/servicenews/service_bulletin_1274.html"
                      >Carbone documentation</a> for more details.
                    </p>
                    <v-textarea
                      class="template-builder"
                      auto-grow
                      hint="Enter your template text with 'contexts' (tokens like {d.firstName})"
                      rows="3"
                      :rules="templateBuilderRules"
                      v-model="form.templateContent"
                      solo
                      dense
                      single-line
                      outlined
                      flat
                    />
                  </v-tab-item>
                </v-tabs-items>
                <v-text-field
                  hint="(Optional) Desired output filename"
                  label="Output File Name"
                  persistent-hint
                  v-model="form.outputFileName"
                />
                <v-checkbox v-model="form.convertToPDF" label="Convert to PDF" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col lg="6" cols="12">
            <h3 class="pb-3">STEP 2: Create or upload your data file</h3>
            <v-spacer />
            <v-card>
              <v-toolbar light flat>
                <v-tabs v-model="contextTab">
                  <v-tab>Data File Upload</v-tab>
                  <v-tab>Data File Builder</v-tab>
                </v-tabs>
              </v-toolbar>

              <v-card-text>
                <v-tabs-items v-model="contextTab">
                  <v-tab-item>
                    <p>Upload your contexts in a JSON file</p>
                    <v-file-input
                      counter
                      :clearable="false"
                      hint="(Optional) JSON file with key-value pairs"
                      label="Upload data file"
                      persistent-hint
                      prepend-icon="attachment"
                      show-size
                      v-model="form.contextFiles"
                      class="mb-5"
                    />
                    <v-textarea
                      auto-grow
                      hint="JSON format for key-value pairs"
                      label="JSON data containing an array of contexts"
                      mandatory
                      required
                      rows="3"
                      :rules="contextsRules"
                      v-model="form.contexts"
                      dense
                      outlined
                      flat
                    />
                  </v-tab-item>
                  <v-tab-item>
                    <p>Add key/value pairs for each of the contexts in your template.</p>
                    <JsonBuilder @json-object="buildContexts" ref="jsonBuilder" />
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
            outlined
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
            id="file-input-submit"
            :loading="loading"
            @click="generate"
            v-on="on"
          >
            <v-icon :left="$vuetify.breakpoint.smAndUp">save</v-icon>
            <span v-if="$vuetify.breakpoint.smAndUp">Submit</span>
          </v-btn>
        </template>
        <span>Submit to CDOGS and Download</span>
      </v-tooltip>
    </v-card-actions>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <v-btn text @click="snack = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import JsonBuilder from '@/components/JsonBuilder.vue';

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
      templateBuilderRules: [
        v =>
          !RegExp(/^.*?{(?!.*?})[^}]*$|^[^{\r\n]*}.*?$/).test(v) ||
          'Contexts should be enclosed by curly braces'
      ],
      templateTab: null,
      contextTab: null,
      form: {
        contexts: null,
        contextFiles: null,
        convertToPDF: null,
        files: null,
        templateContent: 'Hello {d.firstName} {d.lastName}!',
        contentFileType: null,
        outputFileName: null
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
    buildContexts(obj) {
      this.form.contextFiles = null;
      this.updateContexts(obj);
    },
    createBody(contexts, content, contentFileType, outputFileType) {
      return {
        contexts: contexts,
        template: {
          content: content,
          contentEncodingType: 'base64',
          contentFileType: contentFileType,
          outputFileName: this.form.outputFileName,
          outputFileType: this.form.convertToPDF ? 'pdf' : outputFileType
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
        console.error(e);
        this.notifyError(e.message);
      }
    },
    reset() {
      // Reset all values to starting null
      Object.keys(this.form).forEach(key => {
        this.form[key] = null;
      });
      // clear json builder items
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
    fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.replace(/^.*,/, ''));
        reader.onerror = error => reject(error);
      });
    },
    textToBase64(text) {
      return btoa(text);
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
        console.error(e, obj);
      }
    },
    // document generation form is finally submitted
    async generate() {
      try {
        this.loading = true;
        let content = '';
        let contentFileType = '';
        let outputFileType = '';
        let parsedContexts = '';

        // parse contexts into JSON
        parsedContexts = JSON.parse(this.form.contexts);

        // convert template to Base64
        // if uploading template file (tab is visible)
        if (this.templateTab === 0) {
          if (this.form.files && this.form.files instanceof File) {
            content = await this.fileToBase64(this.form.files);
            contentFileType = this.form.contentFileType;
            outputFileType = this.form.convertToPDF
              ? 'pdf'
              : this.form.outputFileType;
          }
        }
        // else sing template builder
        else {
          content = await this.textToBase64(this.form.templateContent);
          contentFileType = 'txt';
          outputFileType = this.form.convertToPDF ? 'pdf' : 'txt';
        }

        // create payload to send to CDOGS API
        const body = this.createBody(
          parsedContexts,
          content,
          contentFileType,
          outputFileType
        );

        // Perform API Call
        const response = await this.$httpApi.post('/docGen', body, {
          responseType: 'arraybuffer', // Needed for binaries unless you want pain
          timeout: 30000 // Override default timeout as this call could take a while
        });

        // create file to download
        const filename = this.getDispositionFilename(
          response.headers['content-disposition']
        );

        const blob = new Blob([response.data], {
          type: 'attachment'
        });

        // Generate Temporary Download Link
        this.createDownload(blob, filename);
        this.notifySuccess('Submitted successfully');
      } catch (e) {
        console.error(e);
        this.notifyError(e.message);
        if (e.response) {
          const data = new TextDecoder().decode(e.response.data);
          const parsed = JSON.parse(data);
          console.warn('CDOGS Response:', parsed);
        }
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
        const { name, extension } = this.splitFileName(this.files.name);
        if (!this.form.outputFileName) {
          this.form.outputFileName = name;
        }
        this.form.contentFileType = extension;
      }
    }
  }
};
</script>

<style scoped>
@media screen and (min-width: 1264px) {
  .docgen-row .v-card {
    height: 100%;
  }
  .docgen-row {
    margin-bottom: 30px;
  }
}
</style>
