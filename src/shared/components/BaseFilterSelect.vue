<template>
  <section class="base-filter-select" style="width:220px;">
    <q-select 
      ref="filterSelectRef"
      v-model="tempValue" 
      square 
      multiple
      outlined
      bottom-slots
      :dense="true" 
      :use-input="true"
      :emit-value="false"
      :hide-selected="true"
      :options-dense="true"
      :hide-bottom-space="true" 
      :label="tempLabel" 
      :disable="disabled"
      :options="tempOptions"
      :option-value="valueKey"
      :option-label="labelKey"
      @filter="filterFn"
      @input-value="inputValFn"
      bg-color="white"
      color="purple-10"
      input-debounce="0"
      dropdown-icon="keyboard_arrow_down">

      <template v-slot:append>
        <q-icon 
          name="cancel" 
          v-if="clearable"
          @click.stop="clearFn()" 
          class="cursor-pointer delete-text-icon" />
      </template>

      <template v-slot:option="scope">
        <q-item
          :dense="true"
          v-bind="scope.itemProps"
          v-on="scope.itemEvents">
          <q-item-section>
            <q-checkbox
              v-model="tempSelected" 
              size="md" 
              color="light-green"
              keep-color
              :dense="true"
              :val="scope.opt[valueKey]" 
              :label="scope.opt[labelKey]" />
          </q-item-section>
        </q-item>
      </template>

      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-italic text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>

    </q-select>
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
      type: Array,
      default: []
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
    tempValue: [],
    tempLabel: '',
    tempSelected: [],
    tempOptions: [],
    tempInputVal : '',
  }),
  watch: {
    value (value, oldValue){
      if(value.length === 0){
        this.clearFn();
      } else {
        this.tempSelected = value;
      }
    },
    tempSelected(value, oldValue) {
      if(value.length > 0) {
        this.tempLabel = '';
        this.clearable = true;
        this.tempLabel = this.label + ': ' + value.length + ' selected';
      } else {
        this.tempLabel =  this.label;
        this.clearable = false;
        this.tempLabel = this.label;
      }

      this.sortOption(value);
      if(value.length !== oldValue.length){
        this.$emit("update:value", value);
      }
    }
  },
  methods: {
    clearFn(){
      this.tempSelected = [];
      this.$refs.filterSelectRef.updateInputValue('');
    },
    inputValFn(val){
      this.tempInputVal = val;
      this.clearable = ((val !== '') || (this.tempSelected.length > 0)) ? true : false;
    },
    filterFn(val, update){
      if (this.selectedSorting) {
        if(this.tempSelected.length > 0){
          this.sortOption(this.tempSelected);
        }
      }
      update(() => {
        const needle = val.toLowerCase();
        this.tempOptions = this.options.filter(v => v[this.labelKey].toLowerCase().indexOf(needle) > -1);
        this.sortOption(this.tempSelected);
      })
    },
    sortOption(selected){
      var tempOpt = [];
      var tempActiveOpt = this.tempInputVal === '' ? this.options : this.tempOptions;

      tempActiveOpt.forEach((item, key) => {
        var hasSelected = false;
        selected.forEach(selectedItem => {
          if(item.id === selectedItem){
            hasSelected = true;
            tempOpt.unshift(item);
          }
        });
        if(!hasSelected){
          tempOpt.push(item);
        }
      })
      this.tempOptions = tempOpt;
    }
  },
  beforeMount(){
    this.tempOptions = this.options;
    this.tempLabel = this.label;

    if(this.value){
      this.tempSelected = this.value;
    }
  } 
};
</script>