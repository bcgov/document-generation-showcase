<template>
  <v-data-table
    class="json-builder"
    disable-pagination
    :headers="headers"
    hide-default-header
    hide-default-footer
    :items="items"
  >
    <template v-slot:item.key="props">
      <v-text-field placeholder="Key" single-line v-model="props.item.key" />
    </template>
    <template v-slot:item.value="props">
      <v-text-field placeholder="Value" single-line v-model="props.item.value" />
    </template>
    <template v-slot:item.action="{ item }">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn @click="deleteItem(item)" fab class="mb-2" small text v-on="on">
            <v-icon>delete</v-icon>
          </v-btn>
        </template>
        <span>Delete Key/Value Pair</span>
      </v-tooltip>
    </template>
    <template v-slot:footer>
      <v-container>
        <v-row justify="end">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn small color="info" @click="addItem()" class="mb-2" v-on="on">
                <v-icon :left="$vuetify.breakpoint.smAndUp">playlist_add</v-icon>
                <span v-if="$vuetify.breakpoint.smAndUp">Add Entry</span>
              </v-btn>
            </template>
            <span>Add Key/Value Pair</span>
          </v-tooltip>
        </v-row>
      </v-container>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'jsonBuilder',
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
    },
    updateItems(json) {
      console.log(json);
      // json.forEach(function(element){
      //   vm.addItem(element, json[element]);
      // });
    },
    emitJson() {
      // https://stackoverflow.com/a/44325124
      const obj = this.items.reduce(
        (obj, item) => ((obj[item.key] = item.value), obj),
        {}
      );
      this.$emit('json-object', [obj]);
    },
    reset() {
      this.items = [];
    }
  },
  mounted() {
    // add sample data
    this.items.push(
      { key: 'firstName', value: 'Jane' },
      { key: 'lastName', value: 'Smith' }
    );
    // let parent component watch for changes
    this.emitJson();
  },
  watch: {
    items: {
      deep: true,
      handler() {
        this.emitJson();
      }
    }
  }
};
</script>
