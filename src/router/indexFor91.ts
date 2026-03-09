// import AboutView from '@/views/AboutView.vue'
// import HomeView from '@/views/HomeView.vue'
import HomeViewFor72 from '@/views/HomeViewFor72.vue'
// import ProductDetail from '@/views/ProductDetail.vue'
// import ProductList from '@/views/ProductList.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'todo-list',
    component: () => import('@/views/TodoListView.vue'),
  },
  // {
  //   path: '/todo/:id',
  //   name: 'todo-detail',
  //   component: () => import('@/views/TodoDetailView.vue'),
  // },
]

const routerFor91 = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default routerFor91
