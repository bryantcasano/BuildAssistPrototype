import AddAttachments from "claimSummary/components/AddAttachmentsModal";

export default {
	components: {
		AddAttachments
	},
	data: () => ({
		addedAttachment: false,
		gallery: {
			showDetails: false,
			details: {},
			column: [
				{ name: 'fileIcon', label: 'fileIcon', field: 'fileUrl' }
			],
			data: [],
			pagination: {
				rowsPerPage: 25
			},
		},
		deleteAttachmentID: '',
		dialog: {
			deleteAttachment: false,
			gallery: false,
		},
		options: {
			accessLevel : [
				{ id : '1', value: 'Internal & Insurer'}
			],
			status : [
				{ id : '1', value: 'Active' }
			]
		},
		repoAttachment: {
			columns: [
				{ name: 'document', align: 'left', label : 'Document', field: 'document'},
				{ name: 'accsLevel', align: 'left', label: 'Access Level', field: 'accsLevel'},
				{ name: 'description', align: 'left', label: 'Description', field: 'description' },
				{ name: 'fileSize', align: 'left', label: 'File Size', field: 'fileSize' },
				{ name: 'createdOn', align: 'left', label: 'Created On', field: 'createdOn' },
				{ name: 'createdBy', align: 'left', label: 'Created By', field: 'createdBy' },
				{ name: 'status', align: 'left', label: 'Status', field: 'status' },
				{ name: 'action', align: 'left', label: 'Action', field: 'action' }
			],
			data: [
				{ 
					id: '1',
					document: 'EMAIL FROM INSURER',
					accessLevel: '1',
					description: [
						{ 
							id: '11', 
							document : 'tidy-tight_1x-1-el-test-builder', 
							accessLevel: '1', 
							note: 'Generic Specialist Request To Test Builder', 
							fileSize: '5.4 KB', createdOn: '17/04/2020 13:34:47', 
							fileUrl: 'https://picsum.photos/500/500',
							createdBy: 'Cherry Blossom', 
							status : '1' 
						},
						{ 
							id: '12', 
							document: '20191105_131600.jpg', 
							accessLevel: '1', 
							note: 'Generic Specialist Request To Test Builder', 
							fileSize: '12 KB', 
							fileUrl: 'https://picsum.photos/500/450',
							createdOn: '17/04/2020 13:34:47', 
							createdBy: 'Cherry Blossom', 
							status : '1' 
						},
					],
					show: true
				},
				{ 
					id: '2',
					document: 'EXTERNAL ALLOCATION',
					accessLevel: '1',
					description: [
						{   
							id: '21', 
							document: 'tidy-tight_1x-1-el-test-builder', 
							accessLevel: '1', 
							note: 'Generic Specialist Request To Test Builder 1A Kenepuru Drive Porirua Auckland 5240', 
							fileSize: '5.4 KB', 
							fileUrl: 'https://picsum.photos/500/500',
							createdOn: '17/04/2020 13:34:47', 
							createdBy: 'Cherry Blossom', 
							status : '1' 
						},
					],
					show: true
				},
			],
			pagination: {
				rowsPerPage: 25
			},
		},
	}),
	watch: {
		addedAttachment(value, oldValue){
			if(value){
				this.$local.get('claims_attachments').then(response => {
			    	this.repoAttachment.data = response;
			    	console.log(this.repoAttachment.data);
		    	});
			}
		}
	},
	methods: {
		getOptionLabel(val, idKey, labelKey, arrOption){
		  var labelValue = '';
		  for (var x = 0; x < arrOption.length; x++) {
			if(arrOption[x][idKey] === val){
			  labelValue = arrOption[x][labelKey];
			}
		  }
		  return labelValue;
		},
		deleteAttachment(id){
			this.deleteAttachmentID = id;
			this.dialog.deleteAttachment = true;
		},
		confirmDeleteAttachment(){
			if(this.dialog.deleteAttachment && this.deleteAttachmentID !== ''){
				this.repoAttachment.data.forEach((element, index) => {
					if(element.id === this.deleteAttachmentID) {
						this.repoAttachment.data.splice(index, 1);
						this.$local.update('claims_attachments', this.repoAttachment.data);
						this.deleteAttachmentID = '';
						this.dialog.deleteAttachment = false;
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
		galleryModal(arrData){
			this.dialog.gallery = true;
			this.gallery.showDetails = false;
			this.gallery.data = arrData;
		},
		galleryDetails(dataDetails){
			this.gallery.showDetails = true;
			this.gallery.details = dataDetails;
		},
		saveDetails(){
			this.dialog.gallery = false;
			this.gallery.showDetails = false;
			this.$local.update('claims_attachments', this.repoAttachment.data);
			this.$q.notify({
				color: 'green',
				icon: 'thumb_up_alt',
				message: 'Save Success!',
				position: 'top',
				timeout: 1500
			});
		},
		closeGallery(){
			if(this.gallery.showDetails) {
				this.gallery.showDetails = false;
			} else {
				this.dialog.gallery = false;
			}
		},
		toggleRow(value, event){
			if(!(event.target.className.includes('cursor-pointer') && event.target.className.includes('q-icon'))){
				value.show = !value.show;
			}
		},
		setNotes(val){
			this.$local.update('claims_attachments', val);
		}
	},
  beforeMount(){ 
    this.$local.get('claims_attachments').then(response => {
      if (this.repoAttachment.data.length > response.length) {
        response.forEach((index, key) => {
          this.repoAttachment.data.push(index);
        });
        this.$local.update('claims_attachments', this.repoAttachment.data);
      } else {
        this.repoAttachment.data = response;
      }
    });
  }
};