<template>
  <v-container class="home">
    <h1 class="text-center">Generate Printable Documents with a Template and your Data</h1>
    <v-card class="home-jumbotron pa-4 my-2 text-center">
      <v-img
        class="d-none d-sm-block mx-6 text-center"
        src="@/assets/images/home_flow.svg"
        alt="CDOGS Flow"
        contain
      />
      <div class="d-sm-none icon-flow text-center">
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
        <v-btn color="primary" class="tryit-btn" id="tryit-cdogs" large>
          <v-icon left>mdi-hexagon-multiple</v-icon>
          <span>Try it out</span>
        </v-btn>
      </router-link>
      <a href="https://github.com/bcgov/common-document-generation-service" target="_blank">
        <v-btn class="github-btn" id="github" large>
          <v-icon :left="$vuetify.breakpoint.smAndUp">mdi-github-circle</v-icon>
          <span v-if="$vuetify.breakpoint.smAndUp">Github</span>
        </v-btn>
      </a>
    </v-card>

    <v-card class="pa-6 mt-6">
      <h3>Capabilities</h3>
      <p>The API can generate any PDF or XML-based documents such as docx, xlsx, pptx, odt, ods, odp, and html. Examples of XML-based editors include Microsoft Office™, LibreOffice™ or OpenOffice™.</p>
      <p>The CDOGS API is capable of doing the following:</p>
      <ul>
        <li>Merge complex datasets into document templates</li>
        <li>Supports any XML-based document templates including but not limited to Microsoft Office™, LibreOffice™ or OpenOffice™</li>
        <li>Rich templating library support leveraging the Carbone JS library</li>
      </ul>
      <h3>Usage</h3>
      <ul>
        <li>
          To learn more on how to use the CDOGS API, check out the API Usage docs
          <a
            href="https://github.com/bcgov/common-document-generation-service/blob/master/app/README.md#api-usage"
            target="_blank"
          >here</a>.
        </li>
        <li>
          You can find the OpenAPI 3.0 Specification of the CDOGS API
          <a
            href="https://cdogs-master-idcqvl-dev.pathfinder.gov.bc.ca/api/v1/docs"
            target="_blank"
          >here</a>.
        </li>
      </ul>
      <h3>Onboarding</h3>
      <ul>
        <li>
          For information about onboarding to CDOGS or other common services, see the
          <a
            href="https://github.com/bcgov/nr-get-token/wiki/Onboarding-Process"
            target="_blank"
          >onboarding documentation</a>.
        </li>
      </ul>
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
