<template>
  <v-container fluid>
    <!-- OTHER USER  -->
    <v-card max-width="345" dark>
      <div class="divVideos">
        <video v-if="callAccepted" id="partnerVideo" ref="partnerVideo" height="250" width="345" />
      </div>
      <v-btn text large @click="dislike()">
        <v-img src="@/assets/dislike.svg" />
      </v-btn>

      <v-btn text large @click="like()">
        <v-img src="@/assets/like.svg" />
      </v-btn>

      <v-btn v-show="callAccepted" icon large @click="show = !show" absolute right>
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
          <v-card-title>{{caller}}</v-card-title>

          <v-card-subtitle>From: Palm Beach - Florida - EUA</v-card-subtitle>

          <v-card-text>
            <v-btn text x-small @click="dialog=!dialog" absolute right top>
              <v-icon x-small color="error">mdi-block-helper</v-icon>
              <span>Denunciar</span>
            </v-btn>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
    <br />

    <!-- UserLocal -->
    <v-card max-width="345" dark>
      <div class="divVideos">
        <video v-show="stream" id="userVideo" ref="userVideo" height="250" width="345" />
        <!-- <v-btn fab small class="btns-event mx-2" @click="eventsCam()">
          <v-icon :color="camEvent.color">{{camEvent.icon}}</v-icon>
        </v-btn>
        <v-btn fab small class="btns-event mx-2" @click="eventSound = !eventSound">
          <v-icon :color="soundEvent.color">{{soundEvent.icon}}</v-icon>
        </v-btn> -->
      </div>
      My ID: {{yourID}}
      {{receivingCall}}
      <v-card-actions v-if="receivingCall">
        <v-col cols="12">
          <v-row class="justify-space-around">
              <h4>{{caller}} is calling you</h4>
              <v-btn small color="success" @click="acceptCall()">Accept</v-btn>
              <v-btn small color="error" @click="acceptCall()">Nope</v-btn>
          </v-row>
        </v-col>
      </v-card-actions>
    </v-card>
    <br />
    <div v-for="user in users" :key="user">
      <div v-if="user !== yourID ">
        {{user}}
        <v-btn x-small @click="callPeer(user)">CALL</v-btn>
      </div>
    </div>

    <!-- Dialogo de denuncia -->
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="red darken-2">DENUNCIAR USUÁRIO</v-card-title>
        <v-container fluid>
          <p>{{ selected }}</p>
          <v-checkbox v-model="selected" label="Nudismo" value="Nudismo"></v-checkbox>
          <v-checkbox v-model="selected" label="Violação as regras do sistema" value="Violação"></v-checkbox>
          <v-checkbox v-model="selected" label="Racismo" value="Racismo"></v-checkbox>
          <v-checkbox v-model="selected" label="Ofença" value="Ofença"></v-checkbox>
          <v-checkbox v-model="selected" label="Ameaça" value="Ameaça"></v-checkbox>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text color="error" @click="denounce()">Denunciar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ./Dialogo de denuncia -->
  </v-container>
</template>

<script>
import io from "socket.io-client";
import Peer from "simple-peer";
export default {
  name: "MyVideo",
  components: {},
  data: function () {
    return {
      yourID: "",
      users: [],
      stream: null,
      receivingCall: false,
      caller: "",
      callerSignal: null,
      callAccepted: false,
      socket: io.connect("http://localhost:8000"),
      showOptionsCam: false,
      show: false,
      eventCam: true,
      eventSound: true,
      selected: ["Nudismo"],
      dialog: false,
    };
  },
  computed: {
    camEvent() {
      return this.eventCam
        ? { icon: "mdi-video", color: "teal" }
        : { icon: "mdi-video-off", color: "pink" };
    },
    soundEvent() {
      return this.eventSound
        ? { icon: "mdi-volume-high", color: "teal" }
        : { icon: "mdi-volume-off", color: "pink" };
    },
  },
  methods: {
    denounce() {
      console.log("Você esta denunciando este usuario por:", this.selected);
      this.dialog = false;
    },
    like() {
      console.log("Você esta dando LIKE");
    },
    dislike() {
      console.log("Você esta dando DISLIKE");
    },
    eventsCam() {
      if (this.eventCam) {
        this.eventCam = false;
        return this.onStop(this.yourID);
      } else {
        this.eventCam = true;
        return this.onStart();
      }
    },
    onStop(yourID) {
      console.log("onStop", yourID);
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.stream = null;
        this.$refs.userVideo.srcObject = stream;
        // this.$refs.userVideo.stop();
        // this.socket.emit("onStop",{ signal: data, to: this.caller })
        // console.log("voce acionou o onStop")
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: this.stream,
        });
        peer.on("signal", (data) => {
          this.socket.emit("onStop", { signal: data, to: this.caller });
        });
      });
    },
    onStart() {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.stream = stream;
        this.$refs.userVideo.srcObject = stream;
        this.$refs.userVideo.play();
      });
    },
    callPeer(idOtherUser) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: this.stream,
      });

      peer.on("signal", (data) => {
        this.socket.emit("callUser", {
          userToCall: idOtherUser,
          signalData: data,
          from: this.yourID,
        });
      });

      peer.on("stream", (stream) => {
        if (this.$refs.partnerVideo) {
          this.$refs.partnerVideo.srcObject = stream;
          this.$refs.partnerVideo.play();
        }
      });

      this.socket.on("callAccepted", (signal) => {
        this.callAccepted = true;
        peer.signal(signal);
      });
    },

    acceptCall() {
      this.callAccepted = true;
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: this.stream,
      });
      peer.on("signal", (data) => {
        this.socket.emit("acceptCall", { signal: data, to: this.caller });
      });

      peer.on("stream", (stream) => {
        this.$refs.partnerVideo.srcObject = stream;
        this.$refs.partnerVideo.play();
      });

      peer.signal(this.callerSignal);

      this.receivingCall = false;
    },

    init() {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.stream = stream;
        this.$refs.userVideo.srcObject = stream;
        this.$refs.userVideo.play();
      });

      console.log(this.socket);
      this.socket.on("yourID", (id) => {
        this.yourID = id;
      });
      this.socket.on("allUsers", (users) => {
        this.users = users;
      });

      this.socket.on("hey", (data) => {
        this.receivingCall = true;
        this.caller = data.from;
        this.callerSignal = data.signal;
      });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
}

.divVideos {
  background-color: rgba(0, 0, 0, 0.8);
  width: 345px;
  height: 250px;
}
video,
.btns-events {
  position: absolute;
}
</style>