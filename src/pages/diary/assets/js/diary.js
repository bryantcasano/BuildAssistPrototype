// import shared components
import BaseSelect from 'shared/components/BaseFilterSelect'

// import quasar plugins
import MaterialIconSet from 'quasar/icon-set/material-icons'

// initialize MaterialIconSet
MaterialIconSet.table.arrowUp = 'keyboard_arrow_up'
MaterialIconSet.table.arrowDown = 'keyboard_arrow_down'

export default {
  components: {
    BaseSelect
  },
  data () {
    return {
      searchPriority: '',
      searchECode: '',
      tasks: '',
      searchkeyword: '',
      withFilter: false,
      columns: [
        {
          name: 'name',
          align: 'left',
          label: 'Claim Number',
          field: row => row.name,
          sortable: true
        },
        {
          name: 'description',
          align: 'left',
          label: 'Description',
          field: 'description',
          sortable: true
        },
        {
          name: 'due',
          align: 'left',
          label: 'Due Date',
          field: 'due',
          sortable: true
        },
        {
          name: 'priority',
          align: 'left',
          label: 'Priority',
          field: 'priority',
          sortable: true
        },
        {
          name: 'event',
          align: 'left',
          label: 'Event Code',
          field: 'event',
          sortable: true
        }
      ],
      detailsData: {},
      data: [],
      // this.origData (Array)
      // temporary static data (replace Diary data from API, if available).
      origData: [
        {
          name: 'Q71623',
          description: 'Meeting notes uploaded',
          due: '01/01/2021',
          priority: 'Urgent',
          priorityId: '1',
          event: '2020-10-23 STORM',
          eventId: '2'
        },
        {
          name: 'Q77520',
          description: 'Provider Internal Notes Added',
          due: '02/02/2021',
          priority: 'FYI',
          priorityId: '3',
          event: '2020-11-12 FLOOD',
          eventId: '3'

        },
        {
          name: 'Q81909',
          description: 'Confirm Job Satisfaction/Close File',
          due: '03/03/2021',
          priority: 'Urgent',
          priorityId: '1',
          event: '2020-10-23 STORM',
          eventId: '2'
        },
        {
          name: 'Q11220',
          description: 'Chase Invoice if not yet received',
          due: '04/04/2021',
          priority: 'Non-Urgent',
          priorityId: '2',
          event: '2020-10-23 STORM',
          eventId: '2'
        },
        {
          name: 'Q61791',
          description: 'Upload Invoice',
          due: '05/05/2021',
          priority: 'FYI',
          priorityId: '3',
          event: '2020-10-23 STORM',
          eventId: '2'
        },
        {
          name: 'Q91323',
          description: 'Followup',
          due: '06/06/2021',
          priority: 'Urgent',
          priorityId: '1',
          event: '2020-11-12 FLOOD',
          eventId: '3'
        },
        {
          name: 'Q71620',
          description: 'Create Report',
          due: '07/07/2021',
          priority: 'Non-Urgent',
          priorityId: '2',
          event: 'DAY TO DAY',
          eventId: '1'
        }
      ],
      priorityType: [
        { id: '1', priority: 'Urgent' },
        { id: '2', priority: 'Non-Urgent' },
      ],
      eventCode: [
        { id: '1', ecode: 'DAY TO DAY' },
        { id: '2', ecode: '2020-10-23 STORM' },
        { id: '3', ecode: '2020-11-12 FLOOD' },
        { id: '4', ecode: '2020-09-15 EQ' }
      ],
      selectedPriority: [],
      selectedEventCode: []
    }
  },
  watch: {
    selectedEventCode: function(val){
      this.checkFilter();
    },
    selectedPriority: function(val){
      this.checkFilter();
    },
    searchkeyword: function(val){
      this.checkFilter();
    },
    tasks: function(val){
      this.checkFilter();
    }
  },
  computed: {
    filteredPriority: function () {
      var self = this
      return this.priorityType.filter(function (prt) { return prt.priority.toLowerCase().indexOf(self.searchPriority.toLowerCase()) >= 0 })
    },
    filteredEventCode: function () {
      var self = this
      return this.eventCode.filter(function (ecd) { return ecd.ecode.toLowerCase().indexOf(self.searchECode.toLowerCase()) >= 0 })
    }
  },
  methods: {
    resetFilter () {
      this.tasks = '';
      this.searchkeyword = ''
      this.selectedPriority = [];
      this.selectedEventCode = [];
      this.detailsData = this.origData[0];
    },
    onRowClick(e, row){
      this.detailsData = row;
    },
    checkFilter() {
      this.withFilter = (this.selectedPriority.length > 0 || this.selectedEventCode.length > 0 || this.searchkeyword !== '' || this.tasks !== '') ? true : false;

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

      //filter conditions start here -------------
        if(this.searchkeyword.length !== '') {
          //change condition below for specific column to filter on keyword search
          proceedFilter = (val.name.toLowerCase().includes(this.searchkeyword.toLowerCase()) ||  
            val.description.toLowerCase().includes(this.searchkeyword.toLowerCase()) ||
            val.due.toLowerCase().includes(this.searchkeyword.toLowerCase()) ||
            val.priority.toLowerCase().includes(this.searchkeyword.toLowerCase()) ||
            val.event.toLowerCase().includes(this.searchkeyword.toLowerCase())
          ) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.selectedEventCode.length > 0) {
          proceedFilter = this.selectedEventCode.includes(val.eventId) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.selectedPriority.length > 0) {
          //for urgent priority
          if(this.selectedPriority.includes('1')){
            proceedFilter = val.priorityId === '1' ? true : false;
          }
          //for non-urgent priority
          if(this.selectedPriority.includes('2')){
            //list of priorityId classified as non urgent
            var nonUrgentArr = ['2', '3'];
            proceedFilter = nonUrgentArr.includes(val.priorityId) ? true : false;
          }
          //for both urgent and non-urgent priority
          if(this.selectedPriority.includes('1') && this.selectedPriority.includes('2')){
            proceedFilter = true;
          }
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if(this.tasks !== '') {
          //2 - Overdue Tasks
          if(this.tasks === '2'){
            var cDate = new Date();
            var cMonth = cDate.getMonth() + 1;
                cMonth = cMonth <= 9 ? '0' + cMonth : cMonth;
            var cDay = cDate.getDate();
                cDay = cDay <= 9 ? '0' + cDay : cDay;
            var cYear = cDate.getFullYear();
            var formatCDate = cMonth + '/' + cDay + '/' + cYear;

            proceedFilter = val.due < formatCDate ? true : false;

          } else {
            proceedFilter = val.priorityId === this.tasks ? true: false;
          }
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }
      //filter conditions end here ---------------------

        if (proceedFilter && !withFalseFilter) {
          this.data.push(val);
        }

      });
    }
  },
  beforeMount(){
    this.data = this.origData;
    this.detailsData = this.origData[0];
  }
}
