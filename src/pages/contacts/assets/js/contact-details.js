import FieldSelect from "shared/components/FieldSelect";
import FieldSelectCustom from "shared/components/ContactsFieldSelectCustom";

export default {
  components: {
    FieldSelect,
    FieldSelectCustom
  },
  data () {
    return {
      newLink: '',
      data: {
        type: '1',
        contactType: '2',
        contactName: 'Cherry Blossom',
        salutation: 'Mr',
        firstName: 'John',
        surName : 'Smith',
        title: 'Title name',
        abn: '123 456 789',
        noABN: false,
        gst: '1',
        gstNote: '',
        email: 'jsmith@email.com',
        workPhone: '0444 444 444',
        homePhone: '0444 555 555',
        mobilePhone: '0444 654 321',
        fax: '0444 321 654',
        preferredContact : '1',
        notes: 'Notes samples go here.\rNote 2 goes here.',
        site: {
          address: 'Apartment 240 550 Albany Highway',
          suburb: 'Perth',
          state: 'WA',
          postcode: '6330'
        },
        postal: {
          mailingName: 'John Smith',
          address: 'Apartment 240 550 Albany Highway',
          suburb: 'Perth',
          state: 'WA',
          postcode: '6330'
        },
        caption: 'John Smith Tag',
        logo : {
          fileName : 'JohnSmithLogo.png',
          url : ''
        },
        addEmailAcc : '',
        faxNo : '',
        euEnquiries : '',
        euJobs : '',
        euClosed : '',
        euFrequency : '',
        setPrimaryFax : false,
        setPrimaryEmail : false
      },
      dropdown: {
        contactType: 'Please select'
      },
      options: {
        default : [
          { id: '1', value: 'Option 1' },
          { id: '2', value: 'Option 2' },
          { id: '3', value: 'Option 3' }
        ],
        gst: [
          { id: '1', value: 'Registered' }
        ],
        preferredContact : [
          { id: '1', value: 'Mobile'}
        ],
        linkStatus : [
          { id : '0', value : 'Inactive' },
          { id : '1', value : 'Active'}
          
        ],
        links : [
          { id: '1', value: 'Agent 1' },
          { id: '2', value: 'Agent 2' },
          { id: '3', value: 'Agent 3' }
        ],
        contactGroup : [
          { id: '1', value: 'Organisation' },
          { id: '2', value: 'Individual' }
        ],
        contactType : [
          { id: '1', value: 'Client State Office' },
          { id: '2', value: 'Assessor' },
          { id: '3', value: 'Claims Handler' },
          { id: '4', value: 'Claimant' },
          { id: '5', value: 'Hub Site' },
          { id: '6', value: 'Insurer' },
          { id: '7', value: 'Provider' },
          { id: '8', value: 'Insurer Claims Handler' },
          { id: '9', value: 'External Assessor' },
          { id: '10', value: 'Broker Office' },
          { id: '11', value: 'Broker' }
        ]
      },
      linkData: {
        status: '',
        historyNote : ''
      },
      links: {
        columns : [
          { name: 'name', align: 'left', label : 'Contact Name', field: 'name', sortable: true },
          { name: 'type', align: 'left', label: 'Contact Type', field: 'type', sortable: true },
          { name: 'added', align: 'left', label: 'Added', field: 'added', sortable: true },
          { name: 'addedBy', align: 'left', label: 'Added By', field: 'addedBy', sortable: true },
          { name: 'status', align: 'left', label: 'Status', field: 'status' },
          { name: 'history', align: 'left', label: 'History', field: 'history' },
          { name: 'action', align: 'left', label: 'Action', field: 'action' },
        ],
        data: [
          {
            name: 'Cherry Blossom',
            type: 'Claimant',
            added: '23/03/2020 20:13:21',
            addedBy: 'Cherry Blossom',
            status: '1',
            history: '0444 123 123'
          }
        ]
      },
      newSysUser: {
        username : '',
        email : '',
        password : '',
        sendPass : true
      },
      dialog: {
        addLink: false,
        unlink: false,
        unlinkSuccess: false,
        updateLinkSuccess: false,
        deleteContact: false,
        contactDeleted: false,
        saveContact: false
      },
      isEditMode: false,
      linkList: true,
      copySiteAddress: false,
      tab: 'details',
      emailRules: [
           (val) => !!val || 'Email is required',
           (val) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) || 'Email must be valid'
      ],
      numberRules: [
           (val) => /[0-9 ]+/.test(val) || 'Field is invalid'
      ],
      currentLinks : 0,
      currentSysUser : 0,
    }
  },
  methods: {
    populatePostal(){
      if(this.copySiteAddress){
        this.data.postal.address = this.data.site.address;
        this.data.postal.suburb = this.data.site.suburb;
        this.data.postal.state = this.data.site.state;
        this.data.postal.postcode = this.data.site.postcode;
      }
    },
    attachFile(){
      document.getElementById('contactDetailsFileLogo').click();
    },
    linkDetails(data){
      this.linkData = data;
      this.linkList = false;
    },
    deleteContact(){
      this.dialog.deleteContact = false;
      this.dialog.contactDeleted = true;
      setTimeout(() => this.dialog.contactDeleted = false , 1000);
      setTimeout(() => this.$router.push('/contacts'), 1100);
    },
    saveContact(){
      this.dialog.saveContact = true;
      setTimeout(() => this.dialog.saveContact = false , 1500);
      setTimeout(() => this.isEditMode = false , 1600);
    },
    unlink () {
      this.dialog.unlink = true;
    },
    confirmUnlink(){
      this.links.data = [];
      setTimeout(() => this.dialog.unlink = false , 200);
      setTimeout(() => this.dialog.unlinkSuccess = true , 500);
      setTimeout(() => this.dialog.unlinkSuccess = false , 2500);
    },
    updateLink(){
      this.dialog.updateLinkSuccess = true;
      setTimeout(() => this.dialog.updateLinkSuccess = false , 1000)
      setTimeout(() => this.linkList = true, 1100);
    },
    cancelContact() {
      if(this.isCreateMode) {
        this.$root.isCreateMode = false;
        this.backToContact();
      } else {
        this.isEditMode = false;
        this.$root.isEditMode = false;
      }
    },
    backToContact(){
      this.$root.isEditMode = false;
      this.$router.push('/contacts');
    },
    getOptionLabel(val, idKey, labelKey, arrOption){
      var labelValue = '';
      for (var x = 0; x < arrOption.length; x++) {
        if(arrOption[x][idKey] === val){
          labelValue = arrOption[x][labelKey];
        }
      }
      return labelValue;
    }
  },
  beforeMount(){ 
    this.isEditMode = this.$root.isEditMode ? true : false;
    this.isCreateMode = this.$root.isCreateMode ? true : false;

    if(this.isCreateMode) {
      this.data = {
        type: '',
        contactType: '',
        contactName: '',
        salutation: '',
        firstName: '',
        surName : '',
        title: '',
        abn: '',
        noABN: false,
        gst: '',
        gstNote: '',
        email: '',
        workPhone: '',
        homePhone: '',
        mobilePhone: '',
        fax: '',
        preferredContact : '',
        notes: '',
        site: {
          address: '',
          suburb: '',
          state: '',
          postcode: ''
        },
        postal: {
          mailingName: '',
          address: '',
          suburb: '',
          state: '',
          postcode: ''
        },
        caption: '',
        logo : {
          fileName : '',
          url : ''
        },
        addEmailAcc : '',
        faxNo : '',
        euEnquiries : '',
        euJobs : '',
        euClosed : '',
        euFrequency : '',
        setPrimaryFax : false,
        setPrimaryEmail : false
      };

      this.links.data = [];
      this.systemUser.data = [];
    }
  }
}
