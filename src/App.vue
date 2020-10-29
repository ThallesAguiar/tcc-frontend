<template>
  <v-app>
    <v-main>
      <v-fade-transition mode="out-in">
      <router-view/>
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',

  data: () => ({
    //
  }),

  created(){
    axios.interceptors.request.use(async (config) => {
      // conferir se o token ainda ta valido, senão ele atualiza com um refresh
      
      // if (
      //   !config.url.endsWith('login') ||
      //   !config.url.endsWith('refresh') ||
      //   !config.url.endsWith('signup')
      // ) {
      //   const userTokenExpiration = new Date(await AsyncStorage.getItem('userTokenExpiration'));
      //   const today = new Date();
      //   if (today > userTokenExpiration) {
      //     // refresh the token here
      //     const userRefreshToken = await AsyncStorage.getItem('userRefreshToken');
      //   } else {

        const userToken = await localStorage.getItem("token");
        config.headers.Authorization = `Bearer ${userToken}`;
        console.log(config)
      //   }
      // }

      return config;
    }, (error) => {
      // I cand handle a request with errors here
      return Promise.reject(error);
    });
  }
};
</script>
