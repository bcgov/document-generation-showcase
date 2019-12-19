<template>
  <v-container class="home">
    <h1 class="text-center">Generate Printable Documents with a Template and your Data</h1>
    <v-card class="home-jumbotron pa-2 my-2 text-center">
      <v-img
        v-if="$vuetify.breakpoint.smAndUp"
        class="mx-6 text-center"
        src="@/assets/images/home_flow.svg"
        alt="CDOGS Flow"
        contain
      />
      <div v-else class="icon-flow text-center">
        <h2>JSON + Template -> Printable Documents</h2>
        <br />
        <v-icon color="black">code</v-icon>
        <v-icon x-large>mdi-plus</v-icon>
        <v-icon color="black">mdi-file-document</v-icon>
        <v-icon x-large>arrow_forward</v-icon>
        <v-icon color="blue">mdi-file-word</v-icon>
        <v-icon color="orange">mdi-file-powerpoint</v-icon>
        <v-icon color="green">mdi-file-excel</v-icon>
        <v-icon color="red">mdi-file-pdf</v-icon>
      </div>
      <h2
        class="mt-6"
      >Leverage your structured datasets and your business templates to automatically populate printable documents, spreadsheets, presentations, or PDFs using the Common Document Generation Service.</h2>
      <br />
      <router-link :to="{ name: 'cdogs' }">
        <v-btn color="primary" class="home-btn" id="not-found-home" large>
          <v-icon left>mdi-hexagon-multiple</v-icon>
          <span>Try it out</span>
        </v-btn>
      </router-link>
    </v-card>

    <v-card class="pa-6 mt-12">
      <h3>Summary</h3>
      <strong>The API can generate any PDF or XML-based documents such as docx, xlsx, pptx, odt, ods, odp, and html.</strong>
      <p>Examples of XML-based editors include Microsoft Office™, LibreOffice™ or OpenOffice™.</p>
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
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'home'
};
</script>

<style scoped>
.icon-flow > .v-icon {
  font-size: 3.5rem;
}
</style>
