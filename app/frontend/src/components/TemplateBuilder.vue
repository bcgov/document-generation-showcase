<template>
  <v-textarea
    class="template-builder"
    auto-grow
    hint="Enter your template text with 'contexts' (tokens like {d.firstName})"
    label="Template"
    mandatory
    required
    rows="3"
    :rules="templateRules"
    v-model="templateContent"
    solo
    dense
    single-line
    outlined
    flat
    hide-details="auto"
  />
</template>

<script>
export default {
  name: 'templateBuilder',
  data() {
    return {
      templateContent: 'Hello {d.firstName} {d.lastName}!'
    };
  },
  methods: {
    emitJson() {
      const obj = this.templateContent;
      this.$emit('template-object', [obj]);
    },
    reset() {
      this.templateContent = null;
    }
  },
  mounted() {
    this.emitJson();
  },
  watch: {
    templateContent: {
      deep: true,
      handler() {
        this.emitJson();
      }
    }
  }
};
</script>
