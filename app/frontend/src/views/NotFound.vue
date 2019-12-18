<template>
  <v-container class="not-found text-center">
    <h1 >404: Page not found. :(</h1>
    <v-btn color="primary" class="home-btn" id="not-found-home" @click="login" large>
      <v-icon :left="$vuetify.breakpoint.smAndUp">home</v-icon>
      <span v-if="$vuetify.breakpoint.smAndUp">Home</span>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'notFound'
};
</script>
