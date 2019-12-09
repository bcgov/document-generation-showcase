<template>
  <v-card class="file-input pa-2 my-2">
    <v-card-title>
      <p>JSON Builder</p>
    </v-card-title>

    <v-card-text>
      <v-data-table :headers="headers" :items="items">
        <template v-slot:item.key="props">
          <v-edit-dialog
            :return-value.sync="props.item.key"
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            {{ props.item.key }}
            <template v-slot:input>
              <v-text-field
                v-model="props.item.key"
                :rules="[max25chars]"
                label="Edit"
                single-line
                counter
                autofocus
              />
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.value="props">
          <v-edit-dialog
            :return-value.sync="props.item.value"
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            <div>{{ props.item.value }}</div>
            <template v-slot:input>
              <div class="mt-4 title">Update value</div>
            </template>
            <template v-slot:input>
              <v-text-field
                v-model="props.item.value"
                :rules="[max25chars]"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
      </v-data-table>

      <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}
        <v-btn text @click="snack = false">Close</v-btn>
      </v-snackbar>
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
      items: [{ key: 'foo', value: 'bar' }, { key: 'baz', value: 'faz' }],
      max25chars: v => v.length <= 25 || 'Input too long!',
      snack: false,
      snackColor: '',
      snackText: '',
      pagination: {}
    };
  },
  methods: {
    save() {
      this.snack = true;
      this.snackColor = 'success';
      this.snackText = 'Data saved';
    },
    cancel() {
      this.snack = true;
      this.snackColor = 'error';
      this.snackText = 'Canceled';
    },
    open() {
      this.snack = true;
      this.snackColor = 'info';
      this.snackText = 'Dialog opened';
    },
    close() {
      console.log('Dialog closed');
    }
  }
};
</script>
