<template>
    <div>
        <q-form 
            class="create-triage-form"
            ref="createTriageForm">
            <div class="row">
                <div class="col-lg-10 col-md-12 col-sm-12 col-xs-12">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <q-expansion-item
                            expand-separator
                            label="Triage Question"
                            v-model="toggle.triageQuestion"
                        >
                            <div class="row table-container"
                                v-if="toggle.triageQuestion">
                                <q-table 
                                    row-key="id" 
                                    virtual-scroll
                                    card-class="table-grid" 
                                    id="tirageQuestionsTable" 
                                    ref="tirageQuestionsTable"
                                    :data="triageQuestions.data" 
                                    :columns="triageQuestions.columns" 
                                    class="page__table col-xs-12 col-md-12"
                                    :rows-per-page-options="[25, 50, 100]"
                                    :pagination.sync="triageQuestions.pagination">
                                    <template v-slot:body="props">
                                        <q-tr :props="props">
                                            <q-td key="id">{{props.row.id}}</q-td>
                                            <q-td key="label">
                                                <div>{{props.row.label}}</div>
                                            </q-td>
                                            <q-td key="controls" class="details-container">
                                                <div class="details-field-container">
                                                    <field-select
                                                        valueKey="id"
                                                        labelKey="value"
                                                        v-if="props.row.multiple"
                                                        :options="options.default"
                                                        :value.sync="props.row.value"
                                                    />
                                                    <q-input 
                                                        square
                                                        outlined 
                                                        placeholder="Type here"
                                                        v-model="props.row.value" 
                                                        v-if="!props.row.multiple" />
                                                </div>
                                                <q-icon 
                                                    name="insert_drive_file"
                                                    :class="props.row.canUpdate ? 'active' : ''"
                                                    @click="updateQuestion(props.row, 'update')">
                                                    <q-icon 
                                                        name="keyboard_arrow_right"/>
                                                </q-icon>
                                                <q-icon 
                                                    name="insert_drive_file"
                                                    :class="props.row.canAdd ? 'active' : ''"
                                                    @click="updateQuestion(props.row, 'add-note')">
                                                    <q-icon 
                                                        class="add"
                                                        name="add"/>
                                                </q-icon>
                                                <div 
                                                    v-if="props.row.notes.length > 0"
                                                    class="notes-label cursor-pointer"
                                                    @click="displayNotes(props.row)">
                                                    + {{props.row.notes.length}} Note<span v-if="props.row.notes.length > 1">(s)</span>
                                                </div>
                                            </q-td>
                                       </q-tr>
                                    </template>
                                </q-table>
                            </div>
                        </q-expansion-item>   
                    </div>
                    <br />
                    <div class="col-lg-12">
                        <record-activity
                            class-container="col-lg-5 col-md-8 col-sm-12 col-xs-12" />
                    </div>
                    <br />
                    <div class="col-lg-12">
                        <div class="details-container row padl-15">
                            <div class="col-lg-12 col-md-12">
                                <q-checkbox 
                                    color="green"
                                    v-model="data.onlineAccessCP" 
                                    label="Enable online access to claimant portal"/>
                            </div>
                            <div class="col-lg-12 col-md-12">
                                <q-radio v-model="data.emailType" val="registered" label="Registered email" />
                                <q-radio v-model="data.emailType" val="primary" label="Primary contact email" />
                                <q-radio v-model="data.emailType" val="secondary" label="Secondary" />
                                <q-radio v-model="data.emailType" val="other" label="Other email" />
                                <div 
                                    v-if="data.emailType ==='other'"
                                    class="details-field-container other-email">
                                    <q-input 
                                      square
                                      outlined 
                                      class="col-xs-12" 
                                      v-model="data.otherEmail" 
                                      :rules="rules.email"
                                      placeholder="Type here" />
                                </div>
                            </div>
                        </div>
                        <div class="details-container row padl-15">
                            <q-btn 
                                no-caps  
                                color="primary" 
                                label="Save Details"
                                @click="saveDetails()"
                                class="filter-button adjust-top marginl-10" />  
                        </div>
                    </div>
                </div>
            </div>
        </q-form>
        <q-dialog 
            persistent
            v-model="noteList">
            <q-card class="create-triage-card">
                <q-card-section>
                    <q-icon 
                        name="close"
                        class="cursor-pointer close"
                        @click="closeDialog('noteList')" />
                    <div class="page__heading">Vulnerable Customer Notes</div>
                    <q-table 
                        row-key="id" 
                        virtual-scroll
                        card-class="table-grid" 
                        id="notesTable" 
                        ref="notesTable"
                        :data="question.data.notes" 
                        :columns="question.columns" 
                        class="page__table col-xs-12 col-md-12"
                        :rows-per-page-options="[25, 50, 100]"
                        :pagination.sync="question.pagination">
                        <template v-slot:body="props">
                            <q-tr :props="props">
                                <q-td key="id">{{props.row.id}}</q-td>
                                <q-td key="note">{{props.row.note}}</q-td>
                                <q-td key="addedBy">{{props.row.addedBy}}</q-td>
                           </q-tr>
                        </template>
                    </q-table>
                </q-card-section>
            </q-card>  
        </q-dialog>
        <q-dialog 
            persistent
            v-model="questionDetails">
            <q-card class="create-triage-card">
                <q-card-section>
                    <q-icon 
                        name="close"
                        class="cursor-pointer close"
                        @click="closeDialog('questionDetails')" />
                    <div class="page__heading">Update Question Details</div>
                    <div class="details-header">
                        Triage Notes
                    </div>
                    <div class="col-lg-12">
                        <div class="details-container row">
                            <div class="details-field-container row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-12">Note</label>
                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                                    <q-input 
                                        square
                                        outlined 
                                        v-model="note" 
                                        type="textarea" 
                                        placeholder="Please type"
                                        class="col-xs-12 notes"/>
                                </div>
                            </div>
                            <div class="details-field-container row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <q-btn 
                                        no-caps 
                                        square 
                                        label="Save"
                                        color="primary"
                                        @click="addNote()" 
                                        class="filter-button"   
                                        :disable="note === ''" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div 
                        class="details-header" 
                        v-if="questionRequest">
                        Request
                    </div>
                    <div 
                        class="col-lg-12" 
                        v-if="questionRequest">
                        <div class="details-container row">
                            <div class="details-field-container row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-12">Request Details</label>
                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                                    <q-input
                                        square 
                                        outlined 
                                        type="textarea" 
                                        v-model="question.data.label" 
                                        placeholder="Please type"
                                        class="col-xs-12 notes"/>
                                </div>
                            </div>
                            <div class="details-field-container row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <label class="col-lg-4 col-md-4 col-sm-4 col-xs-12">Request Type</label>
                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                                    <field-select
                                        valueKey="id"
                                        labelKey="value"
                                        :options="options.default"
                                        :value.sync="question.data.value"/>
                                </div>
                            </div>
                            <div class="details-field-container row col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <q-btn 
                                        no-caps 
                                        color="primary" 
                                        label="Send Request"
                                        class="filter-button" 
                                        @click="requestQuestions()"
                                        :disable="question.data.label === '' || question.data.value === ''"/>  
                                </div>
                            </div>
                        </div>
                    </div>
                </q-card-section>
            </q-card>  
        </q-dialog>
    </div>
