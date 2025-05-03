<template>
  <div v-if="isLoad">...</div>
  <img v-else id="preview" style="width: 100%" />
</template>

<script>
export default {
  props: ["isLoad", "content"],
  mounted() {
    this.loadImage(this.content);
  },
  watch: {
    content() {
      this.loadImage(this.content);
    }
  },
  methods: {
    async loadImage(imageData) {
      if (!imageData) {
        return;
      }
      const blob = new Blob(imageData, {
        type: "image/png"
      });
      const image = document.getElementById("preview");
      image.src = URL.createObjectURL(blob);
    }
  }
};
</script>
