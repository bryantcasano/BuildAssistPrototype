<template>
    <div>
        <template>
                <q-tab-panel name="C71567">
                         
                    <q-list class="q-mb-md">
                        <q-expansion-item
                            class="claim-section-ei"
                            label="Reserve and Payment Summary"
                            default-opened
                        >
                            <div class="row justify-center bg-white q-col-gutter-x-md q-pt-md q-pb-md">
                                
                                <div class="col-sm-12 col-md-8 col-lg-6">
                                    <table class="reserve-summary-table full-width text-bold">
                                        <tr>
                                            <td style="padding: 15px; border-right: 1px solid #b3b3b3;">
                                                Building: $0.00
                                            </td>
                                            <td style="padding: 15px;">
                                                Contents: $0.00
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="col-md-4 col-lg-6"></div>

                                <div class="col-12 q-mt-md q-mb-md q-mr-lg text-right">
                                    <q-btn color="primary" label="Save Details" class="save-details-btn" rounded />
                                    <q-btn label="Update Reserve" icon="autorenew" class="update-reserve-btn" @click="updateReserve = true" rounded />
                                </div>
                                
                                <div class="col-12 q-px-md">

                                    <div class="full-width communications-table">
                                        <q-table 
                                            :grid="$q.screen.xs"
                                            :data="rnpSummaryData" 
                                            :columns="rnpSummaryColumns" 
                                            :hide-bottom="true"
                                            :rows-per-page-options="[25, 50, 100]"
                                            :pagination.sync="rnpSummary_pagination"
                                            row-key="name"
                                            virtual-scroll
                                            card-class="table-grid"
                                            class="rnp__table rnpSummaryTbl col-xs-12 col-md-12"
                                        >
                                            <template v-slot:header="props">
                                                <q-tr style="background-color: #fff;">
                                                    <q-th :props="props" key="type" rowspan="2" >{{props.cols[0].label}}</q-th>
                                                    <q-th :props="props" key="prevReserve" rowspan="2" >{{props.cols[1].label}}</q-th>
                                                    <q-th :props="props" key="currReserve" rowspan="2" >{{props.cols[2].label}}</q-th>
                                                    <q-th :props="props" key="paymentsMade" rowspan="2" >{{props.cols[3].label}}</q-th>
                                                    <q-th :props="props" key="pendingPayments" rowspan="2" >{{props.cols[4].label}}</q-th>
                                                    <q-th :props="props" key="outstandingReserve" rowspan="2" >{{props.cols[5].label}}</q-th>
                                                    <q-th :props="props" key="action" rowspan="2">{{props.cols[6].label}}</q-th>
                                                </q-tr>
                                            </template>
                                            <template v-slot:body="props">
                                                <q-tr
                                                    :props="props"
                                                    class="cursor-pointer"
                                                    @click="toggleRow(props.row, $event)"
                                                >
                                                    <q-td class="ra-table-header">
                                                        {{ props.row.type }}
                                                    </q-td>
                                                    <q-td class="ra-table-header" style="vertical-align: middle;">
                                                        <div v-if="props.row.items === undefined">
                                                            {{ props.row.prevReserve }}
                                                        </div>
                                                        <div v-else-if="props.row.items.length == 0">
                                                            <q-input square outlined dense v-model="prevReserveInput[props.row.id]" placeholder="Type here" style="background-color: #fff;" />
                                                        </div>
                                                    </q-td>
                                                    <q-td class="ra-table-header" style="vertical-align: middle;">
                                                        <div v-if="props.row.items === undefined">
                                                            {{ props.row.currReserve }}
                                                        </div>
                                                        <div v-else-if="props.row.items.length == 0">
                                                            <q-input square outlined dense v-model="currReserveInput[props.row.id]" placeholder="Type here" style="background-color: #fff;" />
                                                        </div>
                                                    </q-td>
                                                    <q-td class="ra-table-header" style="vertical-align: middle;">
                                                        <div v-if="props.row.items === undefined">
                                                            {{ props.row.pendingPayments }}
                                                        </div>
                                                        <div v-else-if="props.row.items.length == 0">
                                                            <q-input square outlined dense v-model="pendingPayments[props.row.id]" placeholder="Type here" style="background-color: #fff;" />
                                                        </div>
                                                    </q-td>
                                                    <q-td class="ra-table-header" style="vertical-align: middle;">
                                                        <div v-if="props.row.items === undefined">
                                                            {{ props.row.paymentsMade }}
                                                        </div>
                                                        <div v-else-if="props.row.items.length == 0">
                                                            <q-input square outlined dense v-model="paymentsMade[props.row.id]" placeholder="Type here" style="background-color: #fff;" />
                                                        </div>
                                                    </q-td>
                                                    <q-td class="ra-table-header" style="vertical-align: middle; text-align: right;">
                                                        <div v-if="props.row.items === undefined">
                                                            {{ props.row.outstandingReserve }}
                                                        </div>
                                                        <div v-else-if="props.row.items.length == 0">
                                                            0.00
                                                        </div>
                                                    </q-td>
                                                    <q-td class="ra-table-header">
                                                        <div v-if="props.row.action === ''" style="vertical-align: middle;">
                                                            <q-btn class="action-btn" text-color="primary" icon="add_box" size="10px" @click="addReserve = true; resTitle = props.row.type;" />
                                                        </div>
                                                        <div v-else></div>
                                                    </q-td>
                                                </q-tr>
                                                <template v-for="col in props.row.items">
                                                    <q-tr :key="col.id" v-show="props.row.show">
                                                        <q-td class="ra-table-body" style="vertical-align: middle;">
                                                            {{ col.type }}
                                                        </q-td>
                                                        <q-td class="ra-table-body" style="vertical-align: middle;">
                                                            <div v-if="col.prevReserve === ''">
                                                                <q-input square outlined dense v-model="prevReserveInput[col.id]" placeholder="Type here" style="background-color: #fff;" />
                                                            </div>
                                                            <div v-else>
                                                                {{ col.prevReserve }}
                                                            </div>
                                                        </q-td>
                                                        <q-td class="ra-table-body" style="vertical-align: middle;">
                                                            <div v-if="col.currReserve === ''">
                                                                <q-input square outlined dense v-model="currReserveInput[col.id]" placeholder="Type here" style="background-color: #fff;" />
                                                            </div>
                                                            <div v-else>
                                                                {{ col.currReserve }}
                                                            </div>
                                                        </q-td>
                                                        <q-td class="ra-table-body" style="vertical-align: middle;">
                                                            <div v-if="col.paymentsMade === ''">
                                                                <q-input square outlined dense v-model="paymentsMadeInput[col.id]" placeholder="Type here" style="background-color: #fff;" />
                                                            </div>
                                                            <div v-else>
                                                                {{ col.paymentsMade }}
                                                            </div>
                                                        </q-td>
                                                        <q-td class="ra-table-body" style="vertical-align: middle;">
                                                            <div v-if="col.pendingPayments === ''">
                                                                <q-input square outlined dense v-model="pendingPaymentsInput[col.id]" placeholder="Type here" style="background-color: #fff;" />
                                                            </div>
                                                            <div v-else>
                                                                {{ col.pendingPayments }}
                                                            </div>
                                                        </q-td>
                                                        <q-td class="ra-table-body" style="vertical-align: middle; text-align: right;">
                                                            {{ col.outstandingReserve }}
                                                        </q-td>
                                                        <q-td class="ra-table-body" style="vertical-align: middle;">
                                                            <div v-if="props.row.action === ''">
                                                                <q-btn class="action-btn" text-color="red" icon="delete" size="10px" />
                                                            </div>
                                                            <div v-else></div>
                                                        </q-td>
                                                    </q-tr>
                                                </template>
                                            </template>
                                        </q-table>
                                    </div>
                                
                                </div>

                            </div>
                        </q-expansion-item>
                    </q-list>
                    <q-list class="q-mb-md">
                        <q-expansion-item
                            class="claim-section-ei"
                            label="Excess Management"
                            default-opened
                        >
                            <div class="row justify-center bg-white q-col-gutter-x-md q-pt-xs q-pb-md">

                                <div class="col-12 q-pa-md">

                                    <div class="full-width communications-table">
                                        <q-table 
                                            :grid="$q.screen.xs"
                                            :data="excessManagementData" 
                                            :columns="excessManagementColumns" 
                                            :hide-bottom="true"
                                            row-key="name"
                                            virtual-scroll
                                            card-class="table-grid"
                                            class="rnp__table col-xs-12 col-md-12"
                                        >
                                            <template v-slot:header="props">
                                                <q-tr>
                                                    <q-th :props="props" key="excessType" rowspan="2" >{{props.cols[0].label}}</q-th>
                                                    <q-th :props="props" key="collectBy" rowspan="2" >{{props.cols[1].label}}</q-th>
                                                    <q-th :props="props" key="date" rowspan="2" >{{props.cols[2].label}}</q-th>
                                                    <q-th :props="props" key="function" rowspan="2" >{{props.cols[3].label}}</q-th>
                                                    <q-th :props="props" key="note" rowspan="2" >{{props.cols[4].label}}</q-th>
                                                    <q-th :props="props" key="action" rowspan="2" >{{props.cols[5].label}}</q-th>
                                                </q-tr>
                                            </template>
                                            <template v-slot:body-cell-action="props">
                                                <q-td :props="props">
                                                    <div v-if="props.value === ''">
                                                        <q-btn class="action-btn" text-color="primary" icon="add_box" size="10px"  @click="excessManagement = true" />
                                                    </div>
                                                    <div v-else>
                                                        —
                                                    </div>
                                                </q-td>
                                            </template>
                                        </q-table>
                                    </div>
                                
                                </div>
                            </div>

                        </q-expansion-item>
                    </q-list>
                    <q-list class="q-mb-md">
                        <q-expansion-item
                            class="claim-section-ei"
                            label="Reserve History"
                            default-opened
                        >
                            
                            <div class="row bg-white q-col-gutter-x-md q-pt-xs q-pb-md">

                                <div class="col-12 q-pa-md">
                                                                    
                                    <div class="flex-container page-filter" style="float: right; background-color: #fff;">
                                        <div class="filter-label col-lg-1 col-md-3 col-sm-3 col-xs-12 q-py-xs">Filter By</div>
                                                                    
                                        <div class="col-lg-auto col-md-3 col-sm-3 col-xs-6 q-py-xs">
                                            <q-input color="primary" outlined square dense v-model="selectedUser" label="User" class="text-search-filter">
                                                <template v-slot:append>
                                                    <q-icon v-if="selectedUser === ''" class="search-icon" name="search" @click="selectedUser = ''" />
                                                    <q-icon v-else name="cancel" class="cursor-pointer search-icon-cancel" @click="selectedUser = ''" />
                                                </template>
                                            </q-input>
                                        </div>                                                    
                                        <div class="col-lg-auto col-md-3 col-sm-3 col-xs-6 q-py-xs">
                                            <q-input color="primary" outlined square dense v-model="selectedStartDate" label="Start Date" class="text-search-filter">
                                                <template v-slot:append>
                                                    <q-icon v-if="selectedStartDate === ''" class="search-icon" name="search" @click="selectedStartDate = ''" />
                                                    <q-icon v-else name="cancel" class="cursor-pointer search-icon-cancel" @click="selectedStartDate = ''" />
                                                </template>
                                            </q-input>
                                        </div>                                                 
                                        <div class="col-lg-auto col-md-3 col-sm-3 col-xs-6 q-py-xs">
                                            <q-input color="primary" outlined square dense v-model="selectedEndDate" label="End Date" class="text-search-filter">
                                                <template v-slot:append>
                                                    <q-icon v-if="selectedEndDate === ''" class="search-icon" name="search" @click="selectedEndDate = ''" />
                                                    <q-icon v-else name="cancel" class="cursor-pointer search-icon-cancel" @click="selectedEndDate = ''" />
                                                </template>
                                            </q-input>
                                        </div>                
                                        <!--search-field
                                            :options="user"
                                            :value.sync="selectedUser"
                                            labelKey="user"
                                            label="User"
                                            valueKey="id"
                                        />                            
                                        <search-field
                                            :options="startDate"
                                            :value.sync="selectedStartDate"
                                            labelKey="startDate"
                                            label="Start Date"
                                            valueKey="id"
                                        />                            
                                        <search-field
                                            :options="endDate"
                                            :value.sync="selectedEndDate"
                                            labelKey="endDate"
                                            label="End Date"
                                            valueKey="id"
                                        /-->                            
                                        <div class="col-lg-auto col-md-3 col-sm-3 col-xs-6 q-py-xs">
                                            <base-select
                                                :options="reserveCategory"
                                                :value.sync="selectedReserveCategory"
                                                labelKey="cat"
                                                label="Reserve Category"
                                                valueKey="id"
                                            />
                                        </div>
                                        <div class="col-lg-1 col-md-3 col-sm-3 col-xs-12 mobile-btn-mg q-py-xs">
                                            <q-btn class="reset-filter" label="Reset Filters" @click.prevent="resetFilter" style="text-transform: capitalize;" />
                                        </div>
                                        <div class="col-lg-1 col-md-3 col-sm-3 col-xs-12 mobile-btn-mg q-py-xs">
                                            <q-btn color="primary" style="width: 100px; height: 40px;" no-caps rounded label="Apply" />
                                        </div>
                                        <div class="col-lg-1 col-md-3 col-sm-3 col-xs-12 mobile-btn-mg q-py-xs">
                                            <q-btn color="green" no-caps icon="img:statics/icons/ms-excel.png" @click="exportTable" round outline />
                                        </div>

                                    </div>

                                    <br/><br/><br/><br/>

                                    <div class="full-width communications-table">
                                        <q-table 
                                            :grid="$q.screen.xs"
                                            :data="reserveHistoryData" 
                                            :columns="reserveHistoryColumns" 
                                            row-key="name"
                                            virtual-scroll
                                            card-class="table-grid"
                                            class="rnp__table rh-table col-xs-12 col-md-12"
                                        >
                                            <template v-slot:header="props">
                                                <q-tr>
                                                    <q-th :props="props" key="user" rowspan="2" >User</q-th>
                                                    <q-th :props="props" key="dateTime" rowspan="2" >Date & Time</q-th>
                                                    <q-th :props="props" key="reserveCategory" rowspan="2" >Reserve<br/>Category</q-th>
                                                    <q-th :props="props" key="previousValue" rowspan="2" >Previous<br/>Value</q-th>
                                                    <q-th :props="props" key="currentValue" rowspan="2" >Current<br/>Value</q-th>
                                                    <q-th :props="props" key="totalPrevReserve" rowspan="2" >Total Previous<br/>Reserve</q-th>
                                                    <q-th :props="props" key="totalCurrReserve" rowspan="2" >Total Current<br/>Reserve</q-th>
                                                </q-tr>
                                            </template>
                                            <template v-slot:body="props">
                                                <q-tr>
                                                    <q-td>{{props.row.user}}</q-td>
                                                    <q-td>{{props.row.dateTime}}</q-td>
                                                    <q-td>{{props.row.reserveCategory}}</q-td>
                                                    <q-td class="text-right">{{props.row.previousValue}}</q-td>
                                                    <q-td class="text-right">{{props.row.currentValue}}</q-td>
                                                    <q-td style="text-align: right;">{{props.row.totalPrevReserve}}</q-td>
                                                    <q-td class="text-right">{{props.row.totalCurrReserve}}</q-td>
                                                </q-tr>
                                            </template>
                                        </q-table>
                                    </div>
                                
                                </div>
                            </div>
                        </q-expansion-item>
                    </q-list>
                    <q-list class="q-mb-md">
                        <q-expansion-item
                            class="claim-section-ei"
                            label="Pending Payments"
                            default-opened
                        >
                            
                            <div class="row justify-center bg-white q-col-gutter-x-md q-pt-xs q-pb-md">

                                <div class="col-12 q-pa-md">

                                    <div class="full-width communications-table">
                                        <q-table 
                                            row-key="id" 
                                            virtual-scroll
                                            card-class="table-grid"
                                            :data="pendingPayments.data" 
                                            :columns="pendingPayments.columns" 
                                            class="rnp__table col-xs-12 col-md-12"
                                            :hide-bottom="true"
                                        >
                                            <template v-slot:body="props">
                                                <q-tr 
                                                    :props="props"
                                                    class="cursor-pointer"
                                                    @click="toggleRow(props.row, $event)"
                                                    style="background-color: #FEF7EA;"
                                                >
                                                    <q-td class="ra-table-header">
                                                        {{props.row.id}}
                                                    </q-td>
                                                    <q-td class="ra-table-header">
                                                        {{props.row.invoiceNumber}}
                                                    </q-td>
                                                    <q-td class="ra-table-header"></q-td>
                                                    <q-td class="ra-table-header"></q-td>
                                                    <q-td class="ra-table-header"></q-td>
                                                    <q-td class="ra-table-header"></q-td>
                                                    <q-td class="ra-table-header"></q-td>
                                                    <q-td class="ra-table-header"></q-td>
                                                </q-tr>
                                                <template v-for="col in props.row.notes">
                                                    <q-tr v-show="props.row.show">
                                                        <q-td class="ra-table-body"></q-td>
                                                        <q-td class="ra-table-body"></q-td>
                                                        <q-td align="right" class="ra-table-body">{{col.invoiceAmount}}</q-td>
                                                        <q-td class="ra-table-body">{{col.invoiceStatus}}</q-td>
                                                        <q-td class="ra-table-body">{{col.provider}}</q-td>
                                                        <q-td class="ra-table-body">{{col.invoiceNotes}}</q-td>
                                                        <q-td class="ra-table-body">{{col.dateCreated}}</q-td>
                                                        <q-td class="ra-table-body">{{col.createdBy}}</q-td>
                                                    </q-tr>
                                                </template>
                                            </template>
                                        </q-table>
                                    </div>
                                
                                </div>
                            </div>

                        </q-expansion-item>
                    </q-list>
                    <q-list class="q-mb-md">
                        <q-expansion-item
                            class="claim-section-ei"
                            label="Payments Made"
                            default-opened
                        >
                            
                            <div class="row justify-center bg-white q-col-gutter-x-md q-pt-xs q-pb-md">

                                <div class="col-12 q-pa-md">

                                    <div class="full-width communications-table">
                                        <q-table 
                                            row-key="id" 
                                            virtual-scroll
                                            card-class="table-grid"
                                            :data="paymentsMade.data" 
                                            :columns="paymentsMade.columns" 
                                            class="rnp__table col-xs-12 col-md-12"
                                            :hide-bottom="true"
                                        >
                                            <template v-slot:body="props">
                                                <q-tr 
                                                    :props="props"
                                                    class="cursor-pointer"
                                                    @click="toggleRow(props.row, $event)"
                                                    style="background-color: #FEF7EA;"
                                                >
                                                    <q-td class="ra-table-header">
                                                        {{props.row.id}}
                                                    </q-td>
                                                    <q-td class="ra-table-header">
                                                        {{props.row.invoiceNumber}}
                                                    </q-td>
                                                    <q-td class="ra-table-header"></q-td>
                                                    <q-td class="ra-table-header"></q-td>
                                                    <q-td class="ra-table-header"></q-td>
                                                    <q-td class="ra-table-header"></q-td>
                                                    <q-td class="ra-table-header"></q-td>
                                                    <q-td class="ra-table-header"></q-td>
                                                </q-tr>
                                                <template v-for="col in props.row.notes">
                                                    <q-tr v-show="props.row.show">
                                                        <q-td class="ra-table-body"></q-td>
                                                        <q-td class="ra-table-body"></q-td>
                                                        <q-td align="right" class="ra-table-body">{{col.invoiceAmount}}</q-td>
                                                        <q-td class="ra-table-body">{{col.invoiceStatus}}</q-td>
                                                        <q-td class="ra-table-body">{{col.provider}}</q-td>
                                                        <q-td class="ra-table-body">{{col.invoiceNotes}}</q-td>
                                                        <q-td class="ra-table-body">{{col.dateCreated}}</q-td>
                                                        <q-td class="ra-table-body">{{col.createdBy}}</q-td>
                                                    </q-tr>
                                                </template>
                                            </template>
                                        </q-table>
                                    </div>
                                
                                </div>
                            </div>
                            
                        </q-expansion-item>
                    </q-list>
                    <q-list class="q-mb-md">
                        <q-expansion-item
                            class="claim-section-ei"
                            label="Previous Reserve and Payment Summaries"
                            default-opened
                        >
                            <div class="row justify-center bg-white q-col-gutter-x-md q-pt-xs q-pb-md">

                                <div class="col-12 q-pa-md">
                                                                    
                                    <!-- Table Start -->
                                    <div class="full-width communications-table">
                                        <q-table 
                                            :grid="$q.screen.xs" 
                                            :data="prevRNPSummaryData" 
                                            :columns="prevRNPSummaryColumns" 
                                            :hide-bottom="true"
                                            row-key="name"
                                            virtual-scroll
                                            card-class="table-grid"
                                            class="p-rnp__table col-xs-12 col-md-12"
                                        >
                                            <!--template v-slot:header="props">
                                                <q-tr>
                                                    <q-th :props="props" key="summary" rowspan="2" >
                                                        {{props.cols[0].label}}
                                                    </q-th>
                                                    <q-th>
                                                        <div class="float-right cursor-pointer" @click="toggleNotes">
                                                            <div v-if="!notExpand">Expand <q-icon class="note-toggle" name="expand_more"/></div>
                                                            <div v-if="notExpand">Collapse <q-icon class="note-toggle" name="expand_less"/></div>
                                                        </div>
                                                    </q-th>
                                                </q-tr>
                                            </template>
                                            <template v-slot:body-cell-summary="summary">
                                                <q-td 
                                                    :props="summary"  
                                                    class="truncate-notes"
                                                    style="background-color: #FEF7EA;"
                                                >
                                                    {{summary.value}}
                                                </q-td>
                                                <q-td style="background-color: #FEF7EA;">
                                                    <span class="float-expand-desktop float-right">
                                                        <q-icon
                                                            v-if="(!notExpand && !summary.row.expand) || !summary.row.expand"
                                                            @click="summary.row.expand = summary.row.expand = true"
                                                            class="note-icon"
                                                            name="img:statics/icons/expand-plus.svg"
                                                        />
                                                        <q-icon
                                                            v-if="(notExpand || summary.row.expand) && summary.row.expand"
                                                            @click="summary.row.expand = summary.row.expand = false"
                                                            class="note-icon"
                                                            name="img:statics/icons/expand-collapse.svg"
                                                        />
                                                    </span>
                                                </q-td>
                                            </template-->
                                            <template v-slot:header="props">
                                                <q-tr :props="props">
                                                    <q-th
                                                        v-for="col in props.cols"
                                                        :key="col.name"
                                                        :props="props"
                                                    >
                                                        {{ col.label }}
                                                    </q-th>
                                                    <q-th>
                                                        <div class="float-right cursor-pointer">
                                                            Expand
                                                        </div>
                                                    </q-th>
                                                </q-tr>
                                            </template>

                                            <template v-slot:body="props">
                                                <q-tr :props="props">
                                                    <q-td
                                                        v-for="col in props.cols"
                                                        :key="col.name"
                                                        :props="props"
                                                        style="background-color: #FEF7EA;"
                                                    >
                                                        {{ col.value }}
                                                    </q-td>
                                                    <q-td style="background-color: #FEF7EA;" auto-width>
                                                        <span class="float-expand-desktop float-right">
                                                            <q-icon
                                                                v-if="(!notExpand && !props.expand) || !props.expand"
                                                                @click="props.expand = props.expand = true"
                                                                class="note-icon"
                                                                name="img:statics/icons/expand-plus.svg"
                                                            />
                                                            <q-icon
                                                                v-if="(notExpand || props.expand) && props.expand"
                                                                @click="props.expand = props.expand = false"
                                                                class="note-icon"
                                                                name="img:statics/icons/expand-collapse.svg"
                                                            />
                                                        </span>
                                                    </q-td>
                                                </q-tr>
                                                <q-tr v-show="props.expand" :props="props">
                                                    <q-td colspan="100%" style="padding: 10px; background-color: #fff;">
                                                        
                                                        <div class="preserve-summary-table flex full-width">
                                                            <div style="width: 50%; padding: 15px; border-right: 1px solid #b3b3b3;">
                                                                Building: $0.00
                                                            </div>
                                                            <div style="width: 50%; padding: 15px;">
                                                                Contents: $0.00
                                                            </div>
                                                        </div>
                                                        <br/>
                                                        <q-table 
                                                            :grid="$q.screen.xs"
                                                            :data="prnpSummaryData" 
                                                            :columns="prnpSummaryColumns" 
                                                            :hide-bottom="true"
                                                            :rows-per-page-options="[25, 50, 100]"
                                                            :pagination.sync="prnpSummary_pagination"
                                                            row-key="name"
                                                            virtual-scroll
                                                            card-class="table-grid"
                                                            class="p-rnp__table prnpSummaryTbl col-xs-12 col-md-12"
                                                            dense
                                                        />

                                                    </q-td>
                                                </q-tr>
                                            </template>
                                        </q-table>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </q-expansion-item>
                    </q-list>

                </q-tab-panel>
        </template>

        <update-reserves
          :activate.sync="updateReserve" 
        />

        <add-reserve
          :activate.sync="addReserve" 
          :title.sync="resTitle"
        />
        
        <excess-management
          :activate.sync="excessManagement" 
        />

    </div>
    

</template>
<script src="../assets/js/reserve-payments-tab.js" />
<style>
@import '../assets/css/reserve-payments-tab.scss';
</style>