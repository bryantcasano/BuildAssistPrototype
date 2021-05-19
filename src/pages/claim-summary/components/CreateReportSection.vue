<template>
    <q-dialog
        persistent
        full-height
        v-model="dialogModel">
        <q-card class="create-report">
             <q-form style="height: 100%;"
                ref="createReportForm">
                <q-card-section>
                    <q-icon 
                        name="close" 
                        class="close-button"
                        @click="closeReport"/>
                    <div class="row page__heading">
                        <div class="col-lg-6 col-md-4 col-sm-12 col-xs-12"> 
                            Report Template
                        </div>
                        <div class="col">
                            <div class="float-right">
                                <q-btn color="primary" no-caps class="filter-button float-left" rounded label="Save Details" />
                                <q-btn color="primary" no-caps class="filter-button float-left" rounded label="Preview Report" />
                                <q-btn color="primary" no-caps class="filter-button float-left" rounded label="Generate Report"/>
                                <q-btn color="primary" no-caps class="filter-button float-left" rounded label="Send Report" />
                            </div>
                        </div>
                    </div>
                    <span class="report-template-header-note">
                        The number for this report has been used in another report that has already been generated. You may correct this by changing the number in the Report tab and then saving your changes.
                    </span>
                    <q-tabs
                        align="justify"
                        v-model="reportTab"
                        class="report-table-tab"
                        indicator-color="transparent">
                        <q-tab name="Report" label="Report" />
                        <q-tab name="Address Summary" label="Address Summary" />
                        <q-tab name="Reserves Summary" label="Reserves Summary" />
                        <q-tab name="Scope of Work" label="Scope of Work" />
                        <q-tab name="Photos" label="Photos" />
                        <q-tab name="Attachments" label="Attachments" />
                        <q-tab name="Other Reports" label="Other Reports" />
                    </q-tabs>
                </q-card-section>
                <q-card-section>
                    <q-scroll-area class="filter-scroll">
                        <q-tab-panels v-model="reportTab">
                            <!-- Reports tab -->
                            <q-tab-panel name="Report" class="row tab-container">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="details-container adjust-pad-left col-xs-12 row">
                                        <div class="details-field-container col-xs-12 row">
                                            <label class="col-xs-12">Report Type</label>
                                            <div class="col-xs-12">
                                                <field-select
                                                    valueKey="id"
                                                    labelKey="value"
                                                    :options="options.default"
                                                    :value.sync="data.reportType"
                                                />
                                            </div>
                                        </div>
                                        <div class="details-field-container col-xs-12 row">
                                            <label class="col-xs-12">Report Title</label>
                                            <div class="col-xs-12">
                                                <q-input 
                                                    outlined dense square v-model="data.reportTitle" 
                                                    placeholder="Please type here" />
                                            </div>
                                        </div>
                                        <div class="details-field-container col-xs-12 row">
                                            <label class="col-xs-12">Report Date</label>
                                            <div class="col-xs-12">
                                                <q-input 
                                                    outlined 
                                                    dense
                                                    square
                                                    mask="date"
                                                    placeholder="Type here" 
                                                    v-model="data.reportDate"
                                                    :rules="['date']">
                                                    <template v-slot:append>
                                                        <q-icon name="keyboard_arrow_down" class="cursor-pointer">
                                                            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                                                <q-date v-model="data.reportDate" @input="() => $refs.qDateProxy.hide()" />
                                                            </q-popup-proxy>
                                                        </q-icon>
                                                    </template>
                                                </q-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="details-container adjust-pad-right col-xs-12 row">
                                        <div class="details-field-container col-xs-12 row">
                                            <label class="col-xs-12">PDF Template</label>
                                            <div class="col-xs-12">
                                                <field-select
                                                    valueKey="id"
                                                    labelKey="value"
                                                    :options="options.default"
                                                    :value.sync="data.pdfTemplate"
                                                />
                                            </div>
                                        </div>                                       
                                    </div>
                                </div>
                                <div class="col-xs-12">
                                    <q-expansion-item
                                        expand-separator
                                        label="Auto-Numbering"
                                        v-model="toggle.autoNumbering">
                                        <div class="details-container col-xs-12 row">
                                            <div class="details-field-container col-md-7 col-sm-12 row">
                                               <label class="col-sm-7 col-xs-12">Use Auto-Numbering</label>
                                               <div class="col-sm-5 col-xs-12">
                                                    <q-checkbox 
                                                        color="green"
                                                        v-model="data.autoNumbering" />
                                                </div>
                                            </div>
                                            <div class="details-field-container col-md-7 col-sm-12 row">
                                               <label class="col-sm-7 col-xs-12">Last Number Sent</label>
                                               <label class="col-sm-5 col-xs-12">N/A</label>
                                            </div>
                                            <div class="details-field-container col-md-7 col-sm-12 row">
                                               <label class="col-sm-7 col-xs-12">Highest Number Sent</label>
                                               <label class="col-sm-5 col-xs-12">0</label>
                                            </div>
                                            <div class="details-field-container col-md-7 col-sm-12 row">
                                               <label class="col-sm-7 col-xs-12">Total Reports Sent</label>
                                               <label class="col-sm-5 col-xs-12">0</label>
                                            </div>
                                            <div class="details-field-container col-md-7 col-sm-12 row">
                                               <label class="col-sm-7 col-xs-12">This Report</label>
                                               <label class="col-sm-5 col-xs-12">1</label>
                                            </div>
                                            <div class="details-field-container col-md-7 col-sm-12 row">
                                               <label class="col-sm-7 col-xs-12">Change this Report to</label>
                                               <div class="col-sm-5 col-xs-12">
                                                    <q-input 
                                                        dense
                                                        square
                                                        outlined v-model="data.changeReportTo" 
                                                        placeholder="Please type here" />
                                               </div>
                                            </div>
                                        </div>
                                    </q-expansion-item>
                                </div>
                                <div class="col-xs-12">
                                    <q-expansion-item
                                        expand-separator
                                        label="Executive Summary"
                                        v-model="toggle.executiveSummary">
                                        <div class="details-container col-xs-12 row">
                                            <div class="details-field-container col-xs-12 row">
                                                <q-input 
                                                    outlined
                                                    square
                                                    dense 
                                                    type="textarea" 
                                                    v-model="data.executiveSummary" 
                                                    placeholder="Please type here"
                                                    class="col-xs-12 notes" />
                                            </div>
                                        </div>
                                    </q-expansion-item>
                                </div>
                                <div class="col-xs-12">
                                    <q-expansion-item
                                        expand-separator
                                        label="Description of Risk"
                                        v-model="toggle.descriptionOfRisk">
                                        <div class="row">
                                            <div class="col-lg-4 col-md-6 col-sm-12 padr25">
                                                <div class="details-container row bi-adjust-pad">
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-lg-12">Property Occupancy</label>
                                                        <div class="col-lg-12">
                                                            <field-select
                                                                valueKey="id"
                                                                labelKey="value"
                                                                :options="options.default"
                                                                :value.sync="data.propertyOccupancy"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-lg-12">Construction Type</label>
                                                        <div class="col-lg-12">
                                                            <field-select
                                                                valueKey="id"
                                                                labelKey="value"
                                                                :options="options.default"
                                                                :value.sync="data.constructionType"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-lg-12">Age of Property</label>
                                                        <div class="col-lg-12">
                                                            <q-input 
                                                                outlined square dense v-model="data.ageOfProperty" 
                                                                placeholder="Please type here" />
                                                        </div>
                                                    </div>
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-lg-12">Jaes (or other) Appointed?</label>
                                                        <div class="col-lg-12">
                                                            <field-select
                                                                valueKey="id"
                                                                labelKey="value"
                                                                :options="options.default"
                                                                :value.sync="data.jaes"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-lg-12">Dwelling Habitable</label>
                                                        <div class="col-lg-12">
                                                            <field-select
                                                                valueKey="id"
                                                                labelKey="value"
                                                                :options="options.default"
                                                                :value.sync="data.dwellingHabitable"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-6 col-sm-12 padr25 bi-adjust-pad">
                                                <div class="details-container row bi-adjust-pad">
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-lg-12">Design Type</label>
                                                        <div class="col-lg-12">
                                                            <field-select
                                                                valueKey="id"
                                                                labelKey="value"
                                                                :options="options.default"
                                                                :value.sync="data.designType"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-lg-12">Roof Type</label>
                                                        <div class="col-lg-12">
                                                            <field-select
                                                                valueKey="id"
                                                                labelKey="value"
                                                                :options="options.default"
                                                                :value.sync="data.roofType"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-lg-12">Time of Occupancy</label>
                                                        <div class="col-lg-12">
                                                            <q-input 
                                                                outlined square dense v-model="data.timeOfOccupancy" 
                                                                placeholder="Please type here" />
                                                        </div>
                                                    </div>
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-lg-12">Asbestos Possible</label>
                                                        <div class="col-lg-12">
                                                            <field-select
                                                                valueKey="id"
                                                                labelKey="value"
                                                                :options="options.default"
                                                                :value.sync="data.asbestosPossible"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-lg-12">Claim History</label>
                                                        <div class="col-lg-12">
                                                            <field-select
                                                                valueKey="id"
                                                                labelKey="value"
                                                                :options="options.default"
                                                                :value.sync="data.claimHistory"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-6 col-sm-12 bi-adjust-pad">
                                                <div class="details-container row">
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-lg-12">Building Type</label>
                                                        <div class="col-lg-12">
                                                            <field-select
                                                                valueKey="id"
                                                                labelKey="value"
                                                                :options="options.default"
                                                                :value.sync="data.buildingType"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-lg-12">Square Meters</label>
                                                        <div class="col-lg-12">
                                                            <q-input 
                                                                outlined square dense v-model="data.squareMeters" 
                                                                placeholder="Please type here" />
                                                        </div>
                                                    </div>
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-lg-12">Property Condition</label>
                                                        <div class="col-lg-12">
                                                            <field-select
                                                                valueKey="id"
                                                                labelKey="value"
                                                                :options="options.default"
                                                                :value.sync="data.propertyCondition"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-lg-12">Asbestos Testing Required</label>
                                                        <div class="col-lg-12">
                                                            <field-select
                                                                valueKey="id"
                                                                labelKey="value"
                                                                :options="options.default"
                                                                :value.sync="data.asbestosTestingRequired"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </q-expansion-item>
                                </div>
                                <div class="col-xs-12">
                                    <q-expansion-item
                                        expand-separator
                                        label="Claim History Comments"
                                        v-model="toggle.claimHistoryComments">
                                        <div class="details-container col-xs-12 row">
                                            <div class="details-field-container col-xs-12 row">
                                                <q-input 
                                                    outlined 
                                                    square
                                                    dense
                                                    type="textarea" 
                                                    v-model="data.claimHistoryComments" 
                                                    placeholder="Please type here"
                                                    class="col-xs-12 notes" />
                                            </div>
                                        </div>
                                    </q-expansion-item>
                                </div>
                                <div class="col-xs-12">
                                    <q-expansion-item
                                        expand-separator
                                        label="Bulgary Information"
                                        v-model="toggle.bulgaryInformation">
                                        <div class="row">
                                            <div class="col-lg-4 col-md-6 col-sm-12 padr25">
                                                <div class="details-container row bi-adjust-pad">
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-xs-12">When did the last person leave the premises?</label>
                                                        <div class="col-xs-12">
                                                             <q-input 
                                                                outlined square dense v-model="data.biq1" 
                                                                placeholder="Please type here" />
                                                        </div>
                                                    </div>
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-xs-12">What was discovered?</label>
                                                        <div class="col-xs-12">
                                                             <q-input 
                                                                outlined square dense v-model="data.biq2" 
                                                                placeholder="Please type here" />
                                                        </div>
                                                    </div>
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-xs-12">Was the alarm set?</label>
                                                        <div class="col-xs-12">
                                                            <field-select
                                                                valueKey="id"
                                                                labelKey="value"
                                                                :options="options.default"
                                                                :value.sync="data.biq3"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-6 col-sm-12 padr25 bi-adjust-pad">
                                                <div class="details-container bi-adjust-pad row">
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-xs-12">Who discovered the loss/damage?</label>
                                                        <div class="col-xs-12">
                                                             <q-input 
                                                                outlined square dense v-model="data.biq4" 
                                                                placeholder="Please type here" />
                                                        </div>
                                                    </div>
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-xs-12">Evidence of entry/exit points?</label>
                                                        <div class="col-xs-12">
                                                             <q-input 
                                                                outlined square dense v-model="data.biq5" 
                                                                placeholder="Please type here" />
                                                        </div>
                                                    </div>
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-xs-12">Was the alarm monitored?</label>
                                                        <div class="col-xs-12">
                                                            <field-select
                                                                valueKey="id"
                                                                labelKey="value"
                                                                :options="options.default"
                                                                :value.sync="data.biq6"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-6 col-sm-12 bi-adjust-pad">
                                                <div class="details-container row">
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-xs-12">When did they discovered the loss/damage?</label>
                                                        <div class="col-xs-12">
                                                             <q-input 
                                                                outlined square dense v-model="data.biq7" 
                                                                placeholder="Please type here" />
                                                        </div>
                                                    </div>
                                                    <div class="details-field-container col-xs-12">
                                                        <label class="col-xs-12">Is the permises alarmed?</label>
                                                        <div class="col-xs-12">
                                                            <field-select
                                                                valueKey="id"
                                                                labelKey="value"
                                                                :options="options.default"
                                                                :value.sync="data.biq8"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </q-expansion-item>
                                </div>
                                <div class="col-xs-12">
                                    <q-expansion-item
                                        expand-separator
                                        label="Initial Reserve Summary"
                                        v-model="toggle.initialReserveSummary">
                                        <div class="details-container col-xs-12 row">
                                            <div class="details-field-container col-xs-12 row">
                                                <q-input 
                                                    outlined square dense
                                                    type="textarea" 
                                                    v-model="data.initialReserveSummary" 
                                                    placeholder="Please type here"
                                                    class="col-xs-12 notes" />
                                            </div>
                                        </div>
                                    </q-expansion-item>
                                </div>
                            </q-tab-panel>

                            <!-- Address Summary tab -->
                            <q-tab-panel name="Address Summary" class="row tab-container">
                                <div class="col-xs-12 row">
                                    <div class="details-container col-xs-12 adjust-pad-left adjust-pad-right row">
                                        <div class="col-xs-12">
                                            <q-checkbox 
                                                color="green"
                                                v-model="data.addressSummary.includeCurrentReport" 
                                                label="Include Sync Address Summary Table in Current Report" />
                                        </div>
                                        <div class="row col-xs-12">
                                            <q-table 
                                                row-key="id" 
                                                virtual-scroll
                                                :data="crAddressSummary.data" 
                                                id="createReportAddressSummary" 
                                                :columns="crAddressSummary.columns" 
                                                :pagination.sync="crAddressSummary.pagination"
                                                class="page__table report__table col-xs-12 col-md-12"
                                                :rows-per-page-options="[25, 50, 100, 250]">
                                            </q-table>
                                        </div>
                                    </div>
                                </div>
                            </q-tab-panel>

                            <!-- Reserves Summary tab -->
                            <q-tab-panel name="Reserves Summary" class="row tab-container">
                                <div class="col-xs-12 row">
                                    <div class="details-container col-xs-12 adjust-pad-left adjust-pad-right row">
                                        <q-card flat bordered class="row col-md-7 col-sm-12 col-xs-12 rs-card">
                                            <q-card-section class="row col-xs-12">
                                                <div class="col-xs-6">Sums Insured</div>
                                                <div class="col-xs-3">Building: $0.00</div>
                                                <div class="col-xs-3">Contents: $0.00</div>
                                            </q-card-section>
                                        </q-card>
                                        <div class="row col-xs-12">
                                            <q-table 
                                                row-key="id" 
                                                virtual-scroll
                                                title="Reserve and Payment Summary"
                                                :data="crReservesSummary.data" 
                                                id="createReportReservesSummary" 
                                                :columns="crReservesSummary.columns" 
                                                :pagination.sync="crReservesSummary.pagination"
                                                class="page__table report__table col-xs-12 col-md-12"
                                                :rows-per-page-options="[25, 50, 100, 250]">
                                            </q-table>
                                        </div>
                                        <div class="col-xs-12">
                                            <q-checkbox 
                                                color="green"
                                                v-model="data.reservesSummary.includeCurrentReport" 
                                                label="Include In Current Report" />
                                        </div>
                                        <div class="col-xs-12">
                                            <q-checkbox 
                                                color="green"
                                                v-model="data.reservesSummary.includePreviousReport" 
                                                label="Include Previous Payments In Current Report" />
                                        </div>
                                    </div>
                                </div>
                            </q-tab-panel>

                            <!-- Scope of Work tab -->
                            <q-tab-panel name="Scope of Work" class="row tab-container">
                                <div class="col-xs-12">
                                    <div class="details-container adjust-pad-left adjust-pad-right row">
                                        <div class="details-field-container row col-md-6 col-xs-12">
                                            <div class="col-md-4 col-sm-4 col-xs-12">
                                                <q-checkbox 
                                                  color="green"
                                                  v-model="data.attachScope" 
                                                  label="Attach Scope" />
                                            </div>
                                            <div class="col-md-4 col-sm-4 col-xs-12">
                                                <q-checkbox 
                                                  color="green"
                                                  v-model="data.individualPricing" 
                                                  label="Individual Pricing" />
                                            </div>
                                            <div class="col-md-4 col-sm-4 col-xs-12">
                                                <q-checkbox 
                                                  color="green"
                                                  v-model="data.attachSummary" 
                                                  label="Attach Summary" />
                                            </div>
                                        </div>
                                        <div class="details-field-container col-md-6 col-xs-12">
                                            <q-input 
                                                outlined square dense
                                                bottom-slots
                                                v-model="data.scopeList" 
                                                placeholder="Please type here">
                                                <template v-slot:hint>
                                                    Note: Only locked estimates or variations are listed in the scope list.
                                                </template>
                                            </q-input>
                                        </div>
                                        <q-card flat bordered class="row col-xs-12 sow-card">
                                            <q-card-section class="row col-xs-12">
                                                <div class="details-field-container row col-md-6 col-xs-12 padr25">
                                                    <label class="col-sm-5 col-xs-12 bold">Send Report To</label>
                                                    <div class="col-sm-7 col-xs-12">
                                                        <field-select
                                                            valueKey="id"
                                                            labelKey="value"
                                                            :options="options.default"
                                                            :value.sync="data.sendReportTo"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="details-field-container row col-md-6 col-xs-12">
                                                    <label class="col-sm-5 col-xs-12 bold">Send Report Using</label>
                                                    <div class="col-sm-7 col-xs-12">
                                                        <field-select
                                                            valueKey="id"
                                                            labelKey="value"
                                                            :options="options.default"
                                                            :value.sync="data.sendReportUsing"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="details-field-container row col-md-6 col-xs-12 padr25">
                                                    <label class="col-sm-5 col-xs-12 bold">Claims Handler</label>
                                                    <div class="col-sm-7 col-xs-12">
                                                        <field-select
                                                            valueKey="id"
                                                            labelKey="value"
                                                            :options="options.default"
                                                            :value.sync="data.claimsHandler"
                                                        />
                                                    </div>
                                                </div>
                                                <div class="details-field-container row col-md-6 col-xs-12">
                                                    <label class="col-sm-5 col-xs-12 bold">Assessor</label>
                                                    <div class="col-sm-7 col-xs-12">
                                                        <field-select
                                                            valueKey="id"
                                                            labelKey="value"
                                                            :options="options.default"
                                                            :value.sync="data.assessor"
                                                        />
                                                    </div>
                                                </div>
                                            </q-card-section>
                                            <q-card-actions class="row col-xs-12 sow-checklist">
                                                <div class="details-field-container row col-xs-12">
                                                    <div class="col-md-4 col-sm-6 col-xs-12">
                                                        <q-checkbox 
                                                            color="green"
                                                            v-model="data.separateQuantities" 
                                                            label="Use Separate Quantities" />
                                                    </div>
                                                    <div class="col-md-4 col-sm-6 col-xs-12">
                                                        <q-checkbox 
                                                            color="green"
                                                            v-model="data.showPreliminaries" 
                                                            label="Show Preliminaries" />
                                                    </div>
                                                    <div class="col-md-4 col-sm-6 col-xs-12">
                                                        <q-checkbox 
                                                            color="green"
                                                            v-model="data.showGrandTotal" 
                                                            label="Show Grand Total" />
                                                    </div>
                                                    <div class="col-md-4 col-sm-6 col-xs-12">
                                                        <q-checkbox 
                                                            color="green"
                                                            v-model="data.showAllPrices" 
                                                            label="Show All Prices" />
                                                    </div>
                                                    <div class="col-md-4 col-sm-6 col-xs-12">
                                                        <q-checkbox 
                                                            color="green"
                                                            v-model="data.showTenderResults" 
                                                            label="Show Tender Results" />
                                                    </div>
                                                </div>
                                            </q-card-actions>
                                        </q-card>
                                        <div class="col-md-6 col-xs-12 padr25">
                                            <q-expansion-item
                                                class="sow-expansion"
                                                v-model="toggle.operations">
                                                <template v-slot:header>
                                                    <q-item-section>
                                                        <q-checkbox 
                                                            color="green"
                                                            v-model="data.activateOperations" 
                                                            label="Operations" />
                                                    </q-item-section>
                                                </template>
                                                <div class="details-container col-xs-12 row">
                                                    <q-option-group
                                                        color="primary"
                                                        v-model="data.operations"
                                                        :options="options.defaultShort"
                                                        :disable="!data.activateOperations" />
                                                </div>
                                            </q-expansion-item>
                                            <q-expansion-item
                                                class="sow-expansion"
                                                v-model="toggle.tenderRequirements">
                                                <template v-slot:header>
                                                    <q-item-section>
                                                        <q-checkbox 
                                                            color="green"
                                                            v-model="data.activateTenderRequirements" 
                                                            label="Tender Requirements" />
                                                    </q-item-section>
                                                </template>
                                                <div class="details-container col-xs-12 row">
                                                    <q-option-group
                                                        color="green"
                                                        type="checkbox"
                                                        v-model="data.tenderRequirements"
                                                        :options="options.defaultShort"
                                                        :disable="!data.activateTenderRequirements" />
                                                </div>
                                            </q-expansion-item>
                                            <q-expansion-item
                                                class="sow-expansion"
                                                v-model="toggle.asbestosInformation">
                                                <template v-slot:header>
                                                    <q-item-section>
                                                        <q-checkbox 
                                                            color="green"
                                                            v-model="data.activateAsbestosInformation" 
                                                            label="Abestos Information" />
                                                    </q-item-section>
                                                </template>
                                            </q-expansion-item>
                                        </div>
                                        <div class="col-md-6 col-xs-12">
                                            <q-expansion-item
                                                class="sow-expansion"
                                                v-model="toggle.furtherDevelopments">
                                                <template v-slot:header>
                                                    <q-item-section>
                                                        <q-checkbox 
                                                            color="green"
                                                            v-model="data.activateFurtherDevelopments" 
                                                            label="Further Developments" />
                                                    </q-item-section>
                                                </template>
                                                <div class="details-container col-xs-12 row">
                                                    <q-option-group
                                                        color="primary"
                                                        v-model="data.furtherDevelopments"
                                                        :options="options.defaultLong"
                                                        :disable="!data.activateFurtherDevelopments" />
                                                </div>
                                            </q-expansion-item>
                                            <q-expansion-item
                                                class="sow-expansion"
                                                v-model="toggle.recommendedInclusions">
                                                <template v-slot:header>
                                                    <q-item-section>
                                                        <q-checkbox 
                                                            color="green"
                                                            v-model="data.activateRecommendedInclusions" 
                                                            label="Recommended Inclusions" />
                                                    </q-item-section>
                                                </template>
                                                <div class="details-container col-xs-12 row">
                                                    <q-option-group
                                                        color="green"
                                                        type="checkbox"
                                                        v-model="data.recommendedInclusions"
                                                        :options="options.defaultLong"
                                                        :disable="!data.activateRecommendedInclusions" />
                                                </div>
                                            </q-expansion-item>
                                        </div>
                                    </div>
                                </div>
                            </q-tab-panel>

                            <!-- Photos tab -->
                            <q-tab-panel name="Photos" class="row tab-container">
                                <div class="col-xs-12 row">
                                    <div class="details-container col-xs-12 adjust-pad-left adjust-pad-right row">
                                        <div class="row col-xs-12 table-container">
                                            <q-table 
                                                row-key="id" 
                                                virtual-scroll
                                                selection="multiple"
                                                :data="crPhotos.data" 
                                                id="createReportPhotos" 
                                                :columns="crPhotos.columns" 
                                                :selected.sync="crPhotos.selected"
                                                :pagination.sync="crPhotos.pagination"
                                                class="page__table photos__table col-xs-12 col-md-12"
                                                :rows-per-page-options="[25, 50, 100, 250]">
                                            </q-table>
                                        </div>
                                    </div>
                                </div>
                            </q-tab-panel>

                            <!-- Attachments tab -->
                            <q-tab-panel name="Attachments" class="row tab-container">
                                <div class="col-xs-12 row cr-attachments">
                                    <div class="details-container col-xs-12 adjust-pad-left adjust-pad-right row">
                                        <div class="page__heading">Repository Attachments</div>
                                        <div class="row col-xs-12 table-container">
                                            <q-table 
                                                row-key="id" 
                                                virtual-scroll
                                                :data="crAttachments.data" 
                                                id="createReportAttachments" 
                                                :columns="crAttachments.columns" 
                                                :pagination.sync="crAttachments.pagination"
                                                class="page__table report__table col-xs-12 col-md-12"
                                                :rows-per-page-options="[25, 50, 100, 250]">
                                                <template v-slot:body="props">
                                                    <q-tr :props="props">
                                                        <q-td class="ra-table-header">
                                                            <q-checkbox 
                                                                color="green"
                                                                v-model="props.row.selectAll" 
                                                                v-on:click.native="updateChildAttachment(props.row)"/>
                                                        </q-td>
                                                        <q-td class="ra-table-header bold">
                                                            {{props.row.report}}
                                                        </q-td>
                                                        <q-td class="ra-table-header"></q-td>
                                                        <q-td class="ra-table-header"></q-td>
                                                        <q-td class="ra-table-header"></q-td>
                                                    </q-tr>
                                                    <template v-for="col in props.row.attachments">
                                                        <q-tr>
                                                            <q-td class="ra-table-body"></q-td>
                                                            <q-td class="ra-table-body">
                                                                <q-checkbox 
                                                                    color="green"
                                                                    v-model="col.select" 
                                                                    v-on:click.native="updateParentAttachment(props.row)"/>
                                                                <span>{{col.document}}</span>
                                                            </q-td>
                                                            <q-td class="ra-table-body">{{col.notes}}</q-td>
                                                            <q-td class="ra-table-body">{{col.createdOn}}</q-td>
                                                            <q-td class="ra-table-body">{{col.createdBy}}</q-td>
                                                        </q-tr>
                                                    </template>
                                                </template>
                                            </q-table>
                                        </div>
                                    </div>
                                </div>
                            </q-tab-panel>

                            <!-- Other Reports tab -->
                            <q-tab-panel name="Other Reports" class="row tab-container">
                                <div class="col-xs-12">
                                    <div class="details-container adjust-pad-left adjust-pad-right row">
                                        <div class="no-external-reports">
                                            No External Reports
                                        </div>
                                    </div>
                                </div>
                            </q-tab-panel>
                        </q-tab-panels>
                    </q-scroll-area>
                </q-card-section>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script>
