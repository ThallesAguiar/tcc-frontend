<template>
  <div>
    <Navbar />
    <DrawerWeb v-if="this.$route.path === '/dashboard'" />
    <Notifications v-if="this.$route.path === '/dashboard'" />
    
    <router-view />
  </div>
</template>

<script>
export default {
  components: {
    Navbar: () => import("@/components/navigations/NavBar"),
    DrawerWeb: () => import("@/components/navigations/DrawerWeb"),
    Notifications: () => import("@/components/dashboard/Notifications"),
  },
  data: () => ({}),
};
</script>
