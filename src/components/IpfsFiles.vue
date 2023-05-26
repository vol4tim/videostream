<template>
  <template v-if="isLoadFiles">
    <div>...</div>
  </template>
  <template v-else-if="files.length > 0">
    <div style="margin: 20px 0">
      Controller seed for decrypt video:
      <div class="input-container">
        <input :type="typeInput" v-model="seed" class="input-box" />
        <button class="input-box" @click="togglePassword">
          {{ typeInput === "password" ? "show" : "hide" }}
        </button>
      </div>
    </div>
    <div v-for="(file, k) in files" :key="k">
      <a :href="`https://ipfs.io/ipfs/${file.path}`" target="_blank">
        {{ file.name }}
      </a>
      <button :disabled="!isValidASeed || isLoadVideo" @click="play(file.cid)">
        play
      </button>
    </div>
  </template>
  <template v-else>
    <button @click="ls(cid)">Get files</button>
  </template>
</template>

<script>
import { Keyring } from "@polkadot/keyring";

export default {
  props: ["controller", "cid"],
  emits: ["play"],
  data() {
    return {
      seed: "",
      files: [],
      isLoadFiles: false,
      isLoadVideo: false,
      typeInput: "password"
    };
  },
  async created() {
    this.ls(this.cid);
  },
  computed: {
    isValidASeed() {
      return this.controllerAccount(this.seed) !== null;
    }
  },
  methods: {
    async ls(cid) {
      this.isLoadFiles = true;
      try {
        this.files = await this.$ipfs.ls(cid);
      } catch (error) {
        console.log(error);
      }
      this.isLoadFiles = false;
    },
    async play(cid) {
      this.isLoadVideo = true;
      this.$emit("play", { isLoad: true, content: null });
      try {
        const content = await this.$ipfs.cat(cid);
        const videoContent = this.decrypt(content);
        this.$emit("play", { isLoad: false, content: videoContent });
      } catch (error) {
        console.log(error);
        this.$emit("play", { isLoad: false, content: null });
      }
      this.isLoadVideo = false;
    },
    controllerAccount(seed) {
      if (seed) {
        try {
          const k = new Keyring({ ss58Format: 32 });
          const acc = k.addFromUri(seed, {}, "ed25519");
          if (acc.address === this.controller) {
            return acc;
          }
        } catch (error) {
          console.log(error);
        }
      }
      return null;
    },
    decrypt(encryptMessage) {
      const controller = this.controllerAccount(this.seed);
      const decryptMessage = controller.decryptMessage(
        encryptMessage,
        controller.publicKey
      );
      return decryptMessage;
    },
    togglePassword() {
      this.typeInput = this.typeInput === "password" ? "text" : "password";
    }
  }
};
</script>

<style scoped>
.input-container {
  display: flex;
}
.input-box {
  flex: 0 1 auto;
}
.input-box:nth-child(1) {
  flex: 1 1 auto;
}
</style>
