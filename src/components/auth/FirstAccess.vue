<template>
  <form enctype="multipart/form-data">
    <v-row justify="center">
      <v-card>
        <v-alert type="info" class="text-center text-h5">
          Olá {{ user.name }}, Bem-vindo ao Matchê
          <br />
          <small
            >Estamos quase lá, só precisamos que forneça mais alguns dados, para
            que se torne melhor a sua experiência no Matchê.</small
          >
        </v-alert>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-avatar
                  size="210"
                  v-if="previewImage"
                  class="imagePreviewWrapper"
                >
                  <img
                    :src="previewImage"
                    @click="overlay = !overlay"
                    id="imagePerfil"
                  />
                </v-avatar>
                <v-avatar size="210" v-else class="imagePreviewWrapper">
                  <img
                    src="https://image.winudf.com/v2/image1/YnIuY29tLmFwcHN3cy5lcnZhbWF0ZV9zY3JlZW5fMV8xNTYwNjk2NzMxXzAzNw/screen-1.jpg?fakeurl=1&type=.jpg"
                    @click="selectImage"
                  />
                </v-avatar>
                <v-overlay :absolute="absolute" :value="overlay">
                  <v-icon @click="overlay = false" style="cursor: pointer"
                    >mdi-close</v-icon
                  >
                  <img
                    class="imagePreviewClicked"
                    :src="previewImage"
                    @click="overlay = false"
                  />
                </v-overlay>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <input
                  type="file"
                  @change="onFileSelected"
                  ref="fileInput"
                  @input="pickFile"
                />
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  label="Status"
                  hint="Add a Status, be happy"
                  persistent-hint
                  rows="1"
                  prepend-icon="mdi-comment"
                  v-model="status"
                ></v-textarea>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-select
                  prepend-icon="mdi-gender-male-female"
                  :items="['Female', 'Male', 'Other']"
                  label="Gender*"
                  v-model="gender"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <vue-tel-input-vuetify
                  v-model="phone"
                  hint="(DDD)number"
                  persistent-hint
                ></vue-tel-input-vuetify>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="date of birth*"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false"
                      >Cancel</v-btn
                    >
                    <v-btn text color="primary" @click="$refs.menu.save(date)"
                      >OK</v-btn
                    >
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <span class="headline">User location data</span>
                <v-btn color="primary" dark icon @click.stop="dialog = true">
                  <v-icon>mdi-information</v-icon>
                </v-btn>

                <v-dialog v-model="dialog" max-width="280">
                  <v-card>
                    <v-card-title class="headline"
                      >Why do we need this information?</v-card-title
                    >

                    <v-card-text
                      >Location information will help you find people nearby.
                      And informing your location in the videos, however, it is
                      not mandatory to show your location.</v-card-text
                    >

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" text @click="dialog = false"
                        >OK! got it</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Country*"
                  hint="Add your country"
                  v-model="location.country"
                  prepend-icon="mdi-flag"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="State*"
                  hint="Abbreviate your state"
                  v-model="location.state"
                  prepend-icon="mdi-star-outline"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="City*"
                  hint="Add your City"
                  v-model="location.city"
                  prepend-icon="mdi-city"
                ></v-text-field>
              </v-col>

              <v-dialog
                v-model="errorInsert"
                max-width="280"
                v-if="errorInsert.value"
              >
                <v-card>
                  <v-alert type="error">
                    <v-card-title class="headline" color="red darken-1"
                      >Error {{ errorInsert.name }}</v-card-title
                    >
                  </v-alert>

                  <v-card-text
                    >Erro in {{ errorInsert.name }} in type
                    {{ errorInsert.type }}</v-card-text
                  >

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red darken-1"
                      text
                      @click="errorInsert.value = false"
                      >OK! got it</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </form>
</template>

<script>
import axios from "axios";

import config from "../../config/configAxios";

export default {
  data: () => ({
    user: {},
    image:
      "https://image.winudf.com/v2/image1/YnIuY29tLmFwcHN3cy5lcnZhbWF0ZV9zY3JlZW5fMV8xNTYwNjk2NzMxXzAzNw/screen-1.jpg?fakeurl=1&type=.jpg",
    previewImage: null,
    overlay: false,
    absolute: true,
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!",
    ],
    errorInsert: {
      name: "",
      type: "",
      value: false,
    },
    menu: false,
    dialog: false,
    selectedFile: null,
    status: "",
    gender: "",
    phone: null,
    date: "",
    location: {
      country: "",
      state: "",
      city: "",
    },
  }),

  methods: {
    /** IMAGEM/FILE*/
    /**Quando inserir a imagem, o this. recebe o valor da imagem */
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },

    selectImage() {
      this.$refs.fileInput.click();
    },
    pickFile() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.$emit("input", file[0]);
      }
    } /** ./IMAGEM/FILE*/,

    async save() {
      // console.log(axios)
      /**Insert FILE/AVATAR */
      var id_avatar = null;
      if (this.selectedFile) {
        const formData = new FormData(); /**Este formData serve para validar o envio de arquivos. */
        formData.append("file", this.selectedFile);
        const response_file = await axios.post(`/files`, formData);
        // console.log(response_file)

        id_avatar = response_file.data._id;

        if (!response_file) {
          this.errorInsert.name = "File";
          this.errorInsert.type = "Insert";
          this.errorInsert.value = true;
          console.error("response_file");
          return false;
        }
      }

      /**Insert LOCATION */
      const response_address = await axios.post(`/address`, this.location);

      if (!response_address) {
        this.errorInsert.name = "Address";
        this.errorInsert.type = "Insert";
        this.errorInsert.value = true;
        console.error("response_address");
        return false;
      }

      /**Update USER */
      const response_user = await axios.put(`/users`, {
        id_avatar: id_avatar,
        id_address: response_address.data.location._id,
        status: this.status,
        birthday: this.date,
        gender: this.gender,
        phone: this.phone,
      });

      console.log(response_user.data);

      const {
        provider,
        email,
        name,
        _id,
        status,
        gender,
        phone,
        birthday,
      } = response_user.data;

      const token = localStorage.getItem("token");

      this.$store.dispatch("signIn", {
        provider,
        email,
        name,
        status,
        gender,
        phone,
        birthday,
        _id,
        token,
      });

      // ADDRESS  gettingAddressUser
      const {_id:idAddress, country, state, city} = response_user.data.id_address;
      const address = {idAddress, country, state, city}
      this.$store.commit("gettingAddressUser", address);

      // AVATAR   gettingAvatarUser
      const {_id:idAvatar, path, url} = response_user.data.id_avatar;
      const avatar = {idAvatar, path, url};
      this.$store.commit("gettingAvatarUser", avatar);

      if (!response_user) {
        this.errorInsert.name = "User";
        this.errorInsert.type = "Insert";
        this.errorInsert.value = true;
        console.error(response_user);
        return false;
      }
      
      this.$router.push("/dashboard");
    },
  },

  created() {
    this.user = this.$store.getters.getUser;
    // axios.get('https://restcountries.eu/rest/v2/all').then(response=>{
    //   console.log(response.data);
    // });
  },
};
</script>

<style>
.imagePreviewWrapper {
  display: block;
  cursor: pointer;
  margin: 0 auto 10px;
  background-color: rgba(0, 0, 0, 0.1);
}

.imagePreviewClicked {
  width: calc(100% - 20px);
  height: calc(100% - 23px - 65px - 47px - 16px);
  min-width: 300px;
  max-width: 355px;
  display: block;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}

#imagePerfil {
  width: 80%;
  border-radius: 1%;
  background-size: cover;
}
</style>