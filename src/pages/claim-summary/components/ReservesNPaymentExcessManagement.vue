<template>
    <q-dialog
        persistent
        full-height
        content-class="claim-registration"
        v-model="dialogModel"
    >
        <q-card style="width: 600px; max-width: 60vw;">
             <q-form style="height: 100%;"
                ref="claimRegistrationForm">
                <q-card-section class="claim-registration-section">
                    <div class="row page__heading">
                        <div class="col-md-8 col-sm-8 col-xs-12" style="text-transform: capitalize;"> 
                            <h5 style="margin-top: 10px; font-weight: bold;">EXCESS MANAGEMENT</h5>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="float-right">
                                <q-btn color="primary" no-caps class="filter-button float-left" rounded label="Update" type="submit" @click="updateExcessManagement"/>
                                <q-btn color="primary" no-caps class="filter-button float-left cancel-btn" rounded label="Cancel" @click="closeDialog" />
                            </div>
                        </div>
                    </div>
                </q-card-section>
                <q-card-section class="claim-registration-section">
                    <q-scroll-area class="filter-scroll">      
                        <q-list class="q-mb-md">
                            <q-expansion-item
                                class="claim-section-ei"
                                label="Edit Collect Excess"
                                default-opened
                            >
                                <div class="row justify-center bg-white q-col-gutter-x-md q-pl-lg q-pr-lg q-pt-md q-pb-md">

                                    <div class="col-sm-12 col-md-12 q-mt-sm text-regular">
                                        To Collect <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedToCollect"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>

                                    <div class="col-sm-12 col-md-12 q-mt-sm text-regular">
                                        Function <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedFunction"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>

                                    <div class="col-sm-8 col-md-8 q-mt-sm text-regular">
                                        Date <br/>
                                        <q-input square outlined v-model="date" dense mask="date">
                                            <template v-slot:append>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                                        <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-sm text-regular"></div>
                                    
                                    <div class="col-sm-12 col-md-12 q-mt-sm text-regular">
                                        Notes <br/>
                                        <q-input 
                                            square 
                                            outlined 
                                            dense 
                                            v-model="notesInput" 
                                            label="Type here" 
                                            type="textarea"
                                        />
                                    </div>

                                </div>
                            </q-expansion-item>
                        </q-list>
                        
                    </q-scroll-area>
                </q-card-section>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script>

const stringOptions = ['Option 1', 'Option 2', 'Option 3']

export default {
    props: {
        activate: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({

        stringOptions,
        defaultOptions: stringOptions,
        // start of selected v-model
        // -- claim details
        selectedToCollect: '',
        selectedFunction: '',
        // start of datepicker v-model
        date: '',
        // start of input v-model
        notesInput: '',

        dialogModel: false,
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
        updateExcessManagement(){
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
        filterFn (val, update) {
            if (val === '') {
                update(() => {
                    this.defaultOptions = stringOptions
                })
                return
            }

            update(() => {
                const needle = val.toLowerCase()
                this.defaultOptions = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
            })
        }
    }
};
</script>

<style>
</style>
