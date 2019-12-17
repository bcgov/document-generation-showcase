<template>
  <v-container class="home">
    <h2 class="text-center">Welcome to Document Generation Showcase (DGRSC)</h2>
    <p>
      DGRSC demonstrates how an application can have document generation functionality by calling an API. In this case, this application demonstrates how one may be able to call the
      <a
        href="https://bcgov.github.io/common-document-generation-service/"
      >Common Document Generation Service API (CDOGS)</a>.
    </p>
    <h3>Capabilities</h3>
    <p>The CDOGS API is capable of doing the following:</p>
    <ul>
      <li>Merge complex datasets into document templates</li>
      <li>Supports any XML-based document templates including but not limited to Microsoft Office™, LibreOffice™ or OpenOffice™</li>
      <li>Rich templating library support leveraging the Carbone JS library</li>
    </ul>
    <h3>Usage</h3>
    <p>
      To learn more on how to use the CDOGS API, check out the API Usage docs
      <a
        href="https://github.com/bcgov/common-document-generation-service/blob/master/app/README.md#api-usage"
      >here</a>.
    </p>
    <p>
      You can find the OpenAPI 3.0 Specification of the CDOGS API
      <a
        href="https://cdogs-master-idcqvl-dev.pathfinder.gov.bc.ca/api/v1/docs"
      >here</a>.
    </p>
    <h3>Usage</h3>
    <p>
      For information about onboarding to CDOGS or other common services, see the <a href="https://github.com/bcgov/nr-get-token/wiki/Onboarding-Process" target="_blank">onboarding documentation</a>.
    </p>
    <h3>Examples</h3>
    <p>Below are some various document template examples and their associated contexts which showcase the rich functionality that the CDOGS API can offer.</p>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Description</th>
            <th v-if="$vuetify.breakpoint.mdAndUp" class="text-left">Type</th>
            <th class="text-left">Extension</th>
            <th class="text-left">Template</th>
            <th class="text-left">Contexts</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in examples" :key="`item-${index}`">
            <td>{{ item.description }}</td>
            <td v-if="$vuetify.breakpoint.mdAndUp">{{ item.type }}</td>
            <td>{{ item.template.link.replace(/^.*\./, '') }}</td>
            <td>
              <v-btn
                :color="item.template.color"
                class="btn-template-download"
                download
                :href="item.template.link"
                outlined
                small
              >
                <v-icon :left="$vuetify.breakpoint.mdAndUp">{{ item.template.icon }}</v-icon>
                <div v-if="$vuetify.breakpoint.mdAndUp">Download</div>
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
                <v-icon :left="$vuetify.breakpoint.mdAndUp">mdi-download</v-icon>
                <div v-if="$vuetify.breakpoint.mdAndUp">Download</div>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import exampleTable from '../assets/exampleTable.json';

export default {
  name: 'home',
  computed: {
    examples() {
      return exampleTable;
    }
  }
};
</script>
