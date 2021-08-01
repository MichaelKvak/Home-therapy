<template>
  <div class="main">
    <Navbar />
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import messages from "../utils/messages";

export default {
  name: "DefaultLayout",
  components: {
    Navbar,
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError.code] || "somethink wrong");
    },
  },
};
</script>

<style lang="scss">
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.main {
  width: 100%;
  height: 100vh;
  background: linear-gradient(to top, #92dab9 20%, #e4e4d8 30%, #81d3d3 40%);
}
</style>