import FieldSelect from "shared/components/FieldSelect";

export default {
    components: {
        FieldSelect
    },
    props: {
        activate: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        dialogModel: false,
        reportTab: 'Report',
        data: {
            // Report
            reportType: '',
            reportTitle: '',
            pdfTemplate:'',
            reportDate: '',
            autoNumbering: false,
            changeReportTo: '',
            executiveSummary: '',
            claimHistoryComments: '',
            initialReserveSummary: '',
            propertyOccupancy: '',
            constructionType: '',
            ageOfProperty: '',
            jaes: '',
            dwellingHabitable: '',
            designType: '',
            roofType: '',
            timeOfOccupancy: '',
            asbestosPossible: '',
            claimHistory: '',
            buildingType: '',
            squareMeters: '',
            propertyCondition: '',
            asbestosTestingRequired: '',
            biq1: '',
            biq2: '',
            biq3: '',
            biq4: '',
            biq5: '',
            biq6: '',
            biq7: '',
            biq8: '',
            // Scope of Work 
            attachScope: false,
            individualPricing: false,
            attachSummary: false,
            scopeList: '',
            sendReportTo: '',
            sendReportUsing: '',
            claimsHandler: '',
            assessor: '',
            separateQuantities: false,
            showPreliminaries: false,
            showGrandTotal: false,
            showAllPrices: false,
            showTenderResults: false,
            activateOperations: true,
            activateTenderRequirements: true,
            activateAsbestosInformation: true,
            activateFurtherDevelopments: true,
            activateRecommendedInclusions: true,
            operations: '1',
            tenderRequirements: [],
            furtherDevelopments: '1',
            recommendedInclusions: [],
            reservesSummary : {
                includeCurrentReport: false,
                includePreviousReport: false
            },
            addressSummary: {
                includeCurrentReport: false,
            }
        },
        crAddressSummary: {
            data: [
                { colHeader: 'Claim Classification', t1: 'Repair', t2: 'Not Classified', t3: 'Not Classified' },
                { colHeader: 'Building Status', t1: 'APOINTMENT MADE', t2: 'INSPECTED', t3: 'NEW ENQUIRY' },
                { colHeader: 'Claims Header', t1: 'General Claim', t2: 'General Claim', t3: 'General Claim' },
                { colHeader: '', t1: '', t2: '', t3: '' },
                { colHeader: 'Building', t1: '1,000.00', t2: '1,000.00', t3: '1,000.00' },
                { colHeader: 'Less EQC Building Cap', t1: '-', t2: '-', t3: '-' },
                { colHeader: 'Liability Building', t1: '1,000.00', t2: '1,000.00', t3: '1,000.00' },
                { colHeader: '', t1: '', t2: '', t3: '' },
                { colHeader: 'Change in Building Liability', t1: '-', t2: '0.00', t3: '0.00' },
                { colHeader: 'Change in Building Reserve', t1: '-', t2: '0.00', t3: '0.00' },
                { colHeader: '', t1: '', t2: '', t3: '' },
                { colHeader: 'Liability DFPP', t1: '-', t2: '-', t3: '-' },
                { colHeader: 'Contents', t1: '0.00', t2: '0.00', t3: '0.00' },
                { colHeader: 'Less EQC Contents Cap', t1: '-', t2: '-', t3: '-' },
                { colHeader: 'Liability Contents', t1: '0.00', t2: '0.00', t3: '0.00' },
                { colHeader: '', t1: '', t2: '', t3: '' },
                { colHeader: 'Total Liability', t1: '1,000.00', t2: '1,000.00', t3: '1,000.00' },
                { colHeader: 'Change in Total Liability', t1: '-', t2: '-', t3: '-' },

            ],
            columns: [
                { name: 'colHeader', align: 'left', label : 'Claim Number', field: 'colHeader'},
                { name: 't1', align: 'left', label: 'T10006 - QT0001', field: 't1'},
                { name: 't2', align: 'left', label: 'T10001 - TEST0001', field: 't2' },
                { name: 't3', align: 'left', label: 'T10001 - TEST0002', field: 't3'},
            ],
            pagination: {
               rowsPerPage: 25 
            }
        },
        crReservesSummary: {
            data: [
                { label: 'Building', previousReserve: '0.00', currentReserve: '0.00', previousPayment: '0.00', paymentReport: '0.00', outstandingReserve: '0.00' },
                { label: 'Contents', previousReserve: '0.00', currentReserve: '0.00', previousPayment: '0.00', paymentReport: '0.00', outstandingReserve: '0.00' },
                { label: 'Other', previousReserve: '0.00', currentReserve: '0.00', previousPayment: '0.00', paymentReport: '0.00', outstandingReserve: '0.00' },
                { label: 'Professional Fees', previousReserve: '0.00', currentReserve: '0.00', previousPayment: '0.00', paymentReport: '0.00', outstandingReserve: '0.00' },
                { label: 'Total ($)', previousReserve: '0.00', currentReserve: '0.00', previousPayment: '0.00', paymentReport: '0.00', outstandingReserve: '0.00' },
                { label: 'Less Building Excess', previousReserve: '0.00', currentReserve: '0.00', previousPayment: '0.00', paymentReport: '0.00', outstandingReserve: '0.00' },
                { label: 'Less Contents Excess', previousReserve: '0.00', currentReserve: '0.00', previousPayment: '0.00', paymentReport: '0.00', outstandingReserve: '0.00' },
                { label: 'Grand Total ($)', previousReserve: '0.00', currentReserve: '0.00', previousPayment: '0.00', paymentReport: '0.00', outstandingReserve: '0.00' },

            ],
            columns: [
                { name: 'label', align: 'left', label : '', field: 'label'},
                { name: 'previousReserve', align: 'left', label: 'Previous Reserve ($)', field: 'previousReserve'},
                { name: 'currentReserve', align: 'left', label: 'Current Reserve ($)', field: 'currentReserve' },
                { name: 'previousPayment', align: 'left', label: 'Previous Payment ($)', field: 'previousPayment'},
                { name: 'paymentReport', align: 'left', label: 'Payment this Report ($)', field: 'paymentReport'},
                { name: 'outstandingReserve', align: 'left', label: 'Outstanding Reserve ($)', field: 'outstandingReserve'}
            ],
            pagination: {
               rowsPerPage: 25 
            }
        },
        crPhotos: {
            selected: [],
            data: [
                { 
                    id: '1',
                    document: '448823557_330299831080449_880232250_123456789.jpg',
                    notes: 'Test Only',
                    createdOn: '12/08/2019 15:18:58',
                    createdBy: 'Barry Cade'
                },
                { 
                    id: '2',
                    document: 'Aluminum-Glass-Windo.jpg',
                    notes: 'Descriptions 22.08 1',
                    createdOn: '22/08/2019 19:22:35',
                    createdBy: 'Ken Tucky'
                },
                { 
                    id: '3',
                    document: 'backyard-landscaping.jpg',
                    notes: 'Descriptions 22.08 2',
                    createdOn: '22/08/2019 19:22:35',
                    createdBy: 'Ken Tucky'
                },
                { 
                    id: '4',
                    document: 'Bakers-Roofing.jpg',
                    notes: 'Descriptions 22.08 3',
                    createdOn: '22/08/2019 19:22:35',
                    createdBy: 'Ken Tucky'
                },
                { 
                    id: '5',
                    document: 'basement-laundry-room.jpg',
                    notes: 'Descriptions 22.08 4',
                    createdOn: '22/08/2019 19:22:35',
                    createdBy: 'Ken Tucky'
                },
                { 
                    id: '6',
                    document: 'Contemporary-bathroom.jpg',
                    notes: 'Descriptions 22.08 5',
                    createdOn: '22/08/2019 19:22:35',
                    createdBy: 'Ken Tucky'
                }
            ],
            columns: [
                { name: 'document', align: 'left', label : 'Document', field: 'document'},
                { name: 'notes', align: 'left', label: 'Notes', field: 'notes'},
                { name: 'createdOn', align: 'left', label: 'Created On', field: 'createdOn' },
                { name: 'createdBy', align: 'left', label: 'Created By', field: 'createdBy'},
            ],
            pagination: {
               rowsPerPage: 25 
            }
        },
        crAttachments: {
            data: [
                { 
                    id : '1',
                    report: 'EMAIL FROM CLIENT',
                    selectAll: false,
                    attachments: [
                        { 
                            id: '11',
                            select: false,
                            document: 'tidy-tight_1x-1-e1526867592205.jpg',
                            notes: 'Test - Pat logo test - edited',
                            createdOn: '11/05/2020 21:38:48',
                            createdBy: 'Barry Cade'
                        },
                        { 
                            id: '12',
                            select: false,
                            document: '20191105_131600.jpg',
                            notes: 'Test 2 Test pic 2',
                            createdOn: '11/05/2020 21:41:46',
                            createdBy: 'Barry Cade'
                        },
                        { 
                            id: '13',
                            select: false,
                            document: '9.jpg',
                            notes: 'Test 3 Test pic 3',
                            createdOn: '11/05/2020 21:50:58',
                            createdBy: 'Barry Cade'
                        },
                        { 
                            id: '14',
                            select: false,
                            document: 'FREEHAND.TTF',
                            notes: 'Test 4 Test FONT attachment',
                            createdOn: '11/05/2020 21:52:49',
                            createdBy: 'Barry Cade'
                        }
                    ]
                },
                { 
                    id : '2',
                    report: 'EMAIL FROM CLIENT',
                    selectAll: false,
                    attachments: [
                        {
                            id: '21',
                            select: false,
                            document: 'General Specialist Request',
                            notes: 'Generic Specialist Request to Test Builder 1A Kenepuru Drive',
                            createdOn: '17/04/2020 13:34:47',
                            createdBy: 'Ken Tucky'
                        }
                    ]
                },
            ],
            columns: [
                { name: 'addtoEmail', align: 'left', label : 'Add to Email', field: 'addtoEmail'},
                { name: 'document', align: 'left', label : 'Document', field: 'document'},
                { name: 'notes', align: 'left', label: 'Notes', field: 'notes'},
                { name: 'createdOn', align: 'left', label: 'Created On', field: 'createdOn' },
                { name: 'createdBy', align: 'left', label: 'Created By', field: 'createdBy'},
            ],
            pagination: {
               rowsPerPage: 25 
            }
        },
        options: {
            default: [
                { id: '1', value: 'Option 1' },
                { id: '2', value: 'Option 2' },
                { id: '3', value: 'Option 3' }
            ],
            defaultShort: [
                {  value: '1', label: 'Protection to contents, fittings and surfaces during repairs' },
                {  value: '2', label: 'Contract works insurance during progress of works' },
                {  value: '3', label: 'BSA Insurance if applicable' },
                {  value: '4', label: 'All rubbish removal' },
            ],
            defaultLong: [
                {  value: '1', label: 'Tender Price is to be inclusive of any PC items (including GST). However PC items are not expected to be required on Multi Quote Tenders unless completely unavoidable.' },
                {  value: '2', label: 'If the works require Home Warranty Insurance the Certificate confirming cover being arranged to the CR (when applicable) to enable the final payment to be authorised.' },
                {  value: '3', label: 'All builders must comply with all laws and regulations applicable to the operation of your business and provision of services including Occupational Health and Safety and Environmental Protection.' },
                {  value: '4', label: 'Tender Price submitted is to be entirely based on the scope provided by the Assesor, Engineer or Consultant.' },
            ],
        },
        toggle: {
            autoNumbering: false,
            executiveSummary: false,
            descriptionOfRisk: false,
            claimHistoryComments: false,
            initialReserveSummary: false,
            bulgaryInformation: false,
            operations: true,
            tenderRequirements: true,
            asbestosInformation: true,
            furtherDevelopments: true,
            recommendedInclusions: true,
        }
    }),
    watch: {
        activate(value, oldValue) {
            this.dialogModel = value;
        }
    },
    methods: {
        closeReport(){
            this.dialogModel = false;
            this.$emit("update:activate", this.dialogModel);
        },
        updateChildAttachment(attachment){
            for (var x = 0; x < attachment.attachments.length; x++) {
                attachment.attachments[x].select = attachment.selectAll ? true : false;
            }
        },
        updateParentAttachment(attachment){
            var selectCount = 0;
            for (var x = 0; x < attachment.attachments.length; x++) {
                if(attachment.attachments[x].select){
                    selectCount++;
                }
            }
            if(selectCount === attachment.attachments.length) {
                attachment.selectAll = true;
            } else if(selectCount === 0){
                attachment.selectAll = false;
            } else {
                attachment.selectAll = null;
            }
        }
    }
};
</script>

<style scoped>
.report__table {
    margin-left: 0px;
}
.photos__table {
    margin-left: 0px;
}
.create-report {
    max-width: 1400px;
    width: 1400px;
}
.create-report .bold {
    font-weight: 600;
}
.create-report .padr25 {
    padding-right: 25px;
}
.create-report .q-tab {
    min-height: 55px;
}
.create-report .adjust-pad-left {
    padding-left: 25px;
}
.create-report .adjust-pad-right {
    padding-right: 25px;
}
.create-report .filter-scroll {
    height: 100%;
    width: 100%;
}
.create-report .q-form > .q-card__section:first-of-type {
    padding: 50px 80px 0; 
}
.create-report >>> .q-expansion-item .q-item {
    background-color: #f3f3f3;
    color: #41474F;
    font-size: 19px;
    font-weight: bold;
    margin: 0 25px 10px;
    padding: 10px 25px;
}
.create-report >>> .q-expansion-item .q-item .q-expansion-item__toggle-icon {
    color: #41474F;
    font-weight: bold;
}
.create-report >>> .q-expansion-item .q-expansion-item__content {
    margin: 0 25px;
    padding: 0 25px 10px;
}
.create-report >>> .q-expansion-item .q-expansion-item__content .details-container {
    padding-left: 0;
    padding-right: 0;
    padding-top: 0;
}
.create-report .q-card__section:nth-of-type(2) {
    bottom: 30px;
    left: 80px;
    padding: 0;
    position: absolute;
    right: 80px;
    top: 260px;
}
.create-report .close-button {
    background: #0660AE;
    color: #fff;
    cursor: pointer;
    font-size: 20px;
    padding: 15px;
    position: absolute;
    right: 0;
    top: 0;
}
.create-report .page__heading {
    color: #41474F;
    font-weight: 600;
    margin-bottom: 30px;
    margin-left: 0;
    text-transform: none;
}
.create-report .page__heading .float-right {
    margin-right: 0;
    margin-top: 8px;
}
.create-report .page__heading .float-right .q-btn {
    font-family: Myriad Pro Regular;
    font-size: 13.5px;
    margin-left: 15px;
    width: 130px;
}
.create-report .report-template-header-note {
    color: #41474F;
    font-size: 17px;
}
.create-report .filter-button,
.create-report .filter-button >>> .q-btn__wrapper:before {
    box-shadow: none;
}
.create-report .report-table-tab {
    background-color: #473899;
    margin-top: 30px;
}
.create-report .report-table-tab >>> .q-tab__label{
    color:  #fff;
    font-size: 17px;
    text-transform: none;
}
.create-report .report-table-tab >>> .q-tab--active .q-tab__label { 
    border-bottom: 2px solid #F2A100;
}
.create-report .no-external-reports {
    background-color: #E8E8E8;
    color: #41474F;
    font-size: 20px;
    font-weight: 600;
    padding: 10px 25px;
    text-align: center;
    width: 100%;
}
.create-report >>> #createReportPhotos .text-grey-8 {
    color: #4caf50!important;
}
.create-report >>> #createReportAttachments tr > th,
.create-report >>> #createReportPhotos tr > th {
    padding-top: 20px;
}
.create-report >>> #createReportPhotos tr > th:nth-of-type(4),
.create-report >>> #createReportPhotos tr > th:nth-of-type(5),
.create-report >>> #createReportPhotos tr > td:nth-of-type(4),
.create-report >>> #createReportPhotos tr > td:nth-of-type(5) {
    text-align: left;
}
.details-container .details-field-container >>> .notes,
.details-container .details-field-container >>> .notes .q-field__control {
    height: 100px;
}
.details-container .details-field-container >>> .notes textarea {
    height: 100px!important;
    max-height: 100px;
    min-height: 100px;
    padding: 8px 0 10px;
    resize: none;
}
.sow-card  {
    margin-bottom: 50px;
    margin-top: 50px;
}
.sow-card .q-card__section {
    padding: 10px 25px 30px;
}
.sow-card .sow-checklist {
    border-top: 1px solid rgba(0, 0, 0, 0.12);
    padding: 10px 25px;
}
.sow-card .sow-checklist .details-field-container > div {
    padding-bottom: 15px;
}
.sow-card .details-field-container label:first-of-type {
    color: #41474F;
    line-height: 34px;
}
.sow-expansion {
    margin-bottom: 10px;
}
.create-report >>> .sow-expansion .q-expansion-item__content .q-checkbox,
.create-report >>> .sow-expansion .q-expansion-item__content .q-radio {
    padding-bottom: 20px;
}
.create-report >>> .sow-expansion .q-radio__label {
    padding-left: 10px;
}
.create-report >>> .sow-expansion .q-checkbox__label {
    padding-left: 10px;
}
.create-report >>> .q-expansion-item.sow-expansion .q-item {
    margin: 0;
}
.create-report >>> .q-expansion-item.sow-expansion .q-expansion-item__content {
    margin: 0 25px;
    padding: 10px 0;
}
.cr-attachments .page__heading {
    font: 27px Myriad Pro Regular;
    margin: 10px 0 20px;
}
.create-report >>> #createReportAttachments tr > td {
    padding-bottom: 15px;
    padding-top: 15px;
    vertical-align: top;
}
.create-report >>> #createReportAttachments tr > td:nth-of-type(2) {
    padding-bottom: 5px;
    padding-top: 5px;
}
.create-report >>> .ra-table-header {
    background-color: #D8E1F3;
    min-height: 56px;
    padding-bottom: 5px!important;
    padding-top: 5px!important;
    vertical-align: middle!important;
}
.create-report >>> #createReportAttachments tr > th:nth-of-type(1),
.create-report >>> #createReportAttachments tr > td:nth-of-type(1) {
    padding-left: 30px;
    max-width: 100px;
    white-space: normal;
    width: 100px;
}
.create-report >>> #createReportAttachments tr > th:nth-of-type(3),
.create-report >>> #createReportAttachments tr > td:nth-of-type(3) {
    max-width: 250px;
    min-width: 250px;
    white-space: normal;
    width: 250px;
}
.create-report >>> #createReportAttachments tr > th:nth-of-type(4),
.create-report >>> #createReportAttachments tr > td:nth-of-type(4) {
    text-align: left;
}
.create-report >>> #createReportAttachments tr > th:nth-of-type(5),
.create-report >>> #createReportAttachments tr > td:nth-of-type(5) {
    padding-right: 30px;
    text-align: left;
}
.create-report >>> #createReportReservesSummary {
    margin-top:30px;
    margin-bottom: 30px;
}
.create-report >>> #createReportReservesSummary .q-table__top {
    background-color: #f3f3f3;
    padding-left: 30px;
}
.create-report >>> #createReportReservesSummary .q-table__title {
    font-weight: 600;
}
.create-report >>> #createReportReservesSummary tr > th,
.create-report >>> #createReportReservesSummary tr > td {
    text-align: right;
    white-space: normal;
}
.create-report >>> #createReportReservesSummary tr > th:nth-of-type(1),
.create-report >>> #createReportReservesSummary tr > td:nth-of-type(1) {
    min-width: 400px;
    padding-left: 30px;
    text-align: left;
    width: 400px;
}
.create-report >>> #createReportReservesSummary tr > th:nth-of-type(6),
.create-report >>> #createReportReservesSummary tr > td:nth-of-type(6) {
    padding-right: 30px;
}
.create-report >>> #createReportReservesSummary .q-virtual-scroll__content tr:nth-of-type(5) > td,
.create-report >>> #createReportReservesSummary .q-virtual-scroll__content tr:nth-of-type(8) > td {
    background-color: #fef7ea;
}
.create-report >>> #createReportReservesSummary  .q-table__bottom > .q-table__control:nth-of-type(3),
.create-report >>> #createReportReservesSummary  .q-table__bottom > .q-table__control:nth-of-type(4) {
    display: none;
}
.rs-card {
    border-radius: 0px!important;
}
.create-report >>> .rs-card .q-card__section > div {
    border-left: 1px solid rgba(0, 0, 0, 0.12);
    padding: 12px 30px;
    text-align: center;
}
.create-report >>> .rs-card .q-card__section {
    padding: 0;
}
.create-report >>> .rs-card .q-card__section > div:first-of-type {
    background-color: #D8E1F3;
    border-left: none;
    text-align: left;
}
.create-report >>> #createReportAddressSummary {
    margin-top: 10px;
}
.create-report >>> #createReportAddressSummary tr th {
    position: sticky;
    z-index: 2;
}
.create-report >>> #createReportAddressSummary thead tr:last-child th {
    top: 48px;
    z-index: 3;
}
.create-report >>> #createReportAddressSummary thead tr:first-child th {
    top: 0;
    z-index: 1;
}
.create-report >>> #createReportAddressSummary tr:first-child th:first-child {
    z-index: 3;
}
.create-report >>> #createReportAddressSummary td:first-child {
    z-index: 1;
}
.create-report >>> #createReportAddressSummary td:first-child, 
.create-report >>> #createReportAddressSummary th:first-child {
    position: sticky;
    left: 0;
}
.create-report >>> #createReportAddressSummary  tr > th {
    font: 14px Myriad Pro Semibold;
    padding-top: 20px;
}
.create-report >>> #createReportAddressSummary  tr > td {
    background-color: #fff;
}
.create-report >>> #createReportAddressSummary  tr > th:first-of-type,
.create-report >>> #createReportAddressSummary  tr > td:first-of-type {
    padding-left: 30px;
}
.create-report >>> #createReportAddressSummary  tr > th:nth-of-type(2),
.create-report >>> #createReportAddressSummary  tr > td:nth-of-type(2) {
   text-align: right;
}
.create-report >>> #createReportAddressSummary  tr:nth-of-type(1) > td:first-of-type,
.create-report >>> #createReportAddressSummary  tr:nth-of-type(2) > td:first-of-type,
.create-report >>> #createReportAddressSummary  tr:nth-of-type(3) > td:first-of-type,
.create-report >>> #createReportAddressSummary  tr:nth-of-type(4) > td {
    background-color: #f3f3f3;
}
.create-report >>> #createReportAddressSummary  tr:nth-of-type(7) > td,
.create-report >>> #createReportAddressSummary  tr:nth-of-type(10) > td,
.create-report >>> #createReportAddressSummary  tr:nth-of-type(12) > td,
.create-report >>> #createReportAddressSummary  tr:nth-of-type(15) > td,
.create-report >>> #createReportAddressSummary  tr:nth-of-type(17) > td,
.create-report >>> #createReportAddressSummary  tr:nth-of-type(18) > td {
    background-color: #fef7ea;
}
.create-report >>> #createReportAddressSummary  tr:nth-of-type(5) > td:first-of-type,
.create-report >>> #createReportAddressSummary  tr:nth-of-type(6) > td:first-of-type,
.create-report >>> #createReportAddressSummary  tr:nth-of-type(9) > td:first-of-type,
.create-report >>> #createReportAddressSummary  tr:nth-of-type(13) > td:first-of-type,
.create-report >>> #createReportAddressSummary  tr:nth-of-type(14) > td:first-of-type {
    font: 13px Myriad Pro Regular;
}
.create-report >>> #createReportAddressSummary  tr > th:last-of-type,
.create-report >>> #createReportAddressSummary  tr > td:last-of-type {
    padding-right: 30px;
}
.create-report >>> #createReportAddressSummary  .q-table__bottom > .q-table__control:nth-of-type(3),
.create-report >>> #createReportAddressSummary  .q-table__bottom > .q-table__control:nth-of-type(4) {
    display: none;
}

