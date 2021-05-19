
import DraftLetterModal from "claimSummary/components/DraftLetterModal";

export default {
  components: {
    DraftLetterModal
  },
  props: {
    update: {
        type: Object,
        default: null
    },
    generate: {
      type: Object,
        default: null
    }
  },
  data () {
    return {
      viewDetailsModal: false,
      templateDetail: null,
      generateLetter: null,
      dialog: {
        deleteDraft: false,
      },
      options: {
          template: [
              { id: '1', value: 'Claimant Authorisation Letter' },
              { id: '2', value: 'Activity Sheet' }
          ],
          sentTo: [
              { id: '1', value: 'Test Test' },
              { id: '2', value: 'Test Builder' },
          ],
          provider: [
              { id: '1', value: 'Test Builder'}
          ],
          default: [
              { id: '1', value: 'Option 1'},
              { id: '2', value: 'Option 2'},
              { id: '3', value: 'Option 3'}
          ]
      },
      pagination: {
        rowsPerPage: 25
      },
      columns: [
        { name: 'no', align: 'left', label: 'No.', field: 'no', sortable: false },
        { name: 'template', align: 'left', label: 'Template', field: 'template', sortable: false },
        { name: 'provider', align: 'left', label: 'Provider', field: 'provider', sortable: false },
        { name: 'details', align: 'left', label: 'Details', field: 'details', sortable: false },
        { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: false },
        { name: 'dueDate', align: 'left', label: 'Due Date', field: 'dueDate', sortable: false },
        { name: 'createdBy', align: 'left', label: 'Created By', field: 'createdBy', sortable: false },
        { name: 'dateCreated', align: 'left', label: 'Date Created', field: 'dateCreated', sortable: true },
        { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: false },
      ],
      data: [
        {
          id: '1',
          no: '1',
          template: '1',
          provider: '1',
          draftTitle: 'Test3',
          sentTo: '1',
          recipientsDetails: '',
          status: '(Not Applicable)',
          dueDate: '18/07/2020',
          createdBy: 'Barry Cade',
          dateCreated: '2020-07-08 22:00:15',
          workgroup: '',
          collectExcess: false,
          showAllProviders: false,
          openLetterDetails: '',
          openLetterBody: '',
          openLetterItems: '',
          openLetterFooter: '',
        },
        {
          id: '2',
          no: '2',
          template: '2',
          provider: '1',
          draftTitle: 'Test2',
          sentTo: '1',
          recipientsDetails: '1/44 Windmill Road Epsom Auckland 1023',
          status: '(Not Applicable)',
          dueDate: '18/07/2020',
          createdBy: 'Cherry Blossom',
          dateCreated: '2020-07-08 21:59:22',
          workgroup: '',
          collectExcess: false,
          showAllProviders: false,
          openLetterDetails: '',
          openLetterBody: '',
          openLetterItems: '',
          openLetterFooter: '',
        }
      ]
    }
  },
  methods: {
    deleteDraft(array, obj){
      this.dialog.deleteDraft = true;
      this.toDeleteArr = array;
      this.toDeleteObj = obj;
    },
    deleteDraftConfirm(){
      this.toDeleteArr.forEach((element, index) => {
        if(element.no === this.toDeleteObj.no){
          this.toDeleteArr.splice(index, 1);
          this.$local.update('claims_draft_letters', this.data);
          this.dialog.deleteDraft = false;
          this.$q.notify({
            color: 'green',
            icon: 'thumb_up_alt',
            message: 'Deleted Successfully!',
            position: 'top',
            timeout: 1500
          });
        }
      });
    },
    viewDetails(data){
      this.templateDetail = data;
      this.viewDetailsModal = true;
    },
    getOptionLabel(val, idKey, labelKey, arrOption){
      var labelValue = '';
      for (var x = 0; x < arrOption.length; x++) {
        if(arrOption[x][idKey] === val){
          labelValue = arrOption[x][labelKey];
        }
      }
      return labelValue;
    },
    customDate(val){
      if(val < 10){
        return '0' + val; 
      } else {
        return val;
      }
    }
  },
  watch: {
    update(value, oldValue){
      if(value.fromAction){
        if(value.fromAction === 'save letter') {
          var templateName = this.getOptionLabel(value.template, 'id', 'value', this.options.template);
          delete value.fromAction;
          value.no = String(this.data.length + 1);
          this.data.push(value);
          this.$local.update('claims_draft_letters', this.data);
        }
      }
    },
    generateLetter(value, oldValue){
      if(value.fromAction === 'generate') {
        var templateName = this.getOptionLabel(value.template, 'id', 'value', this.options.template);
        value.fromAction = 'Letters';
        this.$emit("update:generate", value);

        if(value.no){
          this.data.forEach((element, index) => {
            if(element.no === value.no){
              this.data.splice(index, 1);
              this.$local.update('claims_draft_letters', this.data);

              var customCreateDate = new Date();
              var customCreateMonth = customCreateDate.getMonth() + 1;
              var formattedCreatedDate = this.customDate(customCreateDate.getDate()) + '/' + this.customDate(customCreateMonth) + '/' + customCreateDate.getFullYear() + ' ' + customCreateDate.getHours() + ":" + customCreateDate.getMinutes() + ":" + customCreateDate.getSeconds();

              this.$local.get('claims_history').then( response => {
                var tempClaimHistory = response;
                tempClaimHistory.unshift({
                  date: formattedCreatedDate,
                  user: value.createdBy,
                  action: 'Generate Draft Letter',
                  notes: 'Save note: ' + value.draftTitle + '  Sent to: ' + this.getOptionLabel(value.sentTo, 'id', 'value', this.options.sentTo) + ' ' + value.recipientsDetails,
                  notified: 'Nobody',
                  expand: false
                });
                this.$local.update('claims_history', tempClaimHistory);
              });

              this.$local.get('claims_attachments').then( response => {
                var tempClaimAttachments = response;
                tempClaimAttachments.push({
                  id: tempClaimAttachments.length + 1,
                  document: 'DRAFT LETTER',
                  accessLevel: '1',
                  notes: [
                    { 
                      id: '1',
                      document: this.getOptionLabel(value.template, 'id', 'value', this.options.template),
                      accessLevel: '1',
                      note: 'Save note: ' + value.draftTitle + '  Sent to: ' + this.getOptionLabel(value.sentTo, 'id', 'value', this.options.sentTo) + ' ' + value.recipientsDetails,
                      fileSize: '',
                      fileUrl: '',
                      createdOn: formattedCreatedDate,
                      createdBy: value.createdBy,
                      status: '1'
                    }
                  ],
                  show: true
                });
                this.$local.update('claims_attachments', tempClaimAttachments);
              });
            }
          });
        } 
      }
    }
  },
  beforeMount(){ 
    this.$local.get('claims_draft_letters', this.data).then(response => {
      this.data = response;
    });
  }
}