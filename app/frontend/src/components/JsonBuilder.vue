<template>
  <v-card class="file-input pa-2 my-2">
    <v-card-title>
      <p>JSON Builder</p>
      <v-spacer />
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn color="info" @click="addItem()" fab class="mb-2" v-on="on">
            <v-icon>playlist_add</v-icon>
          </v-btn>
        </template>
        <span>Add Key/Value Pair</span>
      </v-tooltip>
    </v-card-title>

    <v-card-text>
      <v-data-table :headers="headers" :items="items">
        <template v-slot:item.key="props">
          <v-text-field placeholder="Key" single-line v-model="props.item.key" />
        </template>
        <template v-slot:item.value="props">
          <v-text-field placeholder="Value" single-line v-model="props.item.value" />
        </template>
        <template v-slot:item.action="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn @click="deleteItem(item)" fab class="mb-2" text v-on="on">
                <v-icon>delete</v-icon>
              </v-btn>
            </template>
            <span>Add Key/Value Pair</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="info" @click="addItem()" class="mb-2" v-on="on">
                <v-icon :left="$vuetify.breakpoint.smAndUp">playlist_add</v-icon>
                <span v-if="$vuetify.breakpoint.smAndUp">Add Entries</span>
              </v-btn>
            </template>
            <span>Add Key/Value Pair</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card-text>

    <v-card-actions></v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'jsonbuilder',
  data() {
    return {
      headers: [
        { text: 'Key', value: 'key' },
        { text: 'Value', value: 'value' },
        { text: 'Action', value: 'action' }
      ],
      items: []
    };
  },
  methods: {
    addItem(k = '', v = '') {
      this.items.push({ key: k, value: v });
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      this.items.splice(index, 1);
    }
  }
};
</script>
