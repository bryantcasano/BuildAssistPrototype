<template>
	<div class="claim-attachments">
		<add-attachments :success.sync="addedAttachment"/>
		<div>
			<div class="col-lg-11 col-md-12 col-sm-12 col-xs-12">
				<q-table 
					row-key="id" 
					virtual-scroll
					card-class="table-grid" 
					id="repositoryAttachmentTable" 
					ref="repositoryAttachmentTable" 
					:data="repoAttachment.data" 
					:columns="repoAttachment.columns" 
					class="page__table col-xs-12 col-md-12 nomargin_table"
					:rows-per-page-options="[25, 50, 100]"
					:pagination.sync="repoAttachment.pagination">
					<template v-slot:body="props">
						<q-tr :props="props"
							class="cursor-pointer"
							@click="toggleRow(props.row, $event)">
							<q-td class="ra-table-header">
								{{props.row.document}} <br /> [{{props.row.notes.length}} documents] 
							</q-td>
							<q-td class="ra-table-header">
								{{getOptionLabel(props.row.accessLevel, 'id', 'value', options.accessLevel)}}
							</q-td>
							<q-td class="ra-table-header"></q-td>
							<q-td class="ra-table-header"></q-td>
							<q-td class="ra-table-header"></q-td>
							<q-td class="ra-table-header"></q-td>
							<q-td class="ra-table-header"></q-td>
							<q-td class="ra-table-header">
								<q-icon 
									class="float-left" 
									:name="props.row.show ? 'img:statics/icons/expand-collapse.svg' : 'img:statics/icons/expand-plus.svg'" />
								<q-icon 
									class="float-left cursor-pointer"
									@click="galleryModal(props.row.notes)" 
									name="img:statics/icons/gallery.svg" />
								<q-icon 
									class="float-left cursor-pointer" 
									@click="deleteAttachment(props.row.id)"
									name="img:statics/icons/trash.svg" />
							</q-td>
						</q-tr>
						<template v-for="col in props.row.notes">
							<q-tr v-show="props.row.show">
								<q-td class="ra-table-body">
									<span>{{col.document}}</span>
								</q-td>
								<q-td class="ra-table-body">{{getOptionLabel(col.accessLevel, 'id', 'value', options.accessLevel)}}</q-td>
								<q-td class="ra-table-body">
									{{col.note}}
									<q-icon 
										name="create" 
										color="primary" 
										class="cursor-pointer" 
										style="font-size: 15px;" />
									<q-popup-edit content-class="custom-q-pop" 
										dense 
										buttons 
										persistent
										@save="setNotes(repoAttachment.data)"
										v-model="col.note">
										<q-input outlined type="textarea" v-model="col.note" dense autofocus/> 
									</q-popup-edit>
								</q-td>
								<q-td class="ra-table-body">{{col.fileSize}}</q-td>
								<q-td class="ra-table-body">{{col.createdOn}}</q-td>
								<q-td class="ra-table-body">{{col.createdBy}}</q-td>
								<q-td class="ra-table-body">{{getOptionLabel(col.status, 'id', 'value', options.status)}}</q-td>
								<q-td class="ra-table-body"></q-td>
							</q-tr>
						</template>
					</template>
				</q-table>
			</div>
		</div>
		<q-dialog 
			persistent
			v-model="dialog.deleteAttachment">
			<q-card class="filter-popup large-notification">
				<q-card-section class="q-pt-lg q-pl-lg">
					<span>Are you sure you want to delete attachment?</span>
				</q-card-section>
				<q-card-actions align="center">
				  <q-btn color="primary" no-caps class="q-ma-md no-shadow" rounded label="Yes" @click="confirmDeleteAttachment" />
				  <q-btn color="primary" no-caps class="q-ma-md no-shadow cancel-btn" rounded label="Cancel" @click="dialog.deleteAttachment = false" />
				</q-card-actions>
			</q-card>
		</q-dialog>
		<q-dialog 
			persistent
			v-model="dialog.gallery">
			<q-card class="claim-attachment-gallery">
				<q-card-section>
					<q-icon 
						name="close" 
						class="close-button"
						@click="closeGallery"/>
					<div class="row page__heading">
						<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pl-lg"> 
							Gallery
						</div>
					</div>
				</q-card-section>
				<q-card-section>
					<q-scroll-area class="filter-scroll">
						<div class="row table-container" v-show="!gallery.showDetails">
							<q-table 
								grid
								:data="gallery.data" 
								:columns="gallery.column" 
								:pagination.sync="gallery.pagination"
								id="tableData" 
								card-class="table-grid" 
								class="page__table col-xs-12 col-md-12"
								ref="dashboardTable">
								<template v-slot:item="galleryProps">
									<div class="cag-image-container col-lg-3 col-md-3 col-sm-6 col-xs-12 cursor-pointer">
										<q-card @click="galleryDetails(galleryProps.row)">
											<q-card-section class="row">
												<q-img :src="galleryProps.row.fileUrl" :ratio="16/9" />
											</q-card-section>
										</q-card>
									</div>
								</template>
							</q-table>
						</div>
						<div class="row cag-details" v-show="gallery.showDetails">
							<div class="col-lg-7 col-md-7 col-sm-7">
								<q-img :src="gallery.details.fileUrl" :ratio="1" />    
							</div>
							<div class="col-lg-5 col-md-5 col-sm-5">
								<div class="details-container row">
									<div class="details-field-container col-lg-12 col-md-12 col-sm-12">
										<label class="col-lg-12 col-md-12 col-sm-12">Description</label>
										<div class="col-lg-12 col-md-12 col-sm-12">
											<q-input 
												outlined 
												type="textarea" 
												v-model="gallery.details.note" 
												placeholder="Please type"
												class="col-xs-12 ext-description"/>
										</div>
										<div class="col-lg-12 col-md-12 col-sm-12">
											<q-btn
												rounded
												no-caps
												label="Save"
												color="primary"
												:ripple="false"
												@click="saveDetails"
												class="filter-button float-left" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</q-scroll-area>
				</q-card-section>
			</q-card>
		</q-dialog>
	</div>
</template>

<script src="../assets/js/attachments-tab.js" />

<style>
	@import '../assets/css/attachments-tab.scss';
</style>
