<template>
<div id="cssmenu">
<ul>
   <li><router-link to="/"><div class="leftnav-home"></div></router-link></li>
   <q-separator class="profile-sep"/>
   <q-separator class="leftnav-sep"/>
   <li class="has-sub icon-pad">    
                  <div class="addclaim-icon" clickable @click="claimRegistration = true"></div>
                           <add-claim-registration
          :activate.sync="claimRegistration" 
        />
   </li>
   <q-separator class="profile-sep"/>
   <q-separator class="leftnav-sep"/>
   <li class="has-sub icon-pad">    
                  <div class="audit-icon"></div>
      <ul>
         <li class="has-sub text-white">AUDIT TOOLS</li> 
         <li class="has-sub"><router-link to="/"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Email Audits</router-link></li>
         <li class="has-sub"><router-link to="/"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Batch Resend Emails</router-link></li>
         <li class="has-sub"><router-link to="/"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Daily Audits</router-link></li>
      </ul>
   </li>
   
   <q-separator class="profile-sep"/>
   <q-separator class="leftnav-sep"/>
   <li class="has-sub icon-pad">    
                  <div class="claims-icon"></div>
      <ul>
         <li class="has-sub text-white">CLAIMS</li> 
         <li class="has-sub"><router-link to="/claim-search"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Search Claims</router-link></li>
         <li class="has-sub"><router-link to="/"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Batch  Update Claims</router-link></li>
      </ul>
   </li>
   <q-separator class="profile-sep"/>
   <q-separator class="leftnav-sep"/>
   <li class="has-sub icon-pad">    
                  <div class="contacts-icon"></div>
      <ul class="contact-longtext">
         <li class="has-sub text-white">CONTACTS</li> 
         <li class="has-sub"><router-link to="/contacts"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>All Contacts</router-link></li>
         <li class="has-sub"><router-link to="/contacts?type=1"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Client State Officer</router-link></li>
         <li class="has-sub"><router-link to="/contacts?type=2"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Assessor</router-link></li>
         <li class="has-sub"><router-link to="/contacts?type=3"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Claims Handler</router-link></li>
         <li class="has-sub"><router-link to="/contacts?type=4"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Claimant</router-link></li>
         <li class="has-sub"><router-link to="/contacts?type=5"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Hub Site</router-link></li>
         <li class="has-sub"><router-link to="/contacts?type=6"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Insurer</router-link></li>
         <li class="has-sub"><router-link to="/contacts?type=7"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Provider</router-link></li>
         <li class="has-sub"><router-link to="/contacts?type=8"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Insurer Claims Handler</router-link></li>
         <li class="has-sub"><router-link to="/contacts?type=9"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>External Assessor</router-link></li>
         <li class="has-sub"><router-link to="/contacts?type=10"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Broker Office</router-link></li>
         <li class="has-sub"><router-link to="/contacts?type=11"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Broker</router-link></li>
      </ul>
   </li>
   <q-separator class="profile-sep"/>
   <q-separator class="leftnav-sep"/>
   <li class="has-sub icon-pad">    
                  <div class="reports-icon"></div>
      <ul>
         <li class="has-sub text-white">REPORTS</li> 
         <li class="has-sub"><router-link to="/"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Time Billing Report</router-link></li>
      </ul>
   </li>
   <q-separator class="profile-sep"/>
   <q-separator class="leftnav-sep"/>
   <li class="has-sub icon-pad">    
                   <div class="dashboards-icon"></div>

      <ul class="leftnav-longtext">
         <li class="has-sub text-white">OTHER DASHBOARDS</li> 
         <li class="has-sub"><router-link to="/"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Appointments</router-link></li>
         <li class="has-sub"><router-link to="/"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>External Allocation Dashboard</router-link></li>
         <li class="has-sub"><router-link to="/"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Supply Chain Dashboard</router-link></li>
         <li class="has-sub"><router-link to="/"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Payment Authorization Dashboard</router-link></li>
         <li class="has-sub"><router-link to="/"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>Project Manager Dashboard</router-link></li>
         <li class="has-sub"><router-link to="/"><q-icon name="keyboard_arrow_right" class="leftnav-arrow"/>ProjectAssist Dashboard</router-link></li>
      </ul>
   </li>
</ul>
                  <q-separator class="profile-sep"/>
                  <q-separator class="leftnav-sep"/>
</div>
        
</template>
<script>
import AddClaimRegistration from "components/AddClaimRegistration";
export default {
  components: {
    AddClaimRegistration
  },
  data () {
    return {
      leftDrawerOpen: true,
      claimRegistration: false
    }
  }
}
</script>
<style lang="scss">
  // $
  @import '../css/components.scss';
</style>