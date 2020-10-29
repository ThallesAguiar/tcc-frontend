<template>
  <v-row>
    <v-col
      cols="12"
      xs="12"
      sm="6"
      md="4"
      lx="2"
      v-for="users in users_4_matche"
      :key="users._id"
    >
    
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="users.id_avatar.url || img_default"
        >
          <v-card-title>{{ users.name }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0"
          >Status: {{ users.status }}</v-card-subtitle
        >

        <v-card-text class="text--primary">
          <div>
            Live: {{ users.id_address.city }} - {{ users.id_address.state }} -
            {{ users.id_address.country }}
          </div>

          <div>From: Santo Ângelo - RS - BR</div>

          <div>
            Bio: Um cara legal que só quer tomar mate e sente sdd das raízes
            gaúchas. Ah! e GREMISTA
          </div>
        </v-card-text>

        <v-card-actions class="text-center">
          <v-col cols="12">
            <v-row class="justify-space-around">
              <!-- <v-bottom-navigation
          grow
          shift
              >-->
              <v-btn x-large text @click="dislike(users._id)">
                <v-img src="@/assets/dislike.svg" />
              </v-btn>

              <v-btn x-large text @click="like(users._id)">
                <v-img src="@/assets/like.svg" />
              </v-btn>
              <!-- </v-bottom-navigation> -->
            </v-row>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
import config from "@/config/configAxios";
export default {

  data:()=>({
    users_4_matche: {},
    img_default: "https://s2.glbimg.com/6AluNgYKtLnLlFu879n1qabnlfA=/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2019/Z/F/A4uBECQrKTfnCngyQdqw/ca-05681-r.jpg"
  }),

  // computed: {
  //   async users4matche(){
  //   const response_user = await axios.get(`${config.apiURL}/users`);
  //   console.log(response_user.data)

  //   if(!response_user) {
  //     console.error(response_user);
  //     return false;
  //   } 

  //   return this.users_4_matche = response_user.data;
  //   }
  // },

  async created() {
    const response_user = await axios.get(`${config.apiURL}/users`);
    console.log(response_user)

    if(!response_user) {
      console.error(response_user);
      return false;
    } 

    this.users_4_matche = response_user.data;
  },

  methods: {
    like(id){
      console.log(`Deu like no id ${id}`)
    },
    dislike(id){
      console.log(`Deu dislike no id ${id}`)
    },
  },
};
</script>

<style scoped>
</style>