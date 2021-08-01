<template>
  <div class="auth-wrapper">
    <slot />
  </div>
</template>

<script>
import messages from "../utils/messages";
export default {
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

<style lang="scss" scoped>
.auth-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("https://images.unsplash.com/photo-1584362917165-526a968579e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhhcm1hY3l8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80");

  // linear-gradient(to bottom right, #004d40, #00bfa5);
}
</style>
