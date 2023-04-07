import { Robonomics } from "robonomics-interface";

export async function instance() {
  try {
    return Robonomics.getInstance();
  } catch (_) {
    //
  }
  return await Robonomics.createInstance({
    // endpoint: "ws://127.0.0.1:9944"
    endpoint: "wss://kusama.rpc.robonomics.network/"
  });
}

export default {
  install: async (app) => {
    let isReady = false;
    let cbReady;
    app.config.globalProperties.$robonomicsReady = (cb) => {
      if (isReady) {
        cb();
        return;
      }
      cbReady = cb;
    };
    app.config.globalProperties.$robonomics = await instance();

    isReady = true;
    if (cbReady) {
      cbReady();
    }
  }
};
