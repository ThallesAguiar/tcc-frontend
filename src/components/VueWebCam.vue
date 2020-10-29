<template>
  <v-container>
    <v-card max-width="344">
      <v-img
        src="https://s2.glbimg.com/6AluNgYKtLnLlFu879n1qabnlfA=/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2019/Z/F/A4uBECQrKTfnCngyQdqw/ca-05681-r.jpg"
        height="200px"
      ></v-img>

      <v-card-title>Thalles Aguiar</v-card-title>

      <v-card-subtitle>From: Palm Beach - Florida - EUA</v-card-subtitle>

      <v-card-actions>
        <v-col cols="12" grow>
          <v-row class="justify-space-around">
            <v-btn text>
              <v-img src="@/assets/dislike.svg" />
            </v-btn>

            <v-btn text>
              <v-img src="@/assets/like.svg" />
            </v-btn>

            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.</v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

<!-- UserLocal -->
    <v-card max-width="344">
      <vue-web-cam
        id="web-cam"
        ref="webcam"
        :device-id="deviceId"
        width="344"
        :playsinline="false"
        @started="onStarted"
        @stopped="onStopped"
        @error="onError"
        @cameras="onCameras"
        @camera-change="onCameraChange"
      />
      <!-- <v-img
        src="https://s2.glbimg.com/6AluNgYKtLnLlFu879n1qabnlfA=/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2019/Z/F/A4uBECQrKTfnCngyQdqw/ca-05681-r.jpg"
        height="200px"
      ></v-img> -->
      <v-card-actions>
        <v-col cols="12">
          <v-row class="justify-space-around">
            <v-btn icon @click="showOptionsCam = !showOptionsCam">
              <v-icon>{{ showOptionsCam ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="showOptionsCam">
          <v-divider></v-divider>
          <v-btn text @click="onStart">
            <v-icon>mdi-camcorder</v-icon>
          </v-btn>

          <v-btn text @click="onStop">
            <v-icon>mdi-camcorder-off</v-icon>
          </v-btn>

          <v-btn text @click="onCapture">
            <v-icon>mdi-camera-enhance</v-icon>
          </v-btn>

          <select v-model="camera">
            <option>-- Select Device --</option>
            <option
              v-for="device in devices"
              :key="device.deviceId"
              :value="device.deviceId"
            >{{ device.label }}</option>
          </select>
        </div>
      </v-expand-transition>
    </v-card>

    <div class="row">
      <div class="col-md-6">
        <h2>Captured Image</h2>
        <figure class="figure">
          <img :src="img" class="img-responsive" />
        </figure>
      </div>
    </div>
  </v-container>
</template>

<script>
import { WebCam } from "vue-web-cam";
export default {
  name: "App",
  components: {
    "vue-web-cam": WebCam
  },
  data() {
    return {
      img: null,
      camera: null,
      deviceId: null,
      devices: [],
      show: false,
      showOptionsCam: false,
    };
  },
  computed: {
    device: function() {
      return this.devices.find(n => n.deviceId === this.deviceId);
    }
  },
  watch: {
    camera: function(id) {
      this.deviceId = id;
    },
    devices: function() {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices;
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    }
  },
  methods: {
    onCapture() {
      this.img = this.$refs.webcam.capture();
    },
    onStarted(stream) {
      console.log("On Started Event", stream);
    },
    onStopped(stream) {
      console.log("On Stopped Event", stream);
    },
    onStop() {
      this.$refs.webcam.stop();
    },
    onStart() {
      this.$refs.webcam.start();
    },
    onError(error) {
      console.log("On Error Event", error);
    },
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      console.log("On Camera Change Event", deviceId);
    }
  }
};
</script>

<style>
video .web-cam {
    bottom:500px;
    padding: 0;
    margin:0;
}
</style>