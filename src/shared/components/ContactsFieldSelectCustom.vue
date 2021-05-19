<template>
  <section>
    <q-btn-dropdown 
      no-caps
      align="left"
      :label="label" 
      :ripple="false"
      v-model="mainBtn"
      class="field-select"
      menu-self="top left"
      menu-anchor="bottom left" 
      icon-right="keyboard_arrow_down" 
      content-class="width-limit-360"
      :class="{'fs-selected' : mainBtn , 'fs-with-value' : withValue }">
      <q-scroll-area class="filter-scroll">
        <q-item class="field-select-dropdown custom">
          <q-item-section>
            <div class="row fsd-search-field">
              <div class="col-xs-9">
                <q-input class="filter-search" placeholder="Type here" borderless v-model="search">
                  <template v-slot:prepend>
                    <q-icon v-if="search === ''" color="primary" name="search" />
                    <q-icon
                      v-else
                      name="search"
                      color="primary q-pl-md"
                      class="cursor-pointer text-primary"
                    />
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
                  @click="search = ''"
                />
              </div>
            </div>
            <template>
              <q-item
                v-for="(option, index) in filteredOptions"
                :key="index"
                class="item-filter"
              >
                <q-item-section>
                  <label>
                    {{ getOptionLabel(option) }}
                  </label>
                  <q-select
                    outlined
                    class="fsd-select" 
                    label="Please Select" 
                    :options='option.options'
                    v-model="optionVal[option.id]"
                    dropdown-icon="keyboard_arrow_down" 
                    popup-content-class="fsd-select-popup"
                  />
                  </q-item-section>
              </q-item>
            </template>
          </q-item-section>
        </q-item>
      </q-scroll-area>
    </q-btn-dropdown>
  </section>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "Please select"
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
      type: String
    },
    labelKey: {
      type: String,
      default: "name"
    },
  },
  data: () => ({
    search: "",
    mainBtn : false,
    withValue : false,
    optionVal : {}
  }),
  computed: {
    filteredOptions() {
      let data = this.options.filter(evt => {
        return (
          evt[this.labelKey].toLowerCase().indexOf(this.search.toLowerCase()) >=
          0
        );
      });
      
      return data;
    }
  },
  methods: {
    getOptionLabel(option) {
      return option[this.labelKey];
    },
    setValue(option){
      this.$emit("update:value", option[this.valueKey]);
      this.$emit("update:label", option[this.labelKey]);
      this.mainBtn = false;
      this.withValue = true;
    }
  },
  beforeMount(){
    if(this.value !== '') {
      var checkValueExist = this.options.find(x => x[this.valueKey] === this.value);
      if(checkValueExist){
        this.setValue(checkValueExist);
      }
    }
  }
};
</script>