<template>
  <div>
    <v-navigation-drawer
      absolute
      temporary
      grow
      dark
      v-bind="$attrs"
      v-on="$listeners"
    >
      <v-list>
        <v-avatar v-if="avatarUser" size="210" class="imagePreviewWrapper">
          <img :src="avatarUser.url" />
        </v-avatar>
        <v-avatar v-else size="210" class="imagePreviewWrapper">
          <img
            src="https://image.winudf.com/v2/image1/YnIuY29tLmFwcHN3cy5lcnZhbWF0ZV9zY3JlZW5fMV8xNTYwNjk2NzMxXzAzNw/screen-1.jpg?fakeurl=1&type=.jpg"
          />
        </v-avatar>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.status }}</v-list-item-subtitle>
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

      <v-divider></v-divider>

      <v-list dense nav :value="activeBtn">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-bottom-navigation>
        <v-btn icon @click="logout()" alt="Logoff" title="Logoff">
          <span>logout</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
        <v-btn icon title="Config" @click="dialog = true">
          <span>config</span>
          <v-icon>mdi-multiplication-box</v-icon>
        </v-btn>
      </v-bottom-navigation>
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
  name: "Drawer",
  components: {
    ConfigProfile: () => import("../settings/ConfigProfile"),
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    activeBtn: 0,
    dialog: false,
  }),

  methods: {
    logout() {
      this.$store.dispatch("signOut");
    },
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
      return this.$store.getters.getAddress;
    },
  },
};
</script>
<style scoped>
.imagePreviewWrapper {
  display: block;
  margin: 10px auto 10px;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>