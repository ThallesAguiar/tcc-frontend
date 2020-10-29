<template>
  <v-container>
    <nav class="navbar">
      <!-- <v-btn icon><v-icon>mdi-cards</v-icon></v-btn>
      <v-btn icon><v-icon>mdi-comment</v-icon></v-btn>
      <v-btn icon><v-icon>mdi-account</v-icon></v-btn> -->
    <v-fab-transition>
      <v-btn
        @click="dialog = true"
        color="#fd5068"
        fab
        dark
        absolute
        left
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-fab-transition>
    </nav>


    <div v-if="users_4_matche[0]">
      <div v-for="users in users_4_matche" :key="users._id">
        <div class="photo-and-actions">
          <!-- Se tiver AVATAR -->
          <div
            v-if="users.id_avatar"
            class="photo"
            :style="{
              background: `url(${users.id_avatar.url})center center/cover`,
            }"
          >
            <div class="photo-text">
              <div class="photo-name-and-age">
                <h2>{{ users.name }}</h2>
                <h2>21</h2>
              </div>
              <h6 v-if="users.id_address">
                {{ users.id_address.city ? users.id_address.city : "" }} -
                {{ users.id_address.state ? users.id_address.state : "" }} -
                {{ users.id_address.country ? users.id_address.country : "" }}
              </h6>
              <div class="photo-bio">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Tempore architecto dicta tempora molestias neque sint inventore
                quis ab fuga est?
              </div>
            </div>
          </div>

          <!-- Se não tiver AVATAR -->
          <div
            v-else
            class="photo"
            style="
              background: url('https://s2.glbimg.com/6AluNgYKtLnLlFu879n1qabnlfA=/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2019/Z/F/A4uBECQrKTfnCngyQdqw/ca-05681-r.jpg')center center/cover;
            "
          >
            <div class="photo-text">
              <div class="photo-name-and-age">
                <h2>{{ users.name }}</h2>
                <h2>21</h2>
              </div>
              <h6 v-if="users.id_address">
                {{ users.id_address.city ? users.id_address.city : "" }} -
                {{ users.id_address.state ? users.id_address.state : "" }} -
                {{ users.id_address.country ? users.id_address.country : "" }}
              </h6>
              <div class="photo-bio">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Tempore architecto dicta tempora molestias neque sint inventore
                quis ab fuga est?
              </div>
            </div>
          </div>

          <div class="actions">
            <div class="action">
              <v-btn fab large @click="dislike(users._id)"
                ><v-icon color="#fd5068">mdi-heart-broken</v-icon></v-btn
              >
            </div>
            <div class="action">
              <v-btn fab @click="s_like(users._id)"
                ><v-icon color="#2db1ff">mdi-star</v-icon></v-btn
              >
            </div>

            <div class="action">
              <v-btn fab large @click="like(users._id)"
                ><v-icon color="#1be4a1">mdi-heart</v-icon></v-btn
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Caso acabe os usuarios proximos -->
    <div v-else class="photo-and-actions">
      <div
        class="photo"
        style="
          background: url('https://inglesnoteclado.com.br/wp-content/uploads/2015/08/Bateria-acabou-como-dizer-a-bateria-acabou-em-Ingl%C3%AAs.jpg')center center/cover;
        "
      >
        <div class="photo-text">
          <div class="photo-name-and-age">
            <h2>Aumente o seu alcance para encontrar novos mateiros</h2>
          </div>
          <!-- <div class="photo-bio">
                Aumente o seu alcance para encontrar novos mateiros
              </div> -->
        </div>
      </div>
    </div>

    <v-dialog v-model="dialog">
      <v-card>
        <div class="text-right">
          <v-btn text color="red" @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <ConfigMatche @dialogFalse="dialogFalseMethod" />

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import config from "@/config/configAxios";
export default {
  name: "Matche",
  components: {
    ConfigMatche: () => import("../components/settings/ConfigMatche"),
  },
  data: () => ({
    users_4_matche: [],
    dialog: false,
    img_default:
      "https://s2.glbimg.com/6AluNgYKtLnLlFu879n1qabnlfA=/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2019/Z/F/A4uBECQrKTfnCngyQdqw/ca-05681-r.jpg",
  }),

  async created() {
    this.initMatche();

    console.log(navigator)
  },

  methods: {
    dialogFalseMethod() {
      this.dialog = false;
    },
    async s_like(id) {
      console.log(`Deu super like no id ${id}`);
      const response_super_like = await axios.post(
        `${config.apiURL}users/${id}/likes`
      );
      return this.initMatche();
    },
    async like(id) {
      console.log(`Deu like no id ${id}`);
      const response_like = await axios.post(
        `${config.apiURL}users/${id}/likes`
      );
      return this.initMatche();
    },
    async dislike(id) {
      console.log(`Deu dislike no id ${id}`);
      const response_dislike = await axios.post(
        `${config.apiURL}users/${id}/dislikes`
      );
      return this.initMatche();
    },

    async initMatche() {
      const response_user = await axios.get(`${config.apiURL}users`);
      console.log(response_user.data);

      if (!response_user) {
        console.error(response_user);
        return false;
      }

      this.users_4_matche = response_user.data;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  height: 100vh;
  width: 100%;
  font-family: "Roboto", sans-serif;
  background: #f5f7fa;
}

/* Navbar */
.navbar {
  display: flex;
  padding: 10px 0;
  justify-content: space-around;
  width: 100%;
  height: 44px;
}

.photo-and-actions {
  height: calc(100vh - 150px);
  /* height: calc(100vh - 44px); */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
}

/* Photo */
.photo {
  width: 98vw;
  height: 85vh;
  /* background: url("https://s2.glbimg.com/6AluNgYKtLnLlFu879n1qabnlfA=/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2019/Z/F/A4uBECQrKTfnCngyQdqw/ca-05681-r.jpg")
    center center/cover; */
  border-radius: 10px;
  display: flex;
  align-items: flex-end;
  color: #eee;
  box-shadow: 0 2px 10px 0 rgba(136, 136, 136, 0.77);
}

.photo-text {
  padding: 15px;
  background: rgb(2, 0, 36);
  background: rgb(2, 0, 36);
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(35, 34, 65, 0) 0%,
    rgba(0, 0, 0, 0.7) 52%
  );
  border-radius: 10px;
}

.photo-name-and-age {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.photo-name-and-age h2 {
  font-size: 1.8rem;
}

.photo-name-and-age h2:nth-child(2) {
  margin-left: 10px;
  font-weight: 500;
}

.photo-bio {
  line-height: 1.7rem;
  font-weight: 500;
  font-size: 1.1rem;
}

/* Actions */
.actions {
  flex: auto;
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  font-size: 2rem;
  box-shadow: 0 2px 6px 0 rgba(112, 125, 134, 0.14);
}

/* btn de super like tem este margin para distanciar os outros dois dele. */
.actions .action:nth-child(2) {
  margin: 0 2rem;
}

/* 1025px or more */
@media (min-width: 1025px) {
  .photo {
    width: 367px;
    height: 684px;
  }

  .actions {
    flex: initial;
  }

  .photo-and-actions {
    justify-content: center;
  }

  .navbar {
    width: 400px;
    margin: auto;
  }
}
</style>