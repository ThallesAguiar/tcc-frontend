// import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = 'https://virtualmate-backend.herokuapp.com/' ||'http://localhost:3333';

const userToken = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;

// export default axios.create({
//     baseURL: 'http://localhost:3333'
//   });

export default {
    apiURL: 'https://virtualmate-backend.herokuapp.com/' || 'http://localhost:3333',
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