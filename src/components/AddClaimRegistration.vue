<template>
    <q-dialog
        persistent
        full-height
        content-class="claim-registration"
        v-model="dialogModel">
        <q-card style="width: 850px; max-width: 85vw;">
             <q-form style="height: 100%;"
                @submit="onSubmit" 
                ref="claimRegistrationForm">
                <q-card-section class="claim-registration-section">
                    <div class="row page__heading">
                        <div class="col-md-8 col-sm-8 col-xs-12" style="text-transform: capitalize;"> 
                            Claim Registration
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-12">
                            <div class="float-right">
                                <q-btn color="primary" no-caps class="filter-button float-left" rounded label="Save" type="submit" @click="saveRegistration"/>
                                <q-btn color="primary" no-caps class="filter-button float-left cancel-btn" rounded label="Cancel" @click="closeDialog" />
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin: 10px 50px 10px 50px;">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 q-mb-lg">
                            <q-btn outline rounded color="primary" size="sm" @click="expanded(1)" class="sticky-btn" label="Claim Details" />
                            <q-btn outline rounded color="primary" size="sm" @click="expanded(2)" class="sticky-btn" label="Policy Holder" />
                            <q-btn outline rounded color="primary" size="sm" @click="expanded(3)" class="sticky-btn" label="Addresses" />
                            <q-btn outline rounded color="primary" size="sm" @click="expanded(4)" class="sticky-btn" label="Policy Details" />
                            <q-btn outline rounded color="primary" size="sm" @click="expanded(5)" class="sticky-btn" label="Other Information" />
                            <q-btn outline rounded color="primary" size="sm" @click="expanded(6)" class="sticky-btn" label="Attachments" />
                        </div>
                    </div>
                </q-card-section>
                <q-card-section class="claim-registration-section" style="margin-top: 20px;">
                    <q-scroll-area class="filter-scroll">      
                        <q-list class="q-mb-md">
                            <q-expansion-item
                                class="claim-section-ei"
                                label="Claim Details"
                                default-opened
                                id="claimDetails"
                            >
                                <div class="row justify-center bg-white q-col-gutter-x-md q-pl-lg q-pr-lg q-pt-md q-pb-md">

                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Product Line* <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedProductLine"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                            :rules="[ val => !!val || 'Required' ]"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular"></div>

                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Insurer* <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedInsurer"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                            :rules="[ val => !!val || 'Required' ]"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Insurer State Office <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedInsurerStateOffice"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Insurer Department* <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedInsurerDepartment"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                            :rules="[ val => !!val || 'Required' ]"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Insurer Claims Handler <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedInsurerClaimsHandler"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>

                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Broker Office <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedBrokerOffice"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Broker  <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedBroker"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Send Report To <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedSendReportTo"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>

                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Insurer Reference No <br/>
                                        <q-input square outlined dense v-model="insurerReferenceNoInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Claimant Reference No
                                        <q-input square outlined dense v-model="claimantReferenceNoInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Other Reference No
                                        <q-input square outlined dense v-model="otherReferenceNoInput" label="Type here" />
                                    </div>

                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Event Code* <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedEventCode"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                            :rules="[ val => !!val || 'Required' ]"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Event Type* <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedEventType"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                            :rules="[ val => !!val || 'Required' ]"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>

                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Notification Method <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedNotificationMethod"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular"></div>

                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Claim Received* <br/>
                                        <q-input square outlined v-model="claimReceived" dense mask="date" :rules="['date'] && [ val => !!val || 'Required' ]">
                                            <template v-slot:append>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                                        <q-date v-model="claimReceived" @input="() => $refs.qDateProxy.hide()" />
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Date of Loss  <br/>
                                        <q-input square outlined v-model="dateOfLoss" dense mask="date">
                                            <template v-slot:append>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                                        <q-date v-model="dateOfLoss" @input="() => $refs.qDateProxy.hide()" />
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </div>

                                    <div class="col-sm-12 col-md-12 q-mt-sm text-regular">
                                        Claim Description* <br/>
                                        <q-input square outlined dense v-model="claimDescriptionInput" label="Type here" :rules="[ val => !!val || 'Required' ]" />
                                    </div>

                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Insurer Instruction <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedInsurerInstruction"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular"></div>

                                    <div class="col-sm-12 col-md-12 q-mt-lg text-regular">
                                        Insurer Notes <br/>
                                        <q-input square outlined dense v-model="insurerNotesInput" label="Type here" />
                                    </div>

                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Assessment Type <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedAssessmentType"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Indemnity Status <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedIndemnityStatus"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Claim Classification <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedClaimClassification"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>

                                </div>
                            </q-expansion-item>
                        </q-list>
                        <q-list class="q-mb-md">
                            <q-expansion-item
                                class="claim-section-ei"
                                label="Policy Holder"
                                default-opened
                                id="policyHolder"
                            >
                                <div class="row justify-center bg-white q-col-gutter-x-md q-pl-lg q-pr-lg q-pt-md q-pb-md">

                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Claimant Type* <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedClaimantType"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                            :rules="[ val => !!val || 'Required' ]"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular"></div>

                                    <div class="col-sm-2 col-md-2 q-mt-sm text-regular">
                                        Salutation <br/>
                                        <q-select
                                            square
                                            outlined
                                            dense
                                            v-model="selectedSalutation"
                                            input-debounce="0"
                                            :options="defaultSalutation"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-5 col-md-5 q-mt-sm text-regular">
                                        First Name* <br/>
                                        <q-input square outlined dense v-model="firstNameInput" label="Type here" :rules="[ val => !!val || 'Required' ]" />
                                    </div>
                                    <div class="col-sm-5 col-md-5 q-mt-sm text-regular">
                                        Last Name* <br/>
                                        <q-input square outlined dense v-model="lastNameInput" label="Type here" :rules="[ val => !!val || 'Required' ]" />
                                    </div>
                                    
                                    <div class="col-sm-4 col-md-4 q-mt-sm text-regular">
                                        Work Phone <br/>
                                        <q-input square outlined dense v-model="workPhoneInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-sm text-regular">
                                        Home Phone <br/>
                                        <q-input square outlined dense v-model="homePhoneInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-sm text-regular">
                                        Mobile Phone <br/>
                                        <q-input square outlined dense v-model="mobilePhoneInput" label="Type here" />
                                    </div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Email <br/>
                                        <q-input square outlined dense v-model="emailInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Preferred Contact <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedPreferredContact"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Business Name* <br/>
                                        <q-input square outlined dense v-model="businessNameInput" label="Type here" :rules="[ val => !!val || 'Required' ]" />
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Business Phone <br/>
                                        <q-input square outlined dense v-model="businessPhoneInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Business Email <br/>
                                        <q-input square outlined dense v-model="businessEmailInput" label="Type here" />
                                    </div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Tax Status <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedTaxStatus"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Tax Registration No* <br/>
                                        <q-input square outlined dense v-model="taxRegistrationNoInput" label="Type here" :rules="[ val => !!val || 'Required' ]" />
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>

                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        <q-checkbox v-model="toBeAdvisedCheckbox" color="green" size="sm" />
                                        To Be Advised
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular"></div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-bold">
                                        <span style="color: #41474F; font-size: 18px;">Primary Contact</span>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>

                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        <q-checkbox v-model="sameAsClaimantCheckbox" color="green" size="sm" v-on:click.native="inputOrigToPrimary()" />
                                        Same as Claimant
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular"></div>

                                    <div class="col-sm-2 col-md-2 q-mt-sm text-regular">
                                        Salutation <br/>
                                        <q-select
                                            square
                                            outlined
                                            dense
                                            v-model="selectedpSalutation"
                                            input-debounce="0"
                                            :options="defaultSalutation"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-5 col-md-5 q-mt-sm text-regular">
                                        First Name* <br/>
                                        <q-input square outlined dense v-model="pfirstNameInput" label="Type here" :rules="[ val => !!val || 'Required' ]" />
                                    </div>
                                    <div class="col-sm-5 col-md-5 q-mt-sm text-regular">
                                        Last Name* <br/>
                                        <q-input square outlined dense v-model="plastNameInput" label="Type here" :rules="[ val => !!val || 'Required' ]" />
                                    </div>
                                    
                                    <div class="col-sm-4 col-md-4 q-mt-sm text-regular">
                                        Work Phone <br/>
                                        <q-input square outlined dense v-model="pworkPhoneInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-sm text-regular">
                                        Home Phone <br/>
                                        <q-input square outlined dense v-model="phomePhoneInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-sm text-regular">
                                        Mobile Phone <br/>
                                        <q-input square outlined dense v-model="pmobilePhoneInput" label="Type here" />
                                    </div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Email <br/>
                                        <q-input square outlined dense v-model="pemailInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Preferred Contact <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedpPreferredContact"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-bold">
                                        <span style="color: #41474F; font-size: 18px;">Secondary Contact</span>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>

                                    <div class="col-sm-6 col-md-6 q-mt-md text-regular">
                                        Relationship to Claimant <br/>
                                        <q-input square outlined dense v-model="relationshipToClaimantInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-md text-regular"></div>

                                    <div class="col-sm-2 col-md-2 q-mt-lg text-regular">
                                        Salutation <br/>
                                        <q-select
                                            square
                                            outlined
                                            dense
                                            v-model="selectedsSalutation"
                                            input-debounce="0"
                                            :options="defaultSalutation"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-5 col-md-5 q-mt-lg text-regular">
                                        First Name* <br/>
                                        <q-input square outlined dense v-model="sfirstNameInput" label="Type here" :rules="[ val => !!val || 'Required' ]" />
                                    </div>
                                    <div class="col-sm-5 col-md-5 q-mt-lg text-regular">
                                        Last Name* <br/>
                                        <q-input square outlined dense v-model="slastNameInput" label="Type here" :rules="[ val => !!val || 'Required' ]" />
                                    </div>
                                    
                                    <div class="col-sm-4 col-md-4 q-mt-sm text-regular">
                                        Work Phone <br/>
                                        <q-input square outlined dense v-model="sworkPhoneInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-sm text-regular">
                                        Home Phone <br/>
                                        <q-input square outlined dense v-model="shomePhoneInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-sm text-regular">
                                        Mobile Phone <br/>
                                        <q-input square outlined dense v-model="smobilePhoneInput" label="Type here" />
                                    </div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Email <br/>
                                        <q-input square outlined dense v-model="semailInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Preferred Contact <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedsPreferredContact"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>


                                </div>
                            </q-expansion-item>
                        </q-list>      
                        <q-list class="q-mb-md">
                            <q-expansion-item
                                class="claim-section-ei"
                                label="Addresses"
                                default-opened
                                id="addresses"
                            >
                                <div class="row justify-center bg-white q-col-gutter-x-md q-pl-lg q-pr-lg q-pt-md q-pb-md">

                                    <div class="col-sm-6 col-md-6 q-mt-sm text-bold">
                                        <span style="color: #41474F; font-size: 18px;">Site Address</span>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular"></div>

                                    <div class="col-sm-12 col-md-12 q-mt-md text-regular">
                                        Site Street Address <br/>
                                        <q-input square outlined dense v-model="siteStreetAddressInput" label="Type here" />
                                    </div>
                                    
                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Site Suburb* <br/>
                                        <q-input square outlined dense v-model="siteSuburbInput" label="Type here" :rules="[ val => !!val || 'Required' ]" />
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Site State* <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedSiteState"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                            :rules="[ val => !!val || 'Required' ]"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Site Post Code* <br/>
                                        <q-input square outlined dense v-model="sitePostCodeInput" label="Type here" :rules="[ val => !!val || 'Required' ]" />
                                    </div>
                                    
                                    <div class="col-sm-12 col-md-12 q-mt-sm text-regular">
                                        Site Directions <br/>
                                        <q-input square outlined dense v-model="siteDirectionsInput" label="Type here" />
                                    </div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-bold">
                                        <span style="color: #41474F; font-size: 18px;">Incident Address</span>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular"></div>

                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        <q-checkbox v-model="sameAsSiteAddressCheckbox1" color="green" size="sm" v-on:click.native="inputSiteToIncident()" />
                                        Same as Site Address
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular"></div>

                                    <div class="col-sm-12 col-md-12 q-mt-sm text-regular">
                                        Incident Street Address <br/>
                                        <q-input square outlined dense v-model="incidentStreetAddressInput" label="Type here" />
                                    </div>
                                    
                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Incident Suburb* <br/>
                                        <q-input square outlined dense v-model="incidentSuburbInput" label="Type here" :rules="[ val => !!val || 'Required' ]" />
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Incident State* <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedIncidentState"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                            :rules="[ val => !!val || 'Required' ]"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Incident Post Code* <br/>
                                        <q-input square outlined dense v-model="incidentPostCodeInput" label="Type here" :rules="[ val => !!val || 'Required' ]" />
                                    </div>
                                    
                                    <div class="col-sm-12 col-md-12 q-mt-sm text-regular">
                                        Incident Directions <br/>
                                        <q-input square outlined dense v-model="incidentDirectionsInput" label="Type here" />
                                    </div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-bold">
                                        <span style="color: #41474F; font-size: 18px;">Postal Address</span>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>

                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        <q-checkbox v-model="sameAsSiteAddressCheckbox2" color="green" size="sm" v-on:click.native="inputSiteToPostal()" />
                                        Same as Site Address
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular"></div>

                                    <div class="col-sm-12 col-md-12 q-mt-sm text-regular">
                                        Postal Street Address or PO Box <br/>
                                        <q-input square outlined dense v-model="postalStreetAddressInput" label="Type here" />
                                    </div>
                                    
                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Postal Suburb* <br/>
                                        <q-input square outlined dense v-model="postalSuburbInput" label="Type here" :rules="[ val => !!val || 'Required' ]" />
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Postal State* <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedPostalState"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                            :rules="[ val => !!val || 'Required' ]"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Postal Post Code* <br/>
                                        <q-input square outlined dense v-model="postalPostCodeInput" label="Type here" :rules="[ val => !!val || 'Required' ]" />
                                    </div>
                                    
                                    <div class="col-sm-4 col-md-4 q-mt-sm text-regular">
                                        Region* <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedRegion"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                            :rules="[ val => !!val || 'Required' ]"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-8 col-md-8 q-mt-sm text-regular"></div>

                                </div>
                            </q-expansion-item>
                        </q-list>     
                        <q-list class="q-mb-md">
                            <q-expansion-item
                                class="claim-section-ei"
                                label="Policy Details"
                                default-opened
                                id="policyDetails"
                            >
                                <div class="row justify-center bg-white q-col-gutter-x-md q-pl-lg q-pr-lg q-pt-md q-pb-md">

                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Building Policy Type <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedBuildingPolicyType"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular"></div>

                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        <a style="background-color: #fff; color: #41474F; border: none; cursor: pointer; padding: 0px 10px 0px 0px;">
                                            <q-icon name="add_circle" style="font-size: 2rem; margin-right: 5px;" />
                                            <u style="text-decoration: underlined;">Add new building policy type</u>
                                        </a>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>

                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Building Policy Number <br/>
                                        <q-input square outlined dense v-model="buildingPolicyNumberInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Building Sum Insured
                                        <q-input square outlined dense v-model="buildingSumInsuredInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-4 col-md-4 q-mt-lg text-regular">
                                        Building Area Insured
                                        <q-input square outlined dense v-model="buildingAreaInsuredInput" label="Type here" />
                                    </div>

                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Building Policy Inception <br/>
                                        <q-input square outlined v-model="buildingPolicyInception" dense mask="date" :rules="['date']">
                                            <template v-slot:append>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                                        <q-date v-model="buildingPolicyInception" @input="() => $refs.qDateProxy.hide()" />
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Building Policy Expiry <br/>
                                        <q-input square outlined v-model="buildingPolicyExpiry" dense mask="date" :rules="['date']">
                                            <template v-slot:append>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                                        <q-date v-model="buildingPolicyExpiry" @input="() => $refs.qDateProxy.hide()" />
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </div>

                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Building Excess <br/>
                                        <q-input square outlined dense v-model="buildingExcessInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Building R Excess <br/>
                                        <q-input square outlined dense v-model="buildingRExcessInput" label="Type here" />
                                    </div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Building Limit for Gradual Deterioration <br/>
                                        <q-input square outlined dense v-model="buildingLimitInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>

                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Contents Policy Type <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedContentsPolicyType"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>

                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        <a style="background-color: #fff; color: #41474F; border: none; cursor: pointer; padding: 0px 10px 0px 0px;">
                                            <q-icon name="add_circle" style="font-size: 2rem; margin-right: 5px;" />
                                            <u style="text-decoration: underlined;">Add new contents policy type</u>
                                        </a>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>

                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Contents Policy Number <br/>
                                        <q-input square outlined dense v-model="contentsPolicyNumberInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Contents Sum Insured <br/>
                                        <q-input square outlined dense v-model="contentsSumInsuredInput" label="Type here" />
                                    </div>

                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Contents Policy Inception <br/>
                                        <q-input square outlined v-model="contentsPolicyInception" dense mask="date" :rules="['date']">
                                            <template v-slot:append>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                                        <q-date v-model="contentsPolicyInception" @input="() => $refs.qDateProxy.hide()" />
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Contents Policy Expiry <br/>
                                        <q-input square outlined v-model="contentsPolicyExpiry" dense mask="date" :rules="['date']">
                                            <template v-slot:append>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                                        <q-date v-model="contentsPolicyExpiry" @input="() => $refs.qDateProxy.hide()" />
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </div>

                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Contents Excess <br/>
                                        <q-input square outlined dense v-model="contentsExcessInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Contents R Excess <br/>
                                        <q-input square outlined dense v-model="contentsRExcessInput" label="Type here" />
                                    </div>

                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Contents Limit <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedContentsLimit"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>

                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Contents Limit Value <br/>
                                        <q-input square outlined dense v-model="contentsLimitValueInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>

                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        <a style="background-color: #fff; color: #41474F; border: none; cursor: pointer; padding: 0px 10px 0px 0px;">
                                            <q-icon name="add_circle" style="font-size: 2rem; margin-right: 5px;" />
                                            <u style="text-decoration: underlined;">Add another limit</u>
                                        </a>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>

                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Contents Limit for Gradual Deterioration <br/>
                                        <q-input square outlined dense v-model="contentsLimitInput" label="Type here" />
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>

                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        <a style="background-color: #fff; color: #41474F; border: none; cursor: pointer; padding: 0px 10px 0px 0px;">
                                            <q-icon name="add_circle" style="font-size: 2rem; margin-right: 5px;" />
                                            <u style="text-decoration: underlined;">Add another policy type</u>
                                        </a>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Select Product Type <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedProductType"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>

                                </div>
                            </q-expansion-item>
                        </q-list>
                        <q-list class="q-mb-md">
                            <q-expansion-item
                                class="claim-section-ei"
                                label="Other Information"
                                default-opened
                                id="otherInfo"
                            >
                                <div class="row justify-center bg-white q-col-gutter-x-md q-pl-lg q-pr-lg q-pt-md q-pb-md">

                                    <div class="col-sm-6 col-md-6 q-mt-sm text-regular">
                                        Property Occupancy <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedPropertyOccupancy"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>

                                    <div class="col-sm-12 col-md-12 q-mt-lg text-regular">
                                        Strata Claim
                                    </div>
                                    <div class="col-sm-1 col-md-1 q-mt-sm text-regular"></div>
                                    <div class="col-sm-2 col-md-2 q-mt-sm text-regular">
                                        <q-radio dense v-model="strataClaimRadio" val="yes" label="Yes" />
                                    </div>
                                    <div class="col-sm-2 col-md-2 q-mt-sm text-regular">
                                        <q-radio dense v-model="strataClaimRadio" val="no" label="No" />
                                    </div>
                                    <div class="col-sm-7 col-md-7 q-mt-sm text-regular"></div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Claim Form Status <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedClaimFormStatus"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>
                                    
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        Assign To <br/>
                                        <q-select
                                            clearable
                                            square
                                            outlined
                                            dense
                                            v-model="selectedAssignTo"
                                            use-input
                                            input-debounce="0"
                                            label="Please select"
                                            :options="defaultOptions"
                                            @filter="filterFn"
                                            behavior="menu"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                        No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>

                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular">
                                        <q-checkbox v-model="enableAccessCheckbox" color="green" size="sm" />
                                        Enable Online Access to Claimant Portal
                                    </div>
                                    <div class="col-sm-6 col-md-6 q-mt-lg text-regular"></div>
                                    
                                    <div class="col-sm-5 col-md-5 q-mt-lg text-regular">
                                        <q-radio dense v-model="chosenEmailRadio" val="registered" class="q-mb-xs" label="Registered Email" />
                                        <q-radio dense v-model="chosenEmailRadio" val="secondary" class="q-mt-xs" label="Secondary Email" />
                                    </div>
                                    <div class="col-sm-5 col-md-5 q-mt-lg text-regular">
                                        <q-radio dense v-model="chosenEmailRadio" val="primary" class="q-mb-xs" label="Primary Contact Email" />
                                        <q-radio dense v-model="chosenEmailRadio" val="other" class="q-mt-xs" label="Other Email" style="margin-bottom:10px;" />
                                        <q-input square outlined dense v-model="otherEmailInput" v-show="chosenEmailRadio === 'other'" label="Type here" />
                                    </div>

                                </div>
                            </q-expansion-item>
                        </q-list>
            
                        <q-uploader
                            flat
                            batch
                            square
                            multiple
                            label="Attachments"
                            id="attachments">
                            <template v-slot:list="scope">
                                <q-list separator>
                                    <template v-for="file in scope.files">
                                        <q-item :key="file.name">
                                            <q-item-section
                                                v-if="file.__img"
                                                thumbnail
                                                class="gt-xs cropped">
                                                <img :src="file.__img.src" />
                                            </q-item-section>    
                                            <q-item-section side>
                                                <q-item-label class="full-width ellipsis">
                                                    {{ file.name }}
                                                </q-item-label>
                                                <q-item-label caption>
                                                    {{ file.__sizeLabel }} / {{ file.__progressLabel }}
                                                </q-item-label>
                                            </q-item-section>                                
                                            <q-item-section top side>
                                                <q-btn
                                                    class="gt-xs"
                                                    size="12px"
                                                    flat
                                                    dense
                                                    round
                                                    icon="close"
                                                    @click="scope.removeFile(file)" />
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                </q-list>
                            </template>
                        </q-uploader>
                        
                    </q-scroll-area>
                </q-card-section>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script>
