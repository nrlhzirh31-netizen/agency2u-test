<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.update') + ' ' + $t('label.ansuran') + ' ' + $t('label.claimSubmission')" class="text-uppercase"></app-section-title>
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

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.code')" v-model.trim="data.code" :placeholder="$t(`label.code`)" fieldWidth="100%" :nonEditable="nonEditable.code"></app-form-field>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-date-picker
                      :label="$t('label.applicationDate')"
                      :selectedDateTime.sync="data.applicationDate"
                      date
                      clearable
                      :placeholder="$t(`label.applicationDate`)"
                      :min="new Date()"
                      :disabled="nonEditable.applicationDate"
                    ></app-date-picker>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.ansuranStatus')"
                      v-model.trim="data.ansuranStatus"
                      :items="ansuranStatusDdl"
                      :placeholder="$t(`label.ansuranStatus`)"
                      :nonEditable="nonEditable.ansuranStatus"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.claimStatus')"
                      v-model.trim="data.ansuranPayoutStatus"
                      :items="payoutDdl"
                      :placeholder="$t(`label.claimStatus`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.ansuranPayoutStatus"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.ansuranApplicationFirm')"
                      :items="ansuranApplicationFirmDdl"
                      v-model.trim="data.ansuranApplicationFirm"
                      :placeholder="$t(`label.ansuranApplicationFirm`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.ansuranApplicationFirm"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.productName')"
                      v-model.trim="data.productName"
                      :placeholder="$t(`label.productName`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.productName"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.productModel')"
                      v-model.trim="data.productModel"
                      :placeholder="$t(`label.productModel`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.productModel"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.productSerialNumber')"
                      v-model.trim="data.productSerialNumber"
                      :placeholder="$t(`label.productSerialNumber`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.productSerialNumber"
                    ></app-form-field>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.eMandate')"
                      v-model.trim="data.eMandate"
                      :items="documentStatusDdl"
                      :placeholder="$t(`label.eMandate`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.eMandate"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.creditAccountNumber')"
                      v-model.trim="data.creditAccountNumber"
                      :placeholder="$t(`label.creditAccountNumber`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.creditAccountNumber"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.deliveryOrderNumber')"
                      v-model.trim="data.deliveryOrderNumber"
                      :placeholder="$t(`label.deliveryOrderNumber`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.deliveryOrderNumber"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.invoiceNumber')"
                      v-model.trim="data.invoiceNumber"
                      :placeholder="$t(`label.invoiceNumber`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.invoiceNumber"
                    ></app-form-field>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-date-picker
                      :label="$t('label.warrantyStartDate')"
                      :selectedDateTime.sync="data.warrantyStartDate"
                      date
                      clearable
                      :placeholder="$t(`label.warrantyStartDate`)"
                      :min="new Date()"
                      :disabled="nonEditable.warrantyStartDate"
                    ></app-date-picker>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-date-picker
                      :label="$t('label.warrantyEndDate')"
                      :selectedDateTime.sync="data.warrantyEndDate"
                      date
                      clearable
                      :placeholder="$t(`label.warrantyEndDate`)"
                      :min="new Date()"
                      :disabled="nonEditable.warrantyEndDate"
                    ></app-date-picker>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.firstMonthPayment')"
                      v-model.trim="data.firstMonthPayment"
                      :placeholder="$t(`label.firstMonthPayment`)"
                      fieldWidth="100%"
                      :rules="$validators.requiredInputDdl()"
                      :nonEditable="nonEditable.firstMonthPayment"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.initialPayment')"
                      v-model.trim="data.initialPayment"
                      :placeholder="$t(`label.initialPayment`)"
                      fieldWidth="100%"
                      :rules="$validators.requiredInputDdl()"
                      :nonEditable="nonEditable.initialPayment"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.documentConsignmentNumber')"
                      v-model.trim="data.documentConsignmentNumber"
                      :placeholder="$t(`label.documentConsignmentNumber`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.documentConsignmentNumber"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.creditPrice')"
                      v-model.trim="data.creditPrice"
                      :placeholder="$t(`label.creditPrice`)"
                      fieldWidth="100%"
                      type="number"
                      :nonEditable="nonEditable.creditPrice"
                    ></app-form-field>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.installmentTerm')"
                      v-model.trim="data.installmentTerm"
                      :placeholder="$t(`label.installmentTerm`)"
                      fieldWidth="100%"
                      type="number"
                      :nonEditable="nonEditable.installmentTerm"
                    ></app-form-field>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.staffClaimAmount')"
                      v-model.trim="data.staffClaimAmount"
                      :placeholder="$t(`label.staffClaimAmount`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.staffClaimAmount"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.pcoCategory')"
                      :items="pcoCategoryDdl"
                      v-model.trim="data.pcoCategory"
                      :placeholder="$t(`label.pcoCategory`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.pcoCategory"
                    ></app-form-field>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field
                      :label="`${$t('label.pco')} (${pcoPercentage}%)`"
                      v-model.trim="data.pco"
                      :placeholder="$t(`label.pco`)"
                      fieldWidth="100%"
                      type="number"
                      :nonEditable="nonEditable.pco"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.remarks')"
                      v-model.trim="data.remarks"
                      type="remark"
                      :rows="5"
                      :maxLength="1000"
                      show-counter
                      :placeholder="$t(`label.remarks`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.remarks"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
              <v-row v-if="isRejected">
                <v-col cols="12">
                  <div class="pr-5">
                    {{ $t('label.rejectedReason') }}:
                    <b>{{ data.rejectedReason }}</b>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

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
          <app-button v-if="accessEdit" :text="$t('button.submit')" :action="updateAnsuranClaimSubmission" color="primary"></app-button>
        </v-col>
      </v-form>
    </div>
    <v-dialog persistent max-width="600px" :value="claimSubmissionRejectDialogDisplay">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ $t('label.rejectAnsuranClaimSubmission') }}:</span>
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
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <app-button v-if="accessEdit" :text="$t('button.close')" :action="closeRejectDialog" color="error" outlined></app-button>
          <app-button v-if="accessEdit" :text="$t('button.submit')" :action="rejectAnsuranClaimSubmission" color="primary"></app-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ROUTE_NAME, SESSION } from '@/constants'
