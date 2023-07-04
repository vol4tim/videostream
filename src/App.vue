<template>
  <div class="header">
    <div class="item">
      <h1>Video stream</h1>
    </div>
  </div>
  <div>
    <template v-if="isReady">
      <div class="block">
        <find-video-form @video="handlerFindVideo" />
      </div>
      <template v-if="videoCid">
        <div class="block">
          Result:
          <a
            :href="`https://${$ipfs_gateway}/ipfs/${videoCid}`"
            target="_blank"
          >
            {{ videoCid }}
          </a>
        </div>
        <div class="block" v-if="videoCid">
          <ipfs-auth @auth="handlerAuth" />
          <ipfs-files
            v-if="ipfsAuth"
            :controller="videoController"
            :cid="videoCid"
            @play="handlerPlay"
          />
        </div>
        <div class="block" v-if="videoContent || videoIsLoad">
          <video-content :isLoad="videoIsLoad" :content="videoContent" />
        </div>
      </template>
    </template>
    <template v-else>...</template>
  </div>
</template>

<script>
import FindVideoForm from "./components/FindVideoForm.vue";
import IpfsAuth from "./components/IpfsAuth.vue";
import IpfsFiles from "./components/IpfsFiles.vue";
import VideoContent from "./components/Video.vue";

export default {
  name: "App",
  components: { IpfsAuth, IpfsFiles, FindVideoForm, VideoContent },
  data() {
    return {
      isReady: false,
      videoCid: null,
      videoController: null,
      videoIsLoad: false,
      videoContent: null,
      ipfsAuth: false
    };
  },
  async created() {
    this.$robonomicsReady(async () => {
      this.isReady = true;
    });
  },
  methods: {
    handlerFindVideo({ controller = null, cid = null } = {}) {
      this.videoController = controller;
      this.videoCid = cid;
    },
    handlerAuth(result) {
      this.ipfsAuth = result;
    },
    handlerPlay({ isLoad, content }) {
      this.videoIsLoad = isLoad;
      this.videoContent = content;
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  outline: 0;
  background: transparent;
  vertical-align: baseline;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  font-family: "Roboto Mono", Menlo, Consolas, Monaco, Liberation Mono,
    Lucida Console, monospace;
  font-size: 1.2rem;
  line-height: 1.5;
  background-color: #eeeeee;
}
#app {
  color: #2c3e50;
}
.header {
  display: flex;
  justify-content: space-between;
  background-color: #0b62a8;
  color: #eee;
}
.header .item {
  flex: 0 1 auto;
  margin: 10px;
  align-self: center;
}
.header h1 {
  margin: 0;
}
button {
  border: 1px solid #495db4;
  background-color: #5b75e7;
  padding: 10px;
  cursor: pointer;
  color: #f1f3ff;
  text-transform: uppercase;
  font-weight: bold;
}
button:hover {
  background-color: #5166c7;
}
button:disabled {
  border: 1px solid #bdc3dd;
  background-color: #a8acbe;
  color: #5e5e61;
  cursor: auto;
}
input,
select {
  border: 1px solid #495db4;
  padding: 10px;
  color: #222222;
  background-color: #fff;
  width: 100%;
}
table {
  margin: 0;
  padding: 0;
  border: 0;
  border-spacing: 0;
  border-collapse: separate;
  width: 100%;
}
table td {
  padding: 5px;
}
.success {
  border: 1px solid #5eb449;
  background-color: #73eb91;
  padding: 10px;
  margin: 10px 0;
}
.error {
  border: 1px solid #b44949;
  background-color: #e76b5b;
  padding: 10px;
  margin: 10px 0;
}
.label {
  font-size: 12px;
  border: 1px solid #495db4;
  padding: 5px;
  color: #f1f3ff;
  background-color: #798de6;
  vertical-align: middle;
}
.container {
  width: 100%;
}
.block {
  margin: 20px auto;
  width: 600px;
  border-bottom: 1px solid #5b75e7;
  padding: 20px;
}
h2,
h3,
h4,
h5,
h6 {
  text-align: center;
  margin: 20px 0;
  border-bottom: 1px solid #dadada;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
.loader {
  text-align: center;
  margin: 50px;
}
</style>