import FieldSelect from "shared/components/FieldSelect";

const stringOptions = ['Option 1', 'Option 2', 'Option 3']
const sampleSalutations = ['Mr.', 'Mrs.', 'Miss', 'Dr.', 'Ms.', 'Prof.', 'Rev.', 'Lady', 'Sir', 'Capt.']

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
        // expansions
        expandClaimDetails: true,
        expandPolicyHolder: false,
        expandAddresses: false,
        expandOtherInfo: false,
        expandPolicyDetails: false,

        stringOptions,
        defaultOptions: stringOptions,
        defaultSalutation: sampleSalutations,
        // start of selected v-model
        // -- claim details
        selectedProductLine: '',
        selectedInsurer: '',
        selectedInsurerStateOffice: '',
        selectedInsurerDepartment: '',
        selectedInsurerClaimsHandler: '',
        selectedBrokerOffice: '',
        selectedBroker: '',
        selectedSendReportTo: '',
        selectedEventCode: '',
        selectedEventType: '',
        selectedNotificationMethod: '',
        selectedInsurerInstruction: '',
        selectedAssessmentType: '',
        selectedIndemnityStatus: '',
        selectedClaimClassification: '',
        // -- policy holder
        selectedClaimantType: '',
        selectedSalutation: '',
        selectedpSalutation: '',
        selectedsSalutation: '',
        selectedPreferredContact: '',
        selectedpPreferredContact: '',
        selectedsPreferredContact: '',
        selectedTaxStatus: '',
        // -- addresses
        selectedSiteState: '',
        selectedIncidentState: '',
        selectedPostalState: '',
        selectedRegion: '',
        // -- policy details
        selectedBuildingPolicyType: '',
        selectedContentsPolicyType: '',
        selectedContentsLimit: '',
        selectedProductType: '',
        // -- other information
        selectedPropertyOccupancy: '',
        selectedClaimFormStatus: '',
        selectedAssignTo: '',
        // start of datepicker v-model
        // -- claim details
        claimReceived: '',
        dateOfLoss: '',
        // -- policy details
        buildingPolicyInception: '',
        buildingPolicyExpiry: '',
        contentsPolicyInception: '',
        contentsPolicyExpiry: '',
        // start of input v-model
        // -- claim details
        insurerReferenceNoInput: '',
        claimantReferenceNoInput: '',
        otherReferenceNoInput: '',
        claimDescriptionInput: '',
        insurerNotesInput: '',
        // -- policy holder
        firstNameInput: '',
        lastNameInput: '',
        workPhoneInput: '',
        homePhoneInput: '',
        mobilePhoneInput: '',
        emailInput: '',
        pfirstNameInput: '',
        plastNameInput: '',
        pworkPhoneInput: '',
        phomePhoneInput: '',
        pmobilePhoneInput: '',
        pemailInput: '',
        sfirstNameInput: '',
        slastNameInput: '',
        sworkPhoneInput: '',
        shomePhoneInput: '',
        smobilePhoneInput: '',
        semailInput: '',
        businessNameInput: '',
        businessPhoneInput: '',
        businessEmailInput: '',
        taxRegistrationNoInput: '',
        contactInstructionsInput: '',
        relationshipToClaimantInput: '',
        // -- addresses
        siteStreetAddressInput: '',
        siteSuburbInput: '',
        sitePostCodeInput: '',
        siteDirectionsInput: '',
        incidentStreetAddressInput: '',
        incidentSuburbInput: '',
        incidentPostCodeInput: '',
        incidentDirectionsInput: '',
        postalStreetAddressInput: '',
        postalSuburbInput: '',
        postalPostCodeInput: '',
        // -- policy details
        buildingPolicyNumberInput: '',
        buildingSumInsuredInput: '',
        buildingAreaInsuredInput: '',
        buildingExcessInput: '',
        buildingRExcessInput: '',
        buildingLimitInput: '',
        contentsPolicyNumberInput: '',
        contentsSumInsuredInput: '',
        contentsExcessInput: '',
        contentsRExcessInput: '',
        contentsLimitValueInput: '',
        contentsLimitInput: '',
        // -- other information
        otherEmailInput: '',
        // start of checkbox v-model
        toBeAdvisedCheckbox: true,
        sameAsClaimantCheckbox: false,
        sameAsSiteAddressCheckbox1: false,
        sameAsSiteAddressCheckbox2: false,
        enableAccessCheckbox: true,
        // start of radio v-model
        strataClaimRadio: '',
        chosenEmailRadio: 'primary',

        dialogModel: false,
    }),
    watch: {
        activate(value, oldValue) {
            this.dialogModel = value;
        }
    },
    methods: {
        closeDialog() {
            this.dialogModel = false;
            this.$emit("update:activate", this.dialogModel);
        },
        saveRegistration(){
            this.dialogModel = false;  
            this.$emit("update:activate", this.dialogModel);
            this.$router.push('/claim-summary');
            this.$q.notify({
                color: 'green',
                icon: 'thumb_up_alt',
                message: 'Save Success!',
                position: 'top',
                timeout: 1500
            });
        },
        onSubmit(event) {
            if(this.editAppointmentList){
                this.cancelAppointmentList();
            } else {
                this.closeDialog();
            }
        },
        filterFn (val, update) {
            if (val === '') {
                update(() => {
                    this.defaultOptions = stringOptions
                })
                return
            }

            update(() => {
                const needle = val.toLowerCase()
                this.defaultOptions = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
            })
        },
        expanded (val) {
            if(val === 1) {
                const element = document.getElementById('claimDetails');
                element.scrollIntoView({ behavior: 'smooth' });
            }else if(val === 2){
                const element = document.getElementById('policyHolder');
                element.scrollIntoView({ behavior: 'smooth' });
            }else if(val === 3){
                const element = document.getElementById('addresses');
                element.scrollIntoView({ behavior: 'smooth' });
            }else if(val === 4){
                const element = document.getElementById('policyDetails');
                element.scrollIntoView({ behavior: 'smooth' });
            }else if(val === 5){
                const element = document.getElementById('otherInfo');
                element.scrollIntoView({ behavior: 'smooth' });
            }else{
                const element = document.getElementById('attachments');
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },
        inputOrigToPrimary() {
            if(this.sameAsClaimantCheckbox == true){
                this.selectedpSalutation = this.selectedSalutation
                this.pfirstNameInput = this.firstNameInput
                this.plastNameInput = this.lastNameInput
                this.pworkPhoneInput = this.workPhoneInput
                this.phomePhoneInput = this.homePhoneInput
                this.pmobilePhoneInput = this.mobilePhoneInput
                this.pemailInput = this.emailInput
                this.selectedpPreferredContact = this.selectedPreferredContact
            }else {
                this.selectedpSalutation = ''
                this.pfirstNameInput = ''
                this.plastNameInput = ''
                this.pworkPhoneInput = ''
                this.phomePhoneInput = ''
                this.pmobilePhoneInput = ''
                this.pemailInput = ''
                this.selectedpPreferredContact = ''
            }
        },
        inputSiteToIncident() {
            if(this.sameAsSiteAddressCheckbox1 == true){
                this.incidentStreetAddressInput = this.siteStreetAddressInput
                this.incidentSuburbInput = this.siteSuburbInput
                this.selectedIncidentState = this.selectedSiteState
                this.incidentPostCodeInput = this.sitePostCodeInput
                this.incidentDirectionsInput = this.siteDirectionsInput
            }else{
                this.incidentStreetAddressInput = ''
                this.incidentSuburbInput = ''
                this.selectedIncidentState = ''
                this.incidentPostCodeInput = ''
                this.incidentDirectionsInput = ''
            }
        },
        inputSiteToPostal() {
            if(this.sameAsSiteAddressCheckbox2 == true) {
                this.postalStreetAddressInput = this.siteStreetAddressInput
                this.postalSuburbInput = this.siteSuburbInput
                this.selectedPostalState = this.selectedSiteState
                this.postalPostCodeInput = this.sitePostCodeInput
            }else{
                this.postalStreetAddressInput = ''
                this.postalSuburbInput = ''
                this.selectedPostalState = ''
                this.postalPostCodeInput = ''
            }
        }
    }
};
</script>