</template>

<script>
import FieldSelect from "shared/components/FieldSelect";
import RecordActivity from "claimSummary/components/includes/RecordActivity";

export default {
    components: {
        FieldSelect,
        RecordActivity
    },
    props: {
        activate: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        question: {
            columns: [
                { name: 'id', align: 'left', label : 'No.', field: 'id'},
                { name: 'note', align: 'left', label: 'Note', field: 'note'},
                { name: 'addedBy', align: 'left', label: 'Added by', field: 'addedBy' }
            ],
            data: {},
            pagination: {
                rowsPerPage: 25
            },
        },
        note: '',
        noteList: false,
        questionDetails: false,
        questionRequest: false,
        data : {
            onlineAccessCP: true,
            emailType: 'primary',
            otherEmail: '',
        },
        triageQuestions : {
            columns: [
                { name: 'id', align: 'left', label : 'Id', field: 'id'},
                { name: 'label', align: 'left', label: 'Label', field: 'label'},
                { name: 'controls', align: 'left', label: 'Controls', field: 'controls' }
            ],
            pagination: {
                rowsPerPage: 25
            },
            data: [
                { 
                    id: '1', 
                    label: 'Vulnerable Customer', 
                    value:'', 
                    canUpdate: false,
                    canAdd: true,
                    multiple: true,
                    notes: [
                        {   id: '1', note: 'Description sample lorem ipsum', addedBy: 'Cherry Blossom'},
                        {   id: '2', note: 'Description sample lorem ipsum Aenean dapibus varius', addedBy: 'Cliff Hanger'},
                        {   id: '3', 
                            note: 'Lorem ipsum dolor sit amet, consetetur sadipscing slitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptuua.' +  
                            'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd', 
                            addedBy: 'Ken Tucky'},
                        {   id: '4', note: 'Description sample sit amet', addedBy: 'Caution Fatigue'},
                    ]
                },
                { id: '2', label: 'Vulnerable Scale', value:'', canUpdate: true, canAdd: false, multiple: true, notes: []},
                { id: '3', label: 'Assessment Type', value:'', canUpdate: false, canAdd: true, multiple: true, notes: []},
                { id: '4', label: 'Have you, ir any of your close contacts, shown signs of COVID-19 or returned from overseas lately?', value:'', canUpdate: false, canAdd: true, multiple: true, notes: []},
                { id: '5', label: 'Firstly and most importantly, is everyone okay?', value:'', canUpdate: false, canAdd: true, multiple: true, notes: []},
                { id: '6', label: 'Can I ask how many people reside at the home?', value:'', canUpdate: false, canAdd: true, multiple: true, notes: []},
                { id: '7', label: 'Does anyone there have critical needs?', value:'', canUpdate: false, canAdd: true, multiple: true, notes: []},
                { id: '8', label: 'Are there any dangers or hazards such as structural damage, broken asbestos, heavy soot, or inundated/exposed electrical circuits?', value:'', canUpdate: false, canAdd: true, multiple: true, notes: []},
                { id: '9', label: 'Is your property secure?', value:'', canUpdate: false, canAdd: true, multiple: true, notes: []},
                { id: '10', label: 'How server is the damage to your home?', value:'', canUpdate: false, canAdd: true, multiple: true, notes: []},
                { id: '11', label: 'Are there any emergency works to be completed?', value:'', canUpdate: false, canAdd: true, multiple: true, notes: []},
                { id: '12', label: 'Are you able to live in the home?', value:'', canUpdate: false, canAdd: true, multiple: true, notes: []},
                { id: '13', label: 'Do you have any pets?', value:'', canUpdate: false, canAdd: true, multiple: true, notes: []},
                { id: '14', label: 'Do you require temporary accommodation?', value: '', canUpdate: false, canAdd: true, multiple: true, notes: []},
                { id: '15', label: 'Value of damage to driveways, paths, or fences (to be completed by assessor)', value:'', canUpdate: false, canAdd: true, multiple: false, notes: []},
            ]
        },
        options: {
            default: [
                { id: '1', value: 'Option 1' },
                { id: '2', value: 'Option 2' },
                { id: '3', value: 'Option 3' }
            ]
        },
        toggle: {
            triageQuestion: true
        },
        rules: {
            email: [
               (val) => !!val || 'Email is required',
               (val) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) || 'Email must be valid'
            ],
        }
    }),
    methods: {
        displayNotes(questionObj){
            this.noteList = true;
            this.question.data = questionObj;
        },
        updateQuestion(questionObj, trans){
            if((questionObj.canUpdate && trans === 'update') || (questionObj.canAdd && trans === 'add-note')) {
                this.note = '';
                this.questionDetails = true;
                this.question.data = questionObj;
                this.questionRequest =  (trans === 'add-note') ? false : true;
            }
        },
        saveDetails(){
            this.$q.notify({
                color: 'green',
                icon: 'thumb_up_alt',
                message: 'Save Success!',
                position: 'top',
                timeout: 1500
            });
        },
        closeDialog(val){
            this[val] = false;
        },
        addNote(){
            this.question.data.notes.push({
                id: this.question.data.notes.length + 1,
                note: this.note,
                addedBy : 'Current User'
            });
            this.questionDetails = false;
            this.$q.notify({
                color: 'green',
                icon: 'thumb_up_alt',
                message: 'Note Added!',
                position: 'top',
                timeout: 1500
            });
        },
        requestQuestions(){
            this.questionDetails = false;
            this.$q.notify({
                color: 'green',
                icon: 'thumb_up_alt',
                message: 'Request Sent!',
                position: 'top',
                timeout: 1500
            });
        }
    }
};
</script>

