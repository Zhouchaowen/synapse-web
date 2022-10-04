import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/index',
    component: () => import('../components/common/layout-index.vue'),
    children: [
      // 首页
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/Book/index')
      },
      // 账号设置
      {
        path: '/accountSet',
        name: 'account-set',
        component: () => import('../views/User/accountSet')
      },
      // 图
      {
        path: '/graph',
        name: 'graph',
        component: () => import('../components/Graph/graph')
      },
      // md
      {
        path: '/md',
        name: 'md-preview',
        component: () => import('../components/Graph/md-preview')
      },
      {
        path: 'addBook',
        name: "add-book",
        component: () => import('../components/User/add-book')
      },
      {
        path: 'bookList',
        name: "book-list",
        component: () => import('../components/User/book-list')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
