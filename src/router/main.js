export default {
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
  meta: {
    requiresAuth: true,
  },
  children: [
    {
      path: '/map',
      name: 'Map',
      component: () => import(/* webpackChunkName: "map" */ '../views/Map.vue'),
      meta: {
        requiresAuth: true,
      }
    }, {
      // path: '/matche',
      // name: 'Matche',
      // component: () => import(/* webpackChunkName: "matche" */ '../components/Matche.vue'),
      // meta: {
      //   requiresAuth: true,
      // }
      path: '/matche',
      name: 'Matche',
      component: () => import(/* webpackChunkName: "matche" */ '../views/Matche.vue'),
      meta: {
        requiresAuth: true,
      }
      // path: '/matche',
      // name: 'Matche',
      // component: () => import(/* webpackChunkName: "matche" */ '../views/VueTinder.vue'),
      // meta: {
      //   requiresAuth: true,
      // }
    }, {
      path: '/video',
      name: 'Video',
      component: () => import(/* webpackChunkName: "video" */ '../views/Video.vue'),
      meta: {
        requiresAuth: true,
      }
    }, {
      path: '/market',
      name: 'Market',
      component: () => import(/* webpackChunkName: "market" */ '../views/Market.vue'),
      meta: {
        requiresAuth: true,
      }
    },
  ]
}