<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
  computed: {
    layout() {
      return this.$route.meta.layout || "default-layout";
    },
  },
};
</script>
<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
</style>
