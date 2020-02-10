<template>
  <v-card class="file-input pa-2 my-2">
    <v-card-title>
      <p>Example Templates and Sample Data</p>
    </v-card-title>

    <v-card-text>
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
    </v-card-text>
  </v-card>
</template>

<script>
import exampleTable from '@/assets/exampleTable.json';

export default {
  name: 'examples',
  computed: {
    examples() {
      return exampleTable;
    }
  }
};
</script>
