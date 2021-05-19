import claimSearchRoutes from 'pages/claim-search/routes'
import claimSummaryRoutes from 'pages/claim-summary/routes'
import contactRoutes from 'pages/contacts/routes'
import dashboardRoutes from 'pages/dashboard/routes'
import diaryRoutes from 'pages/diary/routes'
import loginRoutes from 'pages/login/routes'


const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      ...claimSearchRoutes,
      ...claimSummaryRoutes,
      ...contactRoutes,
      ...dashboardRoutes,
      ...diaryRoutes
    ],
    redirect: '/diary'
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    meta: {
      guest: true
    },
    children: [
      ...loginRoutes
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/not-found/components/Error404.vue')
  })
}

export default routes
