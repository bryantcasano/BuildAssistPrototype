export default {
  data () {
    return {
      notExpand : false,
      search : '',
      pagination: {
      rowsPerPage: 15
      },
      columns: [
        {
          name: 'date',
          align: 'left',
          label: 'Date',
          field: 'date',
          sortable: true
        },
        {
          name: 'user',
          align: 'left',
          label: 'User',
          field: 'user',
          sortable: true
        },
        {
          name: 'action',
          align: 'left',
          label: 'Action',
          field: 'action',
        },
        {
          name: 'notes',
          align: 'left',
          label: 'Notes',
          field: 'notes',
        },
        {
          name: 'notified',
          align: 'left',
          label: 'Notified',
          field: 'notified'
        }
      ],
      data : [],
      origData: [
        {
          date: '17/04/2020 13:35:30',
          user: 'Barry Cade',
          action: 'Claim Classification Changed',
          notes: 'Previous Claim Classification: Not Classified New Claim Classification: Repair Previous Claim Classification: Not Classified New Claim Classification: Repair',
          notified: 'Nobody',
          expand: false,
        },
                {
          date: '11/04/2020 03:36:26',
          user: 'Cherry Blossom',
          action: 'Main Estimate Created',
          notes: '---',
          notified: 'Somebody',
          expand: false,
        },
                {
          date: '19/04/2020 11:25:22',
          user: 'Cliff Hanger',
          action: 'STATUS CHANGED: NEW TENDER',
          notes: 'Subcontractor: Test Builder Current Status: New Tender',
          notified: 'Nobody',
          expand: false,
        },
                {
          date: '16/05/2020 17:31:30',
          user: 'Will Power',
          action: 'Tender Request Created',
          notes: 'A Tender Request for the Preliminary & General, Bedroom 1, Structure in Main',
          notified: 'Nobody',
          expand: false,
        },
                {
          date: '05/01/2020 19:35:11',
          user: 'Marge Arin',
          action: 'Tender Request Created',
          notes: 'A Tender Request for the Preliminary & General, Bedroom 1, Structure in Main',
          notified: 'Nobody',
          expand: false,
        },
                {
          date: '10/02/2020 7:18:10',
          user: 'Ken Tucky',
          action: 'Repair Status Changed',
          notes: '---',
          notified: 'Nobody',
          expand: false,
        },
                {
          date: '27/04/2020 12:15:30',
          user: 'Kat E. Gory',
          action: 'Tender Request Submitted',
          notes: 'A Tender Request from Test Buildr for Main Estimate has been submitted',
          notified: 'Nobody',
          expand: false,
        },
                {
          date: '12/02/2020 09:15:30',
          user: 'Barry Cade',
          action: 'STATUS CHANGED: TENDER COMPLETED',
          notes: 'SUBCONTRACTOR: Test Builder For Main Estimate has been submitted',
          notified: 'Nobody',
          expand: false,
        },
                {
          date: '28/04/2020 3:25:10',
          user: 'Ken Tucky',
          action: 'Claim Classification Changed',
          notes: 'Previous Claim Classification: Not Classified New Claim Classification: Repair',
          notified: 'Nobody',
          expand: false,
        },
                {
          date: '29/04/2020 5:23:20',
          user: 'Ken Tucky',
          action: 'Claim Classification Changed',
          notes: 'Previous Claim Classification: Not Classified New Claim Classification: Repair',
          notified: 'Nobody',
          expand: false,
        }
      ]
    }
  },
  watch: {
    search: function(val){
      this.checkFilter();
    }
  },
  methods: {
    toggleNotes(){
      this.notExpand = !this.notExpand;

      for(var x = 0; x < this.data.length ; x ++) {
        this.data[x].expand = this.notExpand;
      }
    },
    checkFilter() {
      this.withFilter = (this.search !== '') ? true : false;

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

        if(this.search.length !== '') {
          proceedFilter = (val.date.toLowerCase().includes(this.search.toLowerCase()) ||  
            val.user.toLowerCase().includes(this.search.toLowerCase()) ||
            val.action.toLowerCase().includes(this.search.toLowerCase()) ||
            val.notes.toLowerCase().includes(this.search.toLowerCase()) ||
            val.notified.toLowerCase().includes(this.search.toLowerCase())
          ) ? true : false;
          withFalseFilter = withFalseFilter ? true : !proceedFilter;
        }

        if (proceedFilter && !withFalseFilter) {
          this.data.push(val);
        }

      });
    }
  },
  beforeMount(){ 
    this.$local.get('claims_history', this.origData).then(response => {
      if (this.origData.length > response.length) {
        response.forEach((index, key) => {
          this.origData.unshift(index);
        });
        this.$local.update('claims_history', this.origData);
      } else {
        this.origData = response;
      }
      this.data = this.origData;
    });
  }
}