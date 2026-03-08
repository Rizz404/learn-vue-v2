// import AboutView from '@/views/AboutView.vue'
// import HomeView from '@/views/HomeView.vue'
import HomeViewFor72 from '@/views/HomeViewFor72.vue'
// import ProductDetail from '@/views/ProductDetail.vue'
// import ProductList from '@/views/ProductList.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  // { path: '/', name: 'home', component: HomeView },
  { path: '/', name: 'home', component: HomeViewFor72 },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
  { path: '/products', name: 'product-list', component: () => import('@/views/ProductList.vue') },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: () => import('@/views/ProductDetail.vue'),
  },
  {
    path: '/optimize',
    name: 'optimize',
    component: () => import('@/views/OptimizeView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
