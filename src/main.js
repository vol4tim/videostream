import { Buffer } from "buffer";
import { createApp } from "vue";
import App from "./App.vue";
import config from "./config";
import Ipfs from "./plugins/ipfs";
import robonomics from "./robonomics";

window.Buffer = Buffer;

const app = createApp(App);
app.config.globalProperties.$ipfs_gateway = config.GATEWAY;
app.use(robonomics).use(Ipfs).mount("#app");
