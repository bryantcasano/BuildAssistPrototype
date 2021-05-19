<template>
    <q-dialog
        persistent
        full-width
        full-height
        v-model="dialogModel">
        <q-card>
             <q-form style="height: 100%;"
                @submit="onSubmit" 
                ref="bookAppointmentForm">
                <q-card-section class="book-appointment-section">
                    <div class="row page__heading">
                        <div class="col-lg-10 col-md-8 col-sm-12 col-xs-12"> 
                            Appointments
                        </div>
                        <div class="col">
                            <div class="float-right" v-if="!editAppointmentList">
                                <q-btn color="primary" no-caps class="filter-button float-left" rounded label="Save" type="submit"/>
                                <q-btn color="primary" no-caps class="filter-button float-left cancel-btn" rounded label="Cancel" @click="closeDialog" />
                            </div>
                            <div class="float-right" v-if="editAppointmentList">
                                <q-btn no-caps class="filter-button float-left disabled-btn" disable rounded label="Save"/>
                                <q-btn no-caps class="filter-button float-left disabled-btn" disable rounded label="Cancel"/>
                            </div>
                        </div>
                    </div>
                </q-card-section>
                <q-card-section class="book-appointment-section">
                    <q-scroll-area class="filter-scroll">
                        <div class="row">
                            <div class="pad-adjustment col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                <div 
                                    class="col-lg-12 details-header"
                                    v-bind:style="[editAppointmentList ? {'background': '#F2A100', 'color' : '#fff', 'font-weight' : 'normal'} : {}]">
                                    Appointment Details
                                </div>
                                <div class="details-container row" 
                                    v-bind:style="[editAppointmentList ? {'background' : '#fef7ea'} : {}]"
                                    v-bind:class="{'bg-fade-out' : editAppointmentListTransition}">
                                    <div class="col-lg-10 col-md-12 col-sm-12 col-xs-12">
                                        <div class="details-field-container row">
                                            <label class="col-xs-12">Reference Number</label>
                                            <div class="col-xs-12">
                                                <label class="data-display bold">{{data.referenceNo}}</label>
                                            </div>
                                        </div>
                                        <div class="details-field-container adjust-top row">
                                            <label class="col-xs-12">Consultant<span class="red">*</span></label>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 pad-field-adjustment">
                                                <field-select
                                                    valueKey="id"
                                                    labelKey="value"
                                                    :required="true"
                                                    :options="options.default"
                                                    v-if="!editAppointmentList"
                                                    :value.sync="data.consultant"
                                                />
                                                <label class="data-display bold" v-if="editAppointmentList">
                                                    {{getOptionLabel(data.consultant, 'id', 'value', options.default)}}
                                                </label>
                                            </div>
                                        </div>
                                        <div class="details-field-container adjust-top row">
                                            <label class="col-xs-12">Assign to</label>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 pad-field-adjustment">
                                                <field-select
                                                    valueKey="ref"
                                                    labelKey="agent"
                                                    :value.sync="data.assignTo"
                                                    v-if="!editAppointmentList"
                                                    :options="detailedAppointmentLog.data"
                                                />
                                                <label class="data-display bold" v-if="editAppointmentList">
                                                    {{getOptionLabel(data.assignTo, 'ref', 'agent', detailedAppointmentLog.data)}}
                                                </label>
                                            </div>
                                        </div>
                                        <div class="details-field-container row">
                                            <label class="col-xs-12">Appointment Date<span class="red">*</span></label>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 pad-field-adjustment">
                                                <q-input 
                                                    outlined 
                                                    mask="date"
                                                    placeholder="Type here" 
                                                    v-model="data.appointmentDate"
                                                    :rules="['date']">
                                                    <template v-slot:append>
                                                        <q-icon name="keyboard_arrow_down" class="cursor-pointer">
                                                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                                                <q-date v-model="data.appointmentDate" @input="() => $refs.qDateProxy.hide()" />
                                                            </q-popup-proxy>
                                                        </q-icon>
                                                    </template>
                                                </q-input>
                                            </div>
                                        </div>
                                        <div class="details-field-container adjust-top row">
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                                <label class="col-lg-6">Start Time<span class="red">*</span></label>
                                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 pad-field-adjustment">
                                                    <q-input 
                                                        outlined 
                                                        mask="time"
                                                        placeholder="Type here" 
                                                        v-model="data.startTime"
                                                        :rules="['time']">
                                                        <template v-slot:append>
                                                            <q-icon name="keyboard_arrow_down" class="cursor-pointer">
                                                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                                    <q-time v-model="data.startTime" />
                                                                </q-popup-proxy>
                                                            </q-icon>
                                                        </template>
                                                    </q-input>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 end-time">
                                                <label class="col-lg-6">End Time<span class="red">*</span></label>
                                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 pad-field-adjustment">
                                                    <q-input 
                                                        outlined 
                                                        mask="time"
                                                        v-model="data.endTime"
                                                        placeholder="Type here" 
                                                        :rules="['time', val => val > data.startTime]">
                                                        <template v-slot:append>
                                                            <q-icon name="keyboard_arrow_down" class="cursor-pointer">
                                                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                                    <q-time v-model="data.endTime" />
                                                                </q-popup-proxy>
                                                            </q-icon>
                                                        </template>
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="details-field-container adjust-top row">
                                            <label class="col-xs-12">Reason<span class="red">*</span></label>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 pad-field-adjustment">
                                                <field-select
                                                    valueKey="id"
                                                    labelKey="value"
                                                    :required="true"
                                                    :options="options.default"
                                                    :value.sync="data.reason"
                                                />
                                            </div>
                                        </div>
                                        <div class="details-field-container adjust-top row">
                                            <q-checkbox 
                                                color="green"
                                                v-model="data.chargeable"  
                                                label="Chargeable" />
                                        </div>
                                        <div class="details-field-container row">
                                            <label class="col-xs-12">Description<span class="red">*</span></label>
                                            <q-input 
                                                outlined 
                                                type="textarea" 
                                                v-model="data.description" 
                                                placeholder="Please type"
                                                class="col-xs-12 pad-field-adjustment notes"  
                                                :rules="[ val => val && val.length > 0]" />
                                        </div>
                                        <div class="details-field-container row" v-if="editAppointmentList">
                                            <label class="col-xs-12">Appointment Status<span class="red">*</span></label>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 pad-field-adjustment">
                                                <field-select
                                                    valueKey="id"
                                                    labelKey="value"
                                                    :required="true"
                                                    :options="options.default"
                                                    :value.sync="data.appointmentStatus"
                                                />
                                            </div>
                                        </div>
                                        <q-btn 
                                            type="submit"
                                            color="primary" 
                                            rounded label="Apply" 
                                            v-if="editAppointmentList"
                                            no-caps class="filter-button float-left" />
                                        <q-btn 
                                            color="primary" 
                                            rounded label="Cancel"
                                            v-if="editAppointmentList"
                                            @click="cancelAppointmentList"
                                            no-caps class="filter-button float-left cancel-btn" />
                                    </div>
                                </div>
                                <div class="col-lg-12 details-header adjust-top" v-if="!editAppointmentList">Communication</div>
                                <div class="details-container row" v-if="!editAppointmentList">
                                    <div class="col-lg-10 col-md-12 col-sm-12 col-xs-12">
                                        <div class="details-field-container row">
                                            <label class="col-xs-12">Type<span class="red">*</span></label>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 pad-field-adjustment">
                                                <field-select
                                                    valueKey="id"
                                                    labelKey="value"
                                                    :required="true"
                                                    :options="options.default"
                                                    :value.sync="data.type"
                                                />
                                            </div>
                                        </div>
                                        <div class="details-field-container adjust-top row">
                                            <label class="col-xs-12">Access Level</label>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 pad-field-adjustment">
                                                <field-select
                                                    valueKey="id"
                                                    labelKey="value"
                                                    :options="options.default"
                                                    :value.sync="data.accessLevel"
                                                />
                                            </div>
                                        </div>
                                        <div class="details-field-container row">
                                            <label class="col-xs-12 q-pb-md">Note<span class="red">*</span></label>
                                            <q-input 
                                                outlined 
                                                type="textarea" 
                                                v-model="data.note" 
                                                placeholder="Please type"
                                                class="col-xs-12 pad-field-adjustment notes"  
                                                :rules="[ val => val && val.length > 0]" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12 details-header adjust-top" v-if="!editAppointmentList">Notify</div>
                                <div class="details-container row" v-if="!editAppointmentList">
                                    <div class="col-lg-10 col-md-12 col-sm-12 col-xs-12">
                                        <div class="details-field-container row">
                                            <label class="col-xs-12">Internal User</label>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 pad-field-adjustment">
                                                <field-select
                                                    valueKey="id"
                                                    labelKey="value"
                                                    :value.sync="data.internalUser"
                                                    :options="options.default"
                                                />
                                            </div>
                                        </div>
                                        <div class="details-field-container row">
                                            <label class="col-xs-12">More Internal Users</label>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 pad-field-adjustment">
                                                <field-select
                                                    valueKey="id"
                                                    :multi="true"
                                                    labelKey="value"
                                                    :options="options.default"
                                                    :value.sync="data.moreInternalUsers"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                <div class="col-lg-12 details-header">Appointment Log</div>
                                <div class="row table-container">
                                    <q-table 
                                        row-key="no" 
                                        virtual-scroll
                                        id="appointmentLog1" 
                                        :grid="$q.screen.xs" 
                                        ref="appointmentLog1"
                                        card-class="table-grid" 
                                        :data="appointmentLog.data" 
                                        :pagination.sync="appointmentLog.pagination"
                                        :columns="appointmentLog.columns" 
                                        class="page__table col-xs-12 col-md-12"
                                        :rows-per-page-options="[25, 50, 100, 250]">
                                        <template v-slot:body="props">
                                            <q-tr class="cursor-pointer" :props="props">
                                                <q-td key="no">{{props.row.no}}</q-td>
                                                <q-td key="consultant">{{props.row.consultant}}</q-td>
                                                <q-td key="appDate">{{props.row.appDate}}</q-td>
                                                <q-td key="status">{{props.row.status}}</q-td>
                                                <q-td key="by">{{props.row.by}}</q-td>
                                           </q-tr>
                                        </template>
                                        <template v-slot:top-right>
                                            <q-td class="mobile-pagination">   
                                                <q-pagination
                                                    v-model="currentLogs"
                                                    :max="25"
                                                    :input="true">
                                                </q-pagination>
                                            </q-td>
                                        </template>
                                    </q-table>
                                </div>
                                <div class="col-lg-12 details-header adjust-top" 
                                    v-if="data.consultant !== ''">Appointment List for {{ getOptionLabel(data.consultant, 'id', 'value', options.default)}}</div>
                                <div class="row table-container" 
                                    v-if="data.consultant !== ''">
                                    <q-table 
                                        row-key="no" 
                                        virtual-scroll
                                        id="appointmentLog2" 
                                        :grid="$q.screen.xs" 
                                        ref="appointmentLog2"
                                        card-class="table-grid" 
                                        :data="detailedAppointmentLog.data" 
                                        :columns="detailedAppointmentLog.columns" 
                                        class="page__table no-hover col-xs-12 col-md-12">
                                        <template v-slot:body="props">
                                            <q-tr :props="props">
                                                <q-td colspan="8" class="dl-header bold">{{props.row.dayTime}}</q-td>
                                            </q-tr>
                                            <template :props="props">
                                                <q-tr 
                                                    v-bind:class="{'edit-mode': activeAppointmentList === props.row.ref}"
                                                    v-bind:style="[activeAppointmentList === props.row.ref ? {'background': '#fef7ea' } : {}]">
                                                    <q-td key="no" class="bold">{{props.row.no}}</q-td>
                                                    <q-td key="ref" class="bold">{{props.row.ref}}</q-td>
                                                    <q-td key="time">
                                                        <div class="dl-time">
                                                            {{props.row.time}}      
                                                        </div>
                                                    </q-td>
                                                    <q-td key="customer">
                                                        <div class="dl-customer">
                                                            {{props.row.customer}}      
                                                        </div>
                                                                        </q-td>
                                                    <q-td key="agent">{{props.row.agent}}</q-td>
                                                    <q-td key="reason">{{props.row.reason}}</q-td>
                                                    <q-td key="bookDetails">
                                                        <div class="dl-booked-details"> 
                                                            {{props.row.bookedDetails}}
                                                        </div>
                                                    </q-td>
                                                    <q-td key="edit">
                                                        <q-icon 
                                                            name="create" 
                                                            color="primary" 
                                                            class="cursor-pointer" 
                                                            style="font-size: 17px;"
                                                            @click="selectAppointmentList(props.row.ref)" />
                                                    </q-td>
                                                </q-tr>
                                            </template>
                                            <template :props="props">
                                                <q-tr 
                                                    v-bind:class="{'edit-mode': activeAppointmentList === props.row.ref}"
                                                    v-bind:style="[activeAppointmentList === props.row.ref ? {'background': '#fef7ea' } : {}]">
                                                    <q-td colspan="8" class="dl-description">
                                                        <div class="col-lg-12 bold">Description</div>
                                                        {{props.row.description}}
                                                    </q-td>
                                                </q-tr>
                                            </template>
                                        </template>
                                        <template v-slot:top-right>
                                            <q-td class="mobile-pagination">   
                                                <q-pagination
                                                    v-model="currentDetailedLogs"
                                                    :max="5"
                                                    :input="true">
                                                </q-pagination>
                                            </q-td>
                                        </template>
                                    </q-table>
                                </div>
                            </div>
                        </div>
                    </q-scroll-area>
                </q-card-section>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script>
import FieldSelect from "shared/components/FieldSelect";

export default {
    components: {
        FieldSelect
    },
    props: {
        activate: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        currentLogs: 0,
        dialogModel: false,
        currentDetailedLogs: 0,
        editAppointmentList: false,
        activeAppointmentList: null,
        editAppointmentListTransition: false,
        data: {
            referenceNo: 'C71567',
            consultant: '',
            assignTo: '',
            appointmentDate: '',
            startTime: '',
            endTime: '',
            reason: '',
            chargeable: true,
            description: '',
            note: '',
            appointmentStatus: '',
            type: '',
            accessLevel: '',
            internalUser: '',
            moreInternalUsers: null,
        },
        options: {
            default: [
                { id: '1', value: 'Option 1' },
                { id: '2', value: 'Option 2' },
                { id: '3', value: 'Option 3' }
            ]
        },
        appointmentLog: {
            pagination: {
                rowsPerPage: 25
            },
            columns: [
                { name: 'no', align: 'left', label : '#', field: 'no'},
                { name: 'consultant', align: 'left', label: 'Consultant', field: 'consultant'},
                { name: 'appDate', align: 'left', label: 'App Date', field: 'appDate' },
                { name: 'status', align: 'left', label: 'Status', field: 'status'},
                { name: 'by', align: 'left', label: 'By', field: 'by' },
            ],
            data: [
                {
                    no: '1',
                    consultant: 'Marge Arin',
                    appDate: '26/08/2019',
                    status: 'New Appointments',
                    by: 'Ken Tucky'
                },
                {
                    no: '2',
                    consultant: 'Cliff Hanger',
                    appDate: '27/08/2019',
                    status: 'Appointment Completed',
                    by: 'Ken Tucky'
                },
                {
                    no: '3',
                    consultant: 'Cliff Hanger',
                    appDate: '28/08/2019',
                    status: 'Appointment Cancelled',
                    by: 'Barry Cade'
                },
                {
                    no: '4',
                    consultant: 'Cherry Blossom',
                    appDate: '29/08/2019',
                    status: 'Appointment Completed',
                    by: 'Barry Cade'
                },
                {
                    no: '5',
                    consultant: 'Cherry Blossom',
                    appDate: '30/08/2019',
                    status: 'New Appointments',
                    by: 'Will Power'
                },
                {
                    no: '6',
                    consultant: 'Marge Arin',
                    appDate: '30/08/2019',
                    status: 'New Appointments',
                    by: 'Will Power'
                }
            ]
        },
        detailedAppointmentLog: {
            columns: [
                { name: 'no', align: 'left', label : '#', field: 'no'},
                { name: 'ref', align: 'left', label: 'Our Ref', field: 'ref'},
                { name: 'time', align: 'left', label: 'Time', field: 'time' },
                { name: 'customer', align: 'left', label: 'Customer', field: 'customer'},
                { name: 'agent', align: 'left', label: 'Agent', field: 'agent' },
                { name: 'reason', align: 'left', label: 'Reason', field: 'reason' },
                { name: 'bookDetails', align: 'left', label: 'Booked Details', field: 'bookDetails' },
                { name: 'edit', align: 'left', label: 'Edit', field: 'edit' },
            ],
            data: [
                {
                    no: '1',
                    ref: 'C71621',
                    time: '06:00 AM',
                    customer: 'QT10001 Surname 1/44 Windmill Road, Auckland, NI Ph:',
                    agent: 'Cherry Blossom',
                    reason: 'Inspection',
                    bookedDetails: '14/04/20 17:22:30 By Patrick',
                    dayTime: 'Tuesday 14/04/2020',
                    description: 'Test appointment text comes here as description'
                },
                {
                    no: '2',
                    ref: 'C71622',
                    time: '06:00 AM',
                    customer: 'QT10001 Surname 1/44 Windmill Road, Auckland, NI Ph:',
                    agent: 'Cliff Hanger',
                    reason: 'Inspection',
                    bookedDetails: '14/04/20 17:22:30 By Patrick',
                    dayTime: 'Tuesday 14/04/2020',
                    description: 'Test appointment text comes here as description'
                },
                {
                    no: '3',
                    ref: 'C71623',
                    time: '06:00 AM',
                    customer: 'QT10001 Surname 1/44 Windmill Road, Auckland, NI Ph:',
                    agent: 'Ken Tucky',
                    reason: 'Inspection',
                    bookedDetails: '14/04/20 17:22:30 By Patrick',
                    dayTime: 'Tuesday 14/04/2020',
                    description: 'Test appointment text comes here as description'
                },
                {
                    no: '4',
                    ref: 'C71624',
                    time: '06:00 AM',
                    customer: 'QT10001 Surname 1/44 Windmill Road, Auckland, NI Ph:',
                    agent: 'Caution Fatigue ',
                    reason: 'Inspection',
                    bookedDetails: '14/04/20 17:22:30 By Patrick',
                    dayTime: 'Tuesday 14/04/2020',
                    description: 'Test appointment text comes here as description'
                },
                {
                    no: '5',
                    ref: 'C71625',
                    time: '06:00 AM',
                    customer: 'QT10001 Surname 1/44 Windmill Road, Auckland, NI Ph:',
                    agent: 'Marge Arin',
                    reason: 'Inspection',
                    bookedDetails: '14/04/20 17:22:30 By Patrick',
                    dayTime: 'Tuesday 14/04/2020',
                    description: 'Test appointment text comes here as description'
                }
            ]
        }
    }),
    watch: {
        activate(value, oldValue) {
            this.dialogModel = value;
        }
    },
    methods: {
        closeDialog() {
            this.dialogModel = false;
            this.$emit("update:activate", this.dialogModel);

            this.data = {
                referenceNo: 'C71567',
                consultant: '',
                assignTo: '',
                appointmentDate: '',
                startTime: '',
                endTime: '',
                reason: '',
                chargeable: false,
                description: '',
                appointmentStatus: '',
                type: '',
                accessLevel: '',
                internalUser: '',
                moreInternalUsers: null,
            };

            this.dropdown = {
                consultant: 'Please select',
                assignTo: 'Please select',
                internalUser: 'Please select',
                moreInternalUsers: 'Please select'
            };
        },
        getOptionLabel(val, idKey, labelKey, arrOption){
            var labelValue = '';
            for (var x = 0; x < arrOption.length; x++) {
                if(arrOption[x][idKey] === val){
                    labelValue = arrOption[x][labelKey];
                }
            }
            return labelValue;
        },
        selectAppointmentList(refNo){
            this.data.assignTo = refNo;
            this.editAppointmentList = true;
            this.activeAppointmentList = refNo;
            this.editAppointmentListTransition = false;
            setTimeout(() => this.editAppointmentListTransition = true , 1000);
        },
        cancelAppointmentList(){
            this.data.assignTo = '';
            this.editAppointmentList = false;
            this.activeAppointmentList = null;
            this.editAppointmentListTransition = false;
        },
        onSubmit(event) {
            if(this.editAppointmentList){
                this.cancelAppointmentList();
            } else {
                this.closeDialog();
            }
        }
    }
};
</script>

