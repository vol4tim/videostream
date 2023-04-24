<template>
  <div>
    Controller
    <input v-model="controller" />
  </div>
  <div style="margin-top: 20px">
    <button @click="find" :disabled="!isValidAddress || load">
      Find twins<template v-if="load"> ...</template>
    </button>
  </div>
</template>

<script>
import { findIdTwins, findVideoCid, isValidAddress } from "../utils/tools";

export default {
  emits: ["video"],
  data() {
    return {
      controller: "",
      load: false
    };
  },
  computed: {
    isValidAddress() {
      return isValidAddress(this.controller);
    }
  },
  methods: {
    async find() {
      this.load = true;
      this.$emit("video");
      try {
        const twins = await findIdTwins(this.$robonomics, this.controller);
        if (twins.length > 0) {
          const cid = await findVideoCid(
            this.$robonomics,
            twins[twins.length - 1]
          );
          this.$emit("video", { controller: this.controller, cid });
        }
      } catch (error) {
        console.log(error);
      }
      this.load = false;
    }
  }
};
</script>
