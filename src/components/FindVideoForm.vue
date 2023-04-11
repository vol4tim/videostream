<template>
  <div>
    Controller
    <input v-model="controller" />
  </div>
  <div style="margin-top: 20px">
    <button @click="find" :disabled="load">
      Find twins<template v-if="load"> ...</template>
    </button>
  </div>
</template>

<script>
import { utils } from "robonomics-interface";

const findIdTwins = async (robonomics, address) => {
  const ids = [];
  const total = await robonomics.twin.getTotal();
  for (let id = 0; id < total; id++) {
    const owner = await robonomics.twin.getOwner(id);
    if (owner === address) {
      ids.push(id);
    }
  }
  return ids;
};
const findVideoCid = async (robonomics, id) => {
  try {
    const twin = await robonomics.twin.getTwin(id);
    if (twin) {
      const hexVideo = Object.keys(twin).find(
        (key) =>
          twin[key] === "4CC7GkKuJJzFzswqz39m5qWbgXaQks9f36jCgsadpN2c1hnh"
      );
      if (hexVideo) {
        return utils.hexToCid(hexVideo);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return;
};

export default {
  emits: ["video"],
  data() {
    return {
      controller: "",
      load: false
    };
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
          this.$emit("video", cid);
        }
      } catch (error) {
        console.log(error);
      }
      this.load = false;
    }
  }
};
</script>
