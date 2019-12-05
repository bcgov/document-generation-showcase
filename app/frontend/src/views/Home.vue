<template>
  <v-container class="home">
    <h2 class="text-center">Welcome to Document Generation Showcase (DGRSC).</h2>
    <p>
      DGRSC demonstrates how an application can have document generation functionality by calling an API. In this case, this application demonstrates how one may be able to call the
      <a
        href="https://bcgov.github.io/common-document-generation-service/"
      >Common Document Generation Service API (CDOGS)</a>.
    </p>
    <h3>Capabilities</h3>
    <p>The CDOGS API should be capable of doing the following:</p>
    <ul>
      <li>Merge complex datasets into document templates</li>
      <li>Supports any XML-based document templates including but not limited to Microsoft Office™, LibreOffice™ or OpenOffice™</li>
      <li>Rich templating library support leveraging the Carbone JS library</li>
    </ul>
    <h3>Usage</h3>
    <p>
      To learn more on how to call the CDOGS API directly, check out the API Usage docs
      <a
        href="https://github.com/bcgov/common-document-generation-service/blob/master/app/README.md#api-usage"
      >here</a>.
    </p>
    <h3>Examples</h3>
    <p>Below are some various document template examples and their associated contexts which shocase the rich functionality that the CDOGS API can offer.</p>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Description</th>
            <th class="text-left">Type</th>
            <th class="text-left">Template</th>
            <th class="text-left">Contexts</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in examples" :key="`item-${index}`">
            <td>{{ item.description }}</td>
            <td>{{ item.type }}</td>
            <td>
              <v-btn
                :color="item.template.color"
                class="btn-template-download"
                download
                :href="item.template.link"
                outlined
                small
              >
                <v-icon left>{{ item.template.icon }}</v-icon>
                {{ item.template.name }}
              </v-btn>
            </td>
            <td>
              <v-btn
                :color="item.contexts.color"
                class="btn-contexts-download"
                download
                :href="item.contexts.link"
                outlined
                small
              >
                <v-icon left>mdi-download</v-icon>
                {{ item.contexts.name }}
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      examples: [
        {
          contexts: {
            color: 'gray',
            link: './examples/contexts_dgrsc.json',
            name: 'contexts_dgrsc.json'
          },
          description: 'Information Sharing Agreement',
          template: {
            color: 'blue',
            icon: 'mdi-file-word',
            link: './examples/template_information_sharing_agreement.docx',
            name: 'template_information_sharing_agreement.docx'
          },
          type: 'Microsoft Word Document (.docx)'
        },
        {
          contexts: {
            color: 'black',
            link: './examples/contexts_dgrsc.json',
            name: 'contexts_dgrsc.json'
          },
          description: 'Information Sharing Agreement',
          template: {
            color: 'brown',
            icon: 'mdi-file-document',
            link: './examples/template_information_sharing_agreement.odt',
            name: 'template_information_sharing_agreement.odt'
          },
          type: 'OpenDocument Text (.odt)'
        },
        {
          contexts: {
            color: 'black',
            link: './examples/contexts_dgrsc.json',
            name: 'contexts_dgrsc.json'
          },
          description: 'Sample PowerPoint Presentation',
          template: {
            color: 'orange',
            icon: 'mdi-file-powerpoint',
            link: './examples/template_powerpoint.pptx',
            name: 'template_powerpoint.pptx'
          },
          type: 'Microsoft PowerPoint Presentation (.pptx)'
        },
        {
          contexts: {
            color: 'red',
            link: './examples/contexts_movies.json',
            name: 'contexts_movies.json'
          },
          description: 'Sample Movie Spreadsheet',
          template: {
            color: 'green',
            icon: 'mdi-file-excel',
            link: './examples/template_movies.xlsx',
            name: 'template_movies.xlsx'
          },
          type: 'Microsoft Excel Worksheet (.xlsx)'
        },
        {
          contexts: {
            color: 'purple',
            link: './examples/contexts_mx_permit.json',
            name: 'contexts_mx_permit.json'
          },
          description: 'Mineral Exploration Reclamation Permit',
          template: {
            color: 'blue',
            icon: 'mdi-file-word',
            link: './examples/mx_permit_{d.permitNumber}.docx',
            name: 'mx_permit_{d.permitNumber}.docx'
          },
          type: 'Microsoft Word Document (.docx)'
        }
      ]
    };
  },
  methods: {
    dropPath(link) {
      return link.replace(/^.*\//, '');
    }
  }
};
</script>

<style scoped>
</style>
