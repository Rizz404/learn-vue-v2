import AboutView from '@/views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import ProductList from '@/views/ProductList.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/products', name: 'product-list', component: ProductList },
  { path: '/products/:id', name: 'product-detail', component: ProductDetail },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
