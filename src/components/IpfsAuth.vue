<template>
  <account />
  <button v-if="!isAuth" @click="ipfsAuth">ipfs auth</button>
</template>

<script>
import { stringToU8a } from "@polkadot/util";
import Account from "./Account.vue";

export default {
  emits: ["auth"],
  components: { Account },
  data() {
    return {
      isAuth: false
    };
  },
  created() {
    this.$robonomics.accountManager.onChange(() => {
      this.isAuth = false;
    });
  },
  watch: {
    isAuth() {
      this.$emit("auth", this.isAuth);
    }
  },
  methods: {
    async ipfsAuth() {
      try {
        const signature = (
          await this.$robonomics.accountManager.account.signMsg(
            stringToU8a(this.$robonomics.accountManager.account.address)
          )
        ).toString();

        this.$ipfs.auth(
          this.$robonomics.accountManager.account.address,
          signature
        );

        this.isAuth = true;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
