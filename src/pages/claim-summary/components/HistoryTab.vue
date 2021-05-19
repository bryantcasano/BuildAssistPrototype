<template>
<div class="history">
         <div class="row">
       
            <div class="col-lg-3 col-md-4 col-xs-6 padb-filter">
              <q-input class="filter-search q-pl-md" placeholder="Filter by keyword" borderless v-model="search">
                <template v-slot:prepend>
                  <q-icon v-if="search === ''" color="primary" name="search" />
                  <q-icon
                    v-else
                    name="search"
                    color="primary q-pl-md"
                    class="cursor-pointer text-primary"
                  />
                </template>
              </q-input>
            </div>
           </div>
    <!-- Table Start -->
    <div class="row table-container q-pt-lg">
      <q-table 
        :grid="$q.screen.xs" 
        :pagination.sync="pagination"
        :rows-per-page-options="[25, 50, 100, 250]"
        :data="data" 
        :columns="columns" 
        row-key="name"
         virtual-scroll
         card-class="table-grid" class="page__table col-xs-12 col-md-12 nomargin_table"
      >
        <template v-slot:header="props">
          <q-tr>
            <q-th :props="props" key="date" rowspan="2" >{{props.cols[0].label}}</q-th>
            <q-th :props="props" key="user" rowspan="2" >{{props.cols[1].label}}</q-th>
            <q-th :props="props" key="action" rowspan="2" >{{props.cols[2].label}}</q-th>
            <q-th :props="props" key="notes" rowspan="2" >
              {{props.cols[3].label}}
              <div class="float-right cursor-pointer" @click="toggleNotes">
                <div v-if="!notExpand">Expand All <q-icon class="note-toggle" name="expand_more"/></div>
                <div v-if="notExpand">Collapse All <q-icon class="note-toggle" name="expand_less"/></div>
              </div>
            </q-th>
            <q-th :props="props" key="notified" rowspan="2" >{{props.cols[4].label}}</q-th>
          </q-tr>
        </template>
      <template v-slot:body-cell-notes="notes">
        <q-td 
          :props="notes"  
          class="truncate-notes">
          <span id="ellipsis-ex" 
            class="note-truncate" 
            v-bind:class="{ expand : notExpand, force_expand : notes.row.expand, force_collapse : !notes.row.expand }">
            {{notes.value}}
          </span>
          <span class="float-expand-desktop">
            <q-icon v-if="(!notExpand && !notes.row.expand) || !notes.row.expand" @click="notes.row.expand = notes.row.expand = true" class="note-icon" name="img:statics/icons/expand-plus.svg" />
            <q-icon v-if="(notExpand || notes.row.expand) && notes.row.expand" @click="notes.row.expand = notes.row.expand = false" class="note-icon" name="img:statics/icons/expand-collapse.svg" />
          </span>
        </q-td>
      </template>
      </q-table>
    </div>
    <!-- End of Table -->
   </div>


</template>
<style>
	@import '../assets/css/history-tab.scss';
</style>
<script src='../assets/js/history-tab.js' />