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

export default {
  emits: ["twins"],
  data() {
    return {
      controller: "",
      load: false
    };
  },
  methods: {
    async find() {
      this.load = true;
      this.$emit("twins", []);
      try {
        const twins = await findIdTwins(this.$robonomics, this.controller);
        this.$emit("twins", twins);
      } catch (error) {
        console.log(error);
      }

      this.load = false;
    }
  }
};
</script>
