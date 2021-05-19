// import shared components
import SearchField from "shared/components/SearchField"
import BaseSelect from "shared/components/BaseFilterSelect"

// import additional components
import UpdateReserves from "claimSummary/components/ReservesNPaymentUpdateReservesModal"
import AddReserve from "claimSummary/components/ReservesNPaymentAddReserveModal"
import ExcessManagement from "claimSummary/components/ReservesNPaymentExcessManagement"

import { exportFile } from 'quasar'

function wrapCsvValue (val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

export default {
    components: {
        SearchField,
        BaseSelect,
        UpdateReserves,
        AddReserve,
        ExcessManagement
    },
    data () {
        return {
            updateReserve: false,
            addReserve: false,
            excessManagement: false,

            resTitle: '',

            selectedUser: '',
            user: [],
            selectedStartDate: '',
            startDate: [],
            selectedEndDate: '',
            endDate: [],
            selectedReserveCategory: [],
            reserveCategory: [
                { id: '1', cat: 'Category 1', checkbox: false },
                { id: '2', cat: 'Category 2', checkbox: false },
                { id: '3', cat: 'Category 3', checkbox: false },
            ],

            prevReserveInput: [],
            currReserveInput: [],
            paymentsMadeInput: [],
            pendingPaymentsInput: [],

            tab: 'C71567',
            separator: 'cell',
            notExpand : false,
            pagination: {
                page: 0,
                rowsPerPage: 20
            },
            rnpSummary_pagination: {
                page: 0,
                rowsPerPage: 0
            },
            prnpSummary_pagination: {
                page: 0,
                rowsPerPage: 0
            },
            rnpSummaryColumns: [
                {
                    name: 'type',
                    align: 'left',
                    label: '',
                    field: 'type'
                },
                {
                    name: 'prevReserve',
                    align: 'left',
                    label: 'Previous Reserve',
                    field: 'prevReserve'
                },
                {
                    name: 'currReserve',
                    align: 'left',
                    label: 'Current Reserve',
                    field: 'currReserve'
                },
                {
                    name: 'paymentsMade',
                    align: 'left',
                    label: 'Payments Made',
                    field: 'paymentsMade'
                },
                {
                    name: 'pendingPayments',
                    align: 'left',
                    label: 'Pending Payments',
                    field: 'pendingPayments'
                },
                {
                    name: 'outstandingReserve',
                    align: 'right',
                    label: 'Outstanding Reserve',
                    field: 'outstandingReserve'
                },
                {
                    name: 'action',
                    align: 'center',
                    label: 'Action',
                    field: 'action'
                }
            ],
            rnpSummaryData: [
                {
                    id: 1,
                    type: 'Building',
                    items: [
                        {
                            id: 'B1',
                            type: 'Current Building Reserve',
                            prevReserve: '',
                            currReserve: '',
                            paymentsMade: '',
                            pendingPayments: '',
                            outstandingReserve: '0.00',
                            action: ''
                        },
                        {
                            id: 'B2',
                            type: 'Owner Works',
                            prevReserve: '',
                            currReserve: '',
                            paymentsMade: '',
                            pendingPayments: '',
                            outstandingReserve: '0.00',
                            action: ''
                        },
                        {
                            id: 'B3',
                            type: 'Contingency',
                            prevReserve: '',
                            currReserve: '',
                            paymentsMade: '',
                            pendingPayments: '',
                            outstandingReserve: '0.00',
                            action: ''
                        }
                    ],
                    action: '',
                    show: true
                },
                {
                    id: 2,
                    type: 'Contents',
                    items: [
                        {
                            id: 'C1',
                            type: 'Current Contents Reserve',
                            prevReserve: '',
                            currReserve: '',
                            paymentsMade: '',
                            pendingPayments: '',
                            outstandingReserve: '0.00',
                            action: ''
                        },                        
                        {
                            id: 'C2',
                            type: 'Contents Makesafe',
                            prevReserve: '',
                            currReserve: '',
                            paymentsMade: '',
                            pendingPayments: '',
                            outstandingReserve: '0.00',
                            action: ''
                        },                        
                        {
                            id: 'C3',
                            type: 'Contents Temporary Accommodation',
                            prevReserve: '',
                            currReserve: '',
                            paymentsMade: '',
                            pendingPayments: '',
                            outstandingReserve: '0.00',
                            action: ''
                        },
                        {
                            id: 'C4',
                            type: 'Contents Removal of Debris',
                            prevReserve: '',
                            currReserve: '',
                            paymentsMade: '',
                            pendingPayments: '',
                            outstandingReserve: '0.00',
                            action: ''
                        },
                        {
                            id: 'C5',
                            type: 'Contents Restoration',
                            prevReserve: '',
                            currReserve: '',
                            paymentsMade: '',
                            pendingPayments: '',
                            outstandingReserve: '0.00',
                            action: ''
                        },
                        {
                            id: 'C6',
                            type: 'Contents Loss of Rent',
                            prevReserve: '',
                            currReserve: '',
                            paymentsMade: '',
                            pendingPayments: '',
                            outstandingReserve: '0.00',
                            action: ''
                        },
                        {
                            id: 'C7',
                            type: 'EQC Benefit Contents',
                            prevReserve: '',
                            currReserve: '',
                            paymentsMade: '',
                            pendingPayments: '',
                            outstandingReserve: '0.00',
                            action: ''
                        },
                        {
                            id: 'C8',
                            type: 'Jae Contents',
                            prevReserve: '',
                            currReserve: '',
                            paymentsMade: '',
                            pendingPayments: '',
                            outstandingReserve: '0.00',
                            action: ''
                        }
                    ],
                    action: '',
                    show: true
                },
                {
                    id: 3,
                    type: 'Other',
                    items: [],
                    show: false,
                    action: ''
                },
                {
                    id: 4,
                    type: 'Professional Fees',
                    items: [],
                    show: false,
                    action: ''
                },
                {
                    id: 5,
                    type: 'Total',
                    prevReserve: '0.00',
                    currReserve: '0.00',
                    paymentsMade: '0.00',
                    pendingPayments: '0.00',
                    outstandingReserve: '0.00',
                    action: '-'
                },
                {
                    id: 6,
                    type: 'Less Building Excess',
                    prevReserve: '0.00',
                    currReserve: '0.00',
                    paymentsMade: '0.00',
                    pendingPayments: '0.00',
                    outstandingReserve: '0.00',
                    action: '-'
                },
                {
                    id: 7,
                    type: 'Less Content Excess',
                    prevReserve: '0.00',
                    currReserve: '0.00',
                    paymentsMade: '0.00',
                    pendingPayments: '0.00',
                    outstandingReserve: '0.00',
                    action: '-'
                },
                {
                    id: 8,
                    type: 'Grand Total',
                    prevReserve: '0.00',
                    currReserve: '0.00',
                    paymentsMade: '0.00',
                    pendingPayments: '0.00',
                    outstandingReserve: '0.00',
                    action: '-'
                }
            ],
            excessManagementColumns: [
                {
                    name: 'excessType',
                    align: 'left',
                    label: 'Excess Type',
                    field: 'excessType'
                },
                {
                    name: 'collectBy',
                    align: 'left',
                    label: 'Collect By',
                    field: 'collectBy'
                },
                {
                    name: 'date',
                    align: 'left',
                    label: 'Date',
                    field: 'date'
                },
                {
                    name: 'function',
                    align: 'left',
                    label: 'Function',
                    field: 'function'
                },
                {
                    name: 'note',
                    align: 'left',
                    label: 'Note',
                    field: 'note'
                },
                {
                    name: 'action',
                    align: 'center',
                    label: 'Action',
                    field: 'action'
                }
            ],
            excessManagementData: [
                {
                    excessType: 'Building $0.00',
                    collectBy: 'Gallagher Bassett NZ Ltd',
                    date: '30/07/2020',
                    function: 'Deducted Building',
                    note: '—',
                    action: ''
                },
                {
                    excessType: 'Contents $0.00',
                    collectBy: '—',
                    date: '—',
                    function: '—',
                    note: '—',
                    action: '—'
                }
            ],
            reserveHistoryColumns: [
                {
                    name: 'user',
                    align: 'left',
                    label: 'User',
                    field: 'user'
                },
                {
                    name: 'dateTime',
                    align: 'left',
                    label: 'Date & Time',
                    field: 'dateTime'
                },
                {
                    name: 'reserveCategory',
                    align: 'left',
                    label: 'Reserve Category',
                    field: 'reserveCategory'
                },
                {
                    name: 'previousValue',
                    align: 'right',
                    label: 'Previous Value',
                    field: 'previousValue'
                },
                {
                    name: 'currentValue',
                    align: 'right',
                    label: 'Current Value',
                    field: 'currentValue'
                },
                {
                    name: 'totalPrevReserve',
                    align: 'right',
                    label: 'Total Previous Reserve',
                    field: 'totalPrevReserve'
                },
                {
                    name: 'totalCurrReserve',
                    align: 'right',
                    label: 'Total Current Reserve',
                    field: 'totalCurrReserve'
                }
            ],
            reserveHistoryData: [
                {
                    user: 'Duncan Clark SUPPORT',
                    dateTime: '2019-08-27 3:31 pm',
                    reserveCategory: 'Makesafe',
                    previousValue: '$0.00',
                    currentValue: '$300.00',
                    totalPrevReserve: '$500.00',
                    totalCurrReserve: '$17,813.31'
                },
                {
                    user: 'Duncan Clark SUPPORT',
                    dateTime: '2019-08-27 3:31 pm',
                    reserveCategory: 'Contigency',
                    previousValue: '$0.00',
                    currentValue: '$600.00',
                    totalPrevReserve: '$500.00',
                    totalCurrReserve: '$17,213.31'
                },
                {
                    user: 'Duncan Clark SUPPORT',
                    dateTime: '2019-08-27 3:31 pm',
                    reserveCategory: 'Other',
                    previousValue: '$0.00',
                    currentValue: '$500.00',
                    totalPrevReserve: '$500.00',
                    totalCurrReserve: '$16,713.31'
                },
                {
                    user: 'Duncan Clark SUPPORT',
                    dateTime: '2019-08-27 3:31 pm',
                    reserveCategory: 'Contents',
                    previousValue: '$0.00',
                    currentValue: '$200.00',
                    totalPrevReserve: '$500.00',
                    totalCurrReserve: '$16,513.31'
                },
                {
                    user: 'Duncan Clark SUPPORT',
                    dateTime: '2019-08-27 3:31 pm',
                    reserveCategory: 'Contents',
                    previousValue: '$0.00',
                    currentValue: '$200.00',
                    totalPrevReserve: '$500.00',
                    totalCurrReserve: '$16,513.31'
                }
            ],
            pendingPayments: {
                columns: [
                    { name: 'id', align: 'center', label: 'No.', field: 'id' },
                    { name: 'invoiceNumber', align: 'left', label : 'Invoice Number', field: 'invoiceNumber' },
                    { name: 'invoiceAmount', align: 'right', label: 'Invoice Amount', field: 'invoiceAmount' },
                    { name: 'invoiceStatus', align: 'left', label: 'Invoice Status', field: 'invoiceStatus' },
                    { name: 'provider', align: 'left', label: 'Provider', field: 'provider' },
                    { name: 'invoiceNotes', align: 'left', label: 'Invoice Notes', field: 'invoiceNotes' },
                    { name: 'dateCreated', align: 'left', label: 'Date Created', field: 'dateCreated' },
                    { name: 'createdBy', align: 'left', label: 'Created By', field: 'createdBy' }
                ],
                data: [
                    {   id: '1',
                        invoiceNumber: 'Building',
                        notes: [
                            {   id: '11', 
                                invoiceNumber: '', 
                                invoiceAmount: '90.00',
                                invoiceStatus: 'AUTHORISED',
                                provider: '—',
                                invoiceNotes: 'Create payment',
                                dateCreated: '17/06/2019',
                                createdBy: 'Duncan Clark SUPPORT'
                            },
                            {   id: '12', 
                                invoiceNumber: '', 
                                invoiceAmount: '30.00',
                                invoiceStatus: 'AWAITING ACTION',
                                provider: '—',
                                invoiceNotes: '—',
                                dateCreated: '28/08/2019',
                                createdBy: 'Duncan Clark SUPPORT'
                            },
                            {   id: '13', 
                                invoiceNumber: '', 
                                invoiceAmount: '10.00',
                                invoiceStatus: 'AWAITING ACTION',
                                provider: '—',
                                invoiceNotes: '—',
                                dateCreated: '28/08/2019',
                                createdBy: 'Duncan Clark SUPPORT'
                            },
                            {   id: '14', 
                                invoiceNumber: '', 
                                invoiceAmount: '10.00',
                                invoiceStatus: 'AWAITING ACTION',
                                provider: '—',
                                invoiceNotes: 'Create payment',
                                dateCreated: '28/08/2019',
                                createdBy: 'Duncan Clark SUPPORT'
                            }
                        ],
                        show: true
                    },
                    {   id: '2',
                        invoiceNumber: 'Contents',
                        notes: [
                            {   id: '21', 
                                invoiceNumber: '', 
                                invoiceAmount: '20.00',
                                invoiceStatus: 'AWAITING ACTION',
                                provider: '—',
                                invoiceNotes: 'Await info',
                                dateCreated: '28/08/2019',
                                createdBy: 'Duncan Clark SUPPORT'
                            }
                        ],
                        show: true
                    }
                ]
            },
            paymentsMade: {
                columns: [
                    { name: 'id', align: 'center', label: 'No.', field: 'id' },
                    { name: 'invoiceNumber', align: 'left', label : 'Invoice Number', field: 'invoiceNumber' },
                    { name: 'invoiceAmount', align: 'right', label: 'Invoice Amount', field: 'invoiceAmount' },
                    { name: 'invoiceStatus', align: 'left', label: 'Invoice Status', field: 'invoiceStatus' },
                    { name: 'provider', align: 'left', label: 'Provider', field: 'provider' },
                    { name: 'invoiceNotes', align: 'left', label: 'Invoice Notes', field: 'invoiceNotes' },
                    { name: 'dateCreated', align: 'left', label: 'Date Created', field: 'dateCreated' },
                    { name: 'createdBy', align: 'left', label: 'Created By', field: 'createdBy' }
                ],
                data: [
                    {   id: '1',
                        invoiceNumber: 'Building',
                        notes: [
                            {   id: '11', 
                                invoiceNumber: '', 
                                invoiceAmount: '50.00',
                                invoiceStatus: 'PAID',
                                provider: '—',
                                invoiceNotes: '—',
                                dateCreated: '17/06/2019',
                                createdBy: 'Duncan Clark SUPPORT'
                            },
                            {   id: '12', 
                                invoiceNumber: '', 
                                invoiceAmount: '-10.00',
                                invoiceStatus: 'PAID',
                                provider: '—',
                                invoiceNotes: 'Test credit note',
                                dateCreated: '05/07/2019',
                                createdBy: 'Ria Berba SUPPORT'
                            },
                            {   id: '13', 
                                invoiceNumber: '', 
                                invoiceAmount: '60.00',
                                invoiceStatus: 'PAID',
                                provider: '—',
                                invoiceNotes: '—',
                                dateCreated: '17/06/2019',
                                createdBy: 'Duncan Clark SUPPORT'
                            }
                        ],
                        show: true
                    }
                ]
            },
        
            prevRNPSummaryColumns: [
                {
                    name: 'summary',
                    align: 'left',
                    label: 'Summary',
                    field: 'summary'
                }
            ],
            prevRNPSummaryData: [
                {
                    name: 1,
                    summary: 'Reserve and Payment Summary 28/08/2019 07:59:05 by Duncan Clark SUPPORT'
                },
                {
                    name: 2,
                    summary: 'Reserve and Payment Summary 27/06/2019 08:59:20 by Finance User'
                },
                {
                    name: 3,
                    summary: 'Reserve and Payment Summary 27/06/2019 08:59:20 by Finance User'
                },
                {
                    name: 4,
                    summary: 'Reserve and Payment Summary 27/06/2019 08:59:20 by Finance User'
                },
                {
                    name: 5,
                    summary: 'Reserve and Payment Summary 27/06/2019 08:59:20 by Finance User'
                }
            ],
            
            prnpSummaryColumns: [
                {
                    name: 'type',
                    align: 'left',
                    label: '',
                    field: 'type'
                },
                {
                    name: 'prevReserve',
                    align: 'left',
                    label: 'Previous Reserve',
                    field: 'prevReserve'
                },
                {
                    name: 'currReserve',
                    align: 'left',
                    label: 'Current Reserve',
                    field: 'currReserve'
                },
                {
                    name: 'paymentsMade',
                    align: 'left',
                    label: 'Payments Made',
                    field: 'paymentsMade'
                },
                {
                    name: 'pendingPayments',
                    align: 'left',
                    label: 'Pending Payments',
                    field: 'pendingPayments'
                },
                {
                    name: 'outstandingReserve',
                    align: 'right',
                    label: 'Outstanding Reserve',
                    field: 'outstandingReserve'
                }
            ],
            prnpSummaryData: [
                {
                    id: 1,
                    type: 'Building',
                    prevReserve: '0.00',
                    currReserve: '0.00',
                    paymentsMade: '0.00',
                    pendingPayments: '0.00',
                    outstandingReserve: '0.00'
                },
                {
                    id: 11,
                    type: 'Current Building Reserve',
                    prevReserve: '1,500.00',
                    currReserve: '1,500.00',
                    paymentsMade: '405.00',
                    pendingPayments: '400.00',
                    outstandingReserve: '695.00'
                },
                {
                    id: 2,
                    type: 'Contents',
                    prevReserve: '0.00',
                    currReserve: '0.00',
                    paymentsMade: '0.00',
                    pendingPayments: '0.00',
                    outstandingReserve: '0.00'
                },
                {
                    id: 3,
                    type: 'Other',
                    prevReserve: '0.00',
                    currReserve: '0.00',
                    paymentsMade: '0.00',
                    pendingPayments: '0.00',
                    outstandingReserve: '0.00'
                },
                {
                    id: 4,
                    type: 'Professional Fees',
                    prevReserve: '0.00',
                    currReserve: '0.00',
                    paymentsMade: '0.00',
                    pendingPayments: '0.00',
                    outstandingReserve: '0.00'
                },
                {
                    id: 41,
                    type: 'Makesafe',
                    prevReserve: '350.00',
                    currReserve: '350.00',
                    paymentsMade: '0.00',
                    pendingPayments: '175.00',
                    outstandingReserve: '175.00'
                },
                {
                    id: 5,
                    type: 'Total',
                    prevReserve: '1850.00',
                    currReserve: '1850.00',
                    paymentsMade: '405.00',
                    pendingPayments: '575.00',
                    outstandingReserve: '870.00'
                },
                {
                    id: 6,
                    type: 'Less Building Excess',
                    prevReserve: '0.00',
                    currReserve: '0.00',
                    paymentsMade: '0.00',
                    pendingPayments: '0.00',
                    outstandingReserve: '0.00'
                },
                {
                    id: 7,
                    type: 'Less Content Excess',
                    prevReserve: '0.00',
                    currReserve: '0.00',
                    paymentsMade: '0.00',
                    pendingPayments: '0.00',
                    outstandingReserve: '0.00'
                },
                {
                    id: 8,
                    type: 'Grand Total',
                    prevReserve: '1850.00',
                    currReserve: '1850.00',
                    paymentsMade: '405.00',
                    pendingPayments: '575.00',
                    outstandingReserve: '870.00'
                }
            ]
        }
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        resetFilter () {
            this.selectedUser = ''
            this.selectedStartDate = ''
            this.selectedEndDate = ''
            this.selectedReserveCategory = []
        },
        toggleNotes(){
            this.notExpand = !this.notExpand;
        },
        toggleRow(value, event){
            if(!(event.target.className.includes('cursor-pointer') && event.target.className.includes('q-icon'))){
                value.show = !value.show;
            }
        },
        exportTable () {
            // naive encoding to csv format
            const content = [ this.reserveHistoryColumns.map(col => wrapCsvValue(col.label)) ].concat(
                this.reserveHistoryData.map(row => this.reserveHistoryColumns.map(col => wrapCsvValue(
                typeof col.field === 'function'
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                col.format
                )).join(','))
            ).join('\r\n')

            const status = exportFile(
                'reserve-history.csv',
                content,
                'text/csv'
            )

            if (status !== true) {
                this.$q.notify({
                    message: 'Browser denied file download...',
                    color: 'negative',
                    icon: 'warning'
                })
            }
        }
    }
}