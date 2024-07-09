import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../components/services/authPass'
import { validateToken  } from '../components/services/validateAuth'

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: '',

      component: () => import('../views/displayPassword.vue'),

      meta: { requiresAuth: true }
    },

    {
      path: '/login',
      name: 'Login',

      component: () => import('../components/authentication/auth.vue'),
    },
   
    {
      path: '/loadingPage',
      name: 'pageLoading',

      component: () => import('../views/loadingAplication.vue'),

    },

    {
      path: '/hub',
      name: 'hub',

      component: () => import('../views/displayPassword.vue'),
      meta: { requiresAuth: true }
    },


    {
      path: '/add',
      name: 'add',

      component: () => import('../views/creat-Password.vue'),
      meta: { requiresAuth: true }
    },
  ],
  
});

router.beforeEach(async (to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = getToken();
    if (!token) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      const isValid = await validateToken(token);
      if (!isValid) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});


export default router;
