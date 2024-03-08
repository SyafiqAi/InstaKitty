import { createRouter, createWebHistory } from 'vue-router'
import isLoggedIn from '@/firebase/isLoggedIn'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/upload-image',
      name: 'upload-image',
      component: () => import('../views/UploadImage.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'posts',
      component: () => import('../views/Posts.vue')
    },
    {
      path: '/view-post/:postId',
      name: 'view-post',
      component: () => import('../views/ViewPost.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !(await isLoggedIn())) {
    alert("You're not logged in")
    next('/sign-in')
  } else {
    next()
  }
})

export default router
