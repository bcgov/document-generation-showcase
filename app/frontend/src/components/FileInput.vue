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
                    <v-file-input
                      counter
                      :clearable="true"
                      label="Upload template file"
                      hint="See below for sample templates and supported formats"
                      persistent-hint
                      prepend-icon="attachment"
                      required
                      mandatory
                      :rules="(this.templateTab === 0) ? notEmpty : []"
                      show-size
                      v-model="form.files"
                    />
                  </v-tab-item>
                  <v-tab-item>
                    <p>
                      Type in your Template contents, for example: 'Welcome {d.firstName}!'.
                      <br />See
                      <a
                        href="https://carbone.io/documentation.html#substitutions"
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
                  label="Output file name"
                  persistent-hint
                  v-model="form.outputFileName"
                />
                <v-checkbox v-model="form.convertToPDF" label="Convert to PDF" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col lg="6" cols="12">
            <h3 class="pb-3">STEP 2: Upload or create your Data File</h3>
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
                    <v-file-input
                      counter
                      :clearable="false"
                      hint="(Optional) JSON file with key-value pairs"
                      label="Upload data file"
                      persistent-hint
                      prepend-icon="attachment"
                      show-size
                      v-model="form.contextFiles"
                      class="mb-8"
                    />
                    <v-textarea
                      auto-grow
                      hint="JSON format for key-value pairs"
                      label="The JSON object with key-value pairs"
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
            :disabled="!validFileInput"
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
            JSON.parse(v);
            return true;
          } catch (e) {
            return 'Must be an JSON object';
          }
        },
        v => {
          try {
            const o = JSON.parse(v); // this should not fail due to earlier rules.
            if (Array.isArray(o)) {
              if (!o.length) throw Error();
            }
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
        contexts: '{}',
        contextFiles: null,
        convertToPDF: null,
        files: null,
        templateContent: 'Hello {d.firstName} {d.lastName}!',
        contentFileType: null,
        outputFileName: '',
        outputFileType: null
      },
      loading: false,
      notEmpty: [v => !!v || 'Cannot be empty'],
      snack: false,
      snackColor: '',
      snackText: '',
      validFileInput: null
    };
  },
  methods: {
    buildContexts(obj) {
      this.form.contextFiles = null;
      this.updateContexts(obj);
    },
    createBody(
      contexts,
      content,
      contentFileType,
      outputFileName,
      outputFileType
    ) {
      return {
        data: contexts,
        options: {
          reportName: outputFileName,
          convertTo: outputFileType,
          overwrite: true
        },
        template: {
          content: content,
          encodingType: 'base64',
          fileType: contentFileType
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
      this.form.contexts = '{}';
      this.form.outputFileName = '';
      // clear json builder items
      if (this.$refs.jsonBuilder) this.$refs.jsonBuilder.reset();
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
        // create a JSON object of context(s)
        this.form.contexts = JSON.stringify(obj);
      } catch (e) {
        console.error(e, obj);
      }
    },
    async generate() {
      try {
        this.loading = true;
        let content = '';
        let contentFileType = '';
        let outputFileName = '';
        let outputFileType = '';
        let parsedContexts = '';

        parsedContexts = JSON.parse(this.form.contexts);

        // if uploading template file (tab is visible)
        if (this.templateTab === 0) {
          if (this.form.files && this.form.files instanceof File) {
            content = await this.fileToBase64(this.form.files);
            contentFileType = this.form.contentFileType;
          }
        }
        // else using template builder
        else {
          content = await this.textToBase64(this.form.templateContent);
          contentFileType = 'txt';
        }

        //if output file name field has a file extension, we need to separate out the name from the extension for conversion
        // may have templates in the output file name, so only look for separator AFTER templates...
        const _postTemplatesOutputFileName = this.form.outputFileName.substring(this.form.outputFileName.lastIndexOf('}')+1);
        if (_postTemplatesOutputFileName.lastIndexOf('.') > -1) {
          // remove extension from output file name
          outputFileName = this.splitFileName(this.form.outputFileName)['name'];
          // use this extension as the output file type (or set as pdf if pdf checkbox was checked)
          outputFileType = this.form.convertToPDF
            ? 'pdf'
            : this.splitFileName(this.form.outputFileName)['extension'];
        }
        // else output file name contains no extension
        else {
          outputFileName = this.form.outputFileName;
          // output file type is empty (or set as pdf if pdf checkbox was checked)
          outputFileType = this.form.convertToPDF ? 'pdf' : '';
        }

        // if the outputFileName has a template string...
        // then it needs an extension in order to populate the template correctly.
        // it does not matter what the extension is, but outputFileName requires an extension for logic to kick in.
        // outputFileType still determines what type of file is generated.
        if (outputFileName.lastIndexOf('}') > -1) {
          outputFileName = `${outputFileName}.txt`;
        }

        // create payload to send to CDOGS API
        const body = this.createBody(
          parsedContexts,
          content,
          contentFileType,
          outputFileName,
          outputFileType
        );

        // Perform API Call
        const response = await this.$httpApi.post('/template/render', body, {
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
