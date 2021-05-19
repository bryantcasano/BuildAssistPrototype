// import section components
import ClaimBanner from "claimSummary/components/ClaimBannerSection"
import EditClaimRegistration from "claimSummary/components/EditClaimRegistrationSection"
import BookAppointment from "claimSummary/components/BookAppointmentSection"
import CreateTriage from "claimSummary/components/CreateTriageSection"
import CreateReport from "claimSummary/components/CreateReportSection"

// import tab components
import LodgementClaimInfo from "claimSummary/components/LodgementTabClaimInformation"
import LodgementPolicyContact from "claimSummary/components/LodgementTabPolicyContact"
import History from "claimSummary/components/HistoryTab"
import ReservesPayment from "claimSummary/components/ReservesNPaymentTab"
import Communications from "claimSummary/components/CommunicationsTab"
import ClaimAttachments from 'claimSummary/components/AttachmentsTab'
import Reports from "claimSummary/components/ReportsTab"
import ExternalAllocation from "claimSummary/components/ExternalAllocationTab"
import DraftLetters from "claimSummary/components/DraftLettersTab"

// import modal components
import ExtAllocationModal from "claimSummary/components/ExternalAllocationModal"
import DraftLetterModal from "claimSummary/components/DraftLetterModal"

export default {
  components: {
    ClaimBanner,
    History,
    ReservesPayment,
    Communications,
    CreateTriage,
    ClaimAttachments,
    BookAppointment,
    Reports,
    CreateReport,
    EditClaimRegistration,
    ExtAllocationModal,
    ExternalAllocation,
    DraftLetters,
    DraftLetterModal,
    LodgementClaimInfo,
    LodgementPolicyContact
  },
  data () {
    return {
      tab: 'lodgement',
      fab: false,
      reportsSent: 0.2,
      bookAppointment: false,
      createExtAllocation: false,
      createDraftLetter: false,
      createReport: false,
      claimRegistration: false,
      loadTriage: false,
      rightDrawerOpen: false,
      sensitive: true,
      newExtAllocation: null,
      newDraftLetter: null,
      generateDraftLetter: null,
      tabs: [
        {
          id: 1, 
          name: 'lodgement', 
          label: 'Lodgement',
          subVal: 'claiminfo',
          subs: [
            { name: 'claiminfo', label: 'Claim Information' }, 
            { name: 'policy', label: 'Policy & Contact' }, 
            { name: 'addresses', label: 'Addresses' },
            { name: 'claimhistory', label: 'Claim History' }
          ]
        },
        { id: 2, name: 'history', label: 'History' },
        { 
          id: 3, 
          name: 'rnp', 
          label: 'Reserves and Payment',
          subVal: 'address-summary',
          subs: [
            { name: 'address-summary', label: 'Address Summary' },
            { name: 'C71567', label: 'C71567' },
            { name: 'C71567-TEST0001', label: 'C71567 - TEST0001' }, 
            { name: 'C71567-TEST0002', label: 'C71567 - TEST0002' }, 
            { name: 'C71567-TEST0003', label: 'C71567 - TEST0003' }, 
            { name: 'C71567-TEST0004', label: 'C71567 - TEST0004' }, 
            { name: 'C71567-TEST0005', label: 'C71567 - TEST0005'} 
          ]
        },
        { id: 4, name: 'communications', label: 'Communications' },
        { id: 5, name: 'attachments', label: 'Attachments' },
        { id: 6, name: 'reports', label: 'Reports' },
        { id: 7, name: 'externalAllocation', label: 'External Allocations' },
        { id: 8, name: 'draftLetters', label: 'Draft Letters' },
        { 
          id: 9, 
          name: 'estimates', 
          label: 'Estimates',
          subVal: 'estimate1', 
          subs: [
            { 
              name: 'mainestimate', 
              label: 'Main Estimate',
              subs: [
                { name: 'original', label: 'Original'} ,  
                { name: 'Accepted', label: 'Accepted'} , 
                { name: 'tradebreakdown', label: 'Trade breakdown'}, 
                { name: 'providerestimate', label: 'Provider Estimate Sample' }, 
                { name: 'tendersummary', label: 'Tender Summary' }  
              ]
            },
            { name: 'estimaterev', label: 'Main Estimate Rev 1'} ,  
          ]
        },
        { id: 10, name: 'activitysheet', label: 'Activity Sheet' },
        // { name: 'payments', label: 'Payments' },
        // { name: 'extallocation', label: 'Ext Allocation' },
      ],
      // collapse behavior
      collapseVal: 0,
      collapsedLodgement: true,
      collapsedHistory: false,
      collapsedRnp: false,
      collapsedCommunications: false,
      collapsedAttachments: false,
      collapsedReports: false,
      collapsedExtAlloc: false,
      collapsedDraftLetters: false,
      collapsedEstimates: false,
      collapsedActivitySheets: false,
      // rNp -- addresSummary
      addressSummaryColumns: [
          {
              name: 'name',
              required: true,
              label: 'Claim Number',
              align: 'left',
              field: row => row.name,
              format: val => `${val}`
          },
          { name: 'c71567', label: 'C71567', align: 'center', field: 'c71567' },
          { name: 'c71567t1', label: 'C71567 - TEST0001', align: 'center', field: 'c71567t1' },
          { name: 'c71567t2', label: 'C71567 - TEST0002', align: 'center', field: 'c71567t2' },
          { name: 'c71567t3', label: 'C71567 - TEST0003', align: 'center', field: 'c71567t3' },
          { name: 'c71567t4', label: 'C71567 - TEST0004', align: 'center', field: 'c71567t4' },
          { name: 'c71567t5', label: 'C71567 - TEST0005', align: 'center', field: 'c71567t5' },
          { name: 'c71567t6', label: 'C71567 - TEST0006', align: 'center', field: 'c71567t6' },
          { name: 'c71567t7', label: 'C71567 - TEST0007', align: 'center', field: 'c71567t7' },
          { name: 'c71567t8', label: 'C71567 - TEST0008', align: 'center', field: 'c71567t8' }
      ],
      addressSummaryData: [
          { 
              name: 'Claim Classification', 
              c71567: 'Not Classified', 
              c71567t1: 'Not Classified', 
              c71567t2: 'Not Classified', 
              c71567t3: 'Not Classified', 
              c71567t4: 'Not Classified', 
              c71567t5: 'Not Classified', 
              c71567t6: 'Not Classified', 
              c71567t7: 'Not Classified', 
              c71567t8: 'Not Classified' 
          },
          { 
              name: 'Claim Status', 
              c71567: 'APPOINTMENT MADE', 
              c71567t1: 'INSPECTED', 
              c71567t2: 'NEW ENQUIRY', 
              c71567t3: 'NEW ENQUIRY' , 
              c71567t4: 'NEW ENQUIRY', 
              c71567t5: 'NEW ENQUIRY', 
              c71567t6: 'NEW ENQUIRY' , 
              c71567t7: 'NEW ENQUIRY', 
              c71567t8: 'NEW ENQUIRY' 
          },
          { 
              name: 'Claims Handler', 
              c71567: 'General Claim', 
              c71567t1: 'General Claim', 
              c71567t2: 'General Claim', 
              c71567t3: 'General Claim', 
              c71567t4: 'General Claim', 
              c71567t5: 'General Claim', 
              c71567t6: 'General Claim', 
              c71567t7: 'General Claim', 
              c71567t8: 'General Claim' 
          },
          { 
              name: 'Event Code', 
              c71567: 'C71567', 
              c71567t1: 'C71567 - TEST0001', 
              c71567t2: 'C71567 - TEST0002', 
              c71567t3: 'C71567 - TEST0003', 
              c71567t4: 'C71567 - TEST0004', 
              c71567t5: 'C71567 - TEST0005', 
              c71567t6: 'C71567 - TEST0006', 
              c71567t7: 'C71567 - TEST0007', 
              c71567t8: 'C71567 - TEST0008'  
          },
          { 
              name: 'Building', 
              c71567: '305.00', 
              c71567t1: '1,000.00', 
              c71567t2: '305.00', 
              c71567t3: '305.00', 
              c71567t4: '305.00', 
              c71567t5: '305.00', 
              c71567t6: '305.00', 
              c71567t7: '305.00', 
              c71567t8: '305.00' 
          },
          { 
              name: 'Less EQC Building Cap', 
              c71567: '—', 
              c71567t1: '—', 
              c71567t2: '—', 
              c71567t3: '—', 
              c71567t4: '—', 
              c71567t5: '—', 
              c71567t6: '—', 
              c71567t7: '—', 
              c71567t8: '—' 
          },
          { 
              name: 'Liability Building', 
              c71567: '', 
              c71567t1: '', 
              c71567t2: '', 
              c71567t3: '', 
              c71567t4: '', 
              c71567t5: '', 
              c71567t6: '', 
              c71567t7: '', 
              c71567t8: ''
          },
          { 
              name: '', 
              c71567: '', 
              c71567t1: '', 
              c71567t2: '', 
              c71567t3: '', 
              c71567t4: '', 
              c71567t5: '' , 
              c71567t6: '', 
              c71567t7: '', 
              c71567t8: '' 
          },
          { 
              name: 'Change in Building Liability', 
              c71567: '—', 
              c71567t1: '0.00', 
              c71567t2: '0.00', 
              c71567t3: '0.00', 
              c71567t4: '0.00', 
              c71567t5: '0.00', 
              c71567t6: '0.00', 
              c71567t7: '0.00', 
              c71567t8: '0.00'
          },
          { 
              name: 'Change in Building Reserve', 
              c71567: '—', 
              c71567t1: '0.00', 
              c71567t2: '0.00', 
              c71567t3: '0.00', 
              c71567t4: '0.00', 
              c71567t5: '0.00', 
              c71567t6: '0.00', 
              c71567t7: '0.00', 
              c71567t8: '0.00' 
          },
          { 
              name: '', 
              c71567: '', 
              c71567t1: '', 
              c71567t2: '', 
              c71567t3: '', 
              c71567t4: '', 
              c71567t5: '', 
              c71567t6: '', 
              c71567t7: '', 
              c71567t8: '' 
          },
          { 
              name: 'Liability DFPP', 
              c71567: '', 
              c71567t1: '', 
              c71567t2: '', 
              c71567t3: '', 
              c71567t4: '', 
              c71567t5: '', 
              c71567t6: '', 
              c71567t7: '', 
              c71567t8: ''
          },
          { 
              name: '', 
              c71567: '', 
              c71567t1: '', 
              c71567t2: '', 
              c71567t3: '', 
              c71567t4: '', 
              c71567t5: '', 
              c71567t6: '', 
              c71567t7: '', 
              c71567t8: ''
          },
          { 
              name: 'Contents', 
              c71567: '10,000.00', 
              c71567t1: '0.00', 
              c71567t2: '10,000.00', 
              c71567t3: '10,000.00', 
              c71567t4: '10,000.00', 
              c71567t5: '10,000.00', 
              c71567t6: '10,000.00', 
              c71567t7: '10,000.00', 
              c71567t8: '10,000.00'
          },
          { 
              name: 'Less EQC Contents Cap', 
              c71567: '—', 
              c71567t1: '—', 
              c71567t2: '—', 
              c71567t3: '—', 
              c71567t4: '—', 
              c71567t5: '—', 
              c71567t6: '—', 
              c71567t7: '—', 
              c71567t8: '—'
          },
          { 
              name: 'Liability Contents', 
              c71567: '', 
              c71567t1: '', 
              c71567t2: '', 
              c71567t3: '', 
              c71567t4: '', 
              c71567t5: '', 
              c71567t6: '', 
              c71567t7: '', 
              c71567t8: ''
          },
          { 
              name: '', 
              c71567: '', 
              c71567t1: '', 
              c71567t2: '', 
              c71567t3: '', 
              c71567t4: '', 
              c71567t5: '', 
              c71567t6: '', 
              c71567t7: '', 
              c71567t8: ''
          },
          { 
              name: 'Total Liability', 
              c71567: '', 
              c71567t1: '', 
              c71567t2: '', 
              c71567t3: '', 
              c71567t4: '', 
              c71567t5: '', 
              c71567t6: '', 
              c71567t7: '', 
              c71567t8: ''
          },
          { 
              name: 'Change in Total Liability', 
              c71567: '', 
              c71567t1: '', 
              c71567t2: '', 
              c71567t3: '', 
              c71567t4: '', 
              c71567t5: '', 
              c71567t6: '', 
              c71567t7: '', 
              c71567t8: ''
          },
          { 
              name: '', 
              c71567: '', 
              c71567t1: '', 
              c71567t2: '', 
              c71567t3: '', 
              c71567t4: '', 
              c71567t5: '', 
              c71567t6: '', 
              c71567t7: '', 
              c71567t8: ''
          }
      ],
      splitterModel: 200,
    }
  },
  methods: {
    createTriage(){
      if(!this.loadTriage){
        this.tabs.push({
          name: 'triage',
          label: 'Triage'
        });
        this.loadTriage = true;
      }
      this.tab = 'triage';
      this.rightDrawerOpen = false;
    },
    openBookAppointment() {
      this.bookAppointment = true;
      this.rightDrawerOpen = false;
    },
    openCreateExtAllocation(){
      this.tab = 'externalAllocation';
      this.createExtAllocation = true;
      this.rightDrawerOpen = false;
    }, 
    openCreateDraftLetter(){
      this.tab = 'draftLetters';
      this.createDraftLetter = true;
      this.rightDrawerOpen = false;
    },
    openCreateReport() {
      this.createReport = true;
      this.rightDrawerOpen = false;
    },
    collapsed(val) {
      this.collapseVal = val;
    },
    checkSubDefault(arr){
      if(arr.subs.length > 0){
        return arr.subs[0].name;
      }
    }
  }
}
