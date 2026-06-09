import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('../views/Home.vue'), meta: { tab: true } },
  { path: '/category', component: () => import('../views/Category.vue'), meta: { tab: true } },
  { path: '/cart', component: () => import('../views/Cart.vue'), meta: { tab: true } },
  { path: '/mine', component: () => import('../views/Mine.vue'), meta: { tab: true } },
  { path: '/dish/:id', component: () => import('../views/DishDetail.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
