<template>
  <div>
    Account:
    <template v-if="isReady">
      <select v-model="account">
        <option
          v-for="(account, key) in accounts"
          :key="key"
          :value="account.address"
        >
          {{ account.meta.isTesting ? "dev" : "" }} {{ account.meta.name }} |
          {{ account.meta?.source }}
        </option>
      </select>
      <br />
      {{ account }}
    </template>
    <button v-else @click="connect">connect</button>
    <p>{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isReady: false,
      account: null,
      accounts: [],
      error: ""
    };
  },
  created() {
    this.connect();
    this.$robonomics.accountManager.onReady(() => {
      this.isReady = true;
    });
  },
  watch: {
    async account(address) {
      await this.$robonomics.accountManager.setSender(address);
    }
  },
  methods: {
    async connect() {
      this.error = "";
      try {
        await this.$robonomics.accountManager.initPlugin({
          isDevelopment: false
        });
        this.accounts = this.$robonomics.accountManager.getAccounts();
        if (this.accounts.length) {
          this.account = this.accounts[0].address;
        }
      } catch (error) {
        this.error = error.message;
      }
    }
  }
};
</script>
