<template>
  <div class="dashboard">
    <!--start filter-->
    <!-- Filter Start -->
    <div class="row page-filter">
           <div class="col-lg-auto col-md-auto col-sm-auto col-xs-12 page__header">
              DASHBOARD
           </div>
          <!-- Start Date Filter  -->
          <div class="col-lg-auto q-pl-lg dashboard-date-filter">
                  <q-btn-dropdown 
                    label="Date" 
                    :ripple="false"
                    @show="dateFilter=true"
                    @hide="dateFilter=false"
                    class="dropdown-label col-xs-12"  
                    dropdown-icon="keyboard_arrow_down"
                    v-bind:style="[ dateFilter ? { border : '2px solid #4a148c' } : {} ]" >
                    <q-list>
                      <q-item>
                        <q-item-section>
                              <div class="q-pt-md">
                                <label class="float-left q-pa-md">From:</label>   
                                <q-input filled v-model="Fromdate" mask="date" :rules="['date']">
                                  <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                      <q-popup-proxy ref="FromDateproxy" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="Fromdate" @input="() => $refs.FromDateproxy.hide()" />
                                      </q-popup-proxy>
                                    </q-icon>
                                  </template>
                                </q-input>
                              </div>
                              <div class="q-pt-md">
                                <label class="float-left q-pa-md q-pr-lg">To:</label>   
                                <q-input filled v-model="Todate" mask="date" :rules="['date']">
                                  <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                      <q-popup-proxy ref="ToDateProxy" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="Todate" @input="() => $refs.ToDateProxy.hide()" />
                                      </q-popup-proxy>
                                    </q-icon>
                                  </template>
                                </q-input>
                              </div>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
          </div>
          <!-- END Date Filter -->
          <!-- START Event type Filter -->  
          <div class="col-lg-auto dashboard-filter">
            <base-select
              :options="eventType"
              :value.sync="selectedEventType"
              labelKey="event"
              label="Event Type"
              valueKey="event"
            />
          </div>
          <!-- End Event type Filter -->
          <!-- Start Region Filter -->
          <div class="col-lg-auto dashboard-filter">
            <base-select
              :options="regionType"
              :value.sync="selectedRegionType"
              labelKey="region"
              label="Region"
              valueKey="region"
            />
          </div>
          <!-- Start Event Code Filter -->
          <div class="col-lg-auto dashboard-filter">
            <base-select
              :options="eventCode"
              :value.sync="selectedEventCode"
              labelKey="ecode"
              label="Event Code"
              valueKey="ecode"
            />
          </div>
          <!-- End Event Code Filter -->
          <!-- START Insurer Filter -->
          <div class="col-lg-auto dashboard-filter">
            <base-select
              :options="insurerType"
              :value.sync="selectedInsurerType"
              labelKey="insurer"
              label="Insurer"
              valueKey="insurer"
            />
          </div>
          <!-- END Insurer Filter -->
          <!-- START Status Filter -->
          <div class="col-lg-auto dashboard-filter">
            <base-select
              :options="statusType"
              :value.sync="selectedStatusType"
              labelKey="status"
              label="Status"
              valueKey="status"
            />
          </div>
          <!-- END Status Filter -->
          <!-- START Claim Classification Filter -->
           <div class="col-lg-auto dashboard-filter q-mr-md">
            <base-select
              :options="claimClassificationType"
              :value.sync="selectedClassificationType"
              labelKey="claimClassification"
              label="Claim Classification"
              valueKey="claimClassification"
            />
          </div>   
          <div class="col-xs-auto filter-btn">
            <q-btn no-caps class="reset-filter" @click="resetFilter" label="RESET" />
          </div>
          <div class="col-xs-auto filter-btn">
            <q-btn color="primary" :disable="!withFilter" class="save-filter-button" no-caps label="SAVE FILTER" @click="saveFilter = true">
              <q-dialog square v-model="saveFilter">
                <q-card class="savefilter-popup">
                  <q-card-section class="q-pt-lg q-pl-lg">
                    <span>Save Filter as</span>
                  </q-card-section>
                   <q-input bottom-slots v-model="newFilterName" placeholder="Filter title" :rules="[val => !!val || 'Field is required']" class="q-px-lg">
                    <template v-slot:append>
                    </template>
                  </q-input>
                  <q-card-actions align="left">
                    <q-btn color="primary" class="q-ml-md" no-caps label="Save" @click.prevent="saveNewFilter"/>
                    <q-btn color="primary" no-caps class="cancel-btn" label="Cancel" @click="saveFilter = false" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </q-btn>
          </div>
          <div class="col-xs-auto filter-btn">
            <q-btn class="my-filter col-md-1 col-sm-1" no-caps text-color="primary" label="MY FILTERS">
              <q-menu content-class="my-filter-list">
                <q-list>
                  <q-item clickable v-for="(filter, index) in filterNameList" :key="index">
                    <q-item-section>
                      <q-item-label>{{filter}}</q-item-label>
                      <div class="right-icons">
                        <q-icon color="primary" name="create" />
                        <q-icon color="primary" name="delete" />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
          </div>
          <!-- End of Filter -->
       <q-separator class="filternav-sep"/>
    <div class="row q-my-lg card-mobile">
      <!--start row cards -->
        <q-card class="dashboard__card col-md-2 col-sm-4 col-xs-6 col-lg-2">
            <div class="dashboard__card__heading">6</div>
            <div class="dashboard__card__title">Total Claims</div>
        </q-card>
        <q-card class="dashboard__card col-md-2 col-sm-4 col-xs-6 col-lg-2">
            <div class="dashboard__card__heading">2</div>
            <div class="dashboard__card__title">Overdue Tasks</div>
        </q-card> 
        <q-card class="dashboard__card col-md-2 col-sm-4 col-xs-6 col-lg-2">  
            <div class="dashboard__card__heading">4</div>
            <div class="dashboard__card__title">Insurer Contact KPI</div>
        </q-card>
        <q-card class="dashboard__card col-md-2 col-sm-4  col-xs-6 col-lg-2">
            <div class="dashboard__card__heading">2</div>
            <div class="dashboard__card__title">Claimant Contact KPI</div>
        </q-card>
        <q-card class="dashboard__card col-md-2 col-sm-4 col-xs-6 col-lg-2">
            <div class="dashboard__card__heading">1</div>
            <div class="dashboard__card__title">Appointments Booked</div>
        </q-card>
        <q-card class="dashboard__card col-md-2 col-sm-4 col-xs-6 col-lg-2">
            <div class="dashboard__card__heading">2</div>
            <div class="dashboard__card__title">Scope Queries</div>  
        </q-card>
    </div>
    <!--end row cards -->
    <!--start row table headings -->
    <div class="row">
       <div class="col-md-6 col-xs-6 q-py-sm flex-container">
      </div>
      <div class="col-md-6 col-xs-6 q-pr-md">
        <q-btn icon="fas fa-cloud-download-alt" class="float-right download-icon"> 
        <q-menu>
        <q-list>
          <q-item clickable>
            <q-item-section>
              <q-item-label @click.prevent="downloadPDF">Download PDF</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>
              <q-item-label>
                <download-excel
                  :data="dataTable" 
                  type="csv">
                    Download CSV
                </download-excel>
                </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>
              <q-item-label>
                <download-excel
                  :data="dataTable" 
                  type="xls">
                  Download XLSX
                </download-excel>
                </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>
              <q-item-label @click="printTable">Print</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        </q-menu>
      </q-btn>
      </div>
    </div>
    <!--table headings -->
      <!--table-->
    <div class="row">
      <div class="col-xs-12 table-container">
      <q-table 
        :grid="$q.screen.xs" 
        :data="dataTable" 
        :columns="dashboard" 
        :pagination.sync="pagination"
        row-key="claimTable" 
        id="tableData" 
        card-class="table-grid" 
        class="page__table col-xs-12 col-md-12 q-mr-lg"
        ref="dashboardTable"
      >

      <template v-slot:body-cell-address="address">
        <q-td :props="address" class="dashboard-address">
          <span>{{ address.value}}</span>    <q-tooltip anchor="top middle" self="top middle" content-class="tooltip-table">{{ address.value}}</q-tooltip>
        </q-td>
      </template>
      </q-table>
      </div>
    </div>
<!--end table-->
  </div><!--end root element -->
</template>

<script src="../assets/js/dashboard.js" />


<style>
@import '../assets/css/dashboard.scss';
</style>