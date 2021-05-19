<template>
  <q-expansion-item 
    label="Notify"
    v-model="expand" 
    class="claim-section-ei">
    <div class="details-container">
        <div class="details-field-container row">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 bold">Task</label>
        </div>
        <div class="details-field-container row">
            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">Create Task for</label>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                <q-radio v-model="data.taskFor" val="1" label="Myself" />
                <q-radio v-model="data.taskFor" val="2" label="Claims Handler" />
                <q-radio v-model="data.taskFor" val="3" label="Other" />
            </div>
        </div>
        <div 
            v-if="data.taskFor === '3'"
            class="details-field-container row">
            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">&nbsp;</label>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12 fs-container">
                <field-select
                    valueKey="id"
                    v-if="data.taskFor === '3'"
                    labelKey="value"
                    :options="options.default"
                    :value.sync="data.taskForOther" />
            </div>
        </div>
        <div class="details-field-container row">
            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">Date</label>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                <q-input 
                    square
                    dense
                    outlined 
                    mask="date"
                    placeholder="Please select" 
                    v-model="data.notifyDate">
                    <template v-slot:append>
                        <q-icon name="keyboard_arrow_down" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                <q-date v-model="data.notifyDate" @input="() => $refs.qDateProxy.hide()" />
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </div>
        </div>
        <div class="details-field-container row">
            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">Time</label>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                <q-input 
                    square
                    dense
                    outlined 
                    mask="time"
                    placeholder="Type here" 
                    v-model="data.notifyTime">
                    <template v-slot:append>
                        <q-icon name="keyboard_arrow_down" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                                <q-time v-model="data.notifyTime" />
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </div>
        </div>
        <div class="details-field-container row">
            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">Priority</label>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12 fs-container">
                <field-select
                    valueKey="id"
                    labelKey="value"
                    :options="options.default"
                    :value.sync="data.priority"
                />
            </div>
        </div>
        <div class="details-field-container row">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 bold">Notify as FYI</label>
        </div>
        <div class="details-field-container row">
            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">Select Recipients</label>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12 fs-container">
                <field-select
                    valueKey="id"
                    labelKey="value"
                    :options="options.default"
                    :value.sync="data.selectRecipients"
                />
            </div>
        </div>
        <div class="details-field-container row">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 bold">Options</label>
        </div>
        <div class="details-field-container row">
            <q-checkbox 
                color="green"
                v-model="data.notifySendEmail" 
                label="Send Email as well as adding diary entry"/>
        </div>
        <div class="details-field-container row">
            <label class="col-lg-12 col-md-12 col-sm-12 col-xs-12 bold">Description</label>
        </div>
        <div class="details-field-container row">
            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">Short Description</label>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12 fs-container">
                <field-select
                    valueKey="id"
                    labelKey="value"
                    :options="options.default"
                    :value.sync="data.shortDescription"
                />
            </div>
        </div>
        <br />
        <div class="details-field-container row">
            <label 
                @click="resetNotifyForm"
                class="col-lg-12 col-md-12 col-sm-12 col-xs-12 reset-notify bold cursor-pointer">
                Reset Notify Form
            </label>
        </div>
    </div>
  </q-expansion-item>
</template>

<script>
import FieldSelect from "shared/components/FieldSelect";

export default {
  components: {
      FieldSelect
  },
  data: () => ({
    expand: true,
    data : {
      taskFor: '',
      taskForOther: '',
      notifyDate: '',
      notifyTime: '',
      priority: '',
      selectRecipients: '',
      notifySendEmail: true,
      shortDescription: '',
    },
    options: {
      default: [
          { id : '1', value: 'Option 1'},
          { id : '2', value: 'Option 2'},
          { id : '3', value: 'Option 3'},
      ]
    }
  }),
  methods: {
    resetNotifyForm(){
        this.data.taskFor = '';
        this.data.taskForOther = '';
        this.data.notifyDate = '';
        this.data.notifyTime = '';
        this.data.priority = '';
        this.data.selectRecipients = '';
        this.data.notifySendEmail = true;
        this.data.shortDescription = '';
    }
  }
}
</script>