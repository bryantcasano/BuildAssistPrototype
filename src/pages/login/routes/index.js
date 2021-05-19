
const loginRoutes = [
    {
        name: 'login',
        path: '/login',
        component: () => import('pages/login/components/Login.vue') 
    },
    {
        name: 'forgot-password',
        path: '/forgot-password',
        component: () => import('pages/login/components/ForgotPassword.vue')
    },
    {
        name: 'password-reset-sent',
        path: '/password-reset/sent',
        component: () => import('pages/login/components/PasswordResetSent.vue')
    },
    {
        name: 'password-reset',
        path: '/password-reset',
        component: () => import('pages/login/components/PasswordReset.vue')
    },
    {
        name: 'password-reset-success',
        path: '/password-reset/success',
        component: () => import('pages/login/components/PasswordResetSuccess.vue') 
    },
  ];
  
  export default loginRoutes
  