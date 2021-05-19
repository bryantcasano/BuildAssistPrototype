<template>
    <div class="banner col-xl-12 row">
        <q-card class="col-lg-2 col-md-2 col-sm-6 q-card-banner">
            <div class="claim-summary__cardcontent row">
                <span class="col-lg-6 col-md-4 col-xs-12 banner-claimno">Q12345</span>
            </div>
           <div class="claim-summary__cardcontent row">
                  <q-btn class="watchlist-icon" @click="hasError=!hasError" :class="{ 'sensitive-icon': hasError }">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                    <q-tooltip v-if="hasError===true">Being Watched</q-tooltip>
                    <q-tooltip v-else>Add to Watchlist</q-tooltip>
                  </q-btn>
                  <q-btn class="watchlist-icon" icon="sticky_note_2" size="10px" @click="isActive=!isActive" :class="{ 'sensitive-icon': isActive }">
                    <!--i class="fa fa-file-alt" aria-hidden="true"></i>
                    <img src="~assets/icons/sensitive-icon.png"/-->
                    <q-tooltip v-if="isActive===true">Sensitive Claim</q-tooltip>
                    <q-tooltip v-else>Mark as Sensitive Claim</q-tooltip>
                  </q-btn>
            </div> 
        </q-card >
        <q-card class="col-lg-3 col-md-3 col-sm-6 q-card-banner">
            <div class="claim-summary__cardcontent row">
                <label class="col-lg-6 col-md-4 col-xs-12 banner-col1">Claimant:</label>
                <span class="col-lg-6 col-md-12 col-xs-12 banner-field">Mr. Jacob Patterson</span>
            </div>
           <div class="claim-summary__cardcontent row">
                <label class="col-lg-6 col-md-4 col-xs-12 banner-col1">Preferred Contact:</label>
                <span class="col-lg-6 col-md-12 col-xs-12 banner-field">+34 9 290 2830</span>
            </div> 
            <div class="claim-summary__cardcontent row">
                <label class="col-lg-6 col-md-4 col-xs-12 banner-col1">Event Code:</label>
                <span class="col-lg-6 col-md-12 col-xs-12 banner-field">DAY TO DAY</span>
            </div>  
            <div class="claim-summary__cardcontent row">
                <label class="col-lg-6 col-md-4 col-xs-12 banner-col1">Insurer:</label>
                <span class="col-lg-6 col-md-12 col-xs-12 banner-field">Demo Insurance</span>
            </div>           
        </q-card >

        <q-card class="col-lg-3 col-md-3 col-sm-6 q-card-banner">
            <div class="claim-summary__cardcontent row">
                <label class="col-lg-6 col-md-4 col-xs-12 banner-col2">Assigned To:</label>
                <span class="col-lg-6 col-md-12 col-xs-12 banner-field">Tahlia Smith</span>
            </div>
           <div class="claim-summary__cardcontent row">
                <label class="col-lg-6 col-md-4 col-xs-12 banner-col2">Claims Handler:</label>
                <span class="col-lg-6 col-md-12 col-xs-12 banner-field">Kaylam Stein</span>
            </div> 
            <div class="claim-summary__cardcontent row">
                <label class="col-lg-6 col-md-4 col-xs-12 banner-col2">Assessor:</label>
                <span class="col-lg-6 col-md-12 col-xs-12 banner-field">Geoffrey Macnab</span>
            </div>  
            <div class="claim-summary__cardcontent row">
                <label class="col-lg-4 col-md-4 col-xs-12 banner-col2">Ext. Assessment:</label>
                <span class="col-lg-8 col-md-12 col-xs-12 banner-field">Absolute Building and Maintenance</span>
            </div>
            </q-card >

          <q-card class="col-lg-3 col-md-3 col-sm-6 q-card-banner">
            <div class="claim-summary__cardcontent row">
                <label class="col-lg-6 col-md-4 col-xs-12 banner-col3">Claimant Updates</label>
                <span class="col-lg-6 col-md-12 col-xs-12"><q-linear-progress size="15px" :value="claimantUpdates" class="claimant-updates-progress"/></span>
            </div>
           <div class="claim-summary__cardcontent row">
                <label class="col-lg-6 col-md-4 col-xs-12 banner-col3">Insurer Updates</label>
                <span class="col-lg-6 col-md-12 col-xs-12"><q-linear-progress size="15px" :value="insurerUpdates" class="insurer-updates-progress" /></span>
            </div> 
            <div class="claim-summary__cardcontent row">
                <label class="col-lg-6 col-md-4 col-xs-12 banner-col3">Diary Tasks</label>
                <span class="col-lg-6 col-md-12 col-xs-12"><q-badge color="red">> 12</q-badge></span>
            </div>  
            <div class="claim-summary__cardcontent row">
                <label class="col-lg-6 col-md-4 col-xs-12 banner-col3">Scope Queries</label>
                <span class="col-lg-6 col-md-12 col-xs-12"><q-badge color="green">2</q-badge></span>
            </div>
        </q-card >
    </div>  
</template>
<script>
export default {
    data () {
        return {
            isActive: false,
            hasError: false,
            claimantUpdates: 0.4,
            insurerUpdates: 0.8,
        }
    }
}
</script>