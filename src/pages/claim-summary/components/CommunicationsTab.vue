<template>
<div class="communications">
    <div class="flex-container table-container communications-table q-pt-lg">
        <internal-communications
            :options="internalFilter"
            :value.sync="selectedInternal"
            labelKey="name"
            label="Internal"
            valueKey="id"
        />
        <call-communications
            :options="callFilter"
            :value.sync="selectedCall"
            labelKey="name"
            label="Call"
            valueKey="id"
        />
        <email-communications
            :options="emailFilter"
            :value.sync="selectedEmail"
            labelKey="name"
            label="Email"
            valueKey="id"
        />
        <other-communications
            :options="otherFilter"
            :value.sync="selectedOther"
            labelKey="name"
            label="Other"
            valueKey="id"
        />
    </div>
    
    <!-- Table Start -->
    <div class="table-container q-pt-lg">
        <q-table 
            :grid="$q.screen.xs" 
            :pagination.sync="pagination"
            :rows-per-page-options="[25, 50, 100, 250]"
            :data="data" 
            :columns="columns" 
            row-key="name"
            virtual-scroll
            card-class="table-grid"
            class="page__table nomargin_table col-xs-12 col-md-12"
        >
            <template v-slot:header="props">
                <q-tr>
                    <q-th :props="props" key="type" rowspan="2" >{{props.cols[0].label}}</q-th>
                    <q-th :props="props" key="accessLevel" rowspan="2" class="acccesslevel-column">{{props.cols[1].label}}</q-th>
                    <q-th :props="props" key="description" rowspan="2" >
                        {{props.cols[2].label}}
                        <div class="float-right cursor-pointer" @click="toggleNotes">
                            <div v-if="!notExpand">Expand All <q-icon class="note-toggle" name="expand_more"/></div>
                            <div v-if="notExpand">Collapse All <q-icon class="note-toggle" name="expand_less"/></div>
                        </div>
                    </q-th>
                    <q-th :props="props" key="dateAdded" rowspan="2" >{{props.cols[3].label}}</q-th>
                    <q-th :props="props" key="addedBy" rowspan="2" >{{props.cols[4].label}}</q-th>
                </q-tr>
            </template>
            <template v-slot:body-cell-description="description">
                <q-td 
                :props="description"  
                class="truncate-notes">
                    <span
                        id="ellipsis-ex" 
                        class="note-truncate" 
                        v-bind:class="{ expand : notExpand, force_expand : description.row.expand, force_collapse : !description.row.expand }"
                    >
                        {{description.value}}
                    </span>
                    <span class="float-expand-desktop">
                        <q-icon
                            v-if="(!notExpand && !description.row.expand) || !description.row.expand"
                            @click="description.row.expand = description.row.expand = true"
                            class="note-icon"
                            name="img:statics/icons/expand-plus.svg"
                        />
                        <q-icon
                            v-if="(notExpand || description.row.expand) && description.row.expand"
                            @click="description.row.expand = description.row.expand = false"
                            class="note-icon"
                            name="img:statics/icons/expand-collapse.svg"
                        />
                    </span>
                </q-td>
            </template>             
            <template v-slot:body-cell-accessLevel="props">
                <q-td :props="props">
                    <div>
                        <q-select
                            square
                            dense
                            v-model="selectedAccessLevel"
                            :options="defaultOptions"
                            use-input
                            input-debounce="0"
                            @filter="filterFn"
                            behavior="menu"
                            style="margin-top: -1em;"
                            class="customTextColor"
                        >
                            {{ props.value }}
                            <template v-slot:no-option>
                                <q-item>
                                    <q-item-section class="text-grey">
                                        No results
                                    </q-item-section>
                                </q-item>
                            </template>
                        </q-select>
                    </div>
                </q-td>
            </template>
        </q-table>
    </div>
    <!-- End of Table -->
   </div>


</template>
<style>
    @import '../assets/css/communications-tab.scss';
</style>
<script src="../assets/js/communications-tab.js" />