<template>
<div class="claim-summary row">
      <!--Start Top banner -->     
      <ClaimBanner />
      <!--End Top banner -->     
 <div class="row col-xl-12 col-lg-12 col-md-12">
    <!-- Left Main tabs Start -->
    <q-splitter
      unit="px"
      style="width: 100%" 
      :limits="[200, 200]"
      v-model="splitterModel">
    <template v-slot:before>
      <q-tabs
        align="left"
        v-model="tab"
        vertical
        class="lefttab tab-title tab-title-inactive"
      >
        <template v-for="item in tabs">
          <q-tab
            :ripple="false"
            :name="item.name"
            @click="item.subVal = checkSubDefault(item)">
            <span class="q-tab__label" style="margin-left: -8px;">
                <i class="lefttab-icon"
                  :class="[ item.subVal && item.name === tab ? 'fa-chevron-down' : 'fa-chevron-right', 'fas']" 
                  v-bind:style="[ item.name === tab ? { 'opacity': '1', 'color': '#3570E0'} : {}]">
                </i>
                {{item.label}}
            </span>
          </q-tab>

          <q-tab-panels 
            animated
            vertical
            swipeable
            v-model="tab"
            v-if="item.subs"
            transition-prev="jump-up"
            transition-next="jump-up">
            <q-tab-panel :name="item.name" >
                <q-tabs
                  dense
                  vertical
                  v-model="item.subVal"
                  class="tab-title tab-title-inactive lefttab2">
                  <div v-if="item.id === 3" 
                    style="font-size: 14px; line-height: 1.715em; font-weight: bold; padding: 10px; border-bottom: 1px solid #dfe2e5;">
                    Group Category
                  </div>
                  <template v-for="sub in item.subs">
                    <q-tab
                      :ripple="false" 
                      v-if="!sub.subs" 
                      :name="sub.name" 
                      :label="sub.label"
                      @click="item.tab = ''" />
                    <template v-if="sub.subs">
                      <q-tab :name="sub.name" :label="sub.label" />
                      <q-tab-panels 
                        animated
                        vertical
                        swipeable
                        v-model="tab"
                        transition-prev="jump-up"
                        transition-next="jump-up">
                        <q-tab-panel :name="item.name">
                          <q-tabs
                            vertical
                            align="left"
                            v-model="item.tab"
                            class="tab-title tab-title-inactive lefttab2">
                            <q-tab
                              :ripple="false" 
                              :name="subthree.name"
                              :label="subthree.label"
                              v-bind:key="subthree.name"
                              v-for="subthree in sub.subs" 
                              @click="item.subVal = sub.name" />
                          </q-tabs>
                        </q-tab-panel>
                      </q-tab-panels>
                    </template>
                  </template>

                </q-tabs>
            </q-tab-panel>
          </q-tab-panels>
        </template>

      </q-tabs>
    </template>
    <!-- Left Main tabs END -->

      <template v-slot:after>
        <!--Start Tab panels -->
        <q-tab-panels v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up">
          <!--Start Lodgement Tab--> 
          <q-tab-panel name="lodgement" style="max-height:1200px;"> 
            <!-- Subtab Content Start -->
            <q-tab-panels 
              v-model="tabs[0].subVal"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >     
              <q-tab-panel name="claiminfo">
                    <LodgementClaimInfo />
              </q-tab-panel>

              <q-tab-panel name="policy">
                  <LodgementPolicyContact />
              </q-tab-panel>

              <q-tab-panel name="addresses">
                  <div class="text-h6">Addresses</div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>
              <q-tab-panel name="claimhistory">
                  <div class="text-h6">Claim History</div>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>
            </q-tab-panels>   
          </q-tab-panel>
          <!--End Lodgement tab--> 

          <q-tab-panel name="history">
            <History />
          </q-tab-panel> 
          
          <q-tab-panel name="rnp">
            <!-- Subtab Content Start -->
            <q-tab-panels v-model="tabs[2].subVal"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >     
                <q-tab-panel name="address-summary">
                    <q-table
                        class="sticky-column-table page__table address_summary_txt"
                        :data="addressSummaryData"
                        :columns="addressSummaryColumns"
                        :rows-per-page-options="[25, 50, 100]"
                        :hide-bottom="true"
                    />
                </q-tab-panel>

                <q-tab-panel name="C71567">
                   <reserves-payment />
                </q-tab-panel>

                <q-tab-panel name="C71567-TEST0001">
                    <div class="text-h6">C71567-TEST0001</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>

                <q-tab-panel name="C71567-TEST0002">
                    <div class="text-h6">C71567-TEST0002</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>

                <q-tab-panel name="C71567-TEST0003">
                    <div class="text-h6">C71567-TEST0003</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>
                <q-tab-panel name="C71567-TEST0004">
                    <div class="text-h6">C71567-TEST0004</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>
                <q-tab-panel name="C71567-TEST0005">
                    <div class="text-h6">C71567-TEST0005</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>
            </q-tab-panels>   
          </q-tab-panel>

          <q-tab-panel name="estimates"> 
            <!-- Subtab Content Start -->
            <q-tab-panels v-model="tabs[8].subVal"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up">     
              
              <q-tab-panel name="mainestimate">
                <div class="text-h6">Main Estimate</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>

              <q-tab-panel name="estimaterev">
                <div class="text-h6">Main Estimate Rev 1</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>

              <q-tab-panel name=original>
                <div class="text-h6">Original</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>
            </q-tab-panels>   
            <!-- Subtab Content End -->   
          </q-tab-panel>

          <q-tab-panel name="activitysheet">
            <div class="text-h6">Activity Sheet</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="communications">
            <communications />
          </q-tab-panel>
          
          <q-tab-panel name="attachments">
            <div class="claim-attachments-container">
              <claim-attachments />
            </div>
          </q-tab-panel>

          <q-tab-panel name="triage">
            <div class="create-triage-container">
              <create-triage 
                :activate.sync="loadTriage" />
            </div>
          </q-tab-panel>

          <q-tab-panel name="reports">
            <reports />
          </q-tab-panel>

          <q-tab-panel name="externalAllocation">
            <external-allocation :update.sync="newExtAllocation" />
          </q-tab-panel>

          <q-tab-panel name="draftLetters">
            <draft-letters :update.sync="newDraftLetter" :generate.sync="generateDraftLetter"/>
          </q-tab-panel>
        </q-tab-panels>
        <!--End Tab panels -->  
      </template>   
    </q-splitter>
  <!-- Right drawer Start -->
    <q-drawer class="right-drawer" show-if-above v-model="rightDrawerOpen" behavior="mobile" side="right" bordered overlay>
          <div class="absolute" style="top: 31%; left: -26px">
           <q-btn
            dense
            class="drawer-button"
            icon="chevron_right"
            @click="rightDrawerOpen = false"
          />
          </div>
          <q-list class="q-pt-xl">
            <q-item clickable @click="claimRegistration = true" v-ripple class="right-drawer-item">
              <q-item-section avatar><q-icon name="img:statics/icons/edit.svg" /></q-item-section>
              <q-item-section>Edit</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="right-drawer-item">
              <q-item-section avatar><q-icon name="img:statics/icons/change-status.svg" /></q-item-section>
              <q-item-section>Change Status</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="right-drawer-item">
              <q-item-section avatar><q-icon name="img:statics/icons/create-estimate.svg" /></q-item-section>
              <q-item-section>Create Estimate</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="right-drawer-item">
              <q-item-section avatar><q-icon name="img:statics/icons/change-product-line.svg" /></q-item-section>
              <q-item-section>Change Product Line</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="right-drawer-item">
              <q-item-section avatar><q-icon name="img:statics/icons/create-variation.svg" /></q-item-section>
              <q-item-section>Create Variation</q-item-section>
            </q-item>
            <q-item clickable @click="createTriage" v-ripple class="right-drawer-item">
              <q-item-section avatar><q-icon name="img:statics/icons/create-triage.svg" /></q-item-section>
              <q-item-section>Create Triage</q-item-section>
            </q-item>
            <q-item clickable @click="openBookAppointment" v-ripple class="right-drawer-item">
              <q-item-section avatar><q-icon name="img:statics/icons/book-appointment.svg" /></q-item-section>
              <q-item-section>Book Appointment</q-item-section>
            </q-item>
            <q-item clickable v-ripple class="right-drawer-item">
              <q-item-section avatar><q-icon name="img:statics/icons/update-automation.svg" /></q-item-section>
              <q-item-section>Update Automation</q-item-section>
            </q-item>
            <q-item clickable @click="openCreateDraftLetter" v-ripple class="right-drawer-item">
              <q-item-section avatar><q-icon name="img:statics/icons/create-letter.svg" /></q-item-section>
              <q-item-section>Create Letter</q-item-section>
            </q-item>
            <q-item clickable @click="openCreateExtAllocation" v-ripple class="right-drawer-item">
              <q-item-section avatar><q-icon name="img:statics/icons/create-ext-allocation.svg" /></q-item-section>
              <q-item-section>Create Ext Allocation</q-item-section>
            </q-item>
            <q-item clickable @click="openCreateReport" v-ripple class="right-drawer-item">
              <q-item-section avatar><q-icon name="img:statics/icons/create-report.svg" /></q-item-section>
              <q-item-section>Create Report</q-item-section>
            </q-item>
          </q-list>
    </q-drawer>
    <!-- Right drawer End -->
    <!-- START Right drawer chevron Open -->
    <q-page-sticky position="right" style="top: 0%;">
          <q-btn
            dense
            class="drawer-button"
            icon="chevron_left"
            @click="rightDrawerOpen = true"
          />
    </q-page-sticky>
    <!-- END Right drawer chevron Open -->
    <!--Start floating action content -->
    <book-appointment :activate.sync="bookAppointment" />
    <ext-allocation-modal :activate.sync="createExtAllocation" :value.sync="newExtAllocation" :new="true"/>
    <draft-letter-modal :activate.sync="createDraftLetter" :value.sync="newDraftLetter" :new="true"/>
    <create-report :activate.sync="createReport" />
    <!--End floating action content -->
    <edit-claim-registration
      :activate.sync="claimRegistration" 
    />
 </div><!--End tabs row -->
</div><!--End claim summary row -->

</template>


<script src="../assets/js/claim-summary.js" />


<style>
  @import '../assets/css/claim-summary.scss';
  @import '../../../shared/css/field-select.scss';
</style>