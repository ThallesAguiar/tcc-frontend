<template>
  <MglMap :accessToken="accessToken" :mapStyle="mapStyle" :center="myCoordinates">
    <MglGeolocateControl position="top-right" :trackUserLocation="true" :showUserLocation="false" />
    <MglFullscreenControl />

    <MglMarker v-for="marker in markers" :key="marker.name" :coordinates="marker.coordinates">      
      <div slot="marker">
        <v-avatar size="30">
          <img src="https://randomuser.me/api/portraits/women/81.jpg" />
        </v-avatar>
      </div>

      <MglPopup :onlyText="true" anchor="top">
        <VCard>
          <div>{{marker.name}}</div>
        </VCard>
      </MglPopup>
    </MglMarker>

    <MglMarker v-if="(myCoordinates.lat && myCoordinates.lng) != 0" :coordinates="myCoordinates">
      <div slot="marker">
        <v-avatar v-if="avatarUser" size="30">
          <img :src="avatarUser.url" />
        </v-avatar>
        <v-avatar v-else size="30">
          <img src="https://image.winudf.com/v2/image1/YnIuY29tLmFwcHN3cy5lcnZhbWF0ZV9zY3JlZW5fMV8xNTYwNjk2NzMxXzAzNw/screen-1.jpg?fakeurl=1&type=.jpg" />
        </v-avatar>
      </div>
      <MglPopup :coordinates="myCoordinates" :onlyText="true" anchor="top">
        <VCard>
          <div>Você</div>
        </VCard>
      </MglPopup>
    </MglMarker>
  </MglMap>
</template>
<script>
import Mapbox from "mapbox-gl";
import {
  MglMap,
  MglGeolocateControl,
  MglFullscreenControl,
  MglMarker,
  MglPopup,
} from "vue-mapbox";
export default {
  components: {
    MglMap,
    MglGeolocateControl,
    MglFullscreenControl,
    MglMarker,
    MglPopup,
  },
  data() {
    return {
      myCoordinates: [0,0],
      // myCoordinates: [{
      //   lat: 0,
      //   lng: 0,
      // }],
      accessToken:
        "pk.eyJ1Ijoic29jaWFsbWF0ZSIsImEiOiJja2NmZHFiMGEwMWQ5MndsaWVzaGxjMHB6In0.Lp8pyQ2bmdw9rnSzkEtTdA", // your access token. Needed if you using Mapbox maps
      // accessToken: process.env.VUE_APP_TOKEN_MAPBOX,
      mapStyle: "mapbox://styles/mapbox/streets-v11", // your map style
      // mapStyle: process.env.VUE_APP_STYLE_MAPBOX, // your map style
      markers: [
        { coordinates: [-77.032, 38.913], name: "Amanda" },
        { coordinates: [-122.413184, 37.776366], name: "Scarlet" },
        { coordinates: [-54.26867, -28.28287], name: "Marcelo" },
        { coordinates: [-80.036731, 26.705947], name: "Thalles" },
        { coordinates: [-80.03963, 26.70585], name: "Amanda Cerni" },
        { coordinates: [-111.549668, 39.014], name: "Chris" },
      ],
    };
  },
    computed: {
    avatarUser() {
      if (this.$store.getters.getAvatar) return this.$store.getters.getAvatar;
      else return null;
    },
    user() {
      return this.$store.getters.getUser;
    },
    address() {
      if(this.$store.getters.getAddress) return this.$store.getters.getAddress;
      else return null;
    },
  },
  async created() {
    this.mapbox = Mapbox;
    
    this.$getLocation({})
      .then((coordinates) => {
        // console.log(coordinates, "COORDENADAS");
        const {lng, lat} =  coordinates;
        const coord = Object.values({lng, lat});
        this.myCoordinates = coord; 
        if(!localStorage.getItem('coordinates'))
          localStorage.setItem('coordinates', JSON.stringify(coord));
      })
      .catch((error) => alert(error));

    // navigator.geolocation.getCurrentPosition(
    //   () => {}, //sucesso
    //   () => {}, //erro
    //   {
    //     timeout: 2000,
    //     enableHighAccuracy: true, //pega a localização via GPS
    //     maximumAge: 1000, //como se fosse um cache, pra guardar a localização do GPS
    //   }
    // )
  },
  methods: {
    onMapLoaded() {
      console.log("loaded");
    },
  },
};
</script>


<style>
.mgl-map-wrapper {
  height: 700px;
}
body {
  margin: 0;
  padding: 0;
}
</style>