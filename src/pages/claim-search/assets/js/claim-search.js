import downloadExcel from 'vue-json-excel'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import BaseSelect from "shared/components/BaseFilterSelect"
import TriageSelect from "shared/components/TriageFilterSelect"

export default {
  components: {
    downloadExcel,
    BaseSelect,
    TriageSelect
  },
  data () {
    return {
      // -- start of searches
      searchClaimNumber: '',
      searchClientRef: '',
      searchInsurer: '',
      searchClaimant: '',
      searchAddress: '',
      searchSuburb: '',
      searchECode: '',
      searchStatus: '',
      searchRegion: '',
      searchCaseManager: '',
      searchMore: '',
      searchTriageQuestions: '',
      pagination: {
        rowsPerPage: 10 // current rows per page being displayed
      },
      // -- start of table columns & data
      columns: [
        {
          name: 'claimNumber',
          align: 'left',
          label: 'Claim Number',
          field: row => row.name,
          sortable: true
        },
        {
          name: 'clientRef',
          align: 'left',
          label: 'Client Ref',
          field: 'clientRef',
          sortable: true
        },
        {
          name: 'insurer',
          align: 'left',
          label: 'Insurer',
          field: 'insurer',
          sortable: true
        },
        {
          name: 'claimant',
          align: 'left',
          label: 'Claimant',
          field: 'claimant',
          sortable: true
        },
        {
          name: 'address',
          align: 'left',
          label: 'Address',
          field: 'address',
          sortable: true
        },
        {
          name: 'suburb',
          align: 'left',
          label: 'Suburb',
          field: 'suburb',
          sortable: true
        },
        {
          name: 'eventCode',
          align: 'left',
          label: 'Event Code',
          field: 'eventCode',
          sortable: true
        },
        {
          name: 'eventType',
          align: 'left',
          label: 'Event Type',
          field: 'eventCode',
          sortable: true
        },
        {
          name: 'status',
          align: 'left',
          label: 'Status',
          field: 'status',
          sortable: true
        },
        {
          name: 'region',
          align: 'left',
          label: 'Region',
          field: 'region',
          sortable: true
        },
        {
          name: 'claimsHandler',
          align: 'left',
          label: 'Claims Handler',
          field: 'claimsHandler',
          sortable: true
        }
      ],
      data: [],
      origData: [
        {
          name: 'QT1620',
          clientRef: 'K-032413',
          insurer: 'Demo Insurance',
          claimant: 'Mason',
          address: 'Apartment 240 550 Albany Highway',
          suburb: 'Anawhata',
          eventCode: 'DAY TO DAY',
          event: 'Accidental Damage',
          status: 'NEW CLAIM',
          region: '[NI] Auckland',
          claimsHandler: 'Cherry Blossom'
        },
        {
          name: 'Q71621',
          clientRef: '123189787',
          insurer: 'Test Insurance',
          claimant: 'Ali',
          address: '99 Te Mome Road Waiwhetu L.',
          suburb: 'Bethells Beach',
          eventCode: '2020-10-23 STORM',
          event: 'Burglary',
          status: 'AWAIT EXT ASSESS REPORT',
          region: '[NI] Carterton',
          claimsHandler: 'Cliff Hanger'
        },
        {
          name: 'Q71622',
          clientRef: 'G-032413',
          insurer: 'Claimway Insurance',
          claimant: 'Bauer',
          address: 'Apartment 160 Wilson Road',
          suburb: 'Glen Eden',
          eventCode: 'DAY TO DAY',
          event: 'Contract Works',
          status: 'AWAIT TENDER SUBMISSIONS',
          region: '[NI] Central Hawkes Bay',
          claimsHandler: 'Barry Cade'
        },
        {
          name: 'Q71623',
          clientRef: 'E-032413',
          insurer: 'Test Insurance',
          claimant: 'Cooper',
          address: '147 Culperry Road Glendene',
          suburb: 'Glendene',
          eventCode: '2020-10-23 STORM',
          event: 'Earthquake',
          status: 'INSPECTION COMPLETED',
          region: '[NI] Coromandel',
          claimsHandler: 'Will Power'
        },
        {
          name: 'Q71624',
          clientRef: 'J-032413',
          insurer: 'Insurance 4 U',
          claimant: 'Heath',
          address: '222 Wirihana Road Green Bay',
          suburb: 'Green Bay',
          eventCode: '2020-11-12 FLOOD',
          event: 'Fire',
          status: 'AWAITING POLICY RESPONSE',
          region: '[NI] Far North',
          claimsHandler: 'Marge Arin'
        },
        {
          name: 'Q71625',
          clientRef: 'M-032413',
          insurer: 'Insurance Company',
          claimant: 'Cobb',
          address: '88 Marinich Drive South',
          suburb: 'Henderson',
          eventCode: '2020-09-15 EQ',
          event: 'Flood',
          status: 'APPOINTMENT BOOKED',
          region: '[NI] Franklin',
          claimsHandler: 'Ken Tucky'
        },
        {
          name: 'Q71626',
          clientRef: 'B-032413',
          insurer: 'Demo Insurance',
          claimant: 'Ledger',
          address: '182 Hobie Court Waitakere',
          suburb: 'Herald Island',
          eventCode: 'DAY TO DAY',
          event: 'Fusion',
          status: 'TRIAGE REQUIRED',
          region: '[NI] Gisborne',
          claimsHandler: 'Kat E. Gory'
        },
        {
          name: 'QT1627',
          clientRef: 'K-032413',
          insurer: 'Test Insurance',
          claimant: 'Mason',
          address: 'Apartment 240 550 Albany Highway',
          suburb: 'Anawhata',
          eventCode: 'DAY TO DAY',
          event: 'Glass',
          status: 'EXT. ASSESSMENT REQUIRED',
          region: '[NI] Aukland',
          claimsHandler: 'Cherry Blossom'
        },
        {
          name: 'Q71628',
          clientRef: '123189787',
          insurer: 'Claimway Insurance',
          claimant: 'Ali',
          address: '99 Te Mome Road Waiwhetu L.',
          suburb: 'Bethells Beach',
          eventCode: '2020-09-15 EQ',
          event: 'Impact',
          status: 'APPONTMENT REQUIRED',
          region: '[NI] Carterton',
          claimsHandler: 'Cliff Hanger'
        },
        {
          name: 'Q71629',
          clientRef: 'G-032413',
          insurer: 'Insurance 4 U',
          claimant: 'Bauer',
          address: 'Apartment 160 Wilson Road',
          suburb: 'Glen Eden',
          eventCode: '2020-11-12 FLOOD',
          event: 'Lightning',
          status: 'APPOINTMENT BOOKED',
          region: '[NI] Central Hawkes Bay',
          claimsHandler: 'Barry Cade'
        },
        {
          name: 'Q71630',
          clientRef: 'E-032413',
          insurer: 'Insurance Company',
          claimant: 'Cooper',
          address: '147 Culperry Road Glendene',
          suburb: 'Glendene',
          eventCode: '2020-10-23 STORM',
          event: 'Accidental Damage',
          status: 'SPECIALIST REPORT REQUIRED',
          region: '[NI] Coromandel',
          claimsHandler: 'Will Power'
        },
        {
          name: 'Q71631',
          clientRef: 'J-032413',
          insurer: 'Demo Insurance',
          claimant: 'Heath',
          address: '222 Wirihana Road Green Bay',
          suburb: 'Green Bay',
          eventCode: 'DAY TO DAY',
          event: 'Lightning',
          status: 'PREPARE SCOPE OF WORKS',
          region: '[NI] Far North',
          claimsHandler: 'Marge Arin'
        },
        {
          name: 'Q71632',
          clientRef: 'M-032413',
          insurer: 'Insurance 4 U',
          claimant: 'Cobb',
          address: '88 Marinich Drive South',
          suburb: 'Henderson',
          eventCode: '2020-09-15 EQ',
          event: 'Impact',
          status: 'AWAIT TENDER SUBMISSIONS',
          region: '[NI] Franklin',
          claimsHandler: 'Ken Tucky'
        },
        {
          name: 'Q71633',
          clientRef: 'B-032413',
          insurer: 'Claimway Insurance',
          claimant: 'Ledger',
          address: '182 Hobie Court Waitakere',
          suburb: 'Herald Island',
          eventCode: '2020-11-12 FLOOD',
          event: 'Glass',
          status: 'AWAIT CLAIMANT REPAIRS',
          region: '[NI] Gisborne',
          claimsHandler: 'Kat E. Gory'
        },
        {
          name: 'QT1634',
          clientRef: 'K-032413',
          insurer: 'Test Insurance',
          claimant: 'Mason',
          address: 'Apartment 240 550 Albany Highway',
          suburb: 'Anawhata',
          eventCode: 'DAY TO DAY',
          event: 'Fusion',
          status: 'REPAIRS AUTHORISED',
          region: '[NI] Aukland',
          claimsHandler: 'Cherry Blossom'
        },
        {
          name: 'Q71635',
          clientRef: '123189787',
          insurer: 'Demo Insurance',
          claimant: 'Ali',
          address: '99 Te Mome Road Waiwhetu L.',
          suburb: 'Bethells Beach',
          eventCode: '2020-11-12 FLOOD',
          event: 'Flood',
          status: 'REPAIRS IN PROGRESS',
          region: '[NI] Carterton',
          claimsHandler: 'Cliff Hanger'
        },
        {
          name: 'Q71636',
          clientRef: 'G-032413',
          insurer: 'Test Insurance',
          claimant: 'Bauer',
          address: 'Apartment 160 Wilson Road',
          suburb: 'Glen Eden',
          eventCode: '2020-09-15 EQ',
          event: 'Fire',
          status: 'REPAIRS COMPLETED – AWAIT CLAIMANT SIGN OFF',
          region: '[NI] Central Hawkes Bay',
          claimsHandler: 'Barry Cade'
        },
        {
          name: 'Q71637',
          clientRef: 'E-032413',
          insurer: 'Insurance 4 U',
          claimant: 'Cooper',
          address: '147 Culperry Road Glendene',
          suburb: 'Glendene',
          eventCode: '2020-10-23 STORM',
          event: 'Earthquake',
          status: 'REPAIRS COMPLETED – AWAIT FINAL SIGN OFF',
          region: '[NI] Coromandel',
          claimsHandler: 'Will Power'
        },
        {
          name: 'Q71638',
          clientRef: 'J-032413',
          insurer: 'Test Insurance',
          claimant: 'Heath',
          address: '222 Wirihana Road Green Bay',
          suburb: 'Green Bay',
          eventCode: '2020-09-15 EQ',
          event: 'Contract Works',
          status: 'REPAIRS ON HOLD',
          region: '[NI] Far North',
          claimsHandler: 'Marge Arin'
        },
        {
          name: 'Q71639',
          clientRef: 'M-032413',
          insurer: 'test',
          claimant: 'Claimway Insurance',
          address: '88 Marinich Drive South',
          suburb: 'Henderson',
          eventCode: 'DAY TO DAY',
          event: 'Contract Works',
          status: 'AWAIT FINAL PROVIDER INVOICES',
          region: '[NI] Franklin',
          claimsHandler: 'Ken Tucky'
        },
        {
          name: 'Q71640',
          clientRef: 'B-032413',
          insurer: 'Test Insurance',
          claimant: 'Ledger',
          address: '182 Hobie Court Waitakere',
          suburb: 'Herald Island',
          eventCode: '2020-10-23 STORM',
          event: 'Accidental Damage',
          status: 'AWAIT PAYMENT OF FEES',
          region: '[NI] Gisborne',
          claimsHandler: 'Kat E. Gory'
        }
      ],
      // -- start of filter values
      claimNumber: [],
      clientRef: [],
      claimant: [],
      address: [],
      suburb: [],
      eventCode: [
        { id: '1', ecode: 'DAY TO DAY', checkbox: false },
        { id: '2', ecode: '2020-10-23 STORM', checkbox: false },
        { id: '3', ecode: '2020-11-12 FLOOD', checkbox: false },
        { id: '4', ecode: '2020-09-15 EQ', checkbox: false }
      ],
      insurer: [
        { id: '1', insurer: 'Demo Insurance', checkbox: false },
        { id: '2', insurer: 'Test Insurance', checkbox: false },
        { id: '3', insurer: 'Claimway Insurance', checkbox: false },
        { id: '4', insurer: 'Insurance 4 U', checkbox: false },
        { id: '5', insurer: 'Insurance Company', checkbox: false },
      ],
      eventType: [
        { id: '1', event: 'Accidental Damage', checkbox: false },
        { id: '2', event: 'Burglary', checkbox: false },
        { id: '3', event: 'Contract Works', checkbox: false },
        { id: '4', event: 'Earthquake', checkbox: false },
        { id: '5', event: 'Fire', checkbox: false },
        { id: '6', event: 'Flood', checkbox: false },
        { id: '7', event: 'Fusion', checkbox: false },
        { id: '8', event: 'Glass', checkbox: false },
        { id: '9', event: 'Impact', checkbox: false },
        { id: '10', event: 'Lightning', checkbox: false }
      ],
      status: [
        { id: '1', status: 'NEW CLAIM', checkbox: false },
        { id: '2', status: 'TRIAGE REQUIRED', checkbox: false },
        { id: '3', status: 'EXT. ASSESSMENT REQUIRED', checkbox: false },
        { id: '4', status: 'APPONTMENT REQUIRED', checkbox: false },
        { id: '5', status: 'AWAIT EXT.ASSESS REPORT', checkbox: false },
        { id: '6', status: 'APPOINTMENT BOOKED', checkbox: false },
        { id: '7', status: 'INSPECTION COMPLETED', checkbox: false },
        { id: '8', status: 'SPECIALIST REPORT REQUIRED', checkbox: false },
        { id: '9', status: 'AWAIT SPECIALIST REPORT', checkbox: false },
        { id: '10', status: 'PREPARE SCOPE OF WORKS', checkbox: false },
        { id: '11', status: 'PEER REVIEW', checkbox: false },
        { id: '12', status: 'AWAITING POLICY RESPONSE', checkbox: false },
        { id: '13', status: 'AWAIT TENDER SUBMISSIONS', checkbox: false },
        { id: '14', status: 'TENDER REVIEW', checkbox: false },
        { id: '15', status: 'TENDER APPROVED', checkbox: false },
        { id: '16', status: 'AWAIT CLAIMANT REPAIRS', checkbox: false },
        { id: '17', status: 'REPAIRS AUTHORISED', checkbox: false },
        { id: '18', status: 'REPAIRS IN PROGRESS', checkbox: false },
        { id: '19', status: 'REPAIRS COMPLETED – AWAIT CLAIMANT SIGN OFF', checkbox: false },
        { id: '20', status: 'REPAIRS COMPLETED – AWAIT FINAL SIGN OFF', checkbox: false },
        { id: '21', status: 'REPAIR VARIATION REQUIRED', checkbox: false },
        { id: '22', status: 'REPAIRS ON HOLD', checkbox: false },
        { id: '23', status: 'AWAIT FINAL PROVIDER INVOICES', checkbox: false },
        { id: '24', status: 'CLAIM COMPLETED SUBMIT FEES', checkbox: false },
        { id: '25', status: 'AWAIT PAYMENT OF FEES', checkbox: false },
        { id: '26', status: 'CLAIM FINALISED', checkbox: false }
      ],
      region: [
        { id: '1', region: '[NI] Auckland', checkbox: false },
        { id: '2', region: '[NI] Carterton', checkbox: false },
        { id: '3', region: '[NI] Central Hawkes Bay', checkbox: false },
        { id: '4', region: '[NI] Coromandel', checkbox: false },
        { id: '5', region: '[NI] Far North', checkbox: false },
        { id: '6', region: '[NI] Franklin', checkbox: false },
        { id: '7', region: '[NI] Gisborne', checkbox: false },
        { id: '8', region: '[NI] Hamilton', checkbox: false },
        { id: '9', region: '[NI] Hastings', checkbox: false },
        { id: '10', region: '[NI] Hauraki', checkbox: false }
      ],
      claimsHandler: [
        { id: '1', claimsHandler: 'Cherry Blossom', checkbox: false },
        { id: '2', claimsHandler: 'Cliff Hanger', checkbox: false },
        { id: '3', claimsHandler: 'Barry Cade', checkbox: false },
        { id: '4', claimsHandler: 'Will Power', checkbox: false },
        { id: '5', claimsHandler: 'Marge Arin', checkbox: false },
        { id: '6', claimsHandler: 'Ken Tucky', checkbox: false },
        { id: '7', claimsHandler: 'Kate E. Gory', checkbox: false },
        { id: '8', claimsHandler: 'Damaris Burrough', checkbox: false },
        { id: '9', claimsHandler: 'Magdalene Boyles', checkbox: false },
        { id: '10', claimsHandler: 'Linnie Martir', checkbox: false }
      ],
      more: [
        { id: '1', more: 'Product Line', checkbox: false },
        { id: '2', more: 'Client Department', checkbox: false },
        { id: '3', more: 'Classification', checkbox: false },
        { id: '4', more: 'Address', checkbox: false },
        { id: '5', more: 'Triage Questions', checkbox: false }
      ],
      triageQuestions: [
        { id: '1', triage: 'Residents Safe', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '2', triage: 'Special Needs', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '3', triage: 'Dangers/Hazards', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '4', triage: 'Power And Water', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '5', triage: 'Property Secure', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '6', triage: 'Extent Of Damage', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '7', triage: 'Emergency Works Required', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '8', triage: 'Category', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '9', triage: 'Pets', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '10', triage: 'Temp Accommodation', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '11', triage: 'Roof Or Structural Damage', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '12', triage: 'House Height', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '13', triage: 'Emergency Services Call', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '14', triage: 'Contents Loss', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '15', triage: 'Asbestos', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '16', triage: 'Client Move', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '17', triage: 'Tree Lopping', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '18', triage: 'Roof Water Tight', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '19', triage: 'House Height', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '20', triage: 'Electrical Unsafe', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '21', triage: 'Claimant Email Address', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '22', triage: 'Risk Assessment Form', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '23', triage: 'Water Over Floor', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '24', triage: 'Floor Coverings Dry Replace', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '25', triage: 'Eqc', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '26', triage: 'Fire/Polic Incident Report', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '27', triage: 'Clearance', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '28', triage: 'Safe To Enter', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '29', triage: 'Tp Responsible', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '30', triage: 'Owner of Property', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '31', triage: 'Type Of Animal', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '32', triage: 'Identified Tp', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '33', triage: 'Driveways and Fences', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '34', triage: 'Level', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '35', triage: 'Dve, Pth, Fnce Value', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '36', triage: 'Reinstatement Categorisation', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '37', triage: 'Reapportionment', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '38', triage: 'Reapportionment Date Complete', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '39', triage: 'Red Stickered', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '40', triage: 'Disputed Claim', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '41', triage: 'Protocol 1', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '42', triage: 'Eqc Earthquake Zone', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '43', triage: 'Dfpp Review', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '44', triage: 'Contents Assessment', options: ['Option 1', 'Option 2', 'Option 3'] },
        { id: '45', triage: 'Ma Site Id', options: ['Option 1', 'Option 2', 'Option 3'] }
      ],
      // -- start of selected value.sync
      selectedClaimNumber: '',
      selectedClientRef: '',
      selectedInsurer: '',
      selectedClaimant: '',
      selectedAddress: '',
      selectedSuburb: '',
      selectedEventCode: [],
      selectedEventType: [],
      selectedStatus: [],
      selectedRegion: [],
      selectedClaimsHandler: [],
      selectedMore: [],
      selectedTriageQuestions: [],
      // -- start of my-filter dropdown functions
      filterNameList: [
        'MD-Day to Day',
        'Accidental Damage', 
        'Flood in Auckland', 
        'Demo Insurance'
      ],
      newFilterName: null,
      current: 0,
      // -- start of save filter functionalities
      saveFilter: false,
      searchtext: '',
      withFilter: false,
      arrFilter: []
    }
  },
  computed: {
    filteredEventCode: function () {
      var self = this
      return this.eventCode.filter(function (ecd) { return ecd.ecode.toLowerCase().indexOf(self.searchECode.toLowerCase()) >= 0 })
    }
  },
  watch: {
    selectedClaimNumber: function(val){
      this.checkFilter('array', val, 'selectedClaimNumber');
    }, 
    selectedClientRef: function(val){
      this.checkFilter('string', val, 'selectedClientRef');
    },
    selectedInsurer: function(val){
      this.checkFilter('string', val, 'selectedInsurer');
    },
    selectedClaimant: function(val){
      this.checkFilter('string', val, 'selectedClaimant');
    },
    selectedAddress: function(val){
      this.checkFilter('string', val, 'selectedAddress');
    },
    selectedSuburb: function(val){
      this.checkFilter('string', val, 'selectedSuburb');
    },
    selectedEventCode: function(val){
      this.checkFilter('string', val, 'selectedEventCode');
    },
    selectedEventType: function(val){
      this.checkFilter('string', val, 'selectedEventType');
    },
    selectedStatus: function(val){
      this.checkFilter('string', val, 'selectedStatus');
    },
    selectedRegion: function(val){
      this.checkFilter('string', val, 'selectedRegion');
    },
    selectedClaimsHandler: function(val){
      this.checkFilter('string', val, 'selectedClaimsHandler');
    },
    selectedMore: function(val){
      this.checkFilter('string', val, 'selectedMore');
    },
    selectedTriageQuestions: function(val){
      this.checkFilter('string', val, 'selectedTriageQuestions');
    }
  },
  methods: {
    resetFilter () {
        this.selectedClaimNumber = '';
        this.selectedClientRef = '';
        this.selectedInsurer = '';
        this.selectedClaimant = '';
        this.selectedAddress = '';
        this.selectedSuburb = '';
        this.selectedEventCode = [];
        this.selectedEventType = [];
        this.selectedStatus = [];
        this.selectedRegion = [];
        this.selectedClaimsHandler = [];
        this.selectedMore = [];
        this.selectedTriageQuestions = [];
    },
    arraySorting (selectedArray, filteredArray) {
      let data = filteredArray
      selectedArray.forEach(el => {
        let selected = data.find(item => item.id == el)
        if (selected) {
          data = data.filter(item => item.id !== selected.id)
          data.unshift(selected)
        }
      })
      return data
    },
    downloadPDF () {
      let data = []
      this.data.forEach((el, index) => {
        data.push([
          el.name,
          el.clientRef,
          el.claimant,
          el.address,
          el.suburb,
          el.eventCode,
          el.status,
          el.region,
          el.claimsHandler
        ])
      })

      let doc = new jsPDF('p', 'pt', 'a4')
      doc.autoTable({
        head: [['Claim Number', 'Client Ref', 'Claimant', 'Address', 'Suburb', 'Event Code', 'Status', 'Region', 'Case Manager']],
        body: data,
        headStyles: { cellWidth: 'wrap' },
        bodyStyles: { cellWidth: 'auto' }
      })
      doc.save('table.pdf')
    },
    printTable(){
      this.$htmlToPaper('tableData');
    },
    saveNewFilter(){
      if(this.newFilterName){
        this.filterNameList.push(this.newFilterName);
        this.newFilterName = null;
      }
      this.saveFilter = false;
    },
    checkFilter(type, val, key) {
      var withVal = false;

      switch(type){
        case 'array':
          withVal = val.length !== 0 ? true : false;
          break;
        case 'string':
          withVal = val !== '' ? true : false;
          break;
      }

      if(this.arrFilter.length === 0 && withVal){
        this.arrFilter.push(key);
      } else {
        if(withVal){
          if(!this.arrFilter.includes(key)){
            this.arrFilter.push(key);
          }
        } else {
          if(this.arrFilter.includes(key)){
            var keyIndex = this.arrFilter.indexOf(key);
            this.arrFilter.splice(keyIndex, 1);
          }
        }
      }
      this.withFilter = this.arrFilter.length !== 0 ? true : false;

      if (this.withFilter) {
        this.data = [];
        this.checkActiveFilter();
      } else {
        this.data = this.origData;
      }
    },
    checkActiveFilter(){
      this.origData.forEach((val, key) => {
        var withFalseFilter = false;
        var proceedFilter = false;

        if(this.selectedClaimNumber.length !== '') {
          proceedFilter = (val.name.toLowerCase().includes(this.selectedClaimNumber.toLowerCase())) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.selectedClientRef.length !== '') {
          proceedFilter = (val.clientRef.toLowerCase().includes(this.selectedClientRef.toLowerCase())) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.selectedInsurer.length > 0) {
          proceedFilter = this.selectedInsurer.includes(val.insurer) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.selectedClaimant.length !== '') {
          proceedFilter = (val.claimant.toLowerCase().includes(this.selectedClaimant.toLowerCase())) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.selectedSuburb.length !== '') {
          proceedFilter = (val.suburb.toLowerCase().includes(this.selectedSuburb.toLowerCase())) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.selectedEventCode.length > 0) {
          proceedFilter = this.selectedEventCode.includes(val.eventCode) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.selectedEventType.length > 0) {
          proceedFilter = this.selectedEventType.includes(val.event) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.selectedStatus.length > 0) {
          proceedFilter = this.selectedStatus.includes(val.status) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.selectedRegion.length > 0) {
          proceedFilter = this.selectedRegion.includes(val.region) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.selectedClaimsHandler.length > 0) {
          proceedFilter = this.selectedClaimsHandler.includes(val.claimsHandler) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }
       

        if (proceedFilter && !withFalseFilter) {
          this.data.push(val);
        }

      });
    }
  },
  beforeMount(){
    this.data = this.origData;
  }
}
