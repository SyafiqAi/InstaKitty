import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import isLoggedIn from '@/firebase/isLoggedIn'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Register.vue')
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/feed',
      name: 'feed',
      component: () => import('../views/Feed.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})


router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !await isLoggedIn()) {
    alert("You're not logged in")
    next("/");
  } else {
    next();
  }
})

export default router
