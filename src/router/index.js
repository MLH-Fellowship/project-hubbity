import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Logout from '../views/Logout.vue';
import NotFound from '../views/404View.vue';

const router = createRouter({
  linkExactActiveClass: 'active',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound,
    },
  ],
});

export default router;
