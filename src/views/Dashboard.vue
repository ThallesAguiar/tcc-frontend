<template>
  <div>
    <Navbar />
    <DrawerWeb v-if="this.$route.path === '/dashboard'" />
    <Notifications v-if="this.$route.path === '/dashboard'" />

    <router-view />
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {
    Navbar: () => import("@/components/navigations/NavBar"),
    DrawerWeb: () => import("@/components/navigations/DrawerWeb"),
    Notifications: () => import("@/components/dashboard/Notifications"),
  },
  data: () => ({}),

  created() {
    //Guardar as coordenadas no BD para mostrar no mapa dos outros usuarios
    this.$getLocation({})
      .then((coordinates) => {
        // console.log(coordinates, "COORDENADAS");
        try {
          const { lng, lat } = coordinates;
          const userId = localStorage.getItem("userId");

          axios
            .put(`/coordinates/${userId}`, {
              lat,
              lng,
            })
            .then((response) => {
              const { lng, lat } = response.data;
              const coordinates = Object.values({ lng, lat });
              console.log(coordinates);
              localStorage.setItem("coordinates", JSON.stringify(coordinates));
            });
        } catch (error) {
          console.log(error, "Error in coordinates");
        }
      })
      .catch((error) => alert(error));
  },
};
</script>
