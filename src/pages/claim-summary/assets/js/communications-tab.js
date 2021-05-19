import InternalCommunications from "claimSummary/components/CommunicationsInternalModal"
import CallCommunications from "claimSummary/components/CommunicationsCallModal"
import EmailCommunications from "claimSummary/components/CommunicationsEmailModal"
import OtherCommunications from "claimSummary/components/CommunicationsOtherModal"

const stringOptions = ['Internal Only', 'Internal & Insurer', 'Everyone', 'Internal & Provider']

export default {
    components: {
        InternalCommunications,
        CallCommunications,
        EmailCommunications,
        OtherCommunications
    },
    data () {
        return {
            color: 'black',
            stringOptions,
            defaultOptions: stringOptions,
            selectedAccessLevel: ['Internal & Insurer'],
            notExpand : false,
            search : '',
            pagination: {
                rowsPerPage: 25
            },
            columns: [
                {
                    name: 'type',
                    align: 'left',
                    label: 'Type',
                    field: 'type',
                    sortable: true
                },
                {
                    name: 'accessLevel',
                    align: 'left',
                    label: 'Access Level',
                    field: 'accessLevel',
                    sortable: true
                },
                {
                    name: 'description',
                    align: 'left',
                    label: 'Description',
                    field: 'description',
                    sortable: true
                },
                {
                    name: 'dateAdded',
                    align: 'left',
                    label: 'Date Added',
                    field: 'dateAdded',
                    sortable: true
                },
                {
                    name: 'addedBy',
                    align: 'left',
                    label: 'Added By',
                    field: 'addedBy',
                    sortable: true
                }
            ],
            data: [
                {
                    type: 'CALL TO INSURER',
                    accessLevel: '',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit, odio eu vestibulum eleifend, dui nunc eleifend ligula, id consectetur arcu felis vel elit. Donec lacus diam, fermentum consectetur maximus id, auctor ac neque. Sed vel sapien a tortor aliquet gravida non id odio. Phasellus posuere rhoncus felis vel tincidunt. Maecenas ultrices nunc id orci aliquam suscipit. Mauris at tempus risus, ut molestie ipsum. Aenean dapibus varius condimentum. Cras tincidunt luctus dolor ac ornare. In tincidunt tincidunt orci, ut pretium elit tincidunt quis. Curabitur laoreet lorem at nisl dignissim, in lacinia lorem fermentum. Nullam pretium ut est sit amet scelerisque. Vestibulum lobortis vel dolor vitae consequat. Fusce non lacus ipsum. Phasellus lectus lacus, vehicula ut erat vel, accumsan feugiat mauris.',
                    dateAdded: '3/04/2020 15:57:18',
                    addedBy: 'Cherry Blossom',
                    expand: false
                },
                {
                    type: 'EMAIL TO INSURER',
                    accessLevel: '',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit, odio eu vestibulum eleifend, dui nunc eleifend ligula, id consectetur arcu felis vel elit. Donec lacus diam, fermentum consectetur maximus id, auctor ac neque. Sed vel sapien a tortor aliquet gravida non id odio. Phasellus posuere rhoncus felis vel tincidunt. Maecenas ultrices nunc id orci aliquam suscipit. Mauris at tempus risus, ut molestie ipsum. Aenean dapibus varius condimentum. Cras tincidunt luctus dolor ac ornare. In tincidunt tincidunt orci, ut pretium elit tincidunt quis. Curabitur laoreet lorem at nisl dignissim, in lacinia lorem fermentum. Nullam pretium ut est sit amet scelerisque. Vestibulum lobortis vel dolor vitae consequat. Fusce non lacus ipsum. Phasellus lectus lacus, vehicula ut erat vel, accumsan feugiat mauris.',
                    dateAdded: '23/04/2020 15:57:18',
                    addedBy: 'Cherry Blossom',
                    expand: true
                },
                {
                    type: 'CALL TO CLAIMANT',
                    accessLevel: '',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit, odio eu vestibulum eleifend, dui nunc eleifend ligula, id consectetur arcu felis vel elit. Donec lacus diam, fermentum consectetur maximus id, auctor ac neque. Sed vel sapien a tortor aliquet gravida non id odio. Phasellus posuere rhoncus felis vel tincidunt. Maecenas ultrices nunc id orci aliquam suscipit. Mauris at tempus risus, ut molestie ipsum. Aenean dapibus varius condimentum. Cras tincidunt luctus dolor ac ornare. In tincidunt tincidunt orci, ut pretium elit tincidunt quis. Curabitur laoreet lorem at nisl dignissim, in lacinia lorem fermentum. Nullam pretium ut est sit amet scelerisque. Vestibulum lobortis vel dolor vitae consequat. Fusce non lacus ipsum. Phasellus lectus lacus, vehicula ut erat vel, accumsan feugiat mauris.',
                    dateAdded: '2/04/2020 12:57:18',
                    addedBy: 'Will Power',
                    expand: false
                },
                {
                    type: 'EMAIL FROM INSURER',
                    accessLevel: '',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit, odio eu vestibulum eleifend, dui nunc eleifend ligula, id consectetur arcu felis vel elit. Donec lacus diam, fermentum consectetur maximus id, auctor ac neque. Sed vel sapien a tortor aliquet gravida non id odio. Phasellus posuere rhoncus felis vel tincidunt. Maecenas ultrices nunc id orci aliquam suscipit. Mauris at tempus risus, ut molestie ipsum. Aenean dapibus varius condimentum. Cras tincidunt luctus dolor ac ornare. In tincidunt tincidunt orci, ut pretium elit tincidunt quis. Curabitur laoreet lorem at nisl dignissim, in lacinia lorem fermentum. Nullam pretium ut est sit amet scelerisque. Vestibulum lobortis vel dolor vitae consequat. Fusce non lacus ipsum. Phasellus lectus lacus, vehicula ut erat vel, accumsan feugiat mauris.',
                    dateAdded: '15/04/2020 10:07:00',
                    addedBy: 'Ken Tucky',
                    expand: false
                },
                {
                    type: 'CALL FROM CLAIMANT',
                    accessLevel: '',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit, odio eu vestibulum eleifend, dui nunc eleifend ligula, id consectetur arcu felis vel elit. Donec lacus diam, fermentum consectetur maximus id, auctor ac neque. Sed vel sapien a tortor aliquet gravida non id odio. Phasellus posuere rhoncus felis vel tincidunt. Maecenas ultrices nunc id orci aliquam suscipit. Mauris at tempus risus, ut molestie ipsum. Aenean dapibus varius condimentum. Cras tincidunt luctus dolor ac ornare. In tincidunt tincidunt orci, ut pretium elit tincidunt quis. Curabitur laoreet lorem at nisl dignissim, in lacinia lorem fermentum. Nullam pretium ut est sit amet scelerisque. Vestibulum lobortis vel dolor vitae consequat. Fusce non lacus ipsum. Phasellus lectus lacus, vehicula ut erat vel, accumsan feugiat mauris.',
                    dateAdded: '17/04/2020 18:17:28',
                    addedBy: 'Cherry Blossom',
                    expand: false
                },
                {
                    type: 'CALL TO PROVIDER',
                    accessLevel: '',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit, odio eu vestibulum eleifend, dui nunc eleifend ligula, id consectetur arcu felis vel elit. Donec lacus diam, fermentum consectetur maximus id, auctor ac neque. Sed vel sapien a tortor aliquet gravida non id odio. Phasellus posuere rhoncus felis vel tincidunt. Maecenas ultrices nunc id orci aliquam suscipit. Mauris at tempus risus, ut molestie ipsum. Aenean dapibus varius condimentum. Cras tincidunt luctus dolor ac ornare. In tincidunt tincidunt orci, ut pretium elit tincidunt quis. Curabitur laoreet lorem at nisl dignissim, in lacinia lorem fermentum. Nullam pretium ut est sit amet scelerisque. Vestibulum lobortis vel dolor vitae consequat. Fusce non lacus ipsum. Phasellus lectus lacus, vehicula ut erat vel, accumsan feugiat mauris.',
                    dateAdded: '23/04/2020 5:23:18',
                    addedBy: 'Marge Arin',
                    expand: false
                },
                {
                    type: 'EMAIL TO INSURER -REPORT',
                    accessLevel: '',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit, odio eu vestibulum eleifend, dui nunc eleifend ligula, id consectetur arcu felis vel elit. Donec lacus diam, fermentum consectetur maximus id, auctor ac neque. Sed vel sapien a tortor aliquet gravida non id odio. Phasellus posuere rhoncus felis vel tincidunt. Maecenas ultrices nunc id orci aliquam suscipit. Mauris at tempus risus, ut molestie ipsum. Aenean dapibus varius condimentum. Cras tincidunt luctus dolor ac ornare. In tincidunt tincidunt orci, ut pretium elit tincidunt quis. Curabitur laoreet lorem at nisl dignissim, in lacinia lorem fermentum. Nullam pretium ut est sit amet scelerisque. Vestibulum lobortis vel dolor vitae consequat. Fusce non lacus ipsum. Phasellus lectus lacus, vehicula ut erat vel, accumsan feugiat mauris.',
                    dateAdded: '30/04/2020 2:01:11',
                    addedBy: 'Cliff Hanger',
                    expand: false
                },
                {
                    type: 'CALL TO  -FOLLOW UP',
                    accessLevel: '',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit, odio eu vestibulum eleifend, dui nunc eleifend ligula, id consectetur arcu felis vel elit. Donec lacus diam, fermentum consectetur maximus id, auctor ac neque. Sed vel sapien a tortor aliquet gravida non id odio. Phasellus posuere rhoncus felis vel tincidunt. Maecenas ultrices nunc id orci aliquam suscipit. Mauris at tempus risus, ut molestie ipsum. Aenean dapibus varius condimentum. Cras tincidunt luctus dolor ac ornare. In tincidunt tincidunt orci, ut pretium elit tincidunt quis. Curabitur laoreet lorem at nisl dignissim, in lacinia lorem fermentum. Nullam pretium ut est sit amet scelerisque. Vestibulum lobortis vel dolor vitae consequat. Fusce non lacus ipsum. Phasellus lectus lacus, vehicula ut erat vel, accumsan feugiat mauris.',
                    dateAdded: '23/04/2020 15:57:18',
                    addedBy: 'Ken Tucky',
                    expand: false
                },
                {
                    type: 'CALL TO PROVIDER',
                    accessLevel: '',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit, odio eu vestibulum eleifend, dui nunc eleifend ligula, id consectetur arcu felis vel elit. Donec lacus diam, fermentum consectetur maximus id, auctor ac neque. Sed vel sapien a tortor aliquet gravida non id odio. Phasellus posuere rhoncus felis vel tincidunt. Maecenas ultrices nunc id orci aliquam suscipit. Mauris at tempus risus, ut molestie ipsum. Aenean dapibus varius condimentum. Cras tincidunt luctus dolor ac ornare. In tincidunt tincidunt orci, ut pretium elit tincidunt quis. Curabitur laoreet lorem at nisl dignissim, in lacinia lorem fermentum. Nullam pretium ut est sit amet scelerisque. Vestibulum lobortis vel dolor vitae consequat. Fusce non lacus ipsum. Phasellus lectus lacus, vehicula ut erat vel, accumsan feugiat mauris.',
                    dateAdded: '12/04/2020 12:50:18',
                    addedBy: 'Marge Arin',
                    expand: false
                },
                {
                    type: 'CALL TO INSURER',
                    accessLevel: '',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque suscipit, odio eu vestibulum eleifend, dui nunc eleifend ligula, id consectetur arcu felis vel elit. Donec lacus diam, fermentum consectetur maximus id, auctor ac neque. Sed vel sapien a tortor aliquet gravida non id odio. Phasellus posuere rhoncus felis vel tincidunt. Maecenas ultrices nunc id orci aliquam suscipit. Mauris at tempus risus, ut molestie ipsum. Aenean dapibus varius condimentum. Cras tincidunt luctus dolor ac ornare. In tincidunt tincidunt orci, ut pretium elit tincidunt quis. Curabitur laoreet lorem at nisl dignissim, in lacinia lorem fermentum. Nullam pretium ut est sit amet scelerisque. Vestibulum lobortis vel dolor vitae consequat. Fusce non lacus ipsum. Phasellus lectus lacus, vehicula ut erat vel, accumsan feugiat mauris.',
                    dateAdded: '28/04/2020 08:17:18',
                    addedBy: 'Will Power',
                    expand: false
                }
            ],
            // start of filter values
            internalFilter: [
                { id: '1', name: 'Appointment Request - Estimator' },
                { id: '2', name: 'Appointment Request - Leveller' },
                { id: '3', name: 'Appointment Request - Other' },
                { id: '4', name: 'Appointment Request - Super Assessor' },
                { id: '5', name: 'Call From Assessor' },
                { id: '6', name: 'Claim Summary' },
                { id: '7', name: 'DFPP Cash Settlement' },
                { id: '8', name: 'Estimate Revision Notes' },
                { id: '9', name: 'External Payment Request' },
                { id: '10', name: 'Internal Meeting' },
                { id: '11', name: 'Internal Note' },
                { id: '12', name: 'Internal Time Record' },
                { id: '13', name: 'Land And Foundation Notification' },
                { id: '14', name: 'Makesafe Request' },
                { id: '15', name: 'Peer View Request' },
                { id: '16', name: 'Report Estimate Issue' },
                { id: '17', name: 'Tenders Required' },
                { id: '18', name: 'Triage Assessor' },
                { id: '19', name: 'Triage Specialist' }
            ],
            callFilter: [
                {
                    name: 'Call To Insurer',
                    children: [
                        { id: '1', name: 'To Insurer' }
                    ]
                },
                {
                    name: 'Call From Insurer',
                    children: [
                        { id: '2', name: 'From Insurer' }
                    ]
                },
                {
                    name: 'Call To Claimant',
                    children: [
                        { id: '3', name: 'To Claimant' }
                    ]
                },
                {
                    name: 'Call From Claimant',
                    children: [
                        { id: '4', name: 'From Claimant' }
                    ]
                },
                {
                    name: 'Call To Provider',
                    children: [
                        { id: '5', name: 'To Assessor' },
                        { id: '6', name: 'To Provider' },
                        { id: '7', name: 'To Specialist' },
                        { id: '8', name: 'To Provider' }
                    ]
                },
                {
                    name: 'Call From Provider',
                    children: [
                        { id: '9', name: 'From Assessor' },
                        { id: '10', name: 'From Provider' },
                        { id: '11', name: 'From Specialist' },
                        { id: '12', name: 'From Provider' }
                    ]
                },
                {
                    name: 'Call To EQC',
                    children: [
                        { id: '13', name: 'To EQC' }
                    ]
                },
                {
                    name: 'Call From EQC',
                    children: [
                        { id: '14', name: 'From EQC' }
                    ]
                }
            ],
            emailFilter: [
                {
                    name: 'Email To Insurer',
                    children: [
                        { id: '1', name: 'To Insurer' },
                        { id: '2', name: 'Cash Settlement/Own Provider' },
                        { id: '3', name: 'Claim Acknowledgement' },
                        { id: '4', name: 'Decision Required Report' },
                        { id: '5', name: 'Fee Invoice' },
                        { id: '6', name: 'Follow Up' },
                        { id: '7', name: 'No Contact' },
                        { id: '8', name: 'Report' },
                        { id: '9', name: 'Report With Invoices' },
                        { id: '10', name: 'Request Update' },
                        { id: '11', name: 'Variation Authorised' },
                        { id: '12', name: 'Variation Request' },
                        { id: '13', name: 'Legal Counsel' },
                        { id: '14', name: 'Subsequent Report' }
                    ]
                },
                {
                    name: 'Email From Insurer',
                    children: [
                        { id: '15', name: 'From Insurer' },
                        { id: '16', name: 'Legal Counsel' }
                    ]
                },
                {
                    name: 'Email To Claimant',
                    children: [
                        { id: '17', name: 'To Claimant' },
                        { id: '18', name: 'Appointment' },
                        { id: '19', name: 'Authorisation' },
                        { id: '20', name: 'Claim Accepted' },
                        { id: '21', name: 'Contents Schedule Attached' },
                        { id: '22', name: 'First Call No Answer' },
                        { id: '23', name: 'Repair Clearance' },
                        { id: '24', name: 'Request Contact' },
                        { id: '25', name: 'Specialist Report Required' },
                        { id: '26', name: 'Tender Authorisation' },
                        { id: '27', name: 'Tenders Received (No Response To Call)' },
                        { id: '28', name: 'Advocate/Lawyer' }
                    ]
                },
                {
                    name: 'Email From Claimant',
                    children: [
                        { id: '29', name: 'From Claimant' },
                        { id: '30', name: 'Advocate/Lawyer' }
                    ]
                },
                {
                    name: 'Email To Provider',
                    children: [
                        { id: '31', name: 'To Architect' },
                        { id: '32', name: 'To Provider - Excess Notification' },
                        { id: '33', name: 'To Assessor' },
                        { id: '34', name: 'To Fire Department' },
                        { id: '35', name: 'To Provider' },
                        { id: '36', name: 'To Provider - Payment Notification' },
                        { id: '37', name: 'To Provider - Stat & Completion Dates Follow Up' },
                        { id: '38', name: 'To Specialist' },
                        { id: '39', name: 'To Provider' }
                    ]
                },
                {
                    name: 'Email From Provider',
                    children: [
                        { id: '40', name: 'From Assessor' },
                        { id: '41', name: 'From Provider' },
                        { id: '42', name: 'From Specialist' },
                        { id: '43', name: 'From Provider' },
                        { id: '44', name: 'Email To EQC' },
                        { id: '45', name: 'To EQC' }
                    ]
                },
                {
                    name: 'Email From EQC',
                    children: [
                        { id: '46', name: 'From EQC' }
                    ]
                },
                {
                    name: 'Email - Jaes Referral',
                    children: [
                        { id: '47', name: 'Jaes Referral' }
                    ]
                },
                {
                    name: 'Email From Cera',
                    children: [
                        { id: '48', name: 'From Cera' }
                    ]
                },
                {
                    name: 'Email To Cera',
                    children: [
                        { id: '49', name: 'To Cera' }
                    ]
                },
                {
                    name: 'Email From Council',
                    children: [
                        { id: '50', name: 'From Council' }
                    ]
                },
                {
                    name: 'Email To Council',
                    children: [
                        { id: '51', name: 'To Council' }
                    ]
                },
                {
                    name: 'Email From Service Provider',
                    children: [
                        { id: '52', name: 'From Service Provider' }
                    ]
                },
                {
                    name: 'Email Introduction Letter',
                    children: [
                        { id: '53', name: 'Introduction Letter' }
                    ]
                }
            ],
            otherFilter: [
                { id: '1', name: 'Appointment Request - Geotech' },
                { id: '2', name: 'Claims Handler Introduction Call To Claimant' },
                { id: '3', name: 'Fax Sent To Insurer' },
                { id: '4', name: 'Fax Sent To Claimant' },
                { id: '5', name: 'Fax Sent To Assessor' },
                { id: '6', name: 'Fax Sent To Provider' },
                { id: '7', name: 'Financial Audit Details' },
                { id: '8', name: 'Follow Up' },
                { id: '9', name: 'Godfrey Hirst Approval' },
                { id: '10', name: 'Letter To Claimant' },
                { id: '11', name: 'Reserve Update' },
                { id: '12', name: 'Site Visit Report' }
            ],
            selectedInternal: [],
            selectedCall: [],
            selectedEmail: [],
            selectedOther: []
        }
    },
    methods: {
        toggleNotes(){
            this.notExpand = !this.notExpand;

            for(var x = 0; x < this.data.length ; x ++) {
                this.data[x].expand = this.notExpand;
            }
        },
        hasChild (scope) {
            return scope.opt.children.some(c => c.label === this.model)
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
        }
    }
}