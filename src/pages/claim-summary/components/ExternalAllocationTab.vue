<template>
<div class="external-allocation-container">
  <div class="page__heading">External Allocation Drafts</div>
    <div class="col-lg-11 col-md-12 col-sm-12 col-xs-12">
      <q-table 
        :grid="$q.screen.xs" 
        :pagination.sync="pagination"
        :rows-per-page-options="[25, 50, 100, 250]"
        :data="externalAllocation.drafts" 
        :columns="columns.externalAllocation" 
        row-key="name"
        virtual-scroll
        class="page__table col-xs-12 col-md-12 nomargin_table"
      >
        <template v-slot:body="props">
          <q-tr>
            <q-td key="no">{{props.row.no}}</q-td>
            <q-td key="template">{{getOptionLabel(props.row.template, 'id', 'value', options.template) }}</q-td>
            <q-td key="provider">{{getOptionLabel(props.row.provider, 'id', 'value', options.provider) }}</q-td>
            <q-td key="details">
              Draft Title: {{props.row.draftTitle}} <br v-if="props.row.sentTo"/>
              <span v-if="props.row.sentTo">Sent to:</span> {{getOptionLabel(props.row.sentTo, 'id', 'value', options.sentTo)}} <br v-if="props.row.recipientsDetails"/>
              {{props.row.recipientsDetails}}
            </q-td>
            <q-td key="status">{{props.row.status}}</q-td>
            <q-td key="dueDate">{{props.row.dueDate}}</q-td>
            <q-td key="createdBy">{{props.row.createdBy}}</q-td>
            <q-td key="dateCreated">{{props.row.dateCreated}}</q-td>
            <q-td key="action">
              <q-icon 
                name="create" 
                color="primary" 
                @click="viewDetails(props.row, 'drafts')" 
                class="float-left cursor-pointer"
                style="font-size: 15px; margin-right: 15px" />
              <q-icon 
                class="float-left cursor-pointer" 
                name="img:statics/icons/trash.svg"
                @click="deleteDraft(externalAllocation.drafts, props.row)"/>
            </q-td>
          </q-tr>
        </template>
      </q-table>
  </div>
  <div class="page__heading adjust-mar">External Assessment Drafts</div>
    <div class="col-lg-11 col-md-12 col-sm-12 col-xs-12">
      <q-table 
        :grid="$q.screen.xs" 
        :pagination.sync="pagination"
        :rows-per-page-options="[25, 50, 100, 250]"
        :data="externalAllocation.assessmentDrafts" 
        :columns="columns.externalAllocation" 
        row-key="name"
        virtual-scroll
        class="page__table col-xs-12 col-md-12 nomargin_table"
      >
        <template v-slot:body="props">
          <q-tr>
            <q-td key="no">{{props.row.no}}</q-td>
            <q-td key="template">{{getOptionLabel(props.row.template, 'id', 'value', options.template) }}</q-td>
            <q-td key="provider">{{getOptionLabel(props.row.provider, 'id', 'value', options.provider) }}</q-td>
            <q-td key="details">
              Draft Title: {{props.row.draftTitle}} <br v-if="props.row.sentTo"/>
              <span v-if="props.row.sentTo">Sent to:</span> {{getOptionLabel(props.row.sentTo, 'id', 'value', options.sentTo)}} <br v-if="props.row.recipientsDetails"/>
              {{props.row.recipientsDetails}}
            </q-td>
            <q-td key="status">{{props.row.status}}</q-td>
            <q-td key="dueDate">{{props.row.dueDate}}</q-td>
            <q-td key="createdBy">{{props.row.createdBy}}</q-td>
            <q-td key="dateCreated">{{props.row.dateCreated}}</q-td>
            <q-td key="action">
              <q-icon 
                name="create" 
                color="primary" 
                @click="viewDetails(props.row, 'assessmentDrafts')" 
                class="float-left cursor-pointer" 
                style="font-size: 15px; margin-right: 15px" />
              <q-icon 
                class="float-left cursor-pointer" 
                name="img:statics/icons/trash.svg" 
                @click="deleteDraft(externalAllocation.assessmentDrafts, props.row)"/>
            </q-td>
          </q-tr>
        </template>
      </q-table>
  </div>
  <div class="page__heading adjust-mar">Generated</div>
    <div class="col-lg-11 col-md-12 col-sm-12 col-xs-12">
      <q-table 
        :grid="$q.screen.xs" 
        :pagination.sync="pagination"
        :rows-per-page-options="[25, 50, 100, 250]"
        :data="externalAllocation.generated" 
        :columns="columns.generated" 
        row-key="name"
        virtual-scroll
        class="page__table col-xs-12 col-md-12 nomargin_table"
      >
        <template v-slot:body="props">
          <q-tr>
            <q-td key="no">{{props.row.no}}</q-td>
            <q-td key="template">{{getOptionLabel(props.row.template, 'id', 'value', options.template) }}</q-td>
            <q-td key="provider">{{getOptionLabel(props.row.provider, 'id', 'value', options.provider) }}</q-td>
            <q-td key="details">
              {{props.row.draftTitle}} <span v-if="props.row.sentTo">To</span><br v-if="props.row.sentTo"/>
              {{getOptionLabel(props.row.sentTo, 'id', 'value', options.sentTo)}} <br v-if="props.row.recipientsDetails"/>
              {{props.row.recipientsDetails}}
            </q-td>
            <q-td key="status">{{props.row.status}}</q-td>
            <q-td key="dueDate">{{props.row.dueDate}}</q-td>
            <q-td key="createdBy">{{props.row.createdBy}}</q-td>
            <q-td key="dateCreated">{{props.row.dateCreated}}</q-td>
            <q-td key="file">
              <q-icon 
                class="cursor-pointer" 
                name="img:statics/icons/pdf-active.svg" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
  </div>
  <q-dialog 
    persistent
    v-model="dialog.deleteDraft">
    <q-card class="filter-popup large-notification">
      <q-card-section class="q-pt-lg q-pl-lg">
        <span>Are you sure you want to delete this Draft?</span>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn color="primary" no-caps class="q-ma-md no-shadow" rounded label="Yes" @click="deleteDraftConfirm" />
        <q-btn color="primary" no-caps class="q-ma-md no-shadow cancel-btn" rounded label="Cancel" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <ext-allocation-modal :activate.sync="viewDetailsModal" :value.sync="templateDetail" :generate.sync="generateDraft" />
</div>
</template>
<style>
	@import '../assets/css/external-allocation-tab.scss';
</style>
<script src="../assets/js/external-allocation-tab.js" />