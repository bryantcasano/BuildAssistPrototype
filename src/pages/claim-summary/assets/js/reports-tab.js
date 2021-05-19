import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { exportFile } from 'quasar';

export default {
  data () {
    return {
      pagination: {
      rowsPerPage: 25
      },
      columns: [
        { name: 'no', align: 'left', label: 'No.', field: 'no', sortable: false },
        { name: 'title', align: 'left', label: 'Report Title', field: 'title', sortable: false },
        { name: 'createDetails', align: 'left', label: 'Created Details', field: 'createDetails', sortable: false },
        { name: 'pdfDetails', align: 'left', label: 'PDF Details', field: 'pdfDetails', sortable: false },
        { name: 'template', align: 'left', label: 'Report Template', field: 'template', sortable: false },
        { name: 'rptNo', align: 'left', label: 'Rpt#', field: 'rptNo', sortable: false },
        { name: 'sent', align: 'left', label: 'Report Sent', field: 'sent', sortable: false },
        { name: 'lastUpdate', align: 'left', label: 'Last Update Details', field: 'lastUpdate', sortable: false },
        { name: 'action', align: 'left', label: 'Action', field: 'action', sortable: false },
      ],
      dialog: {
        deleteReport: false
      },
      deleteReportID: '',
      data: [
        {
          no: '1',
          title: 'First Report',
          create: {
            user: 'Barry Cade',
            position: 'SUPPORT',
            account: 'Demo Insurance',
            dateTime: '23/01/2020 14:38:51'
          },
          pdf: null,
          template: null,
          rptNo: '1',
          sent: null,
          lastUpdate: null
        },
        {
          no: '2',
          title: 'First Report',
          create: {
            user: 'Cherry Blossom',
            position: null,
            account: 'Demo Insurance',
            dateTime: '21/08/2019 15:07:48'
          },
          pdf: null,
          template: null,
          rptNo: '1',
          sent: null,
          lastUpdate: null
        },
        {
          no: '3',
          title: 'This Report Title',
          create: {
            user: 'Cliff Hanger',
            position: null,
            account: 'Demo Insurance',
            dateTime: '21/08/2019 15:32:06'
          },
          pdf: {
            user: 'Barry Cade',
            dateTime: '21/08/2019 15:32:37'
          },
          template: 'This Report Title',
          templateType: 'Subsequent Report',
          rptNo: '1',
          sent: {
            user: 'Cherry Blossom',
            dateTime: '21/08/2019 15:37:37'
          },
          lastUpdate: {
            user: 'Cliff Hanger',
            dateTime: '21/08/2019 15:32:37'
          }
        },
        {
          no: '4',
          title: 'Second Report',
          create: {
            user: 'Will Power',
            position: null,
            account: 'Demo Insurance',
            dateTime: '21/08/2019 15:38:58'
          },
          pdf: {
            user: 'Cherry Blossom',
            dateTime: '21/08/2019 15:39:20'
          },
          template: 'Subsequent Report',
          templateType: 'Subsequent Report',
          rptNo: '2',
          sent: {
            user: 'Cliff Hanger',
            position: 'SUPPORT',
            dateTime: '21/08/2019 15:40:26'
          },
          lastUpdate: {
            user: 'Will Power',
            dateTime: '21/08/2019 15:39:20'
          }
        },
        {
          no: '5',
          title: 'Third Report',
          create: {
            user: 'Marge Arin',
            position: null,
            account: 'Demo Insurance',
            dateTime: '21/08/2019 15:44:33'
          },
          pdf: null,
          template: null,
          rptNo: '3',
          sent: null,
          lastUpdate: {
            user: 'Barry Cade',
            dateTime: '21/08/2019 15:44:38',
            lru: true
          }
        }
      ]
    }
  },
  methods: {
    toggleNotes(){
      this.notExpand = !this.notExpand;

      for(var x = 0; x < this.data.length ; x ++) {
        this.data[x].expand = this.notExpand;
      }
    },
    deleteReport(id){
      this.deleteReportID = id;
      this.dialog.deleteReport = true;
    },
    confirmDeleteReport(){
      if(this.dialog.deleteReport && this.deleteReportID !== ''){
        this.data.forEach((element, index) => {
          if(element.no === this.deleteReportID) {
            this.data.splice(index, 1);
            this.deleteReportID = '';
            this.dialog.deleteReport = false;
            this.$q.notify({
              color: 'green',
              icon: 'thumb_up_alt',
              message: 'Deleted Successfully!',
              position: 'top',
              timeout: 1500
            });
          }
        });
      }
    },
    downloadDOCX(){
      const status = exportFile(
        'report-export.docx',
        'test',
        'text/docx'
      );
    },
    downloadPDF(statusActive, id) {
      if(statusActive){
        let data = [];
        var title = 'report';
        this.data.forEach((el, index) => {
          if(el.no === id){
            data.push([
              el.no,
              el.title,
              el.create.user + el.create.position + ' in ' + el.create.position + el.create.dateTime,
              el.pdf ? el.pdf.user + el.pdf.dateTime : '',
              el.template + el.templateType,
              el.rptNo,
              el.sent ? el.sent.user + ' on ' + el.sent.dateTime : '',
              el.lastUpdate ? el.lastUpdate.lru ? 'Latest Report Updated': '' + el.lastUpdate.user + ' on ' + el.lastUpdate.dateTime : '',
            ]);
            title = el.title;
          }
        });

        let doc = new jsPDF('p', 'pt', 'a4');
        doc.autoTable({
          head: [['No.', 'Report Title', 'Create Details', 'PDF Details', 'Report Template', 'Rpt#', 'Report Sent', 'Last Update Details']],
          body: data,
          headStyles: { cellWidth: 'wrap' },
          bodyStyles: { cellWidth: 'auto' }
        });
        doc.save(title +'.pdf');
      }
    }
  }
}