<template>
  <q-layout view="lHh LpR fFf">
    <!-- Header start -->
    <q-header bordered>
        <TheHeader />
    </q-header>
    <!-- Header End -->
    <!-- Left Drawer Start -->
    <q-drawer
      bordered
      :width="70"
      side="left"
      show-if-above
      :breakpoint="0"
      v-model="leftDrawerOpen"
      content-class="leftnav text-white"
      content-style="overflow:unset"
    >   
      <TheLeftNavigation />
    </q-drawer>
    
    <!-- Left Drawer End -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import TheHeader from 'components/TheHeader'
import TheLeftNavigation from 'components/TheLeftNavigation'

export default {
  name: 'MainLayout',
  components: {
    TheHeader,
    TheLeftNavigation
  },

  data () {
    return {
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#fff',
        width: '5px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#fff',
        width: '9px',
        opacity: 0.2
      },
      leftDrawerOpen: false,
      theLeftNavigations: [
        {
          title: 'Audit Tools',
          icon: 'img:statics/icons/my-list-icon.svg',
          link: '',
          styles: '',
          menus: [
            { title: 'Email Audits', link: '' },
            { title: 'Batch Resend Emails', link: '' },
            { title: 'Daily Audits', link: '' }
          ]
        },
        {
          title: 'Claims',
          icon: 'img:statics/icons/claims-icon.svg',
          link: '',
          styles: 'color: #C4ECCB',
          menus: [
            { title: 'Search Claims', link: 'claim-search' },
            { title: 'Batch Update Claim Details', link: '' }
          ]
        },
        {
          title: 'Contacts',
          icon: 'img:statics/icons/contacts-icon.svg',
          link: '',
          styles: 'color: #C4ECCB',
          menus: [
            { title: 'All Contacts', link: 'contacts' },
            { title: 'Client State Office', link: '' },
            { title: 'Assessor', link: '' },
            { title: 'Claims Handler', link: '' },
            { title: 'Claimant', link: '' },
            { title: 'Hub Site', link: '' },
            { title: 'Insurer', link: '' },
            { title: 'Provider', link: '' },
            { title: 'Insurer Claims Handler', link: '' },
            { title: 'External Assessor', link: '' },
            { title: 'Broker Office', link: '' },
            { title: 'Broker', link: '' },
          ]
        },
        {
          title: 'Reports',
          icon: 'img:statics/icons/reports-icon.svg',
          link: '',
          styles: 'color: #C4ECCB',
          menus: [
            { title: 'Time Billing Report', link: '' }
          ]
        },
        {
          title: 'Other Dashboards',
          icon: 'img:statics/icons/system-maintenance-icon.svg',
          link: '',
          styles: 'color: #C4ECCB',
          menus: [
              { title: 'Appointments', link: '' },
              { title: 'External Allocation Dashboard', link: '' },
              { title: 'Supply Chain Dashboard', link: '' },
              { title: 'Payment Authorization Dashboard', link: '' },
              { title: 'Project Manager Dashboard', link: '' },
              { title: 'ProjectAssist Dashboard', link: '' }
          ]
        }
      ]
    }
  }
}
</script>
