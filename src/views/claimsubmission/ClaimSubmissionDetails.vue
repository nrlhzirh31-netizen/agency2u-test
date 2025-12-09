<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.updateClaimSubmission')" class="text-uppercase"></app-section-title>
    </v-row>
    <div class="mx-4">
      <v-form ref="updateForm">
        <v-expansion-panels v-model="openPanelIndex" multiple>
          <!-- Application Information -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.claimSubmissionDetails')" class="text-uppercase"></app-section-title>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-divider class="my-5 mt-0"></v-divider>
                </v-col>
              </v-row>

              <v-row class="py-4" no-gutters>
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.claimID')" v-model.trim="data.claimID" :placeholder="$t(`label.claimID`)" fieldWidth="100%" :nonEditable="true"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.claimStatus')"
                      v-model.trim="data.claimStatus"
                      :items="payoutDdl"
                      :placeholder="$t(`label.claimStatus`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.claimStatus"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.applicationStatus')"
                      v-model.trim="data.applicationStatus"
                      :items="applicationStatusDdl"
                      :placeholder="$t(`label.applicationStatus`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.applicationID')"
                      v-model.trim="data.applicationID"
                      :placeholder="$t(`label.applicationID`)"
                      fieldWidth="100%"
                      :nonEditable="true"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-date-picker
                      :label="$t('label.activatedDate')"
                      :selectedDateTime.sync="data.activatedDate"
                      date
                      clearable
                      :placeholder="$t(`label.activatedDate`)"
                      :disabled="nonEditable.activatedDate"
                    ></app-date-picker>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.agentID')" v-model.trim="data.agentID" :placeholder="$t(`label.agentID`)" fieldWidth="100%" :nonEditable="true"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.agentClaimDate')"
                      v-model.trim="data.agentClaimDate"
                      :placeholder="$t(`label.agentClaimDate`)"
                      fieldWidth="100%"
                      :nonEditable="true"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.orderNo')" v-model.trim="data.orderNo" :placeholder="$t(`label.orderNo`)" fieldWidth="100%" :nonEditable="true"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.eFormNo')" v-model.trim="data.eFormNo" :placeholder="$t(`label.eFormNo`)" fieldWidth="100%" :nonEditable="true"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.packageName')" v-model.trim="data.packageName" :placeholder="$t(`label.packageName`)" fieldWidth="100%" :nonEditable="true"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.packagePrice')" v-model.trim="data.packagePrice" :placeholder="$t(`label.packagePrice`)" fieldWidth="100%" :nonEditable="true"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.applicationType')"
                      v-model.trim="data.applicationType"
                      :placeholder="$t(`label.applicationType`)"
                      fieldWidth="100%"
                      :items="applicationTypeDdl"
                      :nonEditable="true"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.commissionRate')"
                      v-model.trim="data.commissionRate"
                      :placeholder="$t(`label.commissionRate`)"
                      fieldWidth="100%"
                      :nonEditable="true"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.remarks')" v-model.trim="data.remarks" :placeholder="$t(`label.remarks`)" fieldWidth="100%" :nonEditable="nonEditable.remarks"></app-form-field>
                  </div>
                </v-col>
              </v-row>
              <v-row v-if="isRejected">
                <v-col cols="12" class="pb-3">
                  <div class="pr-15">
                    {{ $t('label.rejectedReason') }}:
                    <b>{{ data.rejectedReason }}</b>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Down-line Commission Earnings -->
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.commissionEarning')" class="text-uppercase"></app-section-title>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col>
                  <v-data-table :headers="tableHeaders" :items="data.payouts" :no-data-text="$t('message.noRecordFound')" class="app-table-card" disable-sort item-key="id" :hide-default-footer="true">
                    <template v-slot:item.totalPayout="{ item }">
                      <div class="text-right pr-5">
                        {{ item.totalPayout | moneyFormat }}
                      </div>
                    </template>
                    <template slot="body.append">
                      <tr>
                        <td></td>
                        <td></td>
                        <td>
                          <div class="price-heading">Total</div>
                        </td>
                        <td>
                          <div class="text-right pr-5 font-weight-bold price-heading">{{ sumCommission() | moneyFormat }}</div>
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-col cols="12" class="text-right">
          <app-button v-if="accessEdit" :text="$t('button.rejectClaimSubmission')" :action="displayRejectDialog" color="error" outlined class="mr-6"></app-button>
          <app-button v-if="accessEdit" :text="$t('button.submit')" :action="updateClaimSubmission" color="primary"></app-button>
        </v-col>
      </v-form>
    </div>
    <v-dialog persistent max-width="600px" :value="claimSubmissionRejectDialogDisplay">
      <v-card>
        <v-card-title>
          <span class="text-h5">Reject Claim Submission</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="pr-15">
                  <app-form-field
                    :label="$t('label.reasonRemarks')"
                    v-model.trim="data.reasonRemarks"
                    :placeholder="$t(`label.reasonRemarks`)"
                    type="remark"
                    :rows="3"
                    :maxLength="1000"
                    show-counter
                    fieldWidth="100%"
                    clearable
                  ></app-form-field>
                </div>
                <!-- <div class="pr-15 pt-2" v-if="otherReasons">
                  <app-form-field v-model.trim="data.otherReasons" :placeholder="$t(`label.otherReasons`)" fieldWidth="100%"></app-form-field>
                </div> -->
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <app-button v-if="accessEdit" :text="$t('button.close')" :action="closeRejectDialog" color="error" outlined></app-button>
          <app-button v-if="accessEdit" :text="$t('button.submit')" :action="rejectClaimSubmission" color="primary"></app-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ROUTE_NAME, SESSION } from '@/constants'
