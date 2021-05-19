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
      :options-dense="true"
      :hide-bottom-space="true" 
      :options="tempOptions"
      :label="tempLabel" 
      :option-value="valueKey"
      :option-label="labelKey"
      @filter="filterFn"
      @input-value="inputValFn"
      bg-color="white"
      color="purple-10"
      input-debounce="0"
      popup-content-class="bfs-custom"
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
          v-bind="scope.itemProps">
          <q-item-section class="flex-container">
            {{scope.opt[labelKey]}}
          </q-item-section>
          <q-item-section>
            <q-select 
              square 
              outlined
              clearable
              emit-value
              map-options
              bottom-slots
              :dense="true" 
              bg-color="white"
              color="purple-10"
              label="Please select" 
              :options-dense="true"
              v-model="tempSelected[scope.opt[valueKey]]"
              :hide-bottom-space="true" 
              :options="scope.opt.options"
              dropdown-icon="keyboard_arrow_down" />
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
    tempValue: '',
    tempLabel: '',
    optionVal: [],
    tempOptions: [],
    tempSelected: [],
    tempInputVal : '',
  }),
  watch: {
    value (value, oldValue){
      if(value.length === 0){
        this.clearFn();
      }
    },
    tempSelected(value, oldValue) {
      this.clearable = (value.length > 0) ? true : false;
      this.sortOption(value);
    }
  },
  methods: {
    clearFn(){
      this.tempSelected = [];
      this.$refs.filterSelectRef.updateInputValue('');
    },
    inputValFn(val){
      this.tempInputVal = val;
      this.clearable = (val !== '') ? true : false;
    },
    filterFn(val, update){
      if(val === ''){
        if (this.selectedSorting) {
          if(this.tempSelected.length > 0){
            this.sortOption(this.tempSelected);
          }
        }
        update(() => {
          this.sortOption(this.tempSelected);
        })
      } else {
        update(() => {
          const needle = val.toLowerCase();
          this.tempOptions = this.options.filter(v => v[this.labelKey].toLowerCase().indexOf(needle) > -1);
        })
      }
    },
    sortOption(selected){
      var tempOpt = [];
      var tempActiveOpt = this.tempInputVal === '' ? this.options : this.tempOptions;
      
      tempActiveOpt.forEach((item, key) => {
        var hasSelected = false;
        selected.forEach((selectedItem, selectedKey) => {
          if(String(item.id) === String(selectedKey)){
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
  } 
};
</script>