<template>
  <section style="width:220px;">
    <q-select 
      v-model="value" 
      square 
      outlined
      clearable
      emit-value
      map-options
      bottom-slots
      :dense="true" 
      :options-dense="true"
      :hide-bottom-space="true" 
      :options="tempOptions"
      :option-value="valueKey"
      :option-label="labelKey"
      bg-color="white"
      color="purple-10"
      dropdown-icon="keyboard_arrow_down"/>
  </section>
</template>
<script>

export default {
  props: {
    label: {
      type: String,
      default: "Select"
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    valueKey: {
      type: String,
      default: 'id'
    },
    labelKey: {
      type: String,
      default: "name"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selectedSorting: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    clearable: false,
    tempValue: '',
    tempLabel: '',
    tempSelected: [],
    tempOptions: [],
  }),
  watch: {
    value(value){
      this.$emit("update:value", this.value);
    }
  },
  beforeMount(){
    this.tempOptions = this.options;
    this.tempLabel = this.label;
  } 
};
</script>