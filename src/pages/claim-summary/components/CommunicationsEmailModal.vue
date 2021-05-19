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
                        <q-list>
                            <q-expansion-item
                                dense
                                dense-toggle
                                default-opened
                                v-for="(option, index) in filteredOptions"
                                :key="index"
                                :label="getOptionLabel(option)"
                                class="text-weight-bolder"
                            >
                                <q-item
                                    v-for="(child, id) in option.children"
                                    :key="id"
                                    clickable
                                    v-ripple
                                    class="item-filter text-weight-light q-ml-md"
                                >
                                    <q-item-section @click="emailDialog = true">
                                        {{ child.name }}
                                    </q-item-section>
                                </q-item>
                            </q-expansion-item>
                        </q-list>
                    </template>
                </q-item-section>
            </q-item>
        </q-scroll-area>

    </q-btn-dropdown>
    <!-- End of Select Options -->

    <q-dialog
      persistent
      v-model="emailDialog"
      full-width
    >
      <q-card>
            <q-card-section>
                <q-icon 
                    name="close"
                    class="cursor-pointer close"
                    v-close-popup
                />
                <div class="row justify-center dialog__header">
                    <div class="col-sm-5 col-md-5 col-lg-5 dialog__title">Email Details</div>
                    <div class="col-sm-4 col-md-3 col-lg-3 q-mr-sm">
                        <q-btn label="Back To Summary" class="q-mt-sm dialog__btn" v-close-popup />
                    </div>
                    <div class="col-sm-2 col-md-3 col-lg-3">
                        <q-btn label="Save" class="q-mt-sm dialog__btn" />
                    </div>
                </div>
                <div class="row justify-center q-my-sm q-mx-xl">
                    <div class="col-md-12 contactlist-header">
                        Contact List
                    </div>
                    <div class="col-md-12">
                        <!-- Table Start -->
                        <div class="row table-container communications-table q-pt-lg">
                            <q-table
                                dense
                                :data="data"
                                :columns="columns"
                                :pagination.sync="pagination"
                                :rows-per-page-options="[25, 50, 100, 250]"
                                row-key="name"
                                class="page__table full-width"
                            >                         
                                <template v-slot:body="props">
                                    <q-tr :props="props">
                                        <template v-for="col in props.cols">
                                            <template v-if="col.name === 'email_fields' && props.row.style">
                                                <q-td :key="col.name" :props="props">
                                                    <q-badge class="q-mx-xs" color="grey" v-for="badges in props.row.badge" :key="badges">
                                                        {{ badges }}
                                                    </q-badge>
                                                </q-td>
                                            </template>
                                            <template v-else>
                                                <q-td :key="col.name" :props="props">
                                                    {{col.value}}
                                                </q-td>
                                            </template>
                                        </template>
                                    </q-tr>
                                </template>
                            </q-table>
                        </div>
                        <!-- End of Table -->
                    </div>
                </div>
                <div class="row justify-center q-my-sm q-mx-xl">
                    <div class="col-md-6">
                        <q-card-section>
                            <div class="row justify-center email-dialog__spacing">
                                <q-list class="full-width">
                                    <q-expansion-item
                                        expand-separator
                                        default-opened
                                        label="Communication Details"
                                    >
                                        <div class="row justify-center bg-white q-mb-sm">
                                            <div class="col-md-4 q-mt-sm text-regular">
                                                Access Level
                                            </div>
                                            <div class="col-md-6 q-mt-sm text-regular">
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
                                            <div class="col-md-4 q-mt-sm text-regular">
                                                Send Email As
                                            </div>
                                            <div class="col-md-6 q-mt-sm text-regular">
                                                <q-select
                                                    clearable
                                                    square
                                                    outlined
                                                    dense
                                                    v-model="selectedSendEmail"
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

                                            <div class="col-md-4 q-mt-sm text-regular">
                                                From
                                            </div>
                                            <div class="col-md-6 q-mt-sm text-regular">
                                                <q-input square outlined dense v-model="fromInput" label="Type here" />
                                            </div>
                                            <div class="col-md-4 q-mt-sm text-regular">
                                                To
                                            </div>
                                            <div class="col-md-6 q-mt-sm text-regular">
                                                <q-input square outlined dense v-model="toInput" label="Type here">
                                                    <template v-slot:after>
                                                        <q-icon name="img:statics/icons/phonebook.svg" />
                                                    </template>
                                                </q-input>
                                            </div>
                                            <div class="col-md-4 q-mt-sm text-regular">
                                                CC
                                            </div>
                                            <div class="col-md-6 q-mt-sm text-regular">
                                                <q-input square outlined dense v-model="ccInput" label="Type here" />
                                            </div>
                                            <div class="col-md-4 q-mt-sm text-regular">
                                                BCC
                                            </div>
                                            <div class="col-md-6 q-mt-sm text-regular">
                                                <q-input square outlined dense v-model="bccInput" label="Type here" />
                                            </div>
                                            <div class="col-md-4 q-mt-sm text-regular">
                                                Subject
                                            </div>
                                            <div class="col-md-6 q-mt-sm text-regular">
                                                <q-input square outlined dense v-model="subjectInput" label="Type here" />
                                            </div>
                                            
                                            <div class="col-md-4 q-mt-sm text-regular">
                                                Message
                                            </div>
                                            <div class="col-md-6 q-mt-sm q-mb-sm text-regular">
                                                <q-input
                                                    v-model="message"
                                                    type="textarea"
                                                    class="textarea"
                                                    placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit, odio eu vestibulum eleifend, dui nunc eleifend ligula, id consectetur arcu felis vel elit. Donec lacus diam, fermentum consectetur maximus id, auctor ac neque."
                                                />
                                            </div>
                                            <div class="col-md-4 q-mt-sm q-mb-sm text-regular">
                                                Email Signature<br/>(Product Line)
                                            </div>
                                            <div class="col-md-6 q-mt-sm q-mb-sm text-regular">
                                                <q-select
                                                    clearable
                                                    square
                                                    outlined
                                                    dense
                                                    v-model="selectedEmailSignature"
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
                                        </div>
                                    </q-expansion-item>

                                    <notify></notify>
                                    <record-activity></record-activity>

                                </q-list>
                            </div>
                        </q-card-section>
                    </div>
                    <div class="col-md-6">
                        <q-card-section>
                          <div class="row justify-center email-dialog__spacing">
                            <q-list class="full-width">
                                <q-expansion-item
                                    expand-separator
                                    default-opened
                                    label="Attachments Added"
                                >
                                    <q-table
                                        dense
                                        :data="attachmentsAddedData"
                                        :columns="attachmentsAddedColumns"
                                        row-key="name"
                                        :separator="separator"
                                        hide-bottom
                                        class="attachments__table"
                                    >
                                        <template v-slot:bottom-row>
                                            <q-tr>
                                                <q-td colspan="2">
                                                    Total
                                                </q-td>
                                                <q-td>
                                                    72.11 KB
                                                </q-td>
                                            </q-tr>
                                        </template>
                                    </q-table>
                                </q-expansion-item>

                                <q-expansion-item
                                    expand-separator
                                    label="Attachments"
                                >
                                    <q-table
                                        :data="attachmentsData"
                                        :columns="attachmentsColumns"
                                        row-key="id"
                                        selection="multiple"
                                        :selected.sync="selectedAttachments"
                                        :pagination.sync="pagination"
                                        :rows-per-page-options="[25, 50, 100, 250]"
                                        class="attachments__table"
                                    >
                                        <template v-slot:header="props">
                                            <q-tr>
                                                <q-th>Add to Email</q-th>
                                                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                                                    {{ col.label }}
                                                </q-th>
                                            </q-tr>
                                        </template>
                                    </q-table>
                                </q-expansion-item>
                            </q-list>
                          </div>
                        </q-card-section>
                    </div>
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
    emailDialog: false,
    selected: [],
    search: '',
    pagination: {
        rowsPerPage: 25
    },
    separator: 'none',
    // for textarea
    note: '',
    message: '',
    // for q-select
    selectedAccessLevel: null,
    selectedSendEmail: null,
    selectedEmailSignature: null,
    // selection on table
    selectedAttachments: [],
    // for input
    fromInput: '',
    toInput: '',
    ccInput: '',
    bccInput: '',
    subjectInput: '',
    columns: [
        {
            name: 'category',
            required: true,
            label: 'Category',
            align: 'left',
            field: row => row.category,
            format: val => `${val}`,
            sortable: true
        },
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'email_address', align: 'left', label: 'Email Address', field: 'email_address', sortable: true },
        { name: 'email_fields', align: 'left', label: 'Populate Email Fields', field: 'email_fields' }
    ],
    data: [
        { category: 'Client', name: 'Insurer Insurer', email_address: 'insurer@insurer.com.au', email_fields: '', style: '#F3F3F3', badge: ['To', 'CC', 'BCC'] },
        { category: 'Client Department', name: '--', email_address: '--', email_fields: '' },
        { category: 'Insurer Claims Handler', name: '--', email_address: '--', email_fields: '' },
        { category: 'Claimant', name: 'Training Test', email_address: 'user@test.com.au', email_fields: '', style: '#F3F3F3', badge: ['To', 'CC', 'BCC'] },
        { category: 'Other Contacts', name: '--', email_address: '--', email_fields: '' },
        { category: 'Trade Providers', name: 'Bob The Builder', email_address: 'test@email.com.au', email_fields: '', style: '#F3F3F3', badge: ['To', 'CC', 'BCC'] },
        { category: 'Trade Providers', name: 'Bobs Sub-Contractor', email_address: 'bobs@subcontractor.com.au', email_fields: '', style: '#F3F3F3', badge: ['To', 'CC', 'BCC'] },
        { category: 'Non Panel Trade Providers', name: '--', email_address: '--', email_fields: '' },
        { category: 'Contents Suppliers', name: '--', email_address: '--', email_fields: '' }
    ],
    attachmentsAddedColumns: [
        {
            name: 'document',
            required: true,
            label: 'Document',
            align: 'left',
            field: row => row.document,
            format: val => `${val}`
        },
        { name: 'file', label: 'File', align: 'left', field: 'file' },
        { name: 'size', label: 'Size', align: 'left', field: 'size' }
    ],
    attachmentsAddedData: [
        { document: 'Enquiry Documentation', file: 'PDF_Template(1).pdf', size: '27.26 KB' },
        { document: 'New Report', file: 'Initial Earquake Report', size: '44.85 KB' }
    ],
    attachmentsColumns: [
        {
            name: 'document',
            required: true,
            label: 'Document',
            align: 'left',
            field: row => row.name,
            format: val => `${val}`,
            sortable: true
        },
        { name: 'fileName', align: 'left', label: 'File Name', field: 'fileName', sortable: true },
        { name: 'fileSize', align: 'left', label: 'File Size', field: 'fileSize', sortable: true }
      ],
      attachmentsData: [
        { id: 1, name: 'New Report', fileName: 'First Report', fileSize: '3.27 KB' },
        { id: 2, name: 'Subsequent Report', fileName: 'Second Report - Subsequent Report', fileSize: '146.76 KB' },
        { id: 3, name: 'Initial Earthquake', fileName: 'First Report - Initial Earthquake', fileSize: '5 MB' },
        { id: 4, name: 'Subsequent EQ', fileName: 'Ninth Report - Subsequent Report', fileSize: '21.1 KB' },
        { id: 5, name: 'Subsequent EQ', fileName: 'First Report - Accidental Damage', fileSize: '1.27 MB' },
        { id: 6, name: 'Investigative', fileName: 'First Report - Accidental Damage', fileSize: '51 KB' },
        { id: 7, name: 'Subsequent EQ', fileName: 'First Report - Accidental Damage', fileSize: '13.74 KB' },
        { id: 8, name: 'First Report ', fileName: 'First Report - Accidental Damage', fileSize: '3.27 KB' },
        { id: 9, name: 'First Report ', fileName: 'First Report - Accidental Damage', fileSize: '146.76 KB' },
        { id: 10, name: 'First Report ', fileName: 'First Report - Accidental Damage', fileSize: '13 KB' }
    ]
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