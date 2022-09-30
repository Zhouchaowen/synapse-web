import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/index',
    component: () => import('../components/common/layoutIndex.vue'),
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
        name: 'accountSet',
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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
