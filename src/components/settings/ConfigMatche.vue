<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="12">
        <v-textarea
          label="Bio"
          hint="Add a bio"
          v-model="bio"
          rows="1"
          prepend-icon="mdi-fingerprint"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-card>
      <v-card-title>
        Distância de <strong> {{ slider.val }}{{ distanceType }}</strong>
      </v-card-title>
      <v-slider
        v-model="slider.val"
        :thumb-color="slider.color"
        thumb-label
        :thumb-size="21"
        min="1"
        max="500"
        append-icon="mdi-plus-circle"
        prepend-icon="mdi-minus-circle"
        @click:append="zoomIn"
        @click:prepend="zoomOut"
      ></v-slider>
    </v-card>
    <br />
    <v-card>
      <v-card-title>
        Mostrar distâncias em <strong> {{ distanceType }}</strong>
      </v-card-title>
      <v-row align="center" justify="space-around">
        <v-btn
          large
          color="teal"
          dark
          v-model="distanceType"
          @click="convertKilometers(slider.val)"
          >Km</v-btn
        >
        <v-btn
          large
          color="teal"
          dark
          v-model="distanceType"
          @click="convertMiles(slider.val)"
          >Miles</v-btn
        >
      </v-row>
      <br />
    </v-card>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      slider: { label: "Distância em KM", val: 5, color: "teal" },
      distanceType: "Km",
      bio: "",
    };
  },
  methods: {
    convertMiles(distance) {
      this.distanceType = "Mi.";
      this.slider.val = distance / 1.609;
    },
    convertKilometers(distance) {
      this.distanceType = "Km";
      this.slider.val = distance * 1.609;
    },
    zoomOut() {
      this.slider.val = this.slider.val - 10 || 0;
    },
    zoomIn() {
      this.slider.val = this.slider.val + 10 || 100;
    },
    async save() {
      this.$emit("dialogFalse");
    },
  },
};
</script>

<style>
</style>