import { searchHelper, permissionHelper, localizationHelper, ddlHelper } from '@/utils'
import {
  ANSURAN_CLAIM_SUBMISSION_DETAILS,
  ANSURAN_CLAIM_SUBMISSION_EDIT,
  ANSURAN_CLAIM_SUBMISSION_REJECT,
  SHOW_ANSURAN_CLAIM_SUBMISSION_REJECT,
  CLOSE_ANSURAN_CLAIM_SUBMISSION_REJECT
} from '@/store/ansuran-claim-submission.module'
import { LOOKUP_PAYOUT_DDL, LOOKUP_ANSURAN_STATUS_DDL, LOOKUP_PCO_CATEGORY_DDL, LOOKUP_ANSURAN_APPLICATION_FIRM_DDL } from '@/store/lookup.module'
import { moneyFormat } from '@/utils/filters.helper'

export default {
  name: 'AnsuranClaimSubmissionDetails',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.ANSURAN_CLAIM_SUBMISSION)

      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.ANSURAN_CLAIM_SUBMISSION, ACTION.UPDATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.ANSURAN_CLAIM_SUBMISSION_LIST) {
      searchHelper.clearSearch(SESSION.ANSURAN_CLAIM_SUBMISSION_SEARCH)
    }
    next()
  },
  props: {},
  data() {
    return {
      openPanelIndex: [0, 1],
      accessEdit: false,
      breadcrumbs: [
        {
          text: localizationHelper.getMessage('button.back'),
          disabled: false,
          to: {
            name: ROUTE_NAME.ANSURAN_CLAIM_SUBMISSION_LIST
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
        code: true,
        customerName: true,
        user: true,
        nric: true,
        phone: true,
        email: true,
        address1: true,
        address2: true,
        address3: true,
        city: true,
        postalCode: true,
        selectCountry: true,
        selectRegion: true,
        pco: true,
        applicationDate: true,
        ansuranStatus: true,
        productName: true,
        productModel: true,
        productSerialNumber: true,
        eMandate: true,
        creditAccountNumber: true,
        deliveryOrderNumber: true,
        invoiceNumber: true,
        warrantyStartDate: true,
        warrantyEndDate: true,
        firstMonthPayment: true,
        initialPayment: true,
        documentConsignmentNumber: true,
        creditPrice: true,
        installmentTerm: true,
        staffClaimAmount: true,
        pcoCategory: true,
        remarks: false,
        ansuranApplicationFirm: true
      },
      isRejected: false,
      documentStatusDdl: ddlHelper.getDocumentStatus(false, true),
      pcoPercentage: 0
    }
  },
  created() {
    /* Page Init */
    this.searchCriteria = searchHelper.retrieveSearch(SESSION.ANSURAN_CLAIM_SUBMISSION_SEARCH)
    this.getAnsuranClaimSubmission()
    this.getPayoutDdl()
    this.getAnsuranStatusDdl()
    this.getPcoCategoryDdl()
    this.getAnsuranApplicationFirmDdl()
  },
  mounted() {},
  computed: {
    data() {
      return this.$store.state.ansuranClaimSubmission.details
    },
    payoutDdl() {
      return this.$store.state.lookup.payoutDdl.filter((payoutStatus) => payoutStatus.value !== 3)
    },
    ansuranStatusDdl() {
      return this.$store.state.lookup.ansuranStatusDdl
    },
    tableRows() {
      return this.$store.state.ansuranClaimSubmission.details
    },
    pcoCategoryDdl() {
      return this.$store.state.lookup.pcoCategoryDdl
    },
    claimSubmissionRejectDialogDisplay() {
      return this.$store.state.ansuranClaimSubmission.claimSubmissionRejectDialogDisplay
    },
    isRejectedCheck() {
      if (this.ansuranStatusDdl.length > 0) {
        let status = this.ansuranStatusDdl.find((i) => i.text === 'Rejected')
        if (status && this.data && this.data.ansuranStatusDdl === status.value) return true
      }
      return false
    },
    ansuranApplicationFirmDdl() {
      return this.$store.state.lookup.ansuranApplicationFirmDdl
    }
  },
  watch: {},
  methods: {
    getAnsuranClaimSubmission() {
      this.$store.dispatch(`${ANSURAN_CLAIM_SUBMISSION_DETAILS}`, { id: this.searchCriteria.selectedRecordId })
    },
    getPayoutDdl() {
      this.$store.dispatch(`${LOOKUP_PAYOUT_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getAnsuranStatusDdl() {
      this.$store.dispatch(`${LOOKUP_ANSURAN_STATUS_DDL}`, { hasOptionAll: false, isActive: true, strValue: false })
    },
    updateAnsuranClaimSubmission() {
      if (this.$refs.updateForm.validate()) {
        let data = []
        this.data.payouts.forEach((i) => {
          let r = {
            payoutId: i.payoutId,
            ansuranPayoutStatus: 2,
            payoutDate: new Date(),
            page: 'detail'
          }
          data.push(r)
        })

        this.$store.dispatch(`${ANSURAN_CLAIM_SUBMISSION_EDIT}`, { data })
      }
    },
    getPcoCategoryDdl() {
      this.$store.dispatch(`${LOOKUP_PCO_CATEGORY_DDL}`, { hasOptionAll: false, isActive: true })
    },
    displayRejectDialog() {
      this.$store.dispatch(`${SHOW_ANSURAN_CLAIM_SUBMISSION_REJECT}`)
    },
    closeRejectDialog() {
      this.$store.dispatch(`${CLOSE_ANSURAN_CLAIM_SUBMISSION_REJECT}`)
    },
    rejectAnsuranClaimSubmission() {
      const data = {
        applicationId: this.data.id,
        reasonRemarks: this.data.reasonRemarks
      }
      this.closeRejectDialog()
      this.$store.dispatch(`${ANSURAN_CLAIM_SUBMISSION_REJECT}`, { data })
    },
    sumCommission() {
      if (!this.data.payouts) return
      return this.data.payouts.reduce((a, b) => a + (b.totalPayout || 0), 0)
    },
    getAnsuranApplicationFirmDdl() {
      this.$store.dispatch(`${LOOKUP_ANSURAN_APPLICATION_FIRM_DDL}`, { hasOptionAll: false, isActive: true, strValue: false })
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
