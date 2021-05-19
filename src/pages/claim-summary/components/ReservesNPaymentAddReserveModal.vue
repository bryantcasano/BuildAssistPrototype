<template>
    <q-dialog
        persistent
        full-height
        content-class="claim-registration"
        v-model="dialogModel">
        <q-card style="width: 650px; max-width: 65vw;">
             <q-form style="height: 100%;"
                @submit="onSubmit" 
                ref="claimRegistrationForm">
                <q-card-section class="claim-registration-section">
                    <div class="row page__heading">
                        <div class="col-md-8 col-sm-8 col-xs-12" style="text-transform: capitalize;"> 
                            <h5 style="margin-top: 10px; font-weight: bold;">ADD RESERVE SUB-ITEM</h5>
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
                        <div class="row">
                            <q-table
                                :grid="$q.screen.xs"
                                :data="data"
                                :columns="columns"
                                row-key="name"
                                :filter="filter"
                                :pagination.sync="pagination"
                                hide-pagination
                                class="rnp__table col-xs-12 col-md-12"
                            >
                                <template v-slot:header>
                                    <q-tr>
                                        <q-td>
                                            <div style="padding: 15px 0px 15px; font: 25px Myriad Pro Semibold; color: #222; border-bottom: 1px solid #d1d1d1; width: 100%;">
                                                {{ title }}
                                            </div>
                                        </q-td>
                                    </q-tr>
                                    <q-tr>
                                        <q-td>
                                            <q-input dense outlined debounce="300" v-model="filter" class="q-pt-xs" style="width: 100%;" placeholder="Search">
                                                <template v-slot:prepend>
                                                    <q-icon name="search" />
                                                </template>
                                            </q-input>
                                        </q-td>
                                    </q-tr>
                                </template>
                                <template v-slot:body="props">
                                    <q-tr style="vertical-align: middle;" :props="props">
                                        <q-td>
                                            <q-checkbox v-model="props.row.model" color="green" size="xs" />
                                            {{ props.row.type }}
                                        </q-td>
                                    </q-tr>
                                </template>
                            </q-table>
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
        },
        title: {
            type: String,
            default: ''
        }
    },
    data: () => ({
        dialogModel: false,
        pagination: {
            page: 0,
            rowsPerPage: 0
        },
        filter: '',
        columns: [
            { name: 'type', label: 'Building Type', field: 'type' }
        ],
        data: [
            { type: 'Current Building Reserve', model: true },
            { type: 'Contingency', model: true },
            { type: 'Owners Works', model: true },
            { type: 'Makesafe', model: true },
            { type: 'Tree Looping', model: true },
            { type: 'Enhanced Foundations', model: true },
            { type: 'Temporary Accomodation', model: true },
            { type: 'Specialist Fee', model: true },
            { type: 'Removal of Debris', model: true },
            { type: 'Dividing Fence', model: true },
            { type: 'Restoration', model: true },
            { type: 'Loss of Rent', model: true },
            { type: 'Survey Fees', model: true },
            { type: 'Architect Fees', model: true },
            { type: 'Council Fees', model: true },
            { type: 'Structural Engineers Fee', model: true },
            { type: 'Geotechnical Engineer Fees', model: true },
            { type: 'Flooring Contractor', model: true },
            { type: 'EQC Benefit Building', model: true },
            { type: 'Hail Assessment', model: true },
            { type: 'Variations', model: true },
            { type: 'Asbestos Removal and Testing', model: true },
            { type: 'Demolition', model: true }
        ]
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