<style>
    .sticky-btn {
        text-transform: capitalize;
        box-shadow: none;
        margin-right: 5px;
    }
    .sticky-btn:hover {
        background-color: #6aa0db !important;
        color: #FFFFFF !important;
    }
    .sticky-btn .q-btn__wrapper {
        padding: 4px 10px;
    }
    .claim-registration-section {
        float: left;
        padding: 0;
        position: relative;
        width: 100%;
    }
    .claim-registration-section:last-of-type {
        bottom: 0;
        position: absolute;
        top: 140px;
    }
    .claim-registration-section .page__heading { 
        color: #41474F;
        margin: 0px 50px 0px 50px;
        padding-top: 50px;
        text-transform: none;
    }
    .claim-registration-section .filter-button {
        box-shadow: none;
        margin-top: 7px;
        max-width: unset;
        width: auto;
    }
    .claim-registration-section .filter-scroll {
        bottom: 10px;
        height: 100%;
        padding: 0 150px 30px;
        position: absolute;
        top:0;
        width: 100%;
    }
    .claim-registration-section .filter-button:first-of-type {
        margin-right: 15px;
    }
    .claim-registration-section .filter-button .q-btn__wrapper {
        min-height: 34px;
        padding: 3px 16px;
    }
    .claim-registration-section .filter-button .q-btn__wrapper:before {
        box-shadow: none;
    }
    .claim-registration-section .filter-button .q-btn__content {
        font-family: Myriad Pro Regular;
    }
    .claim-registration-section .pad-field-adjustment {
        padding-right: 15px;
    }
    .claim-registration-section .pad-adjustment {
        padding-right: 5px;
    }
    .claim-registration-section .table-container {
        margin-top: 30px;
        padding: 0 15px;
    }
    .claim-registration-section #appointmentLog1 {
        max-height: 361px; 
    }
    .claim-registration-section #appointmentLog2 {
        max-height: 755px;
    }
    .claim-registration-section .q-table__card {
        box-shadow: none;
    }
    .claim-registration-section .page__table >>> th:nth-last-child(2),
    .claim-registration-section .page__table td:nth-last-child(2),
    .claim-registration-section .page__table td:last-child { 
        text-align: left;
    }
    .claim-registration-section .page__table >>> th:first-child,
    .claim-registration-section .page__table td:first-child { 
        padding-left: 40px;
    }
    .claim-registration-section .page__table >>> th:last-child,
    .claim-registration-section .page__table td:last-child { 
        padding-right: 40px;
        text-align: left;
    }
    .claim-registration-section .page__table td:first-child { 
        font: 14px Myriad Pro Regular;
    }
    .claim-registration-section .page__table.no-hover .q-table tbody tr:hover {
        background-color: transparent!important;
        mix-blend-mode: normal;
    }
    .claim-registration-section .page__table.no-hover .q-table tbody tr.edit-mode:hover {
        background-color: #fef7ea!important;
    }
    .claim-registration-section .page__table.no-hover .q-table tbody tr.edit-mode  i.q-icon {
        color: #ccc!important;
        cursor: default!important;
    }
    .claim-registration-section .page__table.no-hover .q-table tbody td {
        vertical-align: top;
        white-space: normal;
    }
    .claim-registration-section .page__table.no-hover .q-table tbody td:before {
        background: rgba(0 ,0 ,0, 0);
    }
    .claim-registration-section .page__table.no-hover .q-table tr,
    .claim-registration-section .page__table.no-hover .q-table td {
        border-color: rgba(0, 0, 0, 0)!important;
    }
    .claim-registration-section .page__table.no-hover .q-table td.dl-description {
        border-top:1px solid rgba(0, 0, 0, 0.12)!important;
        padding-bottom: 30px;
    }
    .claim-registration-section .page__table.no-hover >>> .q-table__bottom {
        border-top: 0;
        min-height: 24px;
    }
    .claim-registration-section .page__table.no-hover >>> .q-table__bottom .q-table__control{
        display: none;
    }
    .claim-registration-section .bold {
        font: 14px Myriad Pro Semibold!important;
    }
    .claim-registration-section .dl-header {
        background: #CAD1E0;
        height: 32px;
    }
    .claim-registration-section .dl-time {
        min-width: 55px;
    }
    .claim-registration-section .dl-customer {
        max-width: 200px;
    }
    .claim-registration-section .dl-booked-details {
        max-width: 100px;
    }
    .details-container .details-field-container .notes >>> .q-field__control, 
    .details-container .details-field-container .notes {
        height: 60px;
    }
    .details-container .details-field-container .notes >>> .q-field__native  {
        min-height: 45px;
    }
    .details-header.adjust-top {
        margin-top: 32px;
    }
    .claim-registration-section .filter-scroll {
        padding: 0 50px 30px;
        }
    .claim-registration .q-uploader {
        width: 100%;
    }
    .claim-registration .q-uploader .details-container {
        padding: 0;
    }
    .claim-registration .q-uploader .details-field-container > label,
    .claim-registration .q-uploader .details-field-container {
        padding: 0;
    }
    .claim-registration .q-uploader .details-field-container > .q-field__control-container,
    .claim-registration .q-uploader .details-field-container .q-field__control-container  textarea {
        min-height: 150px;
        height: 150px;
    }
    .claim-registration .q-uploader__header {
        background-color: #f3f3f3;
    }
    .claim-registration .q-uploader__header-content {
        padding: 10px 25px;
    }
    .claim-registration .q-uploader__header-content > * {
        margin: 0;
    }
    .claim-registration .q-uploader__header-content > a.q-btn:nth-last-of-type(3) {
        display: none;
    }
    .claim-registration .q-uploader__header-content > a.q-btn:nth-of-type(3) .material-icons{
        color: #F2A100!important;
    }
    .claim-registration .q-uploader__title {
        color: #41474F;
        font-size: 19px;
        margin-top: 5px;
    }
    .claim-registration .q-uploader__subtitle {
        display: none;
    }
    .claim-registration .q-uploader__header-content > .q-btn .material-icons {
        color: #0660AE;
        font-size: 20px;
        right: -2px;
        top: 2px;
    }
    .claim-registration .q-uploader .q-item__section > .q-item__label:first-of-type {
        color: #41474F;
        font-size: 17px;
        font-weight: 600;
    }
    .claim-registration .q-uploader__list .q-list > .q-item {
        padding-top: 20px;
    }
    .claim-registration .q-uploader__list .q-list > .q-item:first-of-type { 
        padding-top: 10px;
    }
    .claim-registration .q-uploader__list {
        border-bottom: 0;
        border-left: 1px dashed #b5d0ed;
        border-right: 1px dashed #b5d0ed;
        border-top: 0;
        margin: 0;
        padding: 10px 25px;
    }
    .claim-registration .q-uploader__list.scroll:last-of-type {
        border-bottom: 1px dashed #b5d0ed;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        min-height: 100px;
        padding-bottom: 10px;
    }
    .claim-registration .q-uploader__list.scroll .q-item__section:nth-of-type(3) {
        padding: 0;
        position: absolute;
        right: 0;
        top: 25px;
    }
</style>
