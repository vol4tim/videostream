// import { Buffer } from "buffer";
import { create } from "ipfs-http-client";

export default class Ipfs {
  constructor(endpoint) {
    this.endpoint = endpoint;
    this.authHeader = null;
  }
  auth(address, signature) {
    const authHeaderRaw = `sub-${address}:${signature}`;
    this.authHeader = Buffer.from(authHeaderRaw).toString("base64");
  }
  authClear() {
    this.authHeader = null;
  }
  async ls(cid) {
    const client = create({
      url: this.endpoint,
      headers: {
        authorization: `Basic ${this.authHeader}`
      }
    });
    const files = [];
    for await (const file of client.ls(cid)) {
      if (file.type === "file") {
        files.push(file);
      }
    }
    return files;
  }
  async cat(cid) {
    const client = create({
      url: this.endpoint,
      headers: {
        authorization: `Basic ${this.authHeader}`
      }
    });
    const cat = async (cid) => {
      const decoder = new TextDecoder();
      let content = "";
      for await (const chunk of client.cat(cid)) {
        content += decoder.decode(chunk, {
          stream: true
        });
      }
      return content;
    };
    return await cat(cid);
  }
}
