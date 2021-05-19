<template>
<div class="claim-reports-container">
    <div class="col-lg-11 col-md-12 col-sm-12 col-xs-12">
      <q-table 
        :grid="$q.screen.xs" 
        :pagination.sync="pagination"
        :rows-per-page-options="[25, 50, 100, 250]"
        :data="data" 
        :columns="columns" 
        row-key="name"
        virtual-scroll
        class="page__table col-xs-12 col-md-12 nomargin_table"
      >
        <template v-slot:body="props">
          <q-tr>
            <q-td key="no">{{props.row.no}}</q-td>
            <q-td key="title">{{props.row.title}}</q-td>
            <q-td key="createDetails">
              <div v-if="props.row.create !== null">
                <span v-if="props.row.create.user && props.row.create.user !== null">{{props.row.create.user}}</span>
                <br v-if="props.row.create.position && props.row.create.position !== null" />
                <span v-if="props.row.create.position && props.row.create.position !== null">{{props.row.create.position}}</span> 
                <span> in</span> 
                <br />
                <span class="bold" v-if="props.row.create.account && props.row.create.account !== null">{{props.row.create.account}}</span> 
                <br />
                <span v-if="props.row.create.dateTime && props.row.create.dateTime !== null">{{props.row.create.dateTime}}</span> 
              </div>
            </q-td>
            <q-td key="pdfDetails">
              <div v-if="props.row.pdf !== null">
                <span v-if="props.row.pdf.user && props.row.pdf.user !== null">{{props.row.pdf.user}}</span>
                <br /> on
                <span v-if="props.row.pdf.dateTime && props.row.pdf.dateTime !== null">{{props.row.pdf.dateTime}}</span> 
              </div>
            </q-td>
            <q-td key="template">
              <span v-if="props.row.template && props.row.template !== null">{{props.row.template}}</span>
              <br />
              <span v-if="props.row.templateType && props.row.templateType !== null">{{props.row.templateType}}</span>
            </q-td>
            <q-td key="rptNo">{{props.row.rptNo}}</q-td>
            <q-td key="sent">
              <div v-if="props.row.sent !== null">
                <span v-if="props.row.sent.user && props.row.sent.user !== null">{{props.row.sent.user}}</span>
                <br v-if="props.row.sent.position && props.row.sent.position !== null" />
                <span v-if="props.row.sent.position && props.row.sent.position !== null">{{props.row.sent.position}}</span> 
                <span> on </span> 
                <br />
                <span v-if="props.row.sent.dateTime && props.row.sent.dateTime !== null">{{props.row.sent.dateTime}}</span> 
              </div>
            </q-td>
            <q-td key="lastUpdate">
              <div v-if="props.row.lastUpdate !== null">
              <span class="bold" v-if="props.row.lastUpdate.lru && props.row.lastUpdate.lru !== null">Latest  Report Updated</span>
                <br v-if="props.row.lastUpdate.lru && props.row.lastUpdate.lru !== null" />
                <span v-if="props.row.lastUpdate.user && props.row.lastUpdate.user !== null">{{props.row.lastUpdate.user}} on</span>
                <br />
                <span v-if="props.row.lastUpdate.dateTime && props.row.lastUpdate.dateTime !== null">{{props.row.lastUpdate.dateTime}}</span> 
              </div>
            </q-td>
            <q-td key="action">
              <q-icon 
                class="float-left md-icon" 
                v-bind:class="[props.row.pdf !== null ? '' : 'not-active']"
                @click.prevent="downloadPDF(props.row.pdf !== null, props.row.no)"
                :name="props.row.pdf !== null ? 'img:statics/icons/pdf-active.svg' : 'img:statics/icons/pdf-disabled.svg'" />
              <q-icon 
                class="float-left md-icon cursor-pointer"
                @click="downloadDOCX()" 
                name="img:statics/icons/copy-active.svg" />
              <q-icon 
                class="float-left cursor-pointer" 
                name="img:statics/icons/trash.svg"
                @click="deleteReport(props.row.no)" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  <q-dialog 
      persistent
    v-model="dialog.deleteReport">
    <q-card class="filter-popup large-notification">
      <q-card-section class="q-pt-lg q-pl-lg">
        <span>Are you sure you want to delete this report?</span>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn color="primary" no-caps class="q-ma-md no-shadow" rounded label="Yes" @click="confirmDeleteReport" />
        <q-btn color="primary" no-caps class="q-ma-md no-shadow cancel-btn" rounded label="Cancel" @click="dialog.deleteReport = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</div>
</template>
<style>
	@import '../assets/css/reports-tab.scss';
</style>
<script src="../assets/js/reports-tab.js">