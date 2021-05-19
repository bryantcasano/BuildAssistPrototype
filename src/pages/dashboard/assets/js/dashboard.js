import downloadExcel from 'vue-json-excel'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import BaseSelect from "shared/components/BaseFilterSelect";

export default {
  components: {
    downloadExcel,
    BaseSelect
  },
  data () {
    return {
      searchEvent: '',
      searchECode: '',
      searchRegion: '',
      searchClient: '',
      searchStatus: '',
      dateFilter: false,
      searchClassification: '',
      pagination: {
        rowsPerPage: 8 // current rows per page being displayed
      },
      dashboard: [{
        name: 'claimNo',
        required: true,
        label: 'Claim Number',
        align: 'left',
        field: row => row.claimNo,
        sortable: true
      },
      { name: 'surname', align: 'left', label: 'Claimant Surname', field: 'surname', sortable: true },
      { name: 'eventType', align: 'left', label: 'Event Type', field: 'eventType', sortable: true },
      { name: 'region', align: 'left', label: 'Region', field: 'region', sortable: true },
      { name: 'eventCode', align: 'left', label: 'Event Code', field: 'eventCode', sortable: true },
      { name: 'insurer', align: 'left', label: 'Insurer', field: 'insurer', sortable: true },
      { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: true },
      { name: 'claimClassification', align: 'left', label: 'Claim Classification', field: 'claimClassification', sortable: true },
      { name: 'address', align: 'left', label: 'Site Address', field: 'address' },
      { name: 'suburb', align: 'left', label: 'Suburb', field: 'suburb', sortable: true },
      { name: 'tasks', align: 'left', label: 'Claim Tasks', field: 'tasks' },
      { name: 'days', align: 'left', label: 'Last Actioned (Days)', field: 'days', sortable: true }
      ],
      dataTable: [],
      origData: [
        {
          claimNo: 'Q22351',
          surname: 'Brown',
          date: '2021/03/02',
          eventType: 'Accidental Damage',
          region: '[NI] Auckland',
          eventCode: '2020-10-23 STORM',
          insurer: 'Demo Insurance',
          status: 'AWAIT EXT ASSESS REPORT',
          claimClassification: 'Asbestos - Positive',
          address: '1 Apartment 240 550 Albany Highway Apartment 240 550 Albany Highway',
          suburb: 'Anawhata',
          tasks: '32',
          days: '126'
        }, {
          claimNo: 'Q22352',
          surname: 'Mason',
          date: '2021/04/02',
          eventType: 'Burglary',
          region: '[NI] Carterton',
          eventCode: 'DAY TO DAY',
          insurer: 'Test Insurance',
          status: 'AWAIT TENDER SUBMISSIONS',
          claimClassification: 'Asbestos - Negative',
          address: '74 Seaview Court',
          suburb: 'Sarina',
          tasks: '5',
          days: '30'
        }, {
          claimNo: 'Q22353',
          surname: 'Williams',
          date: '2021/05/02',
          eventType: 'Contract Works',
          region: '[NI] Central Hawkes Bay',
          eventCode: '2020-10-23 STORM',
          insurer: 'Claimway Insurance',
          status: 'INSPECTION COMPLETED',
          claimClassification: 'Cash Settlement',
          address: '20 Church Street',
          suburb: 'Colebatch',
          tasks: '19',
          days: '45'
        }, {
          claimNo: 'Q22354',
          surname: 'Anderson',
          date: '2021/06/02',
          eventType: 'Earthquake',
          region: '[NI] Coromandel',
          eventCode: '2020-11-12 FLOOD',
          insurer: 'Insurance 4 U',
          status: 'AWAITING POLICY RESPONSE',
          claimClassification: 'Partial Cash Settlement',
          address: '6 Baker Street',
          suburb: 'King River',
          tasks: '2',
          days: '23'
        }, {
          claimNo: 'Q22355',
          surname: 'Jones',
          date: '2021/07/02',
          eventType: 'Fire',
          region: '[NI] Far North',
          eventCode: '2020-09-15 EQ',
          insurer: 'Insurance Company',
          claimClassification: 'Contents Only',
          status: 'APPOINTMENT BOOKED',
          address: '28 Badgery Road',
          suburb: 'Enawhata',
          tasks: '17',
          days: '19'
        }, {
          claimNo: 'Q22356',
          surname: 'Thompson',
          date: '2021/08/02',
          eventType: 'Flood',
          region: '[NI] Franklin',
          eventCode: 'DAY TO DAY',
          insurer: 'Demo Insurance',
          status: 'NEW CLAIM',
          claimClassification: 'Medium Risk',
          address: '48 Rasmus Ave',
          suburb: 'Mallacoota',
          tasks: '32',
          days: '121'
        }
      ],
      Fromdate: '',
      Todate: '',
      saveFilter: false,
      searchtext: '',
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
      regionType: [
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
      eventCode: [
        { id: '1', ecode: 'DAY TO DAY', checkbox: false },
        { id: '2', ecode: '2020-10-23 STORM', checkbox: false },
        { id: '3', ecode: '2020-11-12 FLOOD', checkbox: false },
        { id: '4', ecode: '2020-09-15 EQ', checkbox: false }
      ],
      insurerType: [
        { id: '1', insurer: 'Demo Insurance', checkbox: false },
        { id: '2', insurer: 'Test Insurance', checkbox: false },
        { id: '3', insurer: 'Claimway Insurance', checkbox: false },
        { id: '4', insurer: 'Insurance 4 U', checkbox: false },
        { id: '5', insurer: 'Insurance Company', checkbox: false },
      ],
      statusType: [
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
      claimClassificationType: [
        { id: '1', claimClassification: 'Asbestos - Positive', checkbox: false },
        { id: '2', claimClassification: 'Asbestos - Negative', checkbox: false },
        { id: '3', claimClassification: 'Cash Settlement', checkbox: false },
        { id: '4', claimClassification: 'Partial Cash Settlement', checkbox: false },
        { id: '5', claimClassification: 'Contents Only', checkbox: false },
        { id: '6', claimClassification: 'High Risk', checkbox: false },
        { id: '7', claimClassification: 'Medium Risk', checkbox: false },
        { id: '8', claimClassification: 'Low Risk', checkbox: false },
        { id: '9', claimClassification: 'Rebuild', checkbox: false },
        { id: '10', claimClassification: 'Repair', checkbox: false },
        { id: '11', claimClassification: 'Meth Contamination', checkbox: false }
      ],
      selectedEventType: [],
      selectedRegionType: [],
      selectedEventCode: [],
      selectedInsurerType: [],
      selectedStatusType: [],
      selectedClassificationType: [],
      filterNameList: ['Accidental Damage', 'Flood in Auckland', 'Demo Insurance'],
      newFilterName: null,
      current: 0,
      withFilter: false,
      arrFilter: []
    }
  },
  computed: {
    filteredEventType () {
      var self = this
      let data = this.eventType.filter(evt => {
        return evt.event.toLowerCase().indexOf(self.searchEvent.toLowerCase()) >= 0
      })
      return this.arraySorting(this.selectedEventType, data)
    },
    filteredRegionType () {
      var self = this
      let data = this.regionType.filter(rgn => {
        return rgn.region.toLowerCase().indexOf(self.searchRegion.toLowerCase()) >= 0
      })
      return this.arraySorting(this.selectedRegionType, data)
    },
    filteredEventCode () {
      var self = this
      let data = this.eventCode.filter(ecd => {
        return ecd.ecode.toLowerCase().indexOf(self.searchECode.toLowerCase()) >= 0
      })
      return this.arraySorting(this.selectedEventCode, data)
    },
    filteredClientType () {
      var self = this
      let data = this.insurerType.filter(cnt => {
        return cnt.insurer.toLowerCase().indexOf(self.searchClient.toLowerCase()) >= 0
      })
      return this.arraySorting(this.selectedInsurerType, data)
    },
    filteredStatusType () {
      var self = this
      let data = this.statusType.filter(sts => {
        return sts.status.toLowerCase().indexOf(self.searchStatus.toLowerCase()) >= 0
      })
      return this.arraySorting(this.selectedStatusType, data)
    },
    filteredClassificationType () {
      var self = this
      let data = this.claimClassificationType.filter(cct => {
        return cct.claimClassification.toLowerCase().indexOf(self.searchClassification.toLowerCase()) >= 0
      })
      return this.arraySorting(this.selectedClassificationType, data)
    }
  },
  watch: {
    selectedEventType: function(val){
      this.checkFilter('array', val, 'selectedEventType');
    }, 
    selectedRegionType: function(val){
      this.checkFilter('array', val, 'selectedRegionType');
    },
    selectedEventCode: function(val){
      this.checkFilter('array', val, 'selectedEventCode');
    },
    selectedInsurerType: function(val){
      this.checkFilter('array', val, 'selectedInsurerType');
    },
    selectedStatusType: function(val){
      this.checkFilter('array', val, 'selectedStatusType');
    },
    selectedClassificationType: function(val){
      this.checkFilter('array', val, 'selectedClassificationType');
    },
    Fromdate: function(val){
      this.checkFilter('string', val, 'Fromdate');
    },
    Todate: function(val){
      this.checkFilter('string', val, 'Todate');
    }
  },
  methods: {
    resetFilter () {
      this.Fromdate = ''
      this.Todate = ''
      this.selectedEventType = []
      this.selectedRegionType = []
      this.selectedEventCode = []
      this.selectedInsurerType = []
      this.selectedStatusType = []
      this.selectedClassificationType = []
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
          el.claimNo,
          el.surname,
          el.address,
          el.suburb,
          el.tasks,
          el.days
        ])
      })

      let doc = new jsPDF('p', 'pt', 'a4')
      // doc.autoTable({ html: '#dashboard-table' })
      doc.autoTable({
        head: [['Claim Number', 'Claimant Surname', 'Site Address', 'Suburb', 'Claim Tasks', 'Last Actioned (Days)']],
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

      if(this.withFilter){
        if((this.Fromdate === '' && this.Todate === '') || (this.Fromdate !== '' && this.Todate !== '')){
          this.dataTable = [];
          this.filterDataTable();
        }
      } else {
        this.dataTable = this.origData;
      }
     
    },
    filterDataTable(){
      //change object variable name from this.origData|API data
      var valDate = 'date';
      var valEventType = 'eventType';
      var valRegion = 'region';
      var valEventCode = 'eventCode';
      var valInsurer = 'insurer';
      var valStatus = 'status';
      var valClaimClassification = 'claimClassification';

      this.origData.forEach((val, key) => {
        var withFalseFilter = false;
        var proceedFilter = false;

      //filter conditions started here: -------------
        if(this.Fromdate !== '' && this.Todate !== ''){
          proceedFilter = this.Fromdate <= val[valDate] && this.Todate >= val[valDate];
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }
        
        if(this.selectedEventType.length > 0){
          var conEventType = this.convertToLower(this.selectedEventType);
          proceedFilter = conEventType.includes(val[valEventType].toLowerCase()) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.selectedRegionType.length > 0){
          var conRegion = this.convertToLower(this.selectedRegionType);
          proceedFilter = conRegion.includes(val[valRegion].toLowerCase()) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.selectedEventCode.length > 0){
          var conEventCode = this.convertToLower(this.selectedEventCode);
          proceedFilter = conEventCode.includes(val[valEventCode].toLowerCase()) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.selectedInsurerType.length > 0){
          var conInsurer = this.convertToLower(this.selectedInsurerType);
          proceedFilter = conInsurer.includes(val[valInsurer].toLowerCase()) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.selectedStatusType.length > 0){
          var conStatus = this.convertToLower(this.selectedStatusType);
          proceedFilter = conStatus.includes(val[valStatus].toLowerCase()) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.selectedClassificationType.length > 0){
          var conClaimClassification = this.convertToLower(this.selectedClassificationType);
          proceedFilter = conClaimClassification.includes(val[valClaimClassification].toLowerCase()) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }
      //filter conditions end here: --------------------

        if(proceedFilter && !withFalseFilter){
          this.dataTable.push(val);
        }


      });
    },
    convertToLower(arr){
      return arr.map(nonConv => nonConv.toLowerCase());
    }
  },
  beforeMount(){
    this.dataTable = this.origData;
  }
}
