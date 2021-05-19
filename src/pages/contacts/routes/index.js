
const contactRoutes = [
    {
        path: '/contacts',
        component: () => import('pages/contacts/components/ContactList.vue'),
    },
    {
        path: '/contacts/:id',
        component: () => import('pages/contacts/components/ContactDetails.vue'),
    }
  ];
  
  export default contactRoutes
  