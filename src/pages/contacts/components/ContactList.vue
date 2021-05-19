<template>
  <div class="contacts">
    <!-- Filter Start -->
    <!-- <q-separator class="filternav-sep" /> -->
    <div class="row page-filter">
      <div class="col-lg-auto col-md-auto col-sm-auto col-xs-12  q-pt-sm  page__header">
        Contacts
      </div>
      <!-- <div class="filter-label col-lg-auto col-md-auto col-sm-auto col-xs-12 q-pl-md">Filter by</div> -->
      <!-- START Contact type Filter -->
      <div class="col-xs-auto">
        <div class="row">
          <div class="col-xs-auto filter-fld">
            <base-select
              :options="contactTypes"
              :value.sync="selectedContactTypes"
              labelKey="event"
              label="Type"
              valueKey="id"
            />
          </div>
          <div class="col-xs-auto filter-fld">
            <q-input color="primary" outlined square dense v-model="selectedContactName" label="Name" class="text-search-filter">
              <template v-slot:append>
                <q-icon v-if="selectedContactName === ''" class="search-icon" name="search" @click="selectedContactName = ''" />
                <q-icon v-else name="cancel" class="cursor-pointer search-icon-cancel" @click="selectedContactName = ''" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-auto filter-fld">
            <q-input color="primary" outlined square dense v-model="selectedContactAddress" label="Address" class="text-search-filter">
              <template v-slot:append>
                <q-icon v-if="selectedContactAddress === ''" class="search-icon" name="search" @click="selectedContactAddress = ''" />
                <q-icon v-else name="cancel" class="cursor-pointer search-icon-cancel" @click="selectedContactAddress = ''" />
              </template>
            </q-input>
          </div>
          <div class="col-xs-auto filter-fld">
            <q-input color="primary" outlined square dense v-model="selectedContactSuburb" label="Suburb" class="text-search-filter">
              <template v-slot:append>
                <q-icon v-if="selectedContactSuburb === ''" class="search-icon" name="search" @click="selectedContactSuburb = ''" />
                <q-icon v-else name="cancel" class="cursor-pointer search-icon-cancel" @click="selectedContactSuburb = ''" />
              </template>
            </q-input>
          </div>
          <!-- End Event type Filter --> 
          <div class="col-xs-auto filter-btn">
            <q-btn no-caps class="filter-button reset-filter" @click="resetFilter" label="RESET" />
          </div>
          <!-- <div class="float-left"><q-btn color="primary" no-caps class="filter-button apply-filter" unelevated label="Apply" /></div> -->
          <div class="col-xs-auto filter-btn">
            <q-btn color="primary" :disable="!withFilter" class="filter-button save-filter-button" no-caps label="SAVE FILTER" @click="saveFilter = true">
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
            <q-btn class="my-filter col-md-1 col-sm-1 mobile-btn-mg" no-caps text-color="primary" label="MY FILTERS">
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
          <div class="col-xs-auto filter-btn">
            <q-btn color="primary" no-caps class="filter-button green float-left" unelevated label="ADD CONTACTS" @click="addContact" />
          </div>
        </div>
      </div>
      <!-- End of Filter -->
    </div>
    <q-separator class="filternav-sep"/>
    <!--end row cards -->
    <!--start row table headings -->
    <div class="row">
      <div class="col-md-6 col-xs-6 q-py-sm flex-container">
      </div>
      <div class="col-md-6 col-xs-6 q-pr-lg q-pt-sm">
        <q-btn icon="fas fa-cloud-download-alt" class="float-right download-icon"> 
          <q-menu content-class="my-filter-list download-report">
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
    <!--table-->
    <div class="row">
      <div class="col-xs-12 table-container">
        <q-table 
          :data="data" 
          id="tableData" 
          :columns="contacts" 
          :grid="$q.screen.xs" 
          ref="dashboardTable"
          row-key="contactTable" 
          card-class="table-grid" 
          :pagination.sync="pagination"
          no-data-label="No data available"
          class="page__table col-xs-12 col-md-12 q-mr-lg">
          <template v-slot:body="props">
            <q-tr class="cursor-pointer" :props="props" @click.native="onRowClick($event, props.row)">
              <q-td key="name">{{props.row.name}}</q-td>
              <q-td key="type">{{props.row.type}}</q-td>
              <q-td key="address" class="contacts-address">
                <span>{{ props.row.address}}</span>    <q-tooltip anchor="top middle" self="top middle" content-class="tooltip-table">{{ props.row.address }}</q-tooltip>
              </q-td>
              <q-td key="suburb">{{props.row.suburb}}</q-td>
              <q-td key="workPhone">{{props.row.workPhone}}</q-td>
              <q-td key="homePhone">{{props.row.homePhone}}</q-td>
              <q-td key="mobilePhone">{{props.row.mobilePhone}}</q-td>
              <q-td key="act" class="contacts-act">
                <q-icon color="primary" name="delete"> 
                  <q-tooltip anchor="top middle" self="top middle" content-class="tooltip-table icon">Delete</q-tooltip>
                </q-icon>
                <q-icon color="primary" name="create">
                  <q-tooltip anchor="top middle" self="top middle" content-class="tooltip-table icon">Edit</q-tooltip>
                </q-icon>
              </q-td>
            </q-tr>
          </template>
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12">
              <q-card @click.native="onRowClick($event, props.row)">
                <q-card-section class="row">
                  <span class="grid-label col-xs-4">Contact Name:</span> 
                  <div class="col-xs-8">
                    <strong>{{ props.row.name }}</strong>
                  </div>
                  <span class="grid-label col-xs-4">Contact Type:</span> 
                  <div class="col-xs-8">
                    {{ props.row.type }}
                  </div>
                  <span class="grid-label col-xs-4">Address:</span> 
                  <div class="col-xs-8">
                    {{ props.row.address }}
                  </div>
                  <span class="grid-label col-xs-4">Suburb:</span> 
                  <div class="col-xs-8">
                    {{ props.row.suburb }}
                  </div>
                  <span class="grid-label col-xs-4">Work Phone:</span> 
                  <div class="col-xs-8">
                    {{ props.row.workPhone }}
                  </div>
                  <span class="grid-label col-xs-4">Home Phone:</span> 
                  <div class="col-xs-8">
                    {{ props.row.homePhone }}
                  </div>
                  <span class="grid-label col-xs-4">Mobile Phone:</span> 
                  <div class="col-xs-8">
                    {{ props.row.mobilePhone }}
                  </div>
                </q-card-section>
                <q-separator />
                <q-card-section class="flex grid-icons">
                  <q-icon class="mright10 red" color="primary" name="delete" /> 
                  <q-icon color="primary" name="create" />
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
      </div>
    </div>
    <!--end table-->
    <!-- Delete Contact -->
    <q-dialog square v-model="dialog.deleteContact">
      <q-card class="filter-popup large-notification">
        <q-card-section class="q-pt-lg q-pl-lg">
          <span>Are you sure you want to delete contact?</span>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="primary" no-caps label="Yes" @click="deleteContact" />
          <q-btn color="primary" no-caps class="cancel-btn" label="Cancel" @click="dialog.deleteContact = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog square v-model="dialog.contactDeleted">
      <q-card class="filter-popup large-notification">
        <q-card-section class="q-pt-lg q-pl-lg" align="center">
          <span>Contact Deleted</span>
        </q-card-section>
         <q-card-actions align="center"></q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <!--end root element -->
</template>

<script src="../assets/js/contact-list.js" />


<style>
  @import '../assets/css/contacts.scss';
</style>