<template>
  <section>
    <!-- Start of Select Options -->
    <q-btn-dropdown class="communications-btn dropdown-label" :label="label" :disabled="disabled">

        <q-scroll-area class="filter-scroll">
            <q-item>
                <q-item-section>
                    <div class="row">
                        <div class="col-xs-12 col-md-12">
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
                                <template v-slot:append>
                                    <q-icon color="primary q-mr-sm" name="clear" @click="search = ''" />
                                </template>
                            </q-input>
                        </div>
                    </div>
                    <template>
                        <q-item
                            v-for="(option, index) in filteredOptions"
                            :key="index"
                            clickable
                            v-ripple
                            class="item-filter"
                        >
                            <q-item-section @click="internalDialog = true">
                                {{ getOptionLabel(option) }}
                            </q-item-section>
                        </q-item>
                    </template>
                </q-item-section>
            </q-item>
        </q-scroll-area>

    </q-btn-dropdown>
    <!-- End of Select Options -->

    <q-dialog
      persistent
      v-model="internalDialog"
    >
      <q-card style="width: 900px; max-width: 80vw;">
        <q-card-section>
          <q-icon 
              name="close"
              class="cursor-pointer close"
              v-close-popup
          />
          <div class="row justify-center dialog__header">
            <div class="col-sm-5 col-md-5 col-lg-5 dialog__title">Internal Details</div>
            <div class="col-sm-4 col-md-3 col-lg-3 q-mr-sm">
              <q-btn label="Back To Summary" class="q-mt-sm dialog__btn" v-close-popup />
            </div>
            <div class="col-sm-2 col-md-3 col-lg-3">
              <q-btn label="Save" class="q-mt-sm dialog__btn" />
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="row justify-center dialog__spacing">            
            <q-list>
              <q-expansion-item
                default-opened
                class="claim-section-ei"
                label="Communication Details"
              >
                <div class="row justify-center bg-white">
                  <div class="col-md-4 col-sm-6 q-mt-sm text-regular">
                    Access Level
                  </div>
                  <div class="col-md-6 col-sm-6 q-mt-sm text-regular">
                    <q-select
                      clearable
                      square
                      outlined
                      dense
                      v-model="selectedAccessLevel"
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
                  <div class="col-md-4 col-sm-6 q-mt-sm text-regular">
                    Note
                  </div>
                  <div class="col-md-6 col-sm-6 q-mt-sm q-mb-sm text-regular">
                    <q-input
                      v-model="note"
                      type="textarea"
                      class="textarea"
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit, odio eu vestibulum eleifend, dui nunc eleifend ligula, id consectetur arcu felis vel elit. Donec lacus diam, fermentum consectetur maximus id, auctor ac neque."
                    />
                  </div>
                </div>
              </q-expansion-item>

              <notify/>
              <record-activity/>

            </q-list>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

  </section>
</template>
<script>
import FieldSelect from "shared/components/FieldSelect";
import Notify from "claimSummary/components/includes/Notify";
import RecordActivity from "claimSummary/components/includes/RecordActivity";

const stringOptions = ['Option 1', 'Option 2', 'Option 3']

export default {
  components: {
      FieldSelect,
      RecordActivity,
      Notify
  },
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
    stringOptions,
    defaultOptions: stringOptions,
    // for dialog
    internalDialog: false,
    selected: [],
    search: '',
    // for textarea
    note: '',
    // for q-select
    selectedAccessLevel: null
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