<template>
  <div class="contact-details">
    <div class="flex-container page__heading q-my-sm q-ml-lg">
      <div class="col-lg-10 col-md-8 col-sm-12 col-xs-12 page__header">
        <span v-if="!isCreateMode">{{data.contactName}}</span>
        <span v-if="isCreateMode">Create New Contact</span>
        <q-icon class="icon-delete red" color="primary" name="delete" @click="dialog.deleteContact = true" v-if="isEditMode && !isCreateMode" />
      </div>
      <div class="col">
        <div class="float-right q-mr-md">
          <q-btn color="primary" no-caps class="filter-button float-left" rounded label="Save" v-if="isEditMode"  @click="saveContact" />
          <q-btn color="primary" no-caps class="filter-button float-left" rounded label="Edit"  v-if="!isEditMode" @click="isEditMode=true" />
          <q-btn color="primary" no-caps class="filter-button float-left mleft15 cancel-btn" rounded label="Cancel" v-if="isEditMode"  @click="cancelContact" />
          <q-btn color="primary" no-caps class="filter-button float-left mleft15 cancel-btn" rounded label="Back"   v-if="!isEditMode" @click="backToContact" />
        </div>
      </div>
    </div>
    <div class="tab-container">
      <q-card>
        <!--start tabs -->
        <q-tabs 
          v-model="tab" 
          align="left">
          <q-tab name="details" label="Details" />
          <q-tab name="links" label="Links" />
        </q-tabs>
        <!--end tabs -->
        <q-separator />
        <!--start tab panels-->
        <q-tab-panels v-model="tab">
          <q-tab-panel name="details">
            <q-form ref="contactDetailsForm">
              <div class="details-header">Contact</div>
              <div class="details-container adjust-bottom row">
                <div class="col-lg-3 col-md-6 col-sm-8 col-xs-12">
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Contact Group</label>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <label class="data-display" v-if="!isEditMode">
                        {{ getOptionLabel(data.type, 'id', 'value', options.contactGroup) }}
                      </label>
                      <field-select
                        valueKey="id"
                        labelKey="value"
                        v-show="isEditMode"
                        :value.sync="data.type"
                        :options="options.contactGroup"
                      />
                    </div>
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Contact Type<span class="red" v-if="isEditMode">*</span></label>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <label class="data-display" v-if="!isEditMode">
                        {{ getOptionLabel(data.contactType, 'id', 'value', options.contactType) }}
                      </label>
                      <field-select
                        valueKey="id"
                        labelKey="value"
                        v-show="isEditMode"
                        :value.sync="data.contactType"
                        :options="options.contactType"
                      />
                    </div>
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">
                      Contact Name<span class="red" v-if="isEditMode">*</span>
                    </label>
                    <label class="data-display" v-if="!isEditMode">{{data.contactName}}</label>
                    <q-input 
                      square
                      outlined 
                      v-if="isEditMode"
                      class="col-xs-12" 
                      v-model="data.contactName" 
                      :rules="[val => !!val || 'Field is required']"
                      placeholder="Type here" />
                  </div>
                </div>
              </div>
              <div class="details-header">Primary Contact</div>
              <div class="details-container row" :class="{'adjust-bottom' : !isEditMode}">
                <div class="col-lg-3 col-md-6 col-sm-8 col-xs-12">
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Salutation</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.salutation}}
                    </label>
                    <q-input 
                      v-if="isEditMode"
                      class="col-xs-12"
                      square 
                      outlined v-model="data.salutation" 
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">
                      First Name<span class="red" v-if="isEditMode">*</span>
                    </label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.firstName}}
                    </label>
                    <q-input 
                      square
                      outlined
                      class="col-xs-12" 
                      v-if="isEditMode"
                      v-model="data.firstName" 
                      :rules="[val => !!val || 'Field is required']" 
                      placeholder="Type here" />
                  </div>
                  <div 
                    class="details-field-container row" 
                    :class="{'adjust-top' : isEditMode}">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">
                      Surname<span class="red" v-if="isEditMode">*</span>
                    </label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.surName}}
                    </label>
                    <q-input
                      square 
                      outlined 
                      class="col-xs-12" 
                      v-if="isEditMode"
                      v-model="data.surName"
                      :rules="[val => !!val || 'Field is required']" 
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row"
                    :class="{'adjust-top' : isEditMode}">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Title</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.title}}
                    </label>
                    <q-input 
                      class="col-xs-12" 
                      v-if="isEditMode"
                      square
                      outlined 
                      v-model="data.title" 
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">ABN</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.abn}}
                    </label>
                    <q-input 
                      class="col-xs-12" 
                      v-if="isEditMode"
                      placeholder="Type here"
                      square 
                      outlined 
                      v-model="data.abn" 
                      :disable="data.noABN" />
                    <q-checkbox 
                      color="green"
                      v-if="isEditMode"
                      v-model="data.noABN" 
                      label="Not applicable" />
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">GST Registration</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{ getOptionLabel(data.gst, 'id', 'value', options.gst) }}
                    </label>
                    <div class="col-xs-12">
                      <field-select
                        valueKey="id"
                        labelKey="value"
                        v-show="isEditMode"
                        :options="options.gst"
                        :value.sync="data.gst"
                      />
                    </div>
                  </div>
                  <div class="details-field-container row" 
                    v-if="data.gst === '1' && isEditMode">
                    <label class="col-xs-12 sub-label">
                      If registered<span class="red">*</span>
                    </label>
                    <q-input 
                      class="col-xs-12"
                      square 
                      outlined 
                      :rules="[val => !!val || 'Field is required']" 
                      v-model="data.gstNote"
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row"
                    :class="{'adjust-top' : data.gst === '1' && isEditMode }">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">
                      Email<span class="red" v-if="isEditMode">*</span>
                    </label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.email}}
                    </label>
                    <q-input 
                      square
                      outlined
                      type="email"
                      class="col-xs-12" 
                      v-if="isEditMode"
                      :rules="emailRules"  
                      v-model="data.email" 
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row"
                    :class="{'adjust-top' : isEditMode}">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Work Phone</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.workPhone}}
                    </label>
                    <q-input 
                      square
                      outlined 
                      class="col-xs-12" 
                      v-if="isEditMode"
                      :rules="numberRules"
                      v-model="data.workPhone" 
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row"
                    :class="{'adjust-top' : isEditMode}">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Home Phone</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.homePhone}}
                    </label>
                    <q-input 
                      class="col-xs-12" 
                      v-if="isEditMode"
                      :rules="numberRules"
                      square
                      outlined 
                      v-model="data.homePhone" 
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row"
                    :class="{'adjust-top' : isEditMode}">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Mobile Phone</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.mobilePhone}}
                    </label>
                    <q-input 
                      square
                      outlined 
                      class="col-xs-12" 
                      v-if="isEditMode"
                      :rules="numberRules"
                      v-model="data.mobilePhone" 
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row"
                    :class="{'adjust-top' : isEditMode}">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Fax</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.fax}}
                    </label>
                    <q-input class="col-xs-12"
                      square 
                      outlined 
                      v-if="isEditMode"
                      v-model="data.fax" 
                      :rules="numberRules"
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row"
                    :class="{'adjust-top' : isEditMode}">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Preferred Contact</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{ getOptionLabel(data.preferredContact, 'id', 'value', options.preferredContact) }}
                    </label>
                    <div class="col-xs-12">
                      <field-select
                        valueKey="id"
                        labelKey="value"
                        v-show="isEditMode"
                        :value.sync="data.preferredContact"
                        :options="options.preferredContact"
                      />
                    </div>
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Notes</label>
                    <q-input 
                      square
                      outlined 
                      type="textarea" 
                      v-model="data.notes" 
                      :disable="!isEditMode"
                      :autogrow="!isEditMode"
                      class="col-xs-12 notes"  
                      placeholder="Type here" />
                  </div>
                </div>
              </div>
              <div class="details-header">Site Address</div>
              <div class="details-container row">
                <div class="col-lg-3 col-md-6 col-sm-8 col-xs-12">
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Street Address</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.site.address}}
                    </label>
                    <q-input 
                      square
                      outlined 
                      class="col-xs-12" 
                      v-if="isEditMode"
                      v-model="data.site.address" 
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Suburb</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.site.suburb}}
                    </label>
                    <q-input 
                      square
                      outlined 
                      class="col-xs-12" 
                      v-if="isEditMode"
                      v-model="data.site.suburb" 
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">State</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.site.state}}
                    </label>
                    <q-input
                      square 
                      outlined 
                      class="col-xs-12" 
                      v-if="isEditMode"
                      v-model="data.site.state" 
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Postcode</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.site.postcode}}
                    </label>
                    <q-input 
                      square
                      outlined 
                      class="col-xs-12" 
                      v-if="isEditMode"
                      v-model="data.site.postcode" 
                      placeholder="Type here" />
                  </div>
                </div>
              </div>
              <div class="details-header">Postal address</div>
              <div class="details-container row">
                <div class="col-lg-3 col-md-6 col-sm-8 col-xs-12">
                  <div class="details-field-container row" v-if="isEditMode">
                    <q-checkbox 
                      color="green"
                      v-model="copySiteAddress" 
                      v-on:click.native="populatePostal" 
                      label="Same as site address" />
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Mailing Name</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.postal.mailingName}}
                    </label>
                    <q-input 
                      square
                      outlined 
                      class="col-xs-12" 
                      v-if="isEditMode"
                      v-model="data.postal.mailingName" 
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Postal Address</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.postal.address}}
                    </label>
                    <q-input 
                      square
                      outlined 
                      class="col-xs-12"
                      v-if="isEditMode" 
                      v-model="data.postal.address" 
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Suburb</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.postal.suburb}}
                    </label>
                    <q-input 
                      square
                      outlined 
                      class="col-xs-12" 
                      v-if="isEditMode"
                      v-model="data.postal.suburb" 
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">State</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.postal.state}}
                    </label>
                    <q-input 
                      square
                      outlined 
                      class="col-xs-12" 
                      v-if="isEditMode"
                      v-model="data.postal.state" 
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Postcode</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.postal.postcode}}
                    </label>
                    <q-input 
                      square
                      outlined 
                      class="col-xs-12" 
                      v-if="isEditMode"
                      v-model="data.postal.postcode" 
                      placeholder="Type here" />
                  </div>
                </div>
              </div>
              <div class="details-header">Logo</div>
              <div class="details-container row">
                <div class="col-lg-3 col-md-6 col-sm-8 col-xs-12">
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">File</label>
                    <label 
                      class="data-display col-xs-12 text-underline" 
                      v-if="!isEditMode">
                      {{data.logo.fileName}}
                    </label>
                    <div class="float-left">
                      <input id="contactDetailsFileLogo" type="file" hidden />
                      <q-btn 
                        no-caps 
                        rounded 
                        color="primary" 
                        v-if="isEditMode" 
                        label="Choose File"
                        class="filter-button adjust-top" 
                        @click="attachFile">  
                      </q-btn>
                      <q-btn 
                        no-caps 
                        rounded 
                        color="primary" 
                        v-if="!isEditMode" 
                        label="Download"
                        class="filter-button adjust-top">  
                      </q-btn>
                    </div>
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12" :class="{'sub-label' : !isEditMode }">Caption</label>
                    <label class="data-display" v-if="!isEditMode">
                      {{data.caption}}
                    </label>
                    <q-input
                      square 
                      outlined 
                      class="col-xs-12"
                      v-if="isEditMode" 
                      v-model="data.caption" 
                      placeholder="Type here" />
                  </div>
                </div>
              </div>
              <div class="details-header" v-if="data.contactType === '2' && isEditMode">Email Updates</div>
              <div class="details-container row" v-if="data.contactType === '2' && isEditMode">
                <div class="col-lg-3 col-md-6 col-sm-8 col-xs-12">
                  <div class="details-field-container row">
                    <label class="col-xs-12">Status Notifications</label>
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12 sub-label">Enquiries</label>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <field-select
                        valueKey="id"
                        labelKey="value"
                        :value.sync="data.euEnquiries"
                        :options="options.default"
                      />
                    </div>
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12 sub-label">Jobs</label>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <field-select
                        valueKey="id"
                        labelKey="value"
                        :value.sync="data.euJobs"
                        :options="options.default"
                      />
                    </div>
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12 sub-label">Closed</label>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <field-select
                        valueKey="id"
                        labelKey="value"
                        :value.sync="data.euClosed"
                        :options="options.default"
                      />
                    </div>
                  </div>
                  <div class="details-field-container add-top row">
                    <label class="col-xs-12">Frequency</label>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                      <field-select
                        valueKey="id"
                        labelKey="value"
                        :value.sync="data.euFrequency"
                        :options="options.default"
                      />
                    </div>
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12">Additional Email Account</label>
                    <q-input 
                      square
                      outlined 
                      class="col-xs-12" 
                      v-model="data.addEmailAcc" 
                      placeholder="Type here" />
                    <q-checkbox 
                      color="green"
                      v-model="data.setPrimaryEmail" 
                      label="Use as primary" />
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12">Fax Number</label>
                    <q-input 
                      square
                      outlined 
                      class="col-xs-12" 
                      v-model="data.faxNo" 
                      placeholder="Type here" />
                    <q-checkbox 
                      color="green"
                      v-model="data.setPrimaryFax" 
                      label="Use as primary" />
                  </div>
                </div>
              </div>
            </q-form>
          </q-tab-panel>
          <q-tab-panel name="links">
            <div v-if="linkList">
              <div class="row table-heading-container">
                <div class="col-md-6 col-sm-6 col-xs-6 q-mb-lg"></div>
                <div class="col-md-6 col-sm-6 col-xs-6">
                  <q-btn icon="add_circle_outline" class="float-right download-icon" @click="dialog.addLink = true">
                    <q-dialog square v-model="dialog.addLink">
                      <q-card class="filter-popup fixed">
                        <q-card-section class="q-pt-lg q-pl-lg">
                          <span>Add Link</span>
                        </q-card-section>
                        <div class="filter-popup-container">
                          <div class="details-container row">
                            <div class="col-xs-12">
                              <div class="details-field-container row">
                                <div class="col-xs-12">
                                  <field-select
                                    valueKey="id"
                                    labelKey="value"
                                    :value.sync="newLink"
                                    :options="options.links"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <q-card-actions align="left">
                          <q-btn color="primary" no-caps class="q-ma-md" rounded label="Save" />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>
                  </q-btn>
                </div>
              </div>
              <div class="row table-container">
                <q-table 
                  id="tableData" 
                  :data="links.data" 
                  row-key="claimTable" 
                  :grid="$q.screen.xs" 
                  card-class="table-grid" 
                  :columns="links.columns" 
                  class="page__table col-xs-12 col-md-12"
                  ref="linksTable">
                  <template v-slot:body="props">
                    <q-td 
                      @click.native="linkDetails(props.row)"
                      class="cursor-pointer" 
                      key="name">
                      {{props.row.name}}
                    </q-td>
                    <q-td key="type">{{props.row.type}}</q-td>
                    <q-td key="added">{{props.row.added}}</q-td>
                    <q-td key="addedBy">{{props.row.addedBy}}</q-td>
                    <q-td key="status">{{ getOptionLabel(props.row.status, 'id', 'value', options.linkStatus) }}</q-td>
                    <q-td key="history">{{props.row.history}}</q-td>
                    <q-td key="action" class="red">
                      <span class="cursor-pointer" @click="unlink">Unlink</span>
                    </q-td>
                  </template>
                  <template v-slot:item="props">
                    <div class="q-pa-xs col-xs-12">
                      <q-card>
                        <q-card-section class="row cursor-pointer"  @click.native="linkDetails(props.row)">
                          <span class="grid-label col-xs-4">Contact Name:</span> 
                          <div class="col-xs-8">
                            <strong>{{ props.row.name }}</strong>
                          </div>
                          <span class="grid-label col-xs-4">Contact Type:</span> 
                          <div class="col-xs-8">
                            {{ props.row.type }}
                          </div>
                          <span class="grid-label col-xs-4">Agent:</span> 
                          <div class="col-xs-8">
                            {{ props.row.added }}
                          </div>
                          <span class="grid-label col-xs-4">Added By:</span> 
                          <div class="col-xs-8">
                            {{ props.row.addedBy }}
                          </div>
                          <span class="grid-label col-xs-4">Status:</span> 
                          <div class="col-xs-8">
                            {{ props.row.status }}
                          </div>
                          <span class="grid-label col-xs-4">History:</span> 
                          <div class="col-xs-8">
                            {{ props.row.history }}
                          </div>
                        </q-card-section>
                        <q-separator />
                        <q-card-section>
                          <span class="cursor-pointer red" @click="unlink">Unlink</span>
                        </q-card-section>
                      </q-card>
                    </div>
                  </template>
                </q-table>
              </div>
            </div>
            <div v-if="!linkList" class="mtop40">
              <div class="details-container row">
                <div class="col-lg-3 col-md-6 col-sm-8 col-xs-12">
                  <div class="details-field-container row">
                    <label class="col-xs-12">Agent</label>
                    <div class="col-xs-12">
                      <label class="data-display">{{linkData.name}}</label>
                    </div>
                  </div>
                    <div class="details-field-container row">
                    <label class="col-xs-12">Assessor</label>
                    <div class="col-xs-12">
                      <label class="data-display">{{linkData.addedBy}}</label>
                    </div>
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12">Status</label>
                    <div class="col-xs-12">
                      <field-select
                        valueKey="id"
                        labelKey="value"
                        :value.sync="linkData.status"
                        :options="options.linkStatus"
                      />
                    </div>
                  </div>
                  <div class="details-field-container row">
                    <label class="col-xs-12">History</label>
                    <q-input 
                      square
                      outlined 
                      type="textarea" 
                      class="col-xs-12 notes link-notes"  
                      v-model="linkData.historyNote" 
                      placeholder="Type here" />
                  </div>
                  <div class="details-field-container row">
                    <div class="float-left">
                      <q-btn color="primary" no-caps class="filter-button adjust-top" rounded label="Update" @click="updateLink"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
        <!--end tab panels -->
      </q-card>
    </div>
  <!-- Start of Dialog -->
    <!-- Delete Contact -->
    <q-dialog square v-model="dialog.deleteContact">
      <q-card class="filter-popup large-notification">
        <q-card-section class="q-pt-lg q-pl-lg">
          <span>Are you sure you want to delete contact?</span>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="primary" no-caps class="q-ma-md" rounded label="Yes" @click="deleteContact"/>
          <q-btn color="primary" no-caps class="q-ma-md cancel-btn" rounded label="Cancel" @click="dialog.deleteContact = false"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog square v-model="dialog.contactDeleted">
      <q-card class="filter-popup large-notification">
        <q-card-section class="q-pt-lg q-pl-lg" align="center">
          <span>Contact Deleted</span>
        </q-card-section>
         <q-card-actions align="center"></q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Save Contact -->
    <q-dialog square v-model="dialog.saveContact">
      <q-card class="filter-popup large-notification">
        <q-card-section class="q-pt-lg q-pl-lg" align="center">
          <span>{{data.contactName}} Saved</span>
        </q-card-section>
         <q-card-actions align="center"></q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Unlink Contacts -->
    <q-dialog square v-model="dialog.unlink">
      <q-card class="filter-popup large-notification">
        <q-card-section class="q-pt-lg q-pl-lg">
          <span>Are you sure you want to unlink?</span>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="primary" no-caps class="q-ma-md" rounded label="Yes" @click="confirmUnlink"/>
          <q-btn color="primary" no-caps class="q-ma-md cancel-btn" rounded label="Cancel" @click="dialog.unlink = false"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog square v-model="dialog.unlinkSuccess">
      <q-card class="filter-popup large-notification">
        <q-card-section class="q-pt-lg q-pl-lg" align="center">
          <span>Unlink Success!</span>
        </q-card-section>
         <q-card-actions align="center"></q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog square v-model="dialog.updateLinkSuccess">
      <q-card class="filter-popup large-notification">
        <q-card-section class="q-pt-lg q-pl-lg" align="center">
          <span>Update Success!</span>
        </q-card-section>
         <q-card-actions align="center"></q-card-actions>
      </q-card>
    </q-dialog>
  <!-- End of Dialog -->
  </div>
</template>

<script src="../assets/js/contact-details.js" />


<style>
  @import '../assets/css/contacts.scss';
  @import '../../../shared/css/field-select.scss';
</style>
