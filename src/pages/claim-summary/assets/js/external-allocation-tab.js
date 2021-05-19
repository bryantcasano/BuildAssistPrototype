
import ExtAllocationModal from "claimSummary/components/ExternalAllocationModal"; 

export default {
  components: {
    ExtAllocationModal
  },
  props: {
    update: {
        type: Object,
        default: null
    }
  },
  data () {
    return {
      pagination: {
        rowsPerPage: 25
      },
      dialog: {
        deleteDraft: false,
      },
      toDeleteArr: [],
      toDeleteObj: {},
      viewDetailsModal: false,
      templateDetail: null,
      generateDraft: null,
      options: {
          template: [
              { id: '1', value: 'Template 1' },
              { id: '2', value: 'Template 2' },
              { id: '3', value: 'Template 1 Ext Assessment' },
              { id: '4', value: 'Template 2 Ext Assessment' }
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
      columns: {
        externalAllocation : [
          { name: 'no', align: 'left', label: 'No.', field: 'no', sortable: false },
          { name: 'template', align: 'left', label: 'Template', field: 'template', sortable: false },
          { name: 'provider', align: 'left', label: 'Provider', field: 'provider', sortable: false },
          { name: 'details', align: 'left', label: 'Details', field: 'details', sortable: false },
          { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: false },
          { name: 'dueDate', align: 'left', label: 'Due Date', field: 'dueDate', sortable: false },
          { name: 'createdBy', align: 'left', label: 'Created By', field: 'createdBy', sortable: false },
          { name: 'dateCreated', align: 'left', label: 'Date Created', field: 'dateCreated', sortable: true },
          { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: false }
        ],
        generated : [
          { name: 'no', align: 'left', label: 'No.', field: 'no', sortable: false },
          { name: 'template', align: 'left', label: 'Template', field: 'template', sortable: false },
          { name: 'provider', align: 'left', label: 'Provider', field: 'provider', sortable: false },
          { name: 'details', align: 'left', label: 'Details', field: 'details', sortable: false },
          { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: false },
          { name: 'dueDate', align: 'left', label: 'Due Date', field: 'dueDate', sortable: false },
          { name: 'createdBy', align: 'left', label: 'Created By', field: 'createdBy', sortable: false },
          { name: 'dateCreated', align: 'left', label: 'Date Created', field: 'dateCreated', sortable: true },
          { name: 'file', align: 'left', label: 'File', field: 'file', sortable: false }
        ]
      },
      externalAllocation: {
        drafts: [
          {
            id: '1',
            no: '1',
            template: '1',
            provider: '1',
            draftTitle: 'Test1',
            sentTo: '2',
            recipientsDetails: 'Kenepuru Drive Porirua Auckland 5240',
            status: '(Not Applicable)',
            dueDate: '18/07/2020',
            createdBy: 'Barry Cade',
            dateCreated: '2020-07-08 21:13:07',
            workgroup: '',
            collectExcess: false,
            showAllProviders: false,
            openLetter: ''
          }
        ],
        assessmentDrafts: 
        [
          {
            id: '1',
            no: '1',
            template: '3',
            provider: '',
            draftTitle: 'Test1',
            sentTo: '1',
            recipientsDetails: 'Windmill Road Epsom Auckland 1023',
            status: '(Not Applicable)',
            dueDate: '18/07/2020',
            createdBy: 'Barry Cade',
            dateCreated: '2020-07-10 18:41:23',
            workgroup: '',
            collectExcess: false,
            showAllProviders: false,
            openLetter: ''
          },
          {
            id: '2',
            no: '2',
            template: '4',
            provider: '',
            draftTitle: 'Test1',
            sentTo: '1',
            recipientsDetails: 'Windmill Road Epsom Auckland 1023',
            status: '(Not Applicable)',
            dueDate: '18/07/2020',
            createdBy: 'Barry Cade',
            dateCreated: '2020-07-10 18:32:08',
            workgroup: '',
            collectExcess: false,
            showAllProviders: false,
            openLetter: ''
          }
        ],
        generated: 
        [
          {
            id: '1',
            no: '1',
            template: '1',
            provider: '1',
            draftTitle: 'Asbestos Identification Request',
            sentTo: '2',
            recipientsDetails: '1A Kenepuru Drive Porirua Auckland 5240',
            status: 'NEW SPECIALIST REPORT',
            dueDate: '10/07/2020',
            createdBy: 'Barry Cade',
            dateCreated: '2020-07-10 18:32:08',
            workgroup: '',
            collectExcess: false,
            showAllProviders: false,
            openLetter: ''
          },
          {
            id: '2',
            no: '2',
            template: '2',
            provider: '1',
            draftTitle: 'Asbestos Identification Request',
            sentTo: '2',
            recipientsDetails: '1A Kenepuru Drive Porirua Auckland 5240',
            status: 'NEW SPECIALIST REPORT',
            dueDate: '10/07/2020',
            createdBy: 'Barry Cade',
            dateCreated: '2020-08-23 13:12:18',
            workgroup: '',
            collectExcess: false,
            showAllProviders: false,
            openLetter: ''
          },
          {
            id: '3',
            no: '3',
            template: '3',
            provider: '1',
            draftTitle: 'Asbestos Removal and Disposal Quote Request',
            sentTo: '2',
            recipientsDetails: '1/44 Windmill Road Epsom Auckland 1023',
            status: 'NEW SPECIALIST REPORT',
            dueDate: '18/07/2020',
            createdBy: 'Barry Cade',
            dateCreated: '2020-08-03 09:12:12',
            workgroup: '',
            collectExcess: false,
            showAllProviders: false,
            openLetter: ''
          },
          {
            id: '4',
            no: '4',
            template: '4',
            provider: '1',
            draftTitle: 'Asbestos Identification Request',
            sentTo: '2',
            recipientsDetails: '1/44 Windmill Road Epsom Auckland 1023',
            status: 'NEW EXTERNAL ASSESSMENT ALLOCATION',
            dueDate: '19/07/2020',
            createdBy: 'Barry Cade',
            dateCreated: '2020-09-13 11:11:48',
            workgroup: '',
            collectExcess: false,
            showAllProviders: false,
            openLetter: ''
          }
        ]
      }
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
          this.$local.update('claims_ext_alloc', this.externalAllocation);
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
    viewDetails(data, fromTable){
      data.fromTable = fromTable;
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
    }
  },
  watch: {
    update(value, oldValue){
      if(value.fromAction){
        if(value.fromAction === 'save draft') {
          var templateName = this.getOptionLabel(value.template, 'id', 'value', this.options.template);
          delete value.fromAction;

          if(templateName.includes('Ext Assessment')){
            value.no = String(this.externalAllocation.assessmentDrafts.length + 1);
            this.externalAllocation.assessmentDrafts.push(value);
          } else {
            value.no = String(this.externalAllocation.drafts.length + 1);
            this.externalAllocation.drafts.push(value);
          }
        }

        if(value.fromAction === 'generate'){
          value.no = String(this.externalAllocation.generated.length + 1);
          this.externalAllocation.generated.push(value);
        }

        this.$local.update('claims_ext_alloc', this.externalAllocation);
      }
    },
    generateDraft(value, oldValue){
      if(value.fromAction === 'generate') {
        var templateName = this.getOptionLabel(value.template, 'id', 'value', this.options.template);
        delete value.fromAction;

        if(value.no){
          if(templateName.includes('Ext Assessment')){
            this.externalAllocation.assessmentDrafts.forEach((element, index) => {
              if(element.no === value.no){
                this.externalAllocation.assessmentDrafts.splice(index, 1);
              }
            });
          } else {
            this.externalAllocation.drafts.forEach((element, index) => {
              if(element.no === value.no){
                this.externalAllocation.drafts.splice(index, 1);
              }
            });
          }
        } 

        value.no = String(this.externalAllocation.generated.length + 1);
        this.externalAllocation.generated.push(value);
        this.$local.update('claims_ext_alloc', this.externalAllocation);
      }
    }
  },
  beforeMount(){ 
    this.$local.get('claims_ext_alloc', this.externalAllocation).then(response => {
      this.externalAllocation = response;
    });
  }
}