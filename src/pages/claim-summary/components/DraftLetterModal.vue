<template>
	<div>
		<q-dialog
			persistent
			full-height
			content-class="draft-letter-modal"
			v-model="dialogModel">
			<q-card :style="[data.template === '' && !openLetter ? {'height': '350px!important' } : {}]">
				<q-form style="height: 100%;"
					ref="extAllocationFrom">
					<q-card-section>
						<q-icon 
							name="close" 
							class="close-button"
							@click="closeDialog()"/>
						<div class="row page__heading">
							<div class="col-xs-12"> 
								Generate Letter <span v-if="data.draftTitle !==''">for</span> {{data.draftTitle}}
							</div>
						</div>
						<div class="row container">
							<div class="col-xs-12">
								<q-btn color="primary" no-caps class="filter-button float-left" :disable="data.template === ''" @click="saveDraft = true" rounded label="Save Draft"/>
								<q-btn color="primary" no-caps class="filter-button float-left" :disable="data.template === ''" @click="openLetter = true" rounded label="Open Letter"/>
								<q-btn color="primary" no-caps class="filter-button float-left" :disable="!openLetter || data.template === ''" rounded label="Preview Letter"/>
								<q-btn color="primary" no-caps class="filter-button float-left" :disable="!openLetter || data.template === ''"  @click="generateLetter()" rounded label="Generate Letter"/>
								<q-btn color="primary" no-caps class="filter-button float-left" :disable="!openLetter || data.template === ''" rounded label="Generate DOCLetter"/>
							</div>
						</div>
					</q-card-section>
					<q-card-section>
						<q-scroll-area class="filter-scroll">
							<div class="row container">
								<div class="details-container row col-xs-12">
									<div class="row details-field-container col-xs-12">
										<label class="col-xs-12">Select Template</label>
										<div class="col-xs-12 col-sm-6 fs-container">
											<field-select
												valueKey="id"
												labelKey="value"
												:options="options.template"
												:value.sync="data.template"
											/>
										</div>
									</div>
									<div v-if="data.template !== ''" class="row details-field-container col-xs-12">
										<label class="col-xs-12">Send Letter to</label>
										<div class="col-xs-12 col-sm-6 fs-container">
											<field-select
												valueKey="id"
												labelKey="value"
												:options="options.sentTo"
												:value.sync="data.sentTo"
											/>
										</div>
									</div>
									<div v-if="data.template !== ''" class="row details-field-container col-xs-12">
										<label class="col-xs-12">Workgroup</label>
										<div class="col-xs-12 col-sm-6 fs-container">
											<field-select
												valueKey="id"
												labelKey="value"
												:options="options.default"
												:value.sync="data.workgroup"
											/>
										</div>
									</div>
									<div v-if="data.template !== ''" class="row details-field-container col-xs-12">
										<label class="col-xs-12">Provider</label>
										<div class="col-xs-12 col-sm-6 fs-container">
											<field-select
												valueKey="id"
												labelKey="value"
												:options="options.provider"
												:value.sync="data.provider"
											/>
										</div>
									</div>
									<div v-if="data.template !== ''" class="details-field-container col-xs-12">
										<q-checkbox 
											color="green"
											v-model="data.collectExcess" 
											label="Collect Excess" />
										<q-checkbox 
											color="green"
											v-model="data.showAllProviders" 
											label="Show all Providers" />
									</div>
									<div v-if="data.template !== ''" class="details-field-container col-xs-12">
										<label class="col-xs-12">Recipient's name and address</label>
										<div class="col-xs-12">
											<q-input
												square 
												outlined 
												type="textarea" 
												v-model="data.recipientsDetails" 
												placeholder="Please type here"
												class="notes" />
										</div>
									</div>
									<div v-if="data.template !== ''" class="details-field-container row col-sm-6 col-xs-12">
										<label class="col-xs-12">Created By</label>
										<label class="col-xs-12 uneditable">{{data.createdBy}}</label>
									</div>
									<div class="details-field-container row col-xs-12 open-letter" v-if="openLetter">
										<label 
											class="col-xs-12"
											v-if="openLetterTitle !== ''">
											{{openLetterTitle}} Details
										</label>
										<q-editor
											v-model="data.openLetterDetails"
											:toolbar="
												[
													[
														{   
															label: $q.lang.editor.align,
															icon: $q.iconSet.editor.align,
															fixedLabel: true,
															list: 'only-icons',
															options: ['left', 'center', 'right', 'justify']
														},
														{
															label: $q.lang.editor.align,
															icon: $q.iconSet.editor.align,
															fixedLabel: true,
															options: ['left', 'center', 'right', 'justify']
														}
													],
													['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
													['token', 'hr', 'link', 'custom_btn'],
													['print', 'fullscreen'],
													[
														{
															label: $q.lang.editor.formatting,
															icon: $q.iconSet.editor.formatting,
															list: 'no-icons',
															options: [ 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code' ]
														},
														{
															label: $q.lang.editor.fontSize,
															icon: $q.iconSet.editor.fontSize,
															fixedLabel: true,
															fixedIcon: true,
															list: 'no-icons',
															options: [ 'size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
														},
														{
															label: $q.lang.editor.defaultFont,
															icon: $q.iconSet.editor.font,
															fixedIcon: true,
															list: 'no-icons',
															options: [ 'default_font', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana']
														},
														'removeFormat'
													],
													['quote', 'unordered', 'ordered', 'outdent', 'indent'],
													['undo', 'redo'],
													['viewsource']
												]
											"
											:fonts="fonts"
											min-height="15rem"
										/>
									</div>
									<div class="details-field-container row col-xs-12 open-letter" v-if="openLetter">
										<label 
											class="col-xs-12"
											v-if="openLetterTitle !== ''">
											{{openLetterTitle}} Body
										</label>
										<q-editor
											v-model="data.openLetterBody"
											:toolbar="
												[
													[
														{   
															label: $q.lang.editor.align,
															icon: $q.iconSet.editor.align,
															fixedLabel: true,
															list: 'only-icons',
															options: ['left', 'center', 'right', 'justify']
														},
														{
															label: $q.lang.editor.align,
															icon: $q.iconSet.editor.align,
															fixedLabel: true,
															options: ['left', 'center', 'right', 'justify']
														}
													],
													['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
													['token', 'hr', 'link', 'custom_btn'],
													['print', 'fullscreen'],
													[
														{
															label: $q.lang.editor.formatting,
															icon: $q.iconSet.editor.formatting,
															list: 'no-icons',
															options: [ 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code' ]
														},
														{
															label: $q.lang.editor.fontSize,
															icon: $q.iconSet.editor.fontSize,
															fixedLabel: true,
															fixedIcon: true,
															list: 'no-icons',
															options: [ 'size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
														},
														{
															label: $q.lang.editor.defaultFont,
															icon: $q.iconSet.editor.font,
															fixedIcon: true,
															list: 'no-icons',
															options: [ 'default_font', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana']
														},
														'removeFormat'
													],
													['quote', 'unordered', 'ordered', 'outdent', 'indent'],
													['undo', 'redo'],
													['viewsource']
												]
											"
											:fonts="fonts"
											min-height="10rem"
										/>
									</div>
									<div class="details-field-container row col-xs-12 open-letter" v-if="openLetter">
										<label 
											class="col-xs-12"
											v-if="openLetterTitle !== ''">
											{{openLetterTitle}} Indemnity Items
										</label>
										<q-editor
											v-model="data.openLetterItems"
											:toolbar="
												[
													[
														{   
															label: $q.lang.editor.align,
															icon: $q.iconSet.editor.align,
															fixedLabel: true,
															list: 'only-icons',
															options: ['left', 'center', 'right', 'justify']
														},
														{
															label: $q.lang.editor.align,
															icon: $q.iconSet.editor.align,
															fixedLabel: true,
															options: ['left', 'center', 'right', 'justify']
														}
													],
													['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
													['token', 'hr', 'link', 'custom_btn'],
													['print', 'fullscreen'],
													[
														{
															label: $q.lang.editor.formatting,
															icon: $q.iconSet.editor.formatting,
															list: 'no-icons',
															options: [ 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code' ]
														},
														{
															label: $q.lang.editor.fontSize,
															icon: $q.iconSet.editor.fontSize,
															fixedLabel: true,
															fixedIcon: true,
															list: 'no-icons',
															options: [ 'size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
														},
														{
															label: $q.lang.editor.defaultFont,
															icon: $q.iconSet.editor.font,
															fixedIcon: true,
															list: 'no-icons',
															options: [ 'default_font', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana']
														},
														'removeFormat'
													],
													['quote', 'unordered', 'ordered', 'outdent', 'indent'],
													['undo', 'redo'],
													['viewsource']
												]
											"
											:fonts="fonts"
											min-height="10rem"
										/>
									</div>
									<div class="details-field-container row col-xs-12 open-letter" v-if="openLetter">
										<label 
											class="col-xs-12"
											v-if="openLetterTitle !== ''">
											{{openLetterTitle}} Footer
										</label>
										<q-editor
											v-model="data.openLetterFooter"
											:toolbar="
												[
													[
														{   
															label: $q.lang.editor.align,
															icon: $q.iconSet.editor.align,
															fixedLabel: true,
															list: 'only-icons',
															options: ['left', 'center', 'right', 'justify']
														},
														{
															label: $q.lang.editor.align,
															icon: $q.iconSet.editor.align,
															fixedLabel: true,
															options: ['left', 'center', 'right', 'justify']
														}
													],
													['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
													['token', 'hr', 'link', 'custom_btn'],
													['print', 'fullscreen'],
													[
														{
															label: $q.lang.editor.formatting,
															icon: $q.iconSet.editor.formatting,
															list: 'no-icons',
															options: [ 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code' ]
														},
														{
															label: $q.lang.editor.fontSize,
															icon: $q.iconSet.editor.fontSize,
															fixedLabel: true,
															fixedIcon: true,
															list: 'no-icons',
															options: [ 'size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
														},
														{
															label: $q.lang.editor.defaultFont,
															icon: $q.iconSet.editor.font,
															fixedIcon: true,
															list: 'no-icons',
															options: [ 'default_font', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana']
														},
														'removeFormat'
													],
													['quote', 'unordered', 'ordered', 'outdent', 'indent'],
													['undo', 'redo'],
													['viewsource']
												]
											"
											:fonts="fonts"
											min-height="15rem"
										/>
									</div>
								</div>
							</div>
						</q-scroll-area>
					</q-card-section>
				</q-form>
			</q-card>
		</q-dialog>
		<q-dialog 
			persistent
			v-model="confirmAction"
			content-class="draft-letter-small-modal">
			<q-card>
				<q-card-section class="row items-center">
					<span class="title">Confirmation Action</span>
					<span>Do you wish to leave the <span v-if="!fromDetails">Create</span> Letter window you are currently working on?</span>
				</q-card-section>
				<q-card-actions align="right">
					<q-btn rounded no-caps class="filter-button" label="Confirm" color="primary" @click="confirmCloseAction()" />
					<q-btn rounded no-caps class="filter-button" label="Cancel" color="primary" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>
		<q-dialog 
			persistent
			v-model="saveDraft"
			content-class="draft-letter-small-modal">
			<q-card>
				<q-card-section class="row items-center">
					<q-icon 
						name="close" 
						v-close-popup
						class="close-button" />
					<span class="title">Save Draft As</span>
					<q-input 
						autofocus
						label="Draft title"
						v-model="draftName" />
				</q-card-section>
				<q-card-actions align="right">
					<q-btn rounded no-caps class="filter-button" label="Save" :disable="draftName === ''" color="primary" @click="saveDraftTitle()" />
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<script>
import FieldSelect from "shared/components/FieldSelect"; 

export default {
	components: {
		FieldSelect,
	},
	props: {
		activate: {
			type: Boolean,
			default: false
		},
		new: {
			type: Boolean,
			default: false
		},
		value: {
			type: Object,
			default: null
		},
		generate: {
			type: Object,
			default: null
		}
	},
	data: () => ({
		fromDetails: false,
		openLetter: false,
		confirmAction: false,
		saveDraft: false,
		openLetterTitle: '',
		dialogModel: false, 
		draftName: '',
		options: {
			template: [
				{ id: '1', value: 'DFPP Customer Authorisation Letter' },
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
		data: {
			template: '',
			provider: '',
			draftTitle: '',
			sentTo: '',
			recipientsDetails: '',
			status: '',
			dueDate: '',
			createdBy: 'Cliff Hanger',
			dateCreated: '',
			workgroup: '',
			collectExcess: false,
			showAllProviders: false,
			openLetterDetails: '',
			openLetterBody: '',
			openLetterItems: '',
			openLetterFooter: '',

		},
		fonts: {
			arial: 'Arial',
			arial_black: 'Arial Black',
			comic_sans: 'Comic Sans MS',
			courier_new: 'Courier New',
			impact: 'Impact',
			lucida_grande: 'Lucida Grande',
			times_new_roman: 'Times New Roman',
			verdana: 'Verdana'
		}
	}),
	computed: {
		template(){
			return this.data.template;
		}
	},
	watch: {
		activate(value, oldValue){
			this.dialogModel = value;
		},
		value(value, oldValue){
			if(value !== null){
				this.fromDetails = true;

				if(this.new){
					this.setDefaultData();
				} else {
					this.data = value;
				}
			}
		},
		template(value, oldValue) {
			if(value!== ''){
				for (var x = 0; x < this.options.template.length; x++) {
					if(this.options.template[x].id === value){
						this.openLetterTitle = this.options.template[x].value;
					}
				}
			} else {
				this.openLetter = false;
				this.openLetterTitle = '';
			}
		},
		saveDraft(value, oldValue) {
			if(value) {
				this.draftName = this.data.draftTitle !== '' ? this.data.draftTitle : '';
			}
		}
	},
	methods: {
		setDefaultData(){
			this.data = {
				template: '',
				provider: '',
				draftTitle: '',
				sentTo: '',
				recipientsDetails: '',
				status: '',
				dueDate: '',
				createdBy: 'Cliff Hanger',
				dateCreated: '',
				workgroup: '',
				collectExcess: false,
				showAllProviders: false,
				openLetterDetails: '',
				openLetterBody: '',
				openLetterItems: '',
				openLetterFooter: '',
			};
			this.fromDetails = false;
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
		closeDialog() {
			this.confirmAction = true;
		},
		confirmCloseAction(){
			this.confirmAction = false;
			this.dialogModel = false;
			this.setDefaultData();
			this.$emit("update:activate", this.dialogModel);
		},
		saveDraftTitle(){
			this.saveDraft = false;
			this.dialogModel = false;
			this.$emit("update:activate", this.dialogModel);
			this.data.draftTitle = this.draftName;

			if(this.fromDetails){
				this.value = this.data;
				this.$local.update('claims_draft_letters.array', this.value);
			} else {
				var currentDate = new Date();
				var currentMonth = currentDate.getMonth() + 1;
				var formattedDate = currentDate.getFullYear() + '/' + currentMonth + '/' + currentDate.getDate() + ' ' + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
				this.data.dateCreated = formattedDate;
				this.data.fromAction ='save letter';
				this.$emit("update:value", this.data); 
			}

			this.$q.notify({
				color: 'green',
				icon: 'thumb_up_alt',
				message: 'Save Success!',
				position: 'top',
				timeout: 1500
			});
		},
		customDate(val){
      if(val < 10){
        return '0' + val; 
      } else {
        return val;
      }
    },
		generateLetter(){
			this.dialogModel = false;
			this.$emit("update:activate", this.dialogModel);
			this.data.fromAction = 'generate';


			if(this.fromDetails){
				this.value = this.data;
				this.$emit("update:generate", this.value)
			} else {
				var currentDate = new Date();
				var currentMonth = currentDate.getMonth() + 1;
				var formattedDate = currentDate.getFullYear() + '/' + currentMonth + '/' + currentDate.getDate() + ' ' + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
        var formattedCreatedDate = this.customDate(currentDate.getDate() + 1) + '/' + this.customDate(currentMonth) + '/' + currentDate.getFullYear() + ' ' + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
				
				this.data.dateCreated = formattedDate;

				this.$local.get('claims_history').then( response => {
          var tempClaimHistory = response;
          tempClaimHistory.unshift({
            date: formattedCreatedDate,
            user: this.data.createdBy,
            action: 'Generate Draft Letter',
            notes: 'Save note: ' + this.data.draftTitle + '  Sent to: ' + this.getOptionLabel(this.data.sentTo, 'id', 'value', this.options.sentTo) + ' ' + this.data.recipientsDetails,
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
                document: this.getOptionLabel(this.data.template, 'id', 'value', this.options.template),
                accessLevel: '1',
                note: 'Save note: ' + this.data.draftTitle + '  Sent to: ' + this.getOptionLabel(this.data.sentTo, 'id', 'value', this.options.sentTo) + ' ' + this.data.recipientsDetails,
                fileSize: '',
                fileUrl: '',
                createdOn: formattedCreatedDate,
                createdBy: this.data.createdBy,
                status: '1'
              }
            ],
            show: true
          });
          this.$local.update('claims_attachments', tempClaimAttachments);
          this.setDefaultData();
        });
			}

			this.dialogModel = false;
			this.$q.notify({
				color: 'green',
				icon: 'thumb_up_alt',
				message: 'Successfully Generated!',
				position: 'top',
				timeout: 1500
			}); 
		}
	}
};
</script>

<style scoped>
	.draft-letter-modal .q-card{
		max-width: 750px;
		width: 750px;
	}
	.draft-letter-modal .page__heading {
		color: #41474E;
		margin: 30px 30px 0;
		text-transform: none;
	}
	.draft-letter-modal .page__heading > div {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.draft-letter-modal .close-button,
	.draft-letter-small-modal .close-button {
		background: #0660AE;
		color: #fff;
		cursor: pointer;
		font-size: 20px;
		padding: 15px;
		position: absolute;
		right: 0;
		top: 0;
	}
	.draft-letter-modal .close-button:hover,
	.draft-letter-small-modal .close-button:hover {
		background-color: #ED4758;
	}
	.draft-letter-modal .filter-scroll {
		height: 100%;
		width: 100%;
	}
	.draft-letter-modal .container {
		padding: 0 33px;
	}
	.draft-letter-modal .filter-button,
	.draft-letter-small-modal .filter-button {
		box-shadow: none;
		margin-right: 10px;
		margin-top: 7px;
		max-width: unset;
		width: auto;
	}
	.draft-letter-modal .filter-button.disabled,
	.draft-letter-small-modal .filter-button.disabled {
		background-color: #ccc!important;
	}
	.draft-letter-modal .filter-button >>> .q-btn__wrapper,
	.draft-letter-small-modal .filter-button >>> .q-btn__wrapper {
		min-height: 34px;
		padding: 3px 16px;
	}
	.draft-letter-small-modal .filter-button:nth-of-type(2) >>> .q-btn__wrapper {
		background-color: #ED4758;
	}
	.draft-letter-modal .filter-button >>> .q-btn__wrapper:before,
	.draft-letter-small-modal .filter-button >>> .q-btn__wrapper:before {
		box-shadow: none;
	}
	.draft-letter-modal .filter-button >>> .q-btn__content,
	.draft-letter-small-modal .filter-button >>> .q-btn__content {
		font-family: Myriad Pro Regular;
	}
	.draft-letter-modal .q-card__section:nth-of-type(2) {
		bottom: 10px;
		left: 16px;   
		padding: 0;
		position: absolute;
		right: 16px;
		top: 160px;
	}
	.draft-letter-modal .details-container {
		padding-left: 0;
		padding-right: 0;
	}
	.draft-letter-modal .details-container > .details-field-container:first-of-type {
		padding-top: 0;
	}
	.draft-letter-modal .details-field-container .q-checkbox {
		margin-right: 40px;
	}

	.draft-letter-modal .details-field-container >>> .notes,
	.draft-letter-modal .details-field-container >>> .notes .q-field__control {
		height: 100px;
	}
	 .draft-letter-modal .details-field-container >>> .notes textarea {
		height: 100px!important;
		max-height: 100px;
		min-height: 100px;
		padding: 8px 0 10px;
		resize: none;
	}
	.draft-letter-modal label.uneditable {
		color: #A5A5A5;
	}
	.draft-letter-modal .adjust-padr {
		padding-right: 40px;
	}
	.draft-letter-modal .open-letter {
		padding-top: 30px;
	}
	.draft-letter-modal .open-letter > label {
		font-weight: 600;
		padding-bottom: 10px;
	}
	.draft-letter-small-modal .q-card{
		max-width: 360px;
		width: 360px;
	}
	.draft-letter-small-modal .q-card__section {
		padding: 25px 25px 0;
	}
	.draft-letter-small-modal span {
		color: #41474F;
	}
	.draft-letter-small-modal .title {
		font-size: 17px;
		padding-bottom: 15px;
	}
	.draft-letter-small-modal .q-card__actions {
		padding: 25px 25px 30px;
	}
	.draft-letter-small-modal .filter-button {
		margin: 0;
	}
	.draft-letter-small-modal .q-field {
		width: 100%;
	}
	.draft-letter-small-modal .filter-button:first-of-type {
		margin-right: 10px;
	}
	@media (max-width: 768px) and (max-height: 1024px) {
		.draft-letter-modal .q-card__section:nth-of-type(2) {
			top: 195px;
		}
	}
</style>