@media (max-width: 1439px) {
    .details-container.bi-adjust-pad {
        padding-bottom: 0;
    }
    .bi-adjust-pad {
        padding-right: 25px;
    }
    .bi-adjust-pad.padr25 {
        padding-right: 0;
    }
}
@media (max-width: 1366px) and (max-height: 768px) {
    .create-report .page__heading {
        margin: 0 0 20px;
    }
    .create-report .report-table-tab {
        margin-top: 15px;
    }
    .create-report .q-card__section:nth-of-type(2) {
        top: 240px;
    }
}
@media (max-width: 1090px) {
    .create-report .adjust-pad-left {
        padding-left: 8px;
    }
    .create-report .adjust-pad-right {
        padding-right: 8px;
    }
    .create-report .q-form > .q-card__section:first-of-type {
        padding: 30px; 
    }
    .create-report .page__heading > .col {
        flex: none;
    }
    .create-report .page__heading  .float-right .q-btn:first-of-type {
        margin-left: 0;
    }
    .create-report .report-template-header-note {
        font-size: 14px;
    }
    .create-report .q-card__section:nth-of-type(2) {
        left: 30px;
        right: 30px;
        top: 267px;
    }
    .create-report >>> .q-expansion-item .q-expansion-item__content {
        margin: 0;
        padding: 0 32px 10px;
    }
    .create-report >>> .q-expansion-item .q-item {
        margin: 0 8px 10px;
    }
}
@media (max-width: 1090px) and (max-height: 768px) {
    .create-report .q-card__section:nth-of-type(2) {
        top: 212px;
    }
}
@media (max-width: 1024px) {
    .create-report .q-card__section:nth-of-type(2) {
        top: 310px;
    }
    .create-report .details-container {
        padding-bottom: 0;
    }
    .create-report .padr25,
    .create-report .bi-adjust-pad {
        padding-right: 0;
    }
    .create-report .q-expansion-item__content > .row > .padr25:nth-of-type(2)  {
        padding-right: 0;
    }
    .create-report .q-expansion-item__content > .row > .col-sm-6:last-of-type {
        padding-right: 25px;
    }
}
/*Ipad Pro portrait mode*/
@media (max-width: 1024px) and (min-height: 1366px) {
    .create-report .q-card__section:nth-of-type(2) {
        top: 267px;
    }
}
@media (max-width: 1024px) and (max-height: 768px) {
    .create-report .q-card__section:nth-of-type(2) {
        top: 212px;
    }
}
@media (max-width: 1023px) and (max-height: 768px) {
    .create-report .q-card__section:nth-of-type(2) {
        top: 255px;
    }
}
@media (max-width: 768px) and (max-height: 1366px) {
    .create-report .q-card__section:nth-of-type(2) {
        top: 310px;
    }
}
@media (max-width: 767px) {
    .create-report .q-card__section:nth-of-type(2) {
        top: 296px;
    }
}
@media (max-width: 720px) and (max-height: 540px) {
    .create-report .q-card__section:nth-of-type(2) {
        top: 241px;
    }
}
@media (max-width: 682px) {
    .create-report .q-card__section:nth-of-type(2) {
        top: 330px;
    }
}
@media (max-width: 661px) {
    .create-report .q-card__section:nth-of-type(2) {
        top: 351px;
    }
}
@media (max-width: 599px) {
    .create-report .q-card__section:nth-of-type(2) {
        top: 371px;
    }
    .create-report .page__heading .float-right .q-btn {
        margin: 10px 15px 0 0;
    }
    .create-report .adjust-pad-left,
    .create-report .adjust-pad-right {
        padding: 0 8px;
    }
}
@media (max-width: 540px) and (max-height: 720px) {
    .create-report .q-card__section:nth-of-type(2) {
        top: 316px;
    }
}
</style>
