<template>
  <div class="preview-wrapper"></div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: "",
    },
  },
  computed: {
    hasPreview() {
      return this.mode.length;
    },
  },
};
</script>

<style></style>
