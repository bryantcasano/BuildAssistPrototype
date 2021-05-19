import downloadExcel from 'vue-json-excel'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

import BaseSelect from "shared/components/BaseFilterSelect"
import BaseSearch from "shared/components/BaseFilterSearch"
import SearchField from "shared/components/SearchField"

export default {
  components: {
    downloadExcel,
    BaseSelect,
    BaseSearch,
    SearchField
  },
  data () {
    return {
      searchTypes: '',
      searchName: '',
      searchAddress: '',
      searchSuburb: '',
      contacts: [
        { name: 'name', align: 'left', label: 'Contact Name', field: 'name', sortable: true },
        { name: 'type', align: 'left', label: 'Contact Type', field: 'type', sortable: true },
        { name: 'address', align: 'left', label: 'Address', field: 'address', sortable: true },
        { name: 'suburb', align: 'left', label: 'Suburb', field: 'suburb', sortable: true },
        { name: 'workPhone', align: 'left', label: 'Work Phone', field: 'workPhone' },
        { name: 'homePhone', align: 'left', label: 'Home Phone', field: 'homePhone' },
        { name: 'mobilePhone', align: 'left', label: 'Mobile Phone', field: 'mobilePhone' },
        { name: 'act', align: 'left', label: 'Action', field: 'act' },
      ],
      pagination: {
        rowsPerPage: 12
      },
      data: {},
      //replace origData with Object response from API - if available
      origData: [
        {
          contactID : '000001',
          name: 'Cherry Blossom',
          type: 'Claims Handler',
          typeId: '3',
          address: 'Apartment 240 550 Albany Highway Apartment 240 550 Albany Highway',
          suburb: 'Anawhata',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000002',
          name: 'Cliff Hanger',
          type: 'Claimant',
          typeId: '4',
          address: '2 Apartment 240 550 Albany Highway',
          suburb: 'Bethells Beach',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000003',
          name: 'Barry Cade',
          type: 'Claimant',
          typeId: '4',
          address: '3 Apartment 240 550 Albany Highway',
          suburb: 'Glen Eden',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000004',
          name: 'Will Power',
          type: 'Insurer',
          typeId: '6',
          address: '4 Apartment 240 550 Albany Highway',
          suburb: 'Glendene',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000005',
          name: 'Marge Arin',
          type: 'Assessor',
          typeId: '2',
          address: '5 Apartment 240 550 Albany Highway',
          suburb: 'Green Bay',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000007',
          name: 'Ken Tucky',
          type: 'Hub Site',
          typeId: '5',
          address: '6 Apartment 240 550 Albany Highway',
          suburb: 'Henderson',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000007',
          name: 'Kat E. Gory',
          type: 'Client State Office',
          typeId: '1',
          address: '6 Apartment 240 550 Albany Highway',
          suburb: 'Herald Island',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000002',
          name: 'Cliff Hanger',
          type: 'Claimant',
          typeId: '4',
          address: '2 Apartment 240 550 Albany Highway',
          suburb: 'Bethells Beach',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000003',
          name: 'Barry Cade',
          type: 'Claimant',
          typeId: '4',
          address: '3 Apartment 240 550 Albany Highway',
          suburb: 'Glen Eden',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000004',
          name: 'Will Power',
          type: 'Insurer',
          typeId: '6',
          address: '4 Apartment 240 550 Albany Highway',
          suburb: 'Glendene',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000005',
          name: 'Marge Arin',
          type: 'Assessor',
          typeId: '2',
          address: '5 Apartment 240 550 Albany Highway',
          suburb: 'Green Bay',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000007',
          name: 'Ken Tucky',
          type: 'Hub Site',
          typeId: '5',
          address: '6 Apartment 240 550 Albany Highway',
          suburb: 'Henderson',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000007',
          name: 'Kat E. Gory',
          type: 'Client State Office',
          typeId: '1',
          address: '6 Apartment 240 550 Albany Highway',
          suburb: 'Herald Island',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000007',
          name: 'Kat E. Gory',
          type: 'Client State Office',
          typeId: '1',
          address: '6 Apartment 240 550 Albany Highway',
          suburb: 'Herald Island',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000002',
          name: 'Cliff Hanger',
          type: 'Claimant',
          typeId: '4',
          address: '2 Apartment 240 550 Albany Highway',
          suburb: 'Bethells Beach',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000003',
          name: 'Barry Cade',
          type: 'Claimant',
          typeId: '4',
          address: '3 Apartment 240 550 Albany Highway',
          suburb: 'Glen Eden',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000004',
          name: 'Will Power',
          type: 'Insurer',
          typeId: '6',
          address: '4 Apartment 240 550 Albany Highway',
          suburb: 'Glendene',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000005',
          name: 'Marge Arin',
          type: 'Assessor',
          typeId: '2',
          address: '5 Apartment 240 550 Albany Highway',
          suburb: 'Green Bay',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000007',
          name: 'Ken Tucky',
          type: 'Hub Site',
          typeId: '5',
          address: '6 Apartment 240 550 Albany Highway',
          suburb: 'Henderson',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000007',
          name: 'Kat E. Gory',
          type: 'Client State Office',
          typeId: '1',
          address: '6 Apartment 240 550 Albany Highway',
          suburb: 'Herald Island',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        },
        {
          contactID : '000017',
          name: 'Patty Mills',
          type: 'Provider',
          typeId: '7',
          address: '17 Apartment 000 017 Albany Highway',
          suburb: 'Henderson',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }, 
        {
          contactID : '000018',
          name: 'Draymond Chandler',
          type: 'Insurer Claims Handler',
          typeId: '8',
          address: '18 Apartment 000 018 Albany Highway',
          suburb: 'Henderson',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        },
        {
          contactID : '000019',
          name: 'Steph Williamson',
          type: 'External Assessor',
          typeId: '9',
          address: '19 Apartment 000 019 Albany Highway',
          suburb: 'Henderson',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        },
        {
          contactID : '000010',
          name: 'Lynda Port',
          type: 'Broker Office',
          typeId: '10',
          address: '010 Apartment 000 010 Albany Highway',
          suburb: 'Henderson',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        },
        {
          contactID : '000011',
          name: 'Brenda Mage',
          type: 'Broker',
          typeId: '11',
          address: '011 Apartment 000 011 Albany Highway',
          suburb: 'Henderson',
          workPhone: '0444 123 123',
          homePhone: '0444 123 123',
          mobilePhone: '0444 123 123',
        }
      ],
      saveFilter: false,
      contactTypes: [
        { id: '1', event: 'Client State Office', checkbox: false },
        { id: '2', event: 'Assessor', checkbox: false },
        { id: '3', event: 'Claims Handler', checkbox: false },
        { id: '4', event: 'Claimant', checkbox: false },
        { id: '5', event: 'Hub Site', checkbox: false },
        { id: '6', event: 'Insurer', checkbox: false },
        { id: '7', event: 'Provider', checkbox: false },
        { id: '8', event: 'Insurer Claims Handler', checkbox: false },
        { id: '9', event: 'External Assessor', checkbox: false },
        { id: '10', event: 'Broker Office', checkbox: false },
        { id: '11', event: 'Broker', checkbox: false }
      ],
      dialog: {
        deleteContact: false,
        contactDeleted: false,
      },
      selectedContactTypes: [],
      selectedContactName: '',
      selectedContactAddress: '',
      selectedContactSuburb: '',
      contactName: [],
      contactAddress: [],
      contactSuburb: [],
      filterNameList: ['MD-Day to Day' , 'Accidental Damage', 'Flood in Auckland', 'Demo Insurance'],
      newFilterName: null,
      current: 0,
      withFilter: false,
      arrFilter: []
    }
  },
  watch: {
    selectedContactTypes: function(val){
      this.checkFilter('array', val, 'selectedContactTypes');
    }, 
    selectedContactName: function(val){
      this.checkFilter('string', val, 'selectedContactName');
    },
    selectedContactAddress: function(val){
      this.checkFilter('string', val, 'selectedContactAddress');
    },
    selectedContactSuburb: function(val){
      this.checkFilter('string', val, 'selectedContactSuburb');
    },
    $route (to, from){
      this.setContactTypefromRoute();
    }
  },
  methods: {
    resetFilter() {
      this.selectedContactTypes = [];
      this.selectedContactName = '';
      this.selectedContactAddress = '';
      this.selectedContactSuburb = '';
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
      this.origData.forEach((el, index) => {
        data.push([
          el.name,
          el.type,
          el.address,
          el.suburb,
          el.workPhone,
          el.homePhone,
          el.mobilePhone,
        ])
      })

      let doc = new jsPDF('p', 'pt', 'a4')
      doc.autoTable({
        head: [['Contact Name', 'Contact Type', 'Address', 'Suburb', 'Work Phone', 'Home Phone', 'Mobile Phone']],
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
    onRowClick(e, row){
      if(e.target.innerHTML.includes('delete')) {
        this.dialog.deleteContact = true;
      } else if (e.target.innerHTML.includes('create')) { 
        this.$root.isEditMode = true;
        this.$router.push('contacts/' + row.contactID);
      } else {
        this.$router.push('contacts/' + row.contactID);
      }
    },
    deleteContact(){
      this.dialog.deleteContact = false;
      this.dialog.contactDeleted = true;
      setTimeout(() => this.dialog.contactDeleted = false , 1000);
    },
    addContact(){
      this.$root.isEditMode = true;
      this.$root.isCreateMode = true;
      this.$router.push('contacts/new');
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

      if (this.withFilter){
        this.data = [];
        this.filterTable();
      } else {
        this.data = this.origData;
      }
    },
    setContactTypefromRoute() {
      this.resetFilter();
      var activeType = this.$router.currentRoute.query.type;

      if(activeType){
        var responseArr = [];
        responseArr.push(activeType);
        this.selectedContactTypes = responseArr;
      } 
    },
    filterTable() {
      // variable registered based on quasar-table object (see this.origData object for example)
      var valType = 'typeId';
      var valName = 'name';
      var valAddress = 'address';
      var valSuburb = 'suburb';

      this.origData.forEach((val, key) => {
        var withFalseFilter = false;
        var proceedFilter = false;

        // ---- filter conditions -----------
        if (this.selectedContactTypes.length > 0) {
          var conType = this.arrToLower(this.selectedContactTypes);
          proceedFilter = conType.includes(val[valType].toLowerCase()) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if (this.selectedContactName !== '') {
          proceedFilter = val[valName].toLowerCase().includes(this.selectedContactName.toLowerCase()) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if (this.selectedContactAddress !== '') {
          proceedFilter = val[valAddress].toLowerCase().includes(this.selectedContactAddress.toLowerCase()) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if (this.selectedContactSuburb !== '') {
          proceedFilter = val[valSuburb].toLowerCase().includes(this.selectedContactSuburb.toLowerCase()) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }
        //-------filter conditions end here ------------

        if (proceedFilter && !withFalseFilter) {
          this.data.push(val);
        }
      });
    },
    arrToLower(arr){
      return arr.map(nonConv => nonConv.toLowerCase());
    }
  },
  beforeMount(){
    this.data = this.origData;
    this.setContactTypefromRoute();
  }
}
