<template>
  <div class="diary">
    <!-- Filter Start -->
    <div class="flex-container page-filter">
      <div class="flex-container">
         <div class="page__header col-xs-3 col-sm-2 col-md-1 col-lg-2 col-xl-3 diary-prl">DIARY</div>
          <div class="col-xs-6 col-sm-6 col-md-2 col-lg-1">
            <img src="~assets/images/hline.png" class="hline" />
          </div>
          <q-input color="primary" outlined square dense v-model="searchkeyword" label="Keyword" class="text-search-filter">
            <template v-slot:append>
              <q-icon v-if="searchkeyword === ''" class="search-icon" name="search" @click="searchkeyword = ''" />
              <q-icon v-else name="cancel" class="cursor-pointer search-icon-cancel" @click="searchkeyword = ''" />
            </template>
          </q-input>
      </div>
      <div class="flex-container diaryptb-10 diarypl-10">
        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-1">
          <base-select
            :options="eventCode"
            :value.sync="selectedEventCode"
            labelKey="ecode"
            label="Event Code"
            valueKey="id"
          />
        </div>
        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-1">
          <base-select
            :options="priorityType"
            :value.sync="selectedPriority"
            labelKey="priority"
            label="Priority"
            valueKey="id"
          />
        </div>
      </div>
      <div class="flex-container">
        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-1">
            <img src="~assets/images/hline.png" class="hline diaryml-15" />
        </div>
        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-1">
          <q-radio 
            val="" 
            label="All Tasks" 
            v-model="tasks" 
            :style="tasks !== 'all' ? 'color: rgba(0, 0, 0, 0.54)' : ''"/>
            <q-badge class="green-badge" rounded>7</q-badge>
          <q-radio 
            val="2" 
            label="Overdue" 
            v-model="tasks" 
            :style="tasks !== 'overdue' ? 'color: rgba(0, 0, 0, 0.54)' : ''"/>
            <q-badge color="red">2</q-badge>
          <q-radio 
            val="3" 
            label="FYI" 
            v-model="tasks" 
            :style="tasks !== 'fyi' ? 'color: rgba(0, 0, 0, 0.54)' : ''"/>
            <q-badge class="green-badge">2</q-badge>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-1">
            <img src="~assets/images/hline.png" class="hline" />
        </div>
      </div>
      <div class="flex-container">
        <div class="col-xs-6 col-sm-6 col-md-2 col-lg-1">
          <q-btn class="reset-filter diaryml-15 " @click="resetFilter" label="Reset" />
        </div>
      </div>
    </div>
    <q-separator class="filternav-sep"/>
    <!-- End of Filter -->
  
    <!-- Table Start -->
    <div class="row">
  
      <q-table 
        :data="data" 
        row-key="name"
        :columns="columns" 
        :grid="$q.screen.xs" 
        :dense="$q.screen.lt.md"
        class="page__table col-xs-11 col-sm-11 col-md-11 col-lg-6 col-xl-6 mt-30">
        <template v-slot:body="props">
            <q-tr class="cursor-pointer" 
              :props="props" 
              @click.native="onRowClick($event, props.row)" 
              v-bind:style="[ detailsData.name === props.row.name ? { 'background-color': '#e9f1e6'} : {}]">
              <q-td key="name">{{props.row.name}}</q-td>
              <q-td key="description">{{props.row.description}}</q-td>
              <q-td key="due">{{props.row.due}}</q-td>
              <q-td key="priority">{{props.row.priority}}</q-td>
              <q-td key="event">{{props.row.event}}</q-td>
            </q-tr>
          </template>
      </q-table>

     <div class="col-xs-11 col-sm-11 col-md-11 col-lg-5 col-auto mt-30"> 
      <div class="row diary__content q-ml-lg">
        <div class="col-md-12">
              <div class="col-md-12"><label>Task for:</label>&nbsp; <span class="text-black">Awesome Assessor</span></div>
              <div class="col-md-12"><label>Claim:</label>&nbsp; <span class="text-black">{{detailsData.name}} </span></div>
              <div class="col-md-12 q-mb-md"><label>Due:</label>&nbsp; <span class="text-black">{{detailsData.due}}</span></div>
              <div class="col-md-12 q-mb-md"> <span class="text-black">{{detailsData.description}}</span></div>
              <div class="col-md-12"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                 Ut mollis venenatis turpis. Phasellus sit amet diam urna. Nunc porttitor egestas turpis, 
                 eget ultrices lorem. Duis vel gravida sapien. Nulla eu neque eget ante tempor tincidunt. 
                 Nam vehicula porta dictum. Aenean id justo mi. Mauris ornare est eget arcu cursus dignissim.Duis eu ornare eros,
                eu ultricies nulla. Nunc pulvinar pulvinar ante nec blandit. Donec porttitor tempor eros, non maximus nulla dictum ut. 
                Maecenas a purus tempor, lobortis lacus at, placerat purus.</p>
              </div>
              <div class="col-md-12">Created Thu, 18, Jul 2020 by  <span class="text-black">Phone Monkey</span></div>
               <div class="q-py-md">
                <q-btn label="Go To Claim" class="diary__btn-claim" />
               </div>
        </div>
      </div>
     </div>
    </div>
    <!-- End of Table -->

   
   

  </div>
</template>
<script src="../assets/js/diary.js" />
<style lang="scss">
  // $
  @import '../assets/css/diary.scss';
</style>