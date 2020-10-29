<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="teal" dark flat>
                <v-toolbar-title>{{ texts.toolbar }}</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    label="Email"
                    name="email"
                    type="text"
                    prepend-icon="mdi mdi-email"
                    clearable
                    v-model="user.email"
                    required
                    :rules="emailRules"
                  />
                  <v-text-field
                    v-if="!isLogin"
                    label="Name"
                    name="name"
                    type="text"
                    prepend-icon="mdi mdi-account"
                    clearable
                    v-model="user.name"
                    :counter="21"
                    :rules="nameRules"
                    hint="At least 4 characters"
                    required
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    clearable
                    v-model="user.password"
                    :rules="passwordRules"
                    :type="showPassword ? 'text' : 'password'"
                    hint="At least 8 characters"
                    @click:append="showPassword = !showPassword"
                    required
                  />

                  <v-text-field
                    v-if="!isLogin"
                    id="confirm_password"
                    label="Confirm Password"
                    name="confirm_password"
                    prepend-icon="mdi-checkbox-multiple-marked-circle"
                    :append-icon="
                      showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :type="showConfirmPassword ? 'text' : 'password'"
                    clearable
                    v-model="confirm_password"
                    required="Confirmation is required"
                    :rules="[
                      user.password === confirm_password ||
                        'The password confirmation does not match',
                    ]"
                    @click:append="showConfirmPassword = !showConfirmPassword"
                  />

                  <v-switch
                    v-model="user.provider"
                    v-if="!isLogin"
                    class="ma-2"
                    label="Are you provider?"
                  ></v-switch>
                </v-form>
              </v-card-text>
              <v-btn block depressed @click="isLogin = !isLogin">{{
                texts.button
              }}</v-btn>
              <v-card-actions>
                <v-spacer />
                <v-btn color="teal" dark @click="submit()">{{
                  texts.toolbar
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

import config from "../../config/configAxios";
export default {
  name: "Login",

  data: () => ({
    isLogin: true,
    isLoading: false,
    provider: false,
    user: {
      email: "",
      name: "",
      password: "",
      provider: false,
    },
    confirm_password: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 21) || "Name must be less than 21 characters",
      (v) => (v && v.length >= 4) || "Name must be more than 4 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 8) || "Min 8 characters",
    ],
    confirmPasswordRules: [(v) => !!v || "Confirmation is required"],
    valid: true,
    showPassword: false,
    showConfirmPassword: false,
  }),

  computed: {
    texts() {
      return this.isLogin
        ? { toolbar: "Login", button: "Criar conta" }
        : { toolbar: "Criar conta", button: "Já tenho uma conta" };
    },
  },

  methods: {
    async submit() {
      if (this.isLogin) {
        try {
          const response = await axios.post(`/sessions`, {
            email: this.user.email,
            password: this.user.password,
          });

          const {
            provider,
            email,
            name,
            _id,
            status,
            gender,
            phone,
            birthday,
          } = response.data.user;

          const token = response.data.token;

          const { _id: idAvatar, path, url } = response.data.user.id_avatar;

          const { country, state, city } = response.data.user.id_address;

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

          this.$store.dispatch("loginDataAvatar", {
            idAvatar,
            path,
            url,
          });
          this.$store.dispatch("loginDataAddress", {
            country,
            state,
            city,
          });

          this.$router.push("/dashboard");
          
        } catch (error) {
          console.log(error);
        }
      } else {
        if (this.user.password !== this.confirm_password) {
          alert("The password confirmation does not match!");
          return false;
        }

        if (!this.user.password) {
          alert("The password does not empty!");
          return false;
        }

        // if (!this.user.provider) this.user.provider = false;

        try {
          const response = await axios.post(`/users`, this.user);

          const { provider, email, name, _id } = response.data.user;
          const token = response.data.token;

          this.$store.dispatch("signIn", {
            provider,
            email,
            name,
            _id,
            token,
          });

          this.$router.push("/firstAccess");
        } catch (error) {
          console.log(error);
        }

        //  process.env.VUE_APP_GRAPHQL,
      }
    },
  },
};
</script>