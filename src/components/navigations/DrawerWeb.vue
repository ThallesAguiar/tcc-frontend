<template>
  <div>
    <v-navigation-drawer
      absolute
      dark
      class="hidden-sm-and-down"
      transition="slide-x-transition"
      width="270"
    >
      <v-bottom-navigation height="40">
        <v-btn icon @click="logout()" alt="Logoff" title="Logoff">
          <span>logout</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
        <v-btn icon title="Config" @click="dialog = true">
          <span>config</span>
          <v-icon>mdi-multiplication-box</v-icon>
        </v-btn>
      </v-bottom-navigation>
      <v-list>
        <v-avatar v-if="avatarUser" size="250" class="imagePreviewWrapper">
          <img :src="avatarUser.url" />
        </v-avatar>
        <v-avatar v-else size="250" class="imagePreviewWrapper">
          <img
            src="https://image.winudf.com/v2/image1/YnIuY29tLmFwcHN3cy5lcnZhbWF0ZV9zY3JlZW5fMV8xNTYwNjk2NzMxXzAzNw/screen-1.jpg?fakeurl=1&type=.jpg"
          />
        </v-avatar>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle :title="user.status">{{
              user.status
            }}</v-list-item-subtitle>
            <v-list-item-subtitle
              v-if="address"
              :title="[
                address.city ? address.city : '',
                address.state ? address.state : ' - ',
                address.country ? address.country : '',
              ]"
            >
              <v-icon size="15">mdi-earth</v-icon>
              {{ address.city ? address.city : "-" }}
              {{ address.state ? `,${address.state}` : " " }}
              {{ address.country ? `- ${address.country}` : "" }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-dialog v-model="dialog">
      <v-card>
        <div class="text-right">
          <v-btn text color="red" @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <ConfigProfile @dialogFalse="dialogFalseMethod" />

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  components: {
    ConfigProfile: () => import("../settings/ConfigProfile"),
  },
  data: () => ({
    dialog: false,
    image:
      "https://image.winudf.com/v2/image1/YnIuY29tLmFwcHN3cy5lcnZhbWF0ZV9zY3JlZW5fMV8xNTYwNjk2NzMxXzAzNw/screen-1.jpg?fakeurl=1&type=.jpg",
  }),
  methods: {
    logout() {
      this.$store.dispatch("signOut");
    },

    // eventBus de quando concluir o update, o dialog recebe false para fechar o modal.
    dialogFalseMethod() {
      this.dialog = false;
    },
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
};
</script>
<style>
.imagePreviewWrapper {
  display: block;
  margin: 10px auto 10px;
}
</style>