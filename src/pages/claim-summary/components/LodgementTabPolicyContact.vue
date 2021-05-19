<template>
  <div class="row claiminfo q-pb-lg">
                    <div class="claiminfo-heading col-12">Contact</div>
                           <q-card class="col-lg-3 col-md-3 col-sm-6 row claiminfo-card">
                                   <div class="claimcontact-label col-12">Primary</div>
                                  <div class="claimcontact-span col-12">Will Power</div>
                                  <div  class="claimcontact-span col-12">Claims Handler</div>
                                  <div  class="claimcontact-span col-12"><i class="fa fa-phone q-pr-sm" aria-hidden="true"></i>(02)67326185</div>
                                  <div  class="claimcontact-span col-12"><i class="fa fa-mobile q-pr-sm" aria-hidden="true"></i>61 491 570 156</div>
                                  <div  class="claimcontact-span col-12"><i class="fa fa-at q-pr-sm" aria-hidden="true"></i>willpower@samplemail.com</div>
                           </q-card>
                          
                             <q-card class="col-lg-3 col-md-3 col-sm-6 row claiminfo-card">
                                  <div class="claimcontact-label col-12">Secondary</div>
                                  <div class="claimcontact-span col-12">Will Power</div>
                                  <div  class="claimcontact-span col-12">Claims Handler</div>
                                  <div  class="claimcontact-span col-12"><i class="fa fa-phone q-pr-sm" aria-hidden="true"></i>(02)67326185</div>
                                  <div  class="claimcontact-span col-12"><i class="fa fa-mobile q-pr-sm" aria-hidden="true"></i> 491 570 156</div>
                                  <div  class="claimcontact-span col-12"><i class="fa fa-at q-pr-sm" aria-hidden="true"></i>willpower@samplemail.com</div>
                           </q-card>
                
                             <q-card class="col-lg-3 col-md-3 col-sm-6 row claiminfo-card">
                                  <div class="claimcontact-label col-12">Client Department</div>
                                  <div  class="claimcontact-span col-12"><i class="fa fa-user q-pr-sm" aria-hidden="true"></i>Catastrophe Team</div>
                                  <div  class="claimcontact-span col-12"><i class="fa fa-globe q-pr-sm" aria-hidden="true"></i>Manaku</div>
                                  <div class="claimcontact-span col-12">&nbsp;</div>
                                  <div class="claimcontact-span col-12">&nbsp;</div>
                                  <div class="claimcontact-span col-12">&nbsp;</div>
                           </q-card>
                
                          <q-card class="col-lg-3 col-md-3 col-sm-6 row claiminfo-card">
                                  <div class="claimcontact-label col-12">Client Claim Handler</div>
                                  <div  class="claimcontact-span col-12">Kaylam Stein</div>
                                  <div  class="claimcontact-span col-12"><i class="fa fa-phone q-pr-sm" aria-hidden="true"></i>09 785 7895</div>
                                  <div class="claimcontact-span col-12">&nbsp;</div>
                                  <div class="claimcontact-span col-12">&nbsp;</div>
                                  <div class="claimcontact-span col-12">&nbsp;</div>
                           </q-card>

                           <q-card class="col-lg-12 col-md-12 col-sm-12 row claiminfo-card q-pb-lg">
                                  <div class="claiminfo-label col-12">NOTES</div>
                                  <div  class="claiminfo-span col-12">  
                                         <q-input
                                                 v-model="text"
                                                 filled
                                                 type="textarea"
                                                 class="contact-notes q-mt-sm q-mr-lg"
                                                 />
                                  </div>
                           </q-card>
                            <div class="claiminfo-heading col-12">Policy Details</div>

                             <q-card class="col-lg-3 col-md-6 col-sm-12 row claiminfo-card q-pt-lg">
                                   <div class="col-12"><span class="claimpolicy-label">Policy Holder Type:</span><span class="claimpolicy-span">Demo Company</span></div>  
                             </q-card>
                          
                             <q-card class="col-lg-3 col-md-6 col-sm-12 row claiminfo-card q-pt-lg">
                                   <div class="col-12"><span class="claimpolicy-label">Policy Holder Name:</span><span class="claimpolicy-span">Will Power</span></div>  
                             </q-card>
                
                            <q-card class="col-lg-3 col-md-6 col-sm-12 row claiminfo-card q-pt-lg">
                                   <div class="col-12"><span class="claimpolicy-label">GST Registration No.:</span><span class="claimpolicy-span">123 456 789</span></div>  
                             </q-card>
                           
                            <q-card class="col-lg-3 col-md-6 col-sm-12 row claiminfo-card q-pt-lg">
                                   <div class="col-12"><span class="claimpolicy-label">Business Registration No.:</span><span class="claimpolicy-span">987 654 321</span></div>  
                             </q-card>
                             <div class="col-lg-6 col-md-6 col-sm-12">
                             <q-card class="policy-details q-ma-lg">
                                   <div class="claimpolicy-heading col-12">BUILDING</div>
                                      <div class="row">
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-my-md"><span class="claimpolicy-label">Policy Type:</span></div>  
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-my-md"><span class="claimpolicy-span">Test</span></div>  
                                          <div class="col-lg-4 col-md-6 col-sm-6 q-my-md"><span class="claimpolicy-label">Policy Number:</span></div>  
                                          <div class="col-lg-2 col-md-6 col-sm-6 q-my-md"><span class="claimpolicy-span">98765</span></div>  
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-label">Policy Inception:</span></div>  
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-span">Test</span></div>  
                                          <div class="col-lg-4 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-label">Policy Expiry:</span></div>
                                          <div class="col-lg-2 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-span">2/10/21</span></div>
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-label">Sum Insured:</span></div>  
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-span">$123.00</span></div>  
                                          <div class="col-lg-4 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-label">Excess:</span></div>  
                                          <div class="col-lg-2 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-span">$678.00</span></div>  
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-label">R Excess:</span></div>  
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-span">$567.00</span></div>  
                                          <div class="col-lg-4 col-md-9 col-sm-8 q-mb-md"><span class="claimpolicy-label">Limit for Gradual Deterioration:</span></div>
                                          <div class="col-lg-2 col-md-3 col-sm-4 q-mb-md"><span class="claimpolicy-span">$989.00</span></div>
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-mb-lg"><span class="claimpolicy-label">Area Insured sqm:</span></div>     
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-mb-lg"><span class="claimpolicy-span">50</span></div>  
                                      </div>
                             </q-card>
                             </div>
                             <div class="col-lg-6 col-md-6 col-sm-12">
                             <q-card class="policy-details q-ma-lg">
                                   <div class="claimpolicy-heading col-12">CONTENTS</div>
                                   <div class="row">
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-my-md"><span class="claimpolicy-label">Policy Type:</span></div>  
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-my-md"><span class="claimpolicy-span">Test</span></div>  
                                          <div class="col-lg-4 col-md-6 col-sm-6 q-my-md"><span class="claimpolicy-label">Policy Number:</span></div>  
                                          <div class="col-lg-2 col-md-6 col-sm-6 q-my-md"><span class="claimpolicy-span">98765</span></div>  
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-label">Policy Inception:</span></div>  
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-span">Test</span></div>  
                                          <div class="col-lg-4 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-label">Policy Expiry:</span></div>
                                          <div class="col-lg-2 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-span">2/10/21</span></div>
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-label">Sum Insured:</span></div>  
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-span">$123.00</span></div>  
                                          <div class="col-lg-4 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-label">Excess:</span></div>  
                                          <div class="col-lg-2 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-span">$678.00</span></div>  
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-label">R Excess:</span></div>  
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-mb-md"><span class="claimpolicy-span">$567.00</span></div>  
                                          <div class="col-lg-4 col-md-9 col-sm-8 q-mb-md"><span class="claimpolicy-label">Limit for Gradual Deterioration:</span></div>
                                          <div class="col-lg-2 col-md-3 col-sm-4 q-mb-md"><span class="claimpolicy-span">$989.00</span></div>
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-mb-lg"><span class="claimpolicy-label">Limit for:</span></div>     
                                          <div class="col-lg-3 col-md-6 col-sm-6 q-mb-lg"><span class="claimpolicy-span">50</span></div>  
                                          <div class="col-lg-4 col-md-6 col-sm-6 q-mb-lg"><span class="claimpolicy-label">Limit:</span></div>     
                                          <div class="col-lg-2 col-md-6 col-sm-6 q-mb-lg"><span class="claimpolicy-span">50</span></div>  
                                      </div>
                             </q-card>
                             </div>

                  </div><!-- end  policy -->
               
</template>