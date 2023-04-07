import { Buffer } from "buffer";
import { createApp } from "vue";
import App from "./App.vue";
import robonomics from "./robonomics";

window.Buffer = Buffer;

const app = createApp(App);
app.use(robonomics).mount("#app");
