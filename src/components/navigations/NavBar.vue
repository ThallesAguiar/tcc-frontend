<template>
  <div>
    <v-app-bar app clipped-left color="teal" dark>
      <v-avatar size="50" class="hidden-sm-and-down">
        <img v-if="this.$route.path !== '/dashboard'" :src="avatarUser.url" @click="overlay = !overlay" />
      </v-avatar>

      <!-- <v-icon class="mx-4" large>mdi-food-variant</v-icon> -->
      <v-toolbar-title class="mr-12 align-center">
        <span class="text-h4 font-weight-black mx-4">Matchê</span>
      </v-toolbar-title>
      <v-spacer />

      <div>
        <v-bottom-navigation class="hidden-sm-and-down" shift>
          <v-btn
            color="teal"
            v-for="(item, i) in items"
            :key="i"
            :to=" item.link"
            :exact="item.title === 'Home'"
          >
            <span>{{item.title}}</span>
            <v-icon>{{item.icon}}</v-icon>
          </v-btn>
        </v-bottom-navigation>
      </div>

      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
    </v-app-bar>

    <!-- DRAWER -->
    <drawer v-model="drawer" :items="items" />

    <!-- Este OVERLAY é para mostrar a img do usuario se ele clicar em cima do seu avatar -->
    <v-overlay :absolute="absolute" :value="overlay">
      <v-icon @click="overlay = false" style="cursor:pointer">mdi-close</v-icon>
      <img class="imagePreviewClicked" :src="avatarUser ? avatarUser.url : image " @click="overlay = false" />
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {
    Drawer: () => import("./DrawerMobile"),
  },

  data: () => ({
    drawer: null,
    overlay: false,
    absolute: true,
    image:
      "https://image.winudf.com/v2/image1/YnIuY29tLmFwcHN3cy5lcnZhbWF0ZV9zY3JlZW5fMV8xNTYwNjk2NzMxXzAzNw/screen-1.jpg?fakeurl=1&type=.jpg",
    items: [
      { title: "Home", icon: "mdi-home", link: "dashboard" },
      { title: "Matchê", icon: "mdi-human-greeting", link: "matche" },
      { title: "Connect", icon: "mdi-earth", link: "map" },
      { title: "Reviews", icon: "mdi-video", link: "video" },
      { title: "Market", icon: "mdi-cart", link: "market" },
    ],
  }),

  computed: {
    avatarUser() {
      return this.$store.getters.getAvatar;
    },
    user() {
      return this.$store.getters.getUser;
    },
    address() {
      return this.$store.getters.getAddress;
    },
  },
};
</script>


<style>
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
</style>