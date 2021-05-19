<template>
    <q-dialog
        persistent
        full-height
        content-class="claim-registration"
        v-model="dialogModel">
        <q-card style="width: 850px; max-width: 85vw;">
             <q-form style="height: 100%;"
                @submit="onSubmit" 
                ref="claimRegistrationForm">
                <q-card-section class="claim-registration-section">
                    <div class="row page__heading">
                        <div class="col-md-8 col-sm-8 col-xs-12" style="text-transform: capitalize;"> 
                            <h5 style="margin-top: 10px; font-weight: bold;">UPDATE RESERVES</h5>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="float-right">
                                <q-btn color="primary" no-caps class="filter-button float-left" rounded label="Update" type="submit" @click="saveReserve"/>
                                <q-btn color="primary" no-caps class="filter-button float-left cancel-btn" rounded label="Cancel" @click="closeDialog" />
                            </div>
                        </div>
                    </div>
                </q-card-section>
                <q-card-section class="claim-registration-section">
                    <q-scroll-area class="filter-scroll">      
                        <div class="row q-px-xl">
                            <q-table 
                                row-key="id" 
                                virtual-scroll
                                card-class="table-grid"
                                :data="updateReservesTbl.data" 
                                :columns="updateReservesTbl.columns" 
                                class="rnp__table col-xs-12 col-md-12"
                                :hide-bottom="true"
                            >
                                <template v-slot:body="props">
                                    <q-tr 
                                        :props="props"
                                        class="cursor-pointer"
                                        @click="toggleRow(props.row, $event)"
                                        style="background-color: #F3F3F3;"
                                    >
                                        <q-th class="ra-table-header" colspan="3" align="left">
                                            {{props.row.descHead}}
                                        </q-th>
                                    </q-tr>
                                    <template>
                                        <q-tr v-for="(col, index) in props.row.notes" :key="index">
                                            <q-td class="ra-table-body">
                                                <q-checkbox v-model="col.model" color="green" size="xs" />
                                                {{col.description}}
                                            </q-td>
                                            <q-td class="ra-table-body" style="vertical-align: middle;">
                                                <strong class="q-pr-lg">                                                     
                                                    {{props.row.descHead.substring(0,3)}}                                                    Total: 
                                                </strong>
                                                {{col.values}}
                                            </q-td>
                                            <q-td class="ra-table-body" style="vertical-align: middle;">
                                                <strong class="q-pr-lg">Building: </strong>
                                                {{col.authorisedValues}}
                                            </q-td>
                                        </q-tr>
                                    </template>
                                </template>
                            </q-table>
                        </div>  
                        <div class="row q-px-xl q-pt-md q-pb-md">
                            <table
                                virtual-scroll
                                card-class="table-grid"
                                class="rnp__table col-xs-12 col-md-12"
                            >
                                <tr class="cursor-pointer text-left">
                                    <th style="border-bottom: 1px solid #d1d1d1; padding: 10px;">Description</th>
                                    <th style="border-bottom: 1px solid #d1d1d1; padding: 10px;">Estimates</th>
                                </tr>
                                <tr class="cursor-pointer">
                                    <td class="ra-table-header" style="border-bottom: 1px solid #d1d1d1; padding: 10px;">Building</td>
                                    <td class="ra-table-header" style="border-bottom: 1px solid #d1d1d1; padding: 10px;">
                                        <q-input square outlined dense v-model="estimatesBuildingInput" style="background-color: #fff; text-align: right; width: 60%;" value="" />
                                    </td>
                                </tr>
                                <tr class="cursor-pointer">
                                    <td class="ra-table-header" style="border-bottom: 1px solid #d1d1d1; padding: 10px;">Contents</td>
                                    <td class="ra-table-header" style="border-bottom: 1px solid #d1d1d1; padding: 10px;">
                                        <q-input square outlined dense v-model="estimatesContentsInput" style="background-color: #fff; text-align: right; width: 60%;" value="" />
                                    </td>
                                </tr>
                                <tr class="cursor-pointer">
                                    <td class="ra-table-header" style="padding: 10px;">Prof Fees</td>
                                    <td class="ra-table-header" style="padding: 10px;">
                                        <q-input square outlined dense v-model="estimatesProfFeesInput" style="background-color: #fff; text-align: right; width: 60%;" value="" />
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </q-scroll-area>
                </q-card-section>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    props: {
        activate: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        dialogModel: false,
        estimatesBuildingInput: '16,513.31',
        estimatesContentsInput: '0.00',
        estimatesProfFeesInput: '0.00',
        updateReservesTbl: {
            columns: [
                { name: 'description', align: 'left', label: 'Description', field: 'description' },
                { name: 'values', align: 'left', label: 'Values', field: 'values' },
                { name: 'authorisedValues', align: 'left', label: 'Authorised Values', field: 'authorisedValues' }
            ],
            data: [
                {   
                    descHead: 'Estimates',
                    notes: [
                        {   
                            description: 'Main Est', 
                            values: '16,513.31',
                            authorisedValues: '0.00',
                            model: true
                        },
                        {   
                            description: 'Main Est Rev 1', 
                            values: '2,109.10',
                            authorisedValues: '0.00',
                            model: true
                        },
                        {   
                            description: 'Main Est Rev 2', 
                            values: '4,843.23',
                            authorisedValues: '0.00',
                            model: true
                        },
                        {   
                            description: 'Main Est Rev 3', 
                            values: '2,109.10',
                            authorisedValues: '0.00',
                            model: true
                        },
                        {   
                            description: 'Main Est Rev 4', 
                            values: '12,262.91',
                            authorisedValues: '0.00',
                            model: true
                        },
                        {   
                            description: 'Main Est Rev 5', 
                            values: '5,461.00',
                            authorisedValues: '0.00',
                            model: true
                        }
                    ],
                    show: true
                },
                {
                    descHead: 'Variations',
                    notes: [
                        {
                            description: 'Bld Var 1',
                            values: '500.00',
                            authorisedValues: '500.00',
                            model: true
                        },
                        {
                            description: 'Main Var 1',
                            values: '10,000.00',
                            authorisedValues: '10,000.00',
                            model: true
                        }
                    ],
                    show: true
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
        },
        saveReserve(){
            this.dialogModel = false;  
            this.$emit("update:activate", this.dialogModel);
            this.$router.push('/claim-summary');
            this.$q.notify({
                color: 'green',
                icon: 'thumb_up_alt',
                message: 'Save Success!',
                position: 'top',
                timeout: 1500
            });
        },
        onSubmit(event) {
            if(this.editAppointmentList){
                this.cancelAppointmentList();
            } else {
                this.closeDialog();
            }
        },
        toggleRow(value, event){
            if(!(event.target.className.includes('cursor-pointer') && event.target.className.includes('q-icon'))){
                value.show = !value.show;
            }
        }
    }
};
</script>

<style>
</style>