import { searchHelper, permissionHelper, localizationHelper } from '@/utils'
import { CLAIM_SUBMISSION_DETAILS, CLAIM_SUBMISSION_EDIT, CLAIM_SUBMISSION_REJECT, SHOW_CLAIM_SUBMISSION_REJECT, CLOSE_CLAIM_SUBMISSION_REJECT } from '@/store/claimsubmission.module'
import { LOOKUP_PAYOUT_DDL, LOOKUP_APPLICATION_TYPE_DDL, LOOKUP_APPLICATION_STATUS_DDL } from '@/store/lookup.module'

export default {
  name: 'ClaimSubmissionDetails',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.CLAIM_SUBMISSION)

      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.CLAIM_SUBMISSION, ACTION.UPDATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.CLAIM_SUBMISSION_LIST) {
      searchHelper.clearSearch(SESSION.CLAIM_SUBMISSION_SEARCH)
    }
    next()
  },
  props: {},
  data() {
    return {
      openPanelIndex: [0, 1, 2],
      accessEdit: false,
      breadcrumbs: [
        {
          text: localizationHelper.getMessage('button.back'),
          disabled: false,
          to: {
            name: ROUTE_NAME.CLAIM_SUBMISSION_LIST
          },
          exact: true
        }
      ],
      tableHeaders: [
        {
          text: localizationHelper.getMessage('label.agentID'),
          class: 'caption',
          value: 'agentID'
        },
        {
          text: localizationHelper.getMessage('label.agentName'),
          class: 'caption',
          value: 'agentName'
        },
        {
          text: localizationHelper.getMessage('label.roles'),
          class: 'caption',
          value: 'role'
        },
        {
          text: localizationHelper.getMessage('label.claimAmount'),
          class: 'caption',
          align: 'end',
          value: 'totalPayout'
        }
      ],
      reasonRemarks: '',
      nonEditable: {
        claimStatus: false,
        activatedDate: false,
        remarks: false
      },
      isRejected: false
    }
  },
  created() {
    /* Page Init */
    this.searchCriteria = searchHelper.retrieveSearch(SESSION.CLAIM_SUBMISSION_SEARCH)
    this.getClaimSubmission()
    this.getPayoutDdl()
    this.getApplicationTypeDdl()
    this.getApplicationStatusDdl()
  },
  mounted() {},
  computed: {
    data() {
      return this.$store.state.claimsubmission.details
    },
    payoutDdl() {
      return this.$store.state.lookup.payoutDdl
    },
    applicationTypeDdl() {
      return this.$store.state.lookup.applicationTypeDdl
    },
    applicationStatusDdl() {
      return this.$store.state.lookup.applicationStatusDdl
    },
    tableRows() {
      return this.$store.state.claimsubmission.details
    },
    claimSubmissionRejectDialogDisplay() {
      return this.$store.state.claimsubmission.claimSubmissionRejectDialogDisplay
    },
    isRejectedCheck() {
      if (this.applicationStatusDdl.length > 0) {
        let status = this.applicationStatusDdl.find((i) => i.text === 'Rejected')
        if (status && this.data && this.data.applicationStatus === status.value) return true
      }
      return false
    }
  },
  watch: {},
  methods: {
    getClaimSubmission() {
      this.$store.dispatch(`${CLAIM_SUBMISSION_DETAILS}`, { id: this.searchCriteria.selectedRecordId })
    },
    getPayoutDdl() {
      this.$store.dispatch(`${LOOKUP_PAYOUT_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getApplicationTypeDdl() {
      this.$store.dispatch(`${LOOKUP_APPLICATION_TYPE_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getApplicationStatusDdl() {
      this.$store.dispatch(`${LOOKUP_APPLICATION_STATUS_DDL}`, { hasOptionAll: false, isActive: true, strValue: false })
    },
    updateClaimSubmission() {
      if (this.$refs.updateForm.validate()) {
        let data = []
        this.data.payoutId.forEach((i) => {
          let r = {
            payoutId: i,
            payoutStatus: 2,
            payoutDate: this.data.activatedDate
          }
          data.push(r)
        })

        this.$store.dispatch(`${CLAIM_SUBMISSION_EDIT}`, { data })
      }
    },
    displayRejectDialog() {
      this.$store.dispatch(`${SHOW_CLAIM_SUBMISSION_REJECT}`)
    },
    closeRejectDialog() {
      this.$store.dispatch(`${CLOSE_CLAIM_SUBMISSION_REJECT}`)
    },
    rejectClaimSubmission() {
      const data = {
        applicationId: this.data.id,
        reasonRemarks: this.data.reasonRemarks
      }
      this.closeRejectDialog()
      this.$store.dispatch(`${CLAIM_SUBMISSION_REJECT}`, { data })
    },
    sumCommission() {
      if (!this.data.payouts) return
      return this.data.payouts.reduce((a, b) => a + (b.totalPayout || 0), 0)
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