<style scoped>
    .create-triage-form .details-field-container>label {
        padding-top: 7px;
    }
    .create-triage-form >>> .details-field-container .q-field--square .q-field__control {
        background-color: #fff!important; 
        height: 40px;
    }
    .create-triage-form .filter-button,
    .create-triage-card .filter-button {
        box-shadow: none;
        margin-top: 7px;
        max-width: unset;
        width: auto;
    }
    .create-triage-card >>> .filter-button .q-btn__wrapper:before,
    .create-triage-form >>> .filter-button .q-btn__wrapper:before {
        content: none;
    }
    .create-triage-form .details-container .details-field-container .notes,
    .create-triage-card .details-container .details-field-container .notes,
    .create-triage-card >>> .details-container .details-field-container .notes textarea,
    .create-triage-card >>> .details-container .details-field-container .notes .q-field__control,
    .create-triage-card >>> .details-container .details-field-container .notes .q-field__control-container {
        height: 105px;
        min-height: 105px;
    }
    .create-triage-form >>> .q-expansion-item .q-item {
        background-color: #7c7d90;
        color: #fff;
        font-size: 14px;
        font-weight: normal;
        min-height: 40px;
        padding: 10px 25px;
    }
    .create-triage-form >>> .q-expansion-item .q-item .q-expansion-item__toggle-icon {
        color: #fff;
        font-size: 19px;
        font-weight: normal;
    }
    .create-triage-form .table-container > .q-table__container  {
        border: none;
        border-radius: 0;
        box-shadow: none;
        margin: 25px 0;
    }
    .create-triage-form >>> .table-container thead {
        display: none;
    }
    .create-triage-form .q-table tbody tr:hover {
        background-color: transparent!important;
        mix-blend-mode: normal;
    }
    .create-triage-form .q-table tbody td:before {
        background: rgba(0 ,0 ,0, 0);
    }
    .create-triage-form .q-table tr,
    .create-triage-form .q-table td {
        border-color: rgba(0, 0, 0, 0)!important;
    }
    .create-triage-form .q-table tr > td {
        vertical-align: top;
    }
    .create-triage-form .q-table tr > td:first-of-type {
        font-family: Myriad Pro Regular;
        padding-left: 25px;
        padding-top: 16px;
        width: 65px;
    }
    .create-triage-form .q-table tr > td:nth-of-type(2) {
        padding-top: 16px;
    }
    .create-triage-form .q-table tr > td:nth-of-type(2) > div {
        min-width: 300px;
        text-align: left;
        white-space: normal;
    }
    .create-triage-form .q-table tr > td:last-of-type {
        padding-left: 70px;
        padding-top: 4px;
        text-align: left; 
        width: 600px!important;
    }
    .create-triage-form .q-table tr > td:last-of-type .details-field-container {
        margin-right: 20px;
        padding: 0;
        width: 270px;
    }
    .create-triage-card .details-field-container section,
    .create-triage-form >>> .details-field-container section {
        width: 100%!important;
    }
    .create-triage-form >>> .details-field-container .q-field__marginal {
        height: 40px;
    }
    .create-triage-form .q-table tr > td:last-of-type .details-field-container > label {
        padding: 0;
    }
    .create-triage-form .q-table tr > td:last-of-type > i {
        color: #CCC;
        cursor: not-allowed;
        font-size: 21px;
        margin: 7px;
    }
    .create-triage-form .q-table tr > td:last-of-type > i.active {
        color: #0660AE;
        cursor: pointer;
    }
    .create-triage-form .q-table tr > td:last-of-type > i > i {
        color: #FFF;
        font-size: 15px;
        left: 3px;
        position: absolute;
        top: 5px;
        z-index: 1;
    }
    .create-triage-form .q-table tr > td:last-of-type > i > i.add {
        font-size: 12px;
        left: 4px;
        top: 7px;
    }
    .create-triage-form .q-table tr > td:last-of-type > .notes-label {

        color: #41474F;
        padding: 8px 15px;
    }
    .create-triage-form >>> .q-table__bottom {
        border-top: none;
    }
    .create-triage-form .padl-15 {
        padding-left: 15px ;
    }
    .create-triage-form .marginl-10 {
        margin-left: 10px;
    }
    .create-triage-form .other-email {
        padding: 0 0 0 12px;
        width: 300px;
    }
    .create-triage-card {
        overflow: auto;
        width: 750px;
    }
    .create-triage-card i.close{
        background: #0560ae;
        color: #fff;
        font-size: 18px;
        padding: 15px;
        position: absolute;
        right: 0;
        top: 0;
    }
    .create-triage-card .page__heading {
        color: #41474E;
        font-size: 25px;
        font-weight: bold;
        margin: 30px 20px 20px;
        text-transform: none;
    }
    .create-triage-card .details-header {
        margin: 20px 20px 0;
    }
    .create-triage-card .details-field-container > label {
        padding-left: 20px;
    }
    .create-triage-card .details-field-container > div {
        padding-right: 20px;
    }
    .create-triage-card >>> .q-btn.filter-button {
        float: right;
        margin: 0;
        width: 120px;
    }
    .create-triage-card >>> .q-table__container {
        margin: 20px;
    }
    .create-triage-card >>> .q-table tr > th {
        border-bottom: none;
        padding-bottom: 25px;
        padding-top: 30px;
        text-align: left!important;
    }
    .create-triage-card .q-table tr > td {
        vertical-align: top;
        padding-bottom: 15px;
        padding-top: 15px;
    }
    .create-triage-card >>> .q-table tr > th:first-of-type,
    .create-triage-card .q-table tr > td:first-of-type {
        padding-left: 30px;
        width: 50px;
    }
    .create-triage-card .q-table tr > td:nth-of-type(2) {
        min-width: 250px;
        text-align: left;
        white-space: normal;
        
    }
    .create-triage-card >>> .q-table tr > th:last-of-type,
    .create-triage-card .q-table tr > td:last-of-type {
        padding-right: 30px;
        text-align: left;
        width: 100px;
    }

    @media (max-width: 1500px) {
        .create-triage-form .q-table tr > td:last-of-type {
            width: 570px!important;
        }
    }
    @media (max-width: 650px) {
        .create-triage-form .details-field-container > label,
        .create-triage-form .details-field-container > div, 
        .create-triage-form .details-field-container.other-email {
            width: 100%;
        }
    }
    @media (max-width: 600px) {
        .create-triage-card .details-field-container > div {
            padding-left: 20px;
        }
    }
</style>
