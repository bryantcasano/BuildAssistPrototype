<template>
    <div class="claim-attachments">
        <q-btn-dropdown 
	        no-caps 
	        icon="add"
            menu-self="top left"
            v-model="dialog.addAttachment"
	        label="Add Attachments"
            menu-anchor="bottom left" 
	        class="filter-button reset-filter add-attachments q-mb-lg">
            <q-scroll-area class="filter-scroll fs-add-attachment">
                <q-item class="field-select-dropdown fsd-add-attachment">
                    <q-item-section>
                        <div class="row fsd-search-field">
                            <div class="col-xs-9">
                                <q-input class="filter-search" placeholder="Type here" borderless v-model="searchAttachment">
                                    <template v-slot:prepend>
                                        <q-icon v-if="searchAttachment === ''" color="primary" name="search" />
                                        <q-icon
                                            v-else
                                            name="search"
                                            color="primary q-pl-md"
                                            class="cursor-pointer text-primary" />
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-xs-3 clear-fsd">
                                <q-btn
                                    flat 
                                    no-caps
                                    label="Clear"
                                    :ripple="false"
                                    class="filter-clear"
                                    text-color="primary"
                                    @click="searchAttachment = ''" />
                            </div>
                        </div>
                        <template>
                            <q-item
                                clickable
                                :key="index"
                                class="item-filter"
                                @click="setNewAttachment(option.id)"
                                v-for="(option, index) in filteredOptions" >
                                <q-item-section>
                                    <label class="cursor-pointer">
                                        {{ option.value }}
                                    </label>
                                </q-item-section>
                          </q-item>
                        </template>
                    </q-item-section>
                </q-item>
            </q-scroll-area>
        </q-btn-dropdown>  
        <q-dialog
            persistent
            full-height
            content-class="create-new-attachments"
            v-model="dialog.setNewAttachment">
            <q-card>
                <q-form style="height: 100%;"
                    ref="newAttachmentsForm">
                    <q-card-section>
                        <q-icon 
                            name="close" 
                            class="close-button"
                            @click="dialog.setNewAttachment = false"/>
                        <div class="row page__heading">
                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"> 
                                Add Attachments
                            </div>
                            <div class="col">
                                <div class="float-right">
                                    <q-btn color="primary" no-caps class="filter-button float-left" rounded label="Back to Summary" @click="dialog.setNewAttachment = false" />
                                    <q-btn color="primary" no-caps class="filter-button float-left" rounded label="Save" @click="saveNewAttachment"/>
                                </div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section>
                        <q-scroll-area class="filter-scroll">
                            <div class="row container">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div class="col-lg-12 details-header">
                                        Attachment Details
                                    </div>
                                    <div class="details-container">
                                        <div class="details-field-container row">
                                            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">Access Level</label>
                                            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12 fs-container">
                                                <field-select
                                                    valueKey="id"
                                                    labelKey="value"
                                                    :options="options.accessLevel"
                                                    :value.sync="data.accessLevel"
                                                />
                                            </div>
                                        </div>
                                        <!--<div class="details-field-container row">
                                            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">Description</label>
                                            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                                                <q-input
                                                    square 
                                                    outlined 
                                                    type="textarea" 
                                                    v-model="data.description" 
                                                    placeholder="Please type"
                                                    class="col-xs-12 notes"/>
                                            </div>
                                        </div>-->
                                    </div>
                                    <br />
                                    <q-uploader
                                        flat
                                        batch
                                        square
                                        multiple
                                        label="Upload File">
                                        <template v-slot:list="scope">
                                            <q-list separator>
                                                <template v-for="file in scope.files">
                                                    <q-item :key="file.name">
                                                        <q-item-section
                                                            v-if="file.__img"
                                                            thumbnail
                                                            class="gt-xs cropped">
                                                            <img :src="file.__img.src" />
                                                        </q-item-section>    
                                                        <q-item-section side>
                                                            <q-item-label class="full-width ellipsis">
                                                                {{ file.name }}
                                                            </q-item-label>
                                                            <q-item-label caption>
                                                                {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                                                            </q-item-label>
                                                        </q-item-section>                                
                                                        <q-item-section top side>
                                                            <q-btn
                                                                class="gt-xs"
                                                                size="12px"
                                                                flat
                                                                dense
                                                                round
                                                                icon="close"
                                                                @click="scope.removeFile(file)" />
                                                        </q-item-section>
                                                    </q-item>
                                                    <div class="details-container">
                                                        <div class="details-field-container">
                                                            <q-input 
                                                                outlined 
                                                                type="textarea" 
                                                                v-model="file.note" 
                                                                placeholder="Please type"
                                                                class="col-xs-12 notes"/>
                                                        </div>
                                                    </div>
                                                </template>
                                            </q-list>
                                        </template>
                                    </q-uploader>

                                    <br />
                                    <notify/>
                                    <br />
                                    <record-activity/>
                                </div>
                            </div>
                        </q-scroll-area>
                    </q-card-section>
                </q-form>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import FieldSelect from "shared/components/FieldSelect";
import Notify from "claimSummary/components/includes/Notify";
import RecordActivity from "claimSummary/components/includes/RecordActivity";

export default {
    components: {
        Notify,
        FieldSelect,
        RecordActivity  
    },
    props: {
        success: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        tempUpload: [],
        data: {
            document: '',
            accessLevel: '',
            description: '',
            recordActivity: true,
            recordActivityDate: '',
            staffClassification: '',
            user: '',
            activity: '',
            ref: '',
            hoursValue: '',
            notes: '',
        },
        searchAttachment: '',
        dialog: {
            addAttachment: false,
            setNewAttachment: false,
        },
        options: {
            default: [
                { id : '1', value: 'Option 1'},
                { id : '2', value: 'Option 2'},
                { id : '3', value: 'Option 3'},
            ],
            addAttachments: [
                { id : '1', value: 'ACTIVITY SHEETS'},
                { id : '2', value: 'ADDITIONAL CLIENT INSTRUCTIONS'},
                { id : '3', value: 'APPROVED CONSENT DOCUMENTS'},
                { id : '4', value: 'ARCHIVED ESTIMATES'},
                { id : '5', value: 'ASSESSMENT SHEET'},
                { id : '6', value: 'AUDIT - FINANCE'},
                { id : '7', value: 'AUDIT - H&S'}
            ],
            accessLevel : [
                { id : '1', value: 'Company & Client'}
            ],
            status : [
                { id : '1', value: 'Active' }
            ]
        },
    }),
    computed: {
        filteredOptions() {
            let data = this.options.addAttachments.filter(evt => {
                return (
                    evt.value.toLowerCase().indexOf(this.searchAttachment.toLowerCase()) >=
                     0
                );
            });
            return data;
        }
    },
    methods: {
        getOptionLabel(val, idKey, labelKey, arrOption){
          var labelValue = '';
          for (var x = 0; x < arrOption.length; x++) {
            if(arrOption[x][idKey] === val){
              labelValue = arrOption[x][labelKey];
            }
          }
          return labelValue;
        },
        setNewAttachment(id){
            this.data.document = this.getOptionLabel(id, 'id', 'value', this.options.addAttachments);
            this.dialog.addAttachment = false;
            this.dialog.setNewAttachment = true;
        },
        saveNewAttachment(){
            this.dialog.setNewAttachment = false; 

            var tempData = {
                document: this.data.document,
                accessLevel: this.data.accessLevel,
                notes: [],
                show: true,
            };

            this.$local.get('claims_attachments').then(response => {
                var tempClaimsAttachmentsData = response;
                tempData.id = response.length + 1;
                tempClaimsAttachmentsData.push(tempData);
                this.$local.update('claims_attachments', tempClaimsAttachmentsData);
                this.$emit("update:success", true);
            });


            this.$q.notify({
                color: 'green',
                icon: 'thumb_up_alt',
                message: 'Save Success!',
                position: 'top',
                timeout: 1500
            });
        },
        getVal(obj){
            console.log(this);
            console.log(obj);
        }
    }
};
</script>

