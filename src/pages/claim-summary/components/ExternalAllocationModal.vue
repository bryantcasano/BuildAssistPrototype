<template>
	<div>
		<q-dialog
			persistent
			full-height
			content-class="create-ext-allocation"
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
								External Allocation <span v-if="data.draftTitle !==''">for</span> {{data.draftTitle}}
							</div>
						</div>
						<div class="row container">
							<div class="col-xs-12">
								<q-btn color="primary" no-caps class="filter-button float-left" :disable="data.template === ''" @click="saveDraft = true" rounded label="Save Draft"/>
								<q-btn color="primary" no-caps class="filter-button float-left" :disable="data.template === ''" @click="openLetter = true" rounded label="Open Letter"/>
								<q-btn color="primary" no-caps class="filter-button float-left" :disable="!openLetter || data.template === ''" rounded label="Preview Letter"/>
								<q-btn color="primary" no-caps class="filter-button float-left" :disable="!openLetter || data.template === ''" @click="generateDraft()" rounded label="Generate Letter"/>
								<q-btn color="primary" no-caps class="filter-button float-left" :disable="!openLetter || data.template === ''" @click="generateDraft()" rounded label="Generate DOCLetter"/>
							</div>
						</div>
					</q-card-section>
					<q-card-section>
						<q-scroll-area class="filter-scroll">
							<div class="row container">
								<div class="details-container row col-xs-12">
									<div class="details-field-container row col-xs-12">
										<label class="col-xs-12">Select Template</label>
										<div class="col-sm-6 col-xs-12 fs-container adjust-padr">
											<field-select
												valueKey="id"
												labelKey="value"
												:options="options.template"
												:value.sync="data.template"
											/>
										</div>
									</div>
									<div v-if="data.template !== '' && !extAssessment" class="details-field-container row col-xs-12">
										<label class="col-xs-12">Send Letter to</label>
										<div class="col-sm-6 col-xs-12 fs-container adjust-padr">
											<field-select
												valueKey="id"
												labelKey="value"
												:options="options.sentTo"
												:value.sync="data.sentTo"
											/>
										</div>
									</div>
									<div v-if="data.template !== '' && !extAssessment" class="details-field-container row col-xs-12">
										<label class="col-xs-12">Workgroup</label>
										<div class="col-sm-6 col-xs-12 fs-container adjust-padr">
											<field-select
												valueKey="id"
												labelKey="value"
												:options="options.default"
												:value.sync="data.workgroup"
											/>
										</div>
									</div>
									<div v-if="data.template !== ''" class="details-field-container row col-xs-12">
										<label class="col-xs-12">Provider</label>
										<div class="col-sm-6 col-xs-12 fs-container adjust-padr">
											<field-select
												valueKey="id"
												labelKey="value"
												:options="options.provider"
												:value.sync="data.provider"
											/>
										</div>
									</div>
									<div v-if="data.template !== ''" class="details-field-container row col-xs-12">
										<q-checkbox 
											color="green"
											v-model="data.collectExcess" 
											label="Collect Excess" />
										<q-checkbox 
											color="green"
											v-if="!extAssessment"
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
									<div v-if="data.template !== '' && !extAssessment" class="details-field-container row col-sm-6 col-xs-12 adjust-padr">
										<label class="col-xs-12">Due Date</label>
										<div class="col-xs-12">
											<q-input
												square 
												outlined 
												mask="##/##/####"
												placeholder="Please select" 
												v-model="data.dueDate"
												:rules="['date']">
												<template v-slot:append>
													<q-icon name="keyboard_arrow_down" class="cursor-pointer">
														<q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
															<q-date 
																v-model="data.dueDate" 
																mask="DD/MM/YYYY"
																@input="() => $refs.qDateProxy.hide()" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
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
											{{openLetterTitle}}
										</label>
										<q-editor
											v-model="data.openLetter"
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
											min-height="30rem"
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
			content-class="create-ext-small-modal">
			<q-card>
				<q-card-section class="row items-center">
					<span class="title">Confirmation Action</span>
					<span>Do you wish to leave the <span v-if="!fromDetails">Create</span> External Allocation window you are currently working on?</span>
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
			content-class="create-ext-small-modal">
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
		extAssessment: false,
		draftName: '',
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
			openLetter: ''
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
						if(this.options.template[x].value.includes('Ext Assessment')){
							this.extAssessment = true;
						} else {
							this.extAssessment = false;
						}
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
		setDefaultData() {
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
				openLetter: ''
			};
			this.fromDetails = false;
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
			this.data.draftTitle = this.draftName;

			if(this.fromDetails){
				this.value = this.data;
				this.$local.update('claims_ext_alloc.' + this.value.fromTable, this.value);
			} else {
				var currentDate = new Date();
				var currentMonth = currentDate.getMonth() + 1;
				var formattedDate = currentDate.getFullYear() + '/' + currentMonth + '/' + currentDate.getDate() + ' ' + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
				this.data.dateCreated = formattedDate;
				this.data.fromAction ='save draft';
				this.$emit("update:value", this.data); 
				this.setDefaultData();
			}

			this.$emit("update:activate", this.dialogModel);
			this.$q.notify({
				color: 'green',
				icon: 'thumb_up_alt',
				message: 'Save Success!',
				position: 'top',
				timeout: 1500
			});
		},
		generateDraft(){
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
				this.data.dateCreated = formattedDate;
			}

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
	.create-ext-allocation .q-card{
		max-width: 750px;
		width: 750px;
	}
	.create-ext-allocation .page__heading {
		color: #41474E;
		margin: 30px 30px 0;
		text-transform: none;
	}
	.create-ext-allocation .page__heading > div {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.create-ext-allocation .close-button,
	.create-ext-small-modal .close-button {
		background: #0660AE;
		color: #fff;
		cursor: pointer;
		font-size: 20px;
		padding: 15px;
		position: absolute;
		right: 0;
		top: 0;
	}
	.create-ext-allocation .close-button:hover,
	.create-ext-small-modal .close-button:hover {
		background-color: #ED4758;
	}
	.create-ext-allocation .filter-scroll {
		height: 100%;
		width: 100%;
	}
	.create-ext-allocation .container {
		padding: 0 33px;
	}
	.create-ext-allocation .filter-button,
	.create-ext-small-modal .filter-button {
		box-shadow: none;
		margin-right: 10px;
		margin-top: 7px;
		max-width: unset;
		width: auto;
	}
	.create-ext-allocation .filter-button.disabled,
	.create-ext-small-modal .filter-button.disabled {
		background-color: #ccc!important;
	}
	.create-ext-allocation .filter-button >>> .q-btn__wrapper,
	.create-ext-small-modal .filter-button >>> .q-btn__wrapper {
		min-height: 34px;
		padding: 3px 16px;
	}
	.create-ext-small-modal .filter-button:nth-of-type(2) >>> .q-btn__wrapper {
		background-color: #ED4758;
	}
	.create-ext-allocation .filter-button >>> .q-btn__wrapper:before,
	.create-ext-small-modal .filter-button >>> .q-btn__wrapper:before {
		box-shadow: none;
	}
	.create-ext-allocation .filter-button >>> .q-btn__content,
	.create-ext-small-modal .filter-button >>> .q-btn__content {
		font-family: Myriad Pro Regular;
	}
	.create-ext-allocation .q-card__section:nth-of-type(2) {
		bottom: 10px;
		left: 16px;   
		padding: 0;
		position: absolute;
		right: 16px;
		top: 160px;
	}
	.create-ext-allocation .details-container {
		padding-left: 0;
		padding-right: 0;
	}
	.create-ext-allocation .details-container > .details-field-container:first-of-type {
		padding-top: 0;
	}
	.create-ext-allocation .details-field-container .q-checkbox {
		margin-right: 40px;
	}
	.create-ext-allocation .details-field-container >>> .fs-container > section {
		width: auto!important;
	}

	.create-ext-allocation .details-field-container >>> .q-field__control,
	.create-ext-allocation .details-field-container >>> .q-field__append {
		height: 40px;
	}

	.create-ext-allocation .details-field-container >>> .notes,
	.create-ext-allocation .details-field-container >>> .notes .q-field__control {
		height: 100px;
	}
	 .create-ext-allocation .details-field-container >>> .notes textarea {
		height: 100px!important;
		max-height: 100px;
		min-height: 100px;
		padding: 8px 0 10px;
		resize: none;
	}
	.create-ext-allocation label.uneditable {
		color: #A5A5A5;
	}
	.create-ext-allocation .adjust-padr {
		padding-right: 40px;
	}
	.create-ext-allocation .open-letter {
		padding-top: 10px;
	}
	.create-ext-allocation .open-letter > label {
		font-weight: 600;
		padding-bottom: 10px;
	}
	.create-ext-small-modal .q-card{
		max-width: 360px;
		width: 360px;
	}
	.create-ext-small-modal .q-card__section {
		padding: 25px 25px 0;
	}
	.create-ext-small-modal span {
		color: #41474F;
	}
	.create-ext-small-modal .title {
		font-size: 17px;
		padding-bottom: 15px;
	}
	.create-ext-small-modal .q-card__actions {
		padding: 25px 25px 30px;
	}
	.create-ext-small-modal .filter-button {
		margin: 0;
	}
	.create-ext-small-modal .q-field {
		width: 100%;
	}
	.create-ext-small-modal .filter-button:first-of-type {
		margin-right: 10px;
	}
	@media (max-width: 768px) and (max-height: 1024px) {
		.create-ext-allocation .q-card__section:nth-of-type(2) {
			top: 195px;
		}
	}
</style>
