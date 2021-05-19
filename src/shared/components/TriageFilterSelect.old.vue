<template>
  <section>
    <!-- Start of Select Options -->
    <q-btn-dropdown :label="label" class="dropdown-label" icon-right="add" :disabled="disabled" dropdown-icon="add">

        <q-scroll-area class="filter-scroll" style="width: 500px;">
          <q-item>
            <q-item-section>
              <div class="row">
                <div class="col-xs-8 col-md-8">
                  <q-input class="filter-search" borderless v-model="search" type="search">
                    <template v-slot:prepend>
                      <q-icon v-if="search === ''" color="primary q-pl-md" name="search" />
                      <q-icon
                        v-else
                        name="search"
                        color="primary q-pl-md"
                        class="cursor-pointer text-primary"
                        @click="search = ''"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="col-xs-4 col-md-4">
                  <q-btn
                    class="filter-clear"
                    text-color="primary"
                    label="Clear"
                    @click="search=''"
                    style="width: 100%; height: 40px; box-shadow: none; border: 0.5px solid #BBBBBB;"
                  />
                </div>
              </div>
              <template>
                <q-item
                  v-for="(option, index) in filteredOptions"
                  :key="index"
                  class="item-filter q-mt-xs"
                >
                  <q-item-section>
                    <label class="row q-mt-xs flex-wrap">
                        <div class="col-sm-7 col-md-7 col-lg-7" style="line-height: 3;">
                            {{ getOptionLabel(option) }}
                        </div>
                        <div class="col-sm-5 col-md-5 col-lg-5">
                            <q-select 
                                outlined 
                                v-model="optionVal[option.id]"
                                :options="option.options"
                                :dense="true"
                                label="Please select"
                                
                            />
                        </div>
                    </label>
                  </q-item-section>
                </q-item>
              </template>
            </q-item-section>
          </q-item>
        </q-scroll-area>

    </q-btn-dropdown>
    <!-- End of Select Options -->

    <!-- Start of Badge -->
    <q-badge
      color="blue"
      class="filter-badge"
      :label="optionVal.length - 1"
      v-if="optionVal.length > 0"
      transparent
    />
    <!-- End of Badge -->
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
      type: String
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
    selected: [],
    search: "",
    optionVal: []
  }),
  watch: {
    value(value, oldValue) {
      if(value.length != oldValue.length){
        if (this.valueKey) {
          let selected = this.options.filter(item => value.includes(item[this.valueKey]))
          this.selected = selected
        } else{
          this.selected = value
        }
      }
    },
    selected(value) {
      if (this.valueKey) {
        let selectedKey = value.map(el => {
          return el[this.valueKey];
        });
        this.$emit("update:value", selectedKey);
      } else {
        this.$emit("update:value", value);
      }

    }
  },
  computed: {
    filteredOptions() {
      let data = this.options.filter(evt => {
        return (
          evt[this.labelKey].toLowerCase().indexOf(this.search.toLowerCase()) >=
          0
        );
      });

      if (this.selectedSorting) {
        return this.arraySorting(this.selected, data);
      }

      return data;
    }
  },
  methods: {
    getOptionLabel(option) {
      return option[this.labelKey];
    },
    arraySorting(selectedArray, filteredArray) {
      let data = filteredArray;
      selectedArray.forEach(selected => {
        data = data.filter(item => item.id !== selected.id);
        data.unshift(selected);
      });
      return data;
    }
  }
};
</script>