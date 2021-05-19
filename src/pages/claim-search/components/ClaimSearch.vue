<template>
<div class="dashboard claim-search">
    <div class="flex-container page-filter">
        <div class="row">
            <div class="col-lg-1">
                <div class="page__header col-lg-2 col-sm-2 col-md-1 col-xs-3">CLAIMS</div>
            </div>
            
            <div class="col-lg-11">
                <div class="row">
                    <div class="col-xs-auto">
                        <q-input color="primary" outlined square dense v-model="selectedClaimNumber" label="Claim Number" class="text-search-filter">
                            <template v-slot:append>
                                <q-icon v-if="selectedClaimNumber === ''" class="search-icon" name="search" @click="selectedClaimNumber = ''" />
                                <q-icon v-else name="cancel" class="cursor-pointer search-icon-cancel" @click="selectedClaimNumber = ''" />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-xs-auto">
                        <q-input color="primary" outlined square dense v-model="selectedClientRef" label="Client Ref" class="text-search-filter">
                            <template v-slot:append>
                                <q-icon v-if="selectedClientRef === ''" class="search-icon" name="search" @click="selectedClientRef = ''" />
                                <q-icon v-else name="cancel" class="cursor-pointer search-icon-cancel" @click="selectedClientRef = ''" />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-xs-auto">
                        <base-select
                            :options="insurer"
                            :value.sync="selectedInsurer"
                            labelKey="insurer"
                            label="Insurer"
                            valueKey="insurer"
                        />
                    </div>
                    <div class="col-xs-auto">
                        <q-input color="primary" outlined square dense v-model="selectedClaimant" label="Claimant" class="text-search-filter">
                            <template v-slot:append>
                                <q-icon v-if="selectedClaimant === ''" class="search-icon" name="search" @click="selectedClaimant = ''" />
                                <q-icon v-else name="cancel" class="cursor-pointer search-icon-cancel" @click="selectedClaimant = ''" />
                            </template>
                        </q-input>
                    </div>
                    <!-- 
                    <div class="col-xs-auto">
                        <q-input color="primary" outlined square dense v-model="selectedAddress" label="Address" class="text-search-filter">
                            <template v-slot:append>
                                <q-icon v-if="selectedAddress === ''" class="search-icon" name="search" @click="selectedAddress = ''" />
                                <q-icon v-else name="cancel" class="cursor-pointer search-icon-cancel" @click="selectedAddress = ''" />
                            </template>
                        </q-input>
                    </div>
                    -->
                    <div class="col-xs-auto"> 
                        <q-input color="primary" outlined square dense v-model="selectedSuburb" label="Suburb" class="text-search-filter">
                            <template v-slot:append>
                                <q-icon v-if="selectedSuburb === ''" class="search-icon" name="search" @click="selectedSuburb = ''" />
                                <q-icon v-else name="cancel" class="cursor-pointer search-icon-cancel" @click="selectedSuburb = ''" />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-xs-auto">
                        <base-select
                            :options="eventCode"
                            :value.sync="selectedEventCode"
                            labelKey="ecode"
                            label="Event Code"
                            valueKey="ecode"
                        />
                    </div>
                     <!-- START Event type Filter -->  
                        <div class="col-xs-auto">
                            <base-select
                            :options="eventType"
                            :value.sync="selectedEventType"
                            labelKey="event"
                            label="Event Type"
                            valueKey="event"
                            />
                        </div>
                    <!-- End Event type Filter -->
                    <div class="col-xs-auto">
                        <base-select
                            :options="status"
                            :value.sync="selectedStatus"
                            labelKey="status"
                            label="Status"
                            valueKey="status"
                        />
                    </div>        
                    <div class="col-xs-auto">
                        <base-select
                            :options="region"
                            :value.sync="selectedRegion"
                            labelKey="region"
                            label="Region"
                            valueKey="region"
                        />
                    </div>
                    <div class="col-xs-auto">
                        <base-select
                            :options="claimsHandler"
                            :value.sync="selectedClaimsHandler"
                            labelKey="claimsHandler"
                            label="Claims Handler"
                            valueKey="claimsHandler"
                        />
                    </div>   
                    <div class="col-xs-auto">
                        <base-select
                            :options="more"
                            :value.sync="selectedMore"
                            labelKey="more"
                            label="More"
                            valueKey="id"
                        />
                    </div>
                    <!--
                    <div class="col-xs-auto">
                        <triage-select
                            :options="triageQuestions"
                            :value.sync="selectedTriageQuestions"
                            labelKey="triage"
                            label="Triage Questions"
                            valueKey="id"
                        />
                    </div>
                    -->
                    <div class="col-xs-auto mobile-btn-mg">
                       <q-btn no-caps class="filter-button reset-filter" @click="resetFilter" label="Reset Filter" />
                    </div>

                    <div class="col-xs-auto mobile-btn-mg">
                        <q-btn no-caps color="primary" class="filter-button apply-filter" label="Search" />
                    </div>
                    
                    <div class="col-xs-auto mobile-btn-mg">
                        <q-btn color="primary" :disable="!withFilter" class="filter-button save-filter-button" no-caps label="Save Search" @click="saveFilter = true">
                            <q-dialog square v-model="saveFilter">
                                <q-card class="savefilter-popup">
                                    <q-card-section class="q-pt-lg q-pl-lg">
                                        <span>Save Search as</span>
                                    </q-card-section>
                                    <q-input 
                                        bottom-slots
                                        v-model="newFilterName"
                                        label="Search title"
                                        :rules="[val => !!val || 'Field is required']"
                                        class="q-px-lg"
                                    >
                                        <template v-slot:append>
                                            <q-icon
                                                name="close"
                                                @click="newFilterName = ''"
                                                class="cursor-pointer"
                                            />
                                        </template>
                                    </q-input>
                                    <q-card-actions align="left">
                                        <q-btn color="primary" no-caps class="q-ml-md" label="Save" @click.prevent="saveNewFilter"/>
                                        <q-btn color="primary" no-caps class="cancel-btn" label="Cancel" @click="saveFilter = false" />
                                    </q-card-actions>
                                </q-card>
                            </q-dialog>
                        </q-btn>
                    </div>
                    <div class="col-xs-auto mobile-btn-mg">
                        <q-btn no-caps class="my-filter col-md-1 col-sm-1 mobile-btn-mg" text-color="primary" label="My Searches">
                             <q-menu content-class="my-filter-list">
                                <q-list>
                                    <q-item clickable v-for="(filter, index) in filterNameList" :key="index" class="bg-hover-green">
                                        <q-item-section>
                                            <q-item-label>{{ filter }}</q-item-label>
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
            </div>
            
        </div>
    </div>
    <q-separator />
    
    <!--start row table headings -->
    <div class="row table-heading-container">
        <div class="col-md-6 col-xs-6 q-mb-lg">
        </div>
        <div class="col-md-6 col-xs-6">
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
                            :data="data" 
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
                            :data="data" 
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
    
    <div class="row table-container">
      <q-table 
        :grid="$q.screen.xs" 
        :data="data" 
        :columns="columns" 
        :pagination.sync="pagination"
        row-key="claimTable" 
        id="tableData" 
        card-class="table-grid"
        class="page__table col-xs-12 col-md-12"
      >
      <template v-slot:body="props">
        <q-tr class="cursor-pointer" :props="props" @click.native="$router.push({ path: '/claim-summary' })">
            <q-td key="name">{{ props.row.name }}</q-td>
            <q-td key="clientRef">{{ props.row.clientRef }}</q-td>
             <q-td key="insurer">{{ props.row.insurer }}</q-td>
            <q-td key="claimant">{{ props.row.claimant }}</q-td>
            <q-td key="address">
                <span>{{ props.row.address }}</span>
                <q-tooltip anchor="top middle" self="top middle" content-class="tooltip-table">{{ props.row.address }}</q-tooltip>
            </q-td>
            <q-td key="suburb">{{ props.row.suburb }}</q-td>
            <q-td key="eventCode">{{ props.row.eventCode }}</q-td>
             <q-td key="event">{{ props.row.event }}</q-td>
            <q-td key="status">{{ props.row.status }}</q-td>
            <q-td key="region">{{ props.row.region }}</q-td>
            <q-td key="claimsHandler">{{ props.row.claimsHandler }}</q-td>
        </q-tr>
      </template>
      <template v-slot:body-cell-address="address">
        <q-td :props="address" class="dashboard-address">
          <span>{{ address.value }}</span>    
          <q-tooltip anchor="top middle" self="top middle" content-class="tooltip-table">{{ address.value }}</q-tooltip>
        </q-td>
      </template>
      </q-table>
    </div>
    <!--end table-->
</div>
</template>

<script src="../assets/js/claim-search.js" />


<style>
@import '../assets/css/claim-search.scss';
</style>