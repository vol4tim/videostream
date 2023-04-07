<template>
  <div>
    Twin
    <select v-if="twins.length" v-model="id">
      <option v-for="id in twins" :key="id">{{ id }}</option>
    </select>
    <input v-else v-model="id" />
  </div>
  <div style="margin-top: 20px">
    <button @click="find" :disabled="load">
      Find ipfs cid<template v-if="load"> ...</template>
    </button>
  </div>
</template>

<script>
import { utils } from "robonomics-interface";

export default {
  emits: ["cid"],
  props: { twins: { type: Array } },
  data() {
    return {
      id: "",
      load: false
    };
  },
  watch: {
    twins: {
      handler() {
        if (this.twins.length) {
          this.id = this.twins[this.twins.length - 1];
        } else {
          this.id = "";
        }
      }
    }
  },
  methods: {
    async find() {
      this.load = true;
      this.$emit("cid", "");
      try {
        const twin = await this.$robonomics.twin.getTwin(this.id);
        if (twin) {
          const hexVideo = Object.keys(twin).find(
            (key) =>
              twin[key] === "4CC7GkKuJJzFzswqz39m5qWbgXaQks9f36jCgsadpN2c1hnh"
          );
          if (hexVideo) {
            const ipfsCid = utils.hexToCid(hexVideo);
            this.$emit("cid", ipfsCid);
          }
        }
      } catch (error) {
        console.log(error);
      }
      this.load = false;
    }
  }
};
</script>
