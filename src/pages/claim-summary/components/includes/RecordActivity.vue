<template>
  <q-expansion-item 
    v-model="expand"
    label="Record Activity" 
    class="claim-section-ei">
    <div class="details-container row">
      <div :class="classContainer">
        <div class="details-field-container row">
            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">Record Activity</label>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                <q-checkbox 
                    color="green"
                    v-model="data.recordActivity" />
            </div>
        </div>
        <div class="details-field-container row">
            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">Date</label>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                <q-input 
                    dense
                    square
                    outlined 
                    mask="date"
                    placeholder="Please select" 
                    v-model="data.recordActivityDate">
                    <template v-slot:append>
                        <q-icon name="keyboard_arrow_down" class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                <q-date v-model="data.recordActivityDate" @input="() => $refs.qDateProxy.hide()" />
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </div>
        </div>
        <div class="details-field-container row">
            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">Staff Classification</label>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12 fs-container">
                <field-select
                    valueKey="id"
                    labelKey="value"
                    :options="options.default"
                    :value.sync="data.staffClassification"
                />
            </div>
        </div>
        <div class="details-field-container row">
            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">User</label>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12 fs-container">
                <field-select
                    valueKey="id"
                    labelKey="value"
                    :options="options.default"
                    :value.sync="data.user"
                />
            </div>
        </div>
         <div class="details-field-container row">
            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">Product Line</label>
            <label class="col-lg-7 col-md-7 col-sm-7 col-xs-12">Operations</label>
        </div>
        <div class="details-field-container row">
            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">Activity</label>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12 fs-container">
                <field-select
                    valueKey="id"
                    labelKey="value"
                    :options="options.default"
                    :value.sync="data.activity"
                />
            </div>
        </div>
        <div class="details-field-container row">
            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">Ref</label>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12 fs-container">
                <field-select
                    valueKey="id"
                    labelKey="value"
                    :options="options.default"
                    :value.sync="data.ref"
                />
            </div>
        </div>
        <div class="details-field-container row">
            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">Hours*/Value</label>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12 fs-container">
                <field-select
                    valueKey="id"
                    labelKey="value"
                    :options="options.default"
                    :value.sync="data.hoursValue"
                />
            </div>
        </div>
        <div class="details-field-container row">
            <label class="col-lg-5 col-md-5 col-sm-5 col-xs-12">Notes</label>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                <q-input 
                    square
                    outlined 
                    type="textarea" 
                    v-model="data.notes" 
                    placeholder="Please type"
                    class="col-xs-12 notes"/>
            </div>
        </div>
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
  props: {
      classContainer: {
          type: String,
          default: 'col-lg-12 col-md-12 col-sm-12 col-xs-12'
      }
  },
  data: () => ({
    expand: true,
    data: {
      recordActivity: true,
      recordActivityDate: '',
      staffClassification: '',
      user: '',
      activity: '',
      ref: '',
      hoursValue: '',
      notes: '',
    },
    options: {
      default: [
          { id : '1', value: 'Option 1'},
          { id : '2', value: 'Option 2'},
          { id : '3', value: 'Option 3'},
      ]
    }
  })
}
</script>