// import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

const userToken = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

// export default axios.create({
//     baseURL: 'http://localhost:3333'
//   });

export default {
    apiURL: process.env.VUE_APP_API_URL,
}


// Vue.use({
//     install(Vue) {
//         const userToken =  localStorage.getItem("token");
//         Vue.prototype.$http = axios.create({
//             baseURL: 'http://localhost:3333',
//             headers: {
//                 "Authorization": `Bearer ${userToken}`,
//             }
//         })
//     }
// })