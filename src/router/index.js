import Vue from 'vue';
import VueRouter from 'vue-router';
import jwt from 'jsonwebtoken';

// main routes
import mainRoutes from './main';

import errorPage from '../views/HTTP/httpError.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes : [
    {
      path: '/404',
      component: errorPage,
      props: {
        errorCode: '404',
        errorMessage: 'Esta página não existe de verdade...',
        errorLinkMessage: 'São apenas pixels coloridos...'
      }
    },
    {
      path: '/500',
      component: errorPage,
      props: {
        errorCode: '500',
        errorMessage: 'Algo não funcionou como deveria...',
        errorLinkMessage: 'Já tentou desligar e ligar de novo?'
      }
    },
    {
      path: '/',
      name: 'Login',
      component: () => import(/* webpackChunkName: "login" */ '../components/auth/Login.vue')
    },
    {
      path: '/firstAccess',
      name: 'FirstAccess',
      component: () => import(/* webpackChunkName: "firstaccess" */ '../components/auth/FirstAccess.vue'),
      meta: {
        requiresAuth: true,
      }
    },
  
    mainRoutes,
  
    {
      path: '*',
      redirect: '/404'
    }
  ]
});

// navigation guards before each
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (localStorage.getItem('user') === null) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      const token = localStorage.getItem('token');
      jwt.verify(token, process.env.VUE_APP_AUTH_SECRET, (err, decodedToken) => {
        if (err || !decodedToken) {
          next({
            path: "/",
            query: { redirect: to.fullPath }
          });
        }
        next()
      })
      next()
    }
  }
  // else if (to.matched.some(record => console.log(record))){

  // }

  /*
  else if (to.getMatchedComponents().length) { //verificar se há algum erro HTTP para informar
    Error error = {
      errorCode: '404',
      errorMessage: 'Página não encontrada',
      errorLinkMessage: 'Clique aqui para voltar.',
      errorLinkRoute: '/dashboard'
    }
    next(error)
  }*/
  else {
    next() // make sure to always call next()!
  }
})

router.onError(() => {
  router.push('/500')
})
export default router
