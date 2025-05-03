<template>
  <div v-if="isLoad">...</div>
  <video
    v-show="!isLoad"
    id="video"
    width="600"
    height="480"
    controls
    muted="muted"
  ></video>
</template>

<script>
export default {
  props: ["isLoad", "content"],
  mounted() {
    this.loadVideo(this.content);
  },
  watch: {
    content() {
      this.loadVideo(this.content);
    }
  },
  methods: {
    loadVideo(videoData) {
      if (!videoData) {
        return;
      }
      const video = document.getElementById("video");
      const blob = new Blob(videoData, {
        type: "video/mp4"
      });
      video.src = URL.createObjectURL(blob);
      video.load();
    }
  }
};
</script>