<style scoped>
    .book-appointment-section {
        float: left;
        padding: 0;
        position: relative;
        width: 100%;
    }
    .book-appointment-section:last-of-type {
        bottom: 0;
        position: absolute;
        top: 140px;
    }
    .book-appointment-section >>> .page__heading { 
        color: #41474F;
        margin: 0 150px 40px;
        padding-top: 50px;
        text-transform: none;
    }
    .book-appointment-section .filter-button {
        box-shadow: none;
        margin-top: 7px;
        max-width: unset;
        width: auto;
    }
    .book-appointment-section .filter-scroll {
        bottom: 10px;
        height: 100%;
        padding: 0 150px 30px;
        position: absolute;
        top:0;
        width: 100%;
    }
    .book-appointment-section .filter-button:first-of-type {
        margin-right: 15px;
    }
    .book-appointment-section .filter-button >>> .q-btn__wrapper {
        min-height: 34px;
        padding: 3px 16px;
    }
    .book-appointment-section .filter-button >>> .q-btn__wrapper:before {
        box-shadow: none;
    }
    .book-appointment-section .filter-button >>> .q-btn__content {
        font-family: Myriad Pro Regular;
    }
    .book-appointment-section .pad-field-adjustment {
        padding-right: 15px;
    }
    .book-appointment-section .pad-adjustment {
        padding-right: 5px;
    }
    .book-appointment-section .table-container {
        margin-top: 30px;
        padding: 0 15px;
    }
    .book-appointment-section #appointmentLog1 {
        max-height: 361px; 
    }
    .book-appointment-section #appointmentLog2 {
        max-height: 755px;
    }
    .book-appointment-section .q-table__card {
        box-shadow: none;
    }
    .book-appointment-section .page__table >>> th:nth-last-child(2),
    .book-appointment-section .page__table td:nth-last-child(2),
    .book-appointment-section .page__table td:last-child { 
        text-align: left;
    }
    .book-appointment-section .page__table >>> th:first-child,
    .book-appointment-section .page__table td:first-child { 
        padding-left: 40px;
    }
    .book-appointment-section .page__table >>> th:last-child,
    .book-appointment-section .page__table td:last-child { 
        padding-right: 40px;
        text-align: left;
    }
    .book-appointment-section .page__table td:first-child { 
        font: 14px Myriad Pro Regular;
    }
    .book-appointment-section .page__table.no-hover .q-table tbody tr:hover {
        background-color: transparent!important;
        mix-blend-mode: normal;
    }
    .book-appointment-section .page__table.no-hover .q-table tbody tr.edit-mode:hover {
        background-color: #fef7ea!important;
    }
    .book-appointment-section .page__table.no-hover .q-table tbody tr.edit-mode  i.q-icon {
        color: #ccc!important;
        cursor: default!important;
    }
    .book-appointment-section .page__table.no-hover .q-table tbody td {
        vertical-align: top;
        white-space: normal;
    }
    .book-appointment-section .page__table.no-hover .q-table tbody td:before {
        background: rgba(0 ,0 ,0, 0);
    }
    .book-appointment-section .page__table.no-hover .q-table tr,
    .book-appointment-section .page__table.no-hover .q-table td {
        border-color: rgba(0, 0, 0, 0)!important;
    }
    .book-appointment-section .page__table.no-hover .q-table td.dl-description {
        border-top:1px solid rgba(0, 0, 0, 0.12)!important;
        padding-bottom: 30px;
    }
    .book-appointment-section .page__table.no-hover >>> .q-table__bottom {
        border-top: 0;
        min-height: 24px;
    }
    .book-appointment-section .page__table.no-hover >>> .q-table__bottom .q-table__control{
        display: none;
    }
    .book-appointment-section .bold {
        font: 14px Myriad Pro Semibold!important;
    }
    .book-appointment-section .dl-header {
        background: #CAD1E0;
        height: 32px;
    }
    .book-appointment-section .dl-time {
        min-width: 55px;
    }
    .book-appointment-section .dl-customer {
        max-width: 200px;
    }
    .book-appointment-section .dl-booked-details {
        max-width: 100px;
    }
    .details-container .details-field-container .notes >>> .q-field__control, 
    .details-container .details-field-container .notes {
        height: 60px;
    }
    .details-container .details-field-container .notes >>> .q-field__native  {
        min-height: 45px;
    }
    .details-header.adjust-top {
        margin-top: 32px;
    }
    /* ------- media queries ----------- */
    /* ------- fixes for responsive issues  --- */
    @media (max-width: 1820px) {
        .book-appointment-section .filter-scroll {
            padding: 0 50px 30px;
        }
        .book-appointment-section >>> .page__heading { 
            margin: 0 50px 40px;
        }
    }
    @media (max-width: 1024px) {
        .book-appointment-section:last-of-type {
            top: 170px;
        }
        .book-appointment-section .page__heading >>> .col-md-8 {
            width: 100%;
        }   
        .book-appointment-section .page__heading >>> .col {
            flex: 0 0 auto;
        }
    }
    @media (max-width: 767px) {
        .book-appointment-section:last-of-type {
            top: 140px;
        }
    }
    @media (max-width: 599px) {
        .book-appointment-section .page__heading {
            margin: 0 0 20px;
            padding-left: 25px;
        }
        .book-appointment-section #appointmentLog1 {
            max-height: unset; 
        }   
        .book-appointment-section #appointmentLog2 {
            max-height: unset;
        }
        .book-appointment-section .filter-scroll {
            padding: 0 0 20px;
        }
        .book-appointment-section .pad-adjustment,
        .book-appointment-section .pad-field-adjustment {
            padding-right: 0;
        }
        .book-appointment-section .end-time { 
            margin-top: 15px;
        }
    }
</style>
