<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <v-col cols="auto" class="text-left">
        <app-section-title :title="$t('label.ansuran') + ' ' + $t('label.claimPayoutDetails')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
      </v-col>
    </v-row>
    <div class="mx-4">
      <v-form ref="updateForm">
        <v-expansion-panels v-model="openPanelIndex" multiple>
          <!-- Agent Information -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.agentInfo')" class="text-uppercase"></app-section-title>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-divider class="my-5 mt-0"></v-divider>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.agentName')" v-model.trim="data.agentName" :placeholder="$t(`label.agentName`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.nric')" v-model.trim="data.nric" :placeholder="$t(`label.nric`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.phone')" v-model.trim="data.phone" :placeholder="$t(`label.phone`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.email')" v-model.trim="data.email" :placeholder="$t(`label.email`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.bankAcc')" v-model.trim="data.bankAcc" :placeholder="$t(`label.bankAcc`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.bankName')" v-model.trim="data.bankName" :placeholder="$t(`label.bankName`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      v-if="data.companyName"
                      :label="$t('label.companyName')"
                      v-model.trim="data.companyName"
                      :placeholder="$t(`label.companyName`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      v-if="data.businessRegNo"
                      :label="$t('label.businessRegNo')"
                      v-model.trim="data.businessRegNo"
                      :placeholder="$t(`label.businessRegNo`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      v-if="data.companyBankAcc"
                      :label="$t('label.companyBankAcc')"
                      v-model.trim="data.companyBankAcc"
                      :placeholder="$t(`label.companyBankAcc`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      v-if="data.companyBankName"
                      :label="$t('label.companyBankName')"
                      v-model.trim="data.companyBankName"
                      :placeholder="$t(`label.companyBankName`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.updateClaimPayout')" class="text-uppercase"></app-section-title>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-divider class="my-5 mt-0"></v-divider>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-date-picker :label="$t('label.transactionDate')" :selectedDateTime.sync="data.payoutDate" date clearable :placeholder="$t(`label.transactionDate`)"></app-date-picker>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.paymentVoucherNumber')"
                      v-model.trim="data.paymentVoucherNumber"
                      :placeholder="$t(`label.paymentVoucherNumber`)"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <!-- <v-container class="py-0">
                  <v-row align="center" justify="start">
                    <v-col v-for="(selection, i) in reasonTemplateDdl" :key="selection.text" class="shrink">
                      <v-chip :disabled="loading" close @click:close="selected.splice(i, 1)">
                        <v-icon left v-text="selection.icon"></v-icon>
                        {{ selection.text }}
                      </v-chip>
                    </v-col>

                    <v-col v-if="!allSelected" cols="12">
                      <v-text-field ref="search" v-model="search" full-width hide-details label="Search" single-line></v-text-field>
                    </v-col>
                  </v-row>
                </v-container> -->
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.ansuranApplication')" class="text-uppercase"></app-section-title>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutters>
                <!-- Table -->
                <v-col cols="12">
                  <v-row>
                    <v-col>
                      <v-data-table
                        v-model="selectedRows"
                        :headers="tableHeaders"
                        :items="ansuranApplications"
                        :items-per-page="pageSize"
                        :no-data-text="$t('message.noRecordFound')"
                        class="app-table-card"
                        disable-sort
                        item-key="payoutId"
                        show-select
                        unselectable
                      >
                        <template v-slot:item.staffClaimAmount="{ item }">
                          <div class="text-right pr-5">
                            {{ item.staffClaimAmount | moneyFormat }}
                          </div>
                        </template>
                        <template v-slot:item.creditPrice="{ item }">
                          <div class="text-right">
                            {{ item.creditPrice | moneyFormat }}
                          </div>
                        </template>
                        <template v-slot:top>
                          <v-row no-gutters class="text-right">
                            <v-col class="text-right">
                              <app-button v-if="accessEdit" :text="$t('button.noPayment')" :action="displayNoPaymentDialog" color="red accent-2" class="mr-5"></app-button>
                              <app-button v-if="accessEdit" :text="$t('button.complete')" :action="updateClaim" color="primary"></app-button>
                            </v-col>
                          </v-row>
                        </template>
                        <template slot="body.append">
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                              <div class="text-right pr-5">{{ $t('label.total') }}</div>
                            </td>
                            <td>
                              <div class="text-right pr-5 price-heading">{{ sumTotal | moneyFormat }}</div>
                            </td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td colspan="2">
                              <div class="text-right pr-5">
                                <span class="text-right">{{ commissionTier ? commissionTier.description : null }}</span>
                                <br />
                                <span class="price-heading">{{ $t('label.commissionEarning') }}</span>
                              </div>
                            </td>
                            <td>
                              <div class="text-right pr-5 font-weight-bold price-heading">{{ sumClaimAmount | moneyFormat }}</div>
                            </td>
                          </tr>
                        </template>
                      </v-data-table>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-form>
    </div>

    <v-dialog persistent max-width="600px" :value="payoutNoPaymentDialogDisplay">
      <v-card>
        <v-card-title>
          <span class="text-h5">No Payment</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="pr-15">
                  <app-form-field
                    :label="$t('label.reasonRemarks')"
                    v-model.trim="data.reasonTemplatesId"
                    :items="reasonTemplatesDdl"
                    :placeholder="$t(`label.reasonRemarks`)"
                    fieldWidth="100%"
                  ></app-form-field>
                </div>
                <div class="pr-15 pt-2" v-if="otherReasons">
                  <app-form-field v-model.trim="data.otherReasons" :placeholder="$t(`label.otherReasons`)" fieldWidth="100%"></app-form-field>
                </div>
              </v-col>
              <v-col cols="12" v-if="data.reasonTemplatesId === 3">
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
                <div class="pr-15 pt-2" v-if="otherReasons">
                  <app-form-field v-model.trim="data.otherReasons" :placeholder="$t(`label.otherReasons`)" fieldWidth="100%"></app-form-field>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <app-button v-if="accessEdit" :text="$t('button.close')" :action="closeNoPaymentDialog" color="red accent-1"></app-button>
          <app-button v-if="accessEdit" :text="$t('button.submit')" :action="updateNoPayment" color="primary"></app-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ROUTE_NAME, SESSION, SHARED } from '@/constants'
import { searchHelper, permissionHelper, localizationHelper, sharedHelper } from '@/utils'
import { ANSURAN_CLAIM_PAYOUT_DETAILS, ANSURAN_CLAIM_PAYOUT_EDIT, ANSURAN_CLAIM_PAYOUT_DETAILS_RESET, ANSURAN_CLAIM_PAYOUT_CANCEL } from '@/store/ansuran-claim-payout.module'
import { LOOKUP_REASON_TEMPLATE_DDL } from '@/store/lookup.module'
import { SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG, SHARED_SHOW_PAYOUT_NO_PAYMENT, SHARED_CLOSE_PAYOUT_NO_PAYMENT } from '@/store/shared.module'
import { isEmpty } from '@/utils/validation.helper'
import { ANSURAN_COMMISSION_RATE_LIST } from '@/store/ansuran-commission-rate.module'

export default {
  name: 'AnsuranClaimPayoutDetails',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.ANSURAN_CLAIM_PAYOUT)

      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.ANSURAN_CLAIM_PAYOUT, ACTION.UPDATE)
      t.accessView = permissionHelper.isAuthorizedAction(MODULE_ID.ANSURAN_CLAIM_PAYOUT, ACTION.READ)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.ANSURAN_CLAIM_PAYOUT_LIST) {
      searchHelper.clearSearch(SESSION.ANSURAN_CLAIM_PAYOUT_SEARCH)
    }
    this.$store.dispatch(`${ANSURAN_CLAIM_PAYOUT_DETAILS_RESET}`)
    next()
  },
  props: {},
  data() {
    return {
      selectedRows: [],
      openPanelIndex: [0, 1, 2],
      accessView: false,
      accessEdit: false,
      tableRowsFiltered: [],
      searchApplicationCriteria: {
        applicationId: SHARED.DEFAULT_ALL_VALUE_STR
      },
      breadcrumbs: [
        {
          text: localizationHelper.getMessage('button.back'),
          disabled: false,
          to: {
            name: ROUTE_NAME.ANSURAN_CLAIM_PAYOUT_LIST
          },
          exact: true
        }
      ],
      tableHeaders: [
        {
          text: localizationHelper.getMessage('label.applicationID'),
          class: 'caption',
          value: 'code'
        },
        { text: localizationHelper.getMessage('label.ansuranApplicationFirm'), class: 'caption', value: 'ansuranApplicationFirm' },
        {
          text: localizationHelper.getMessage('label.customerNameOnly'),
          class: 'caption',
          value: 'customerName'
        },
        {
          text: localizationHelper.getMessage('label.productName'),
          class: 'caption',
          value: 'productName'
        },
        {
          text: localizationHelper.getMessage('label.claimDate'),
          class: 'caption',
          align: 'center',
          value: 'payoutDate'
        },
        {
          text: localizationHelper.getMessage('label.installmentTerm'),
          class: 'caption',
          align: 'center',
          value: 'installmentTerm'
        },
        {
          text: localizationHelper.getMessage('label.creditPrice'),
          class: 'caption',
          align: 'right',
          value: 'creditPrice',
          width: '10%'
        },

        {
          text: localizationHelper.getMessage('label.staffClaimAmount'),
          class: 'caption',
          align: 'center',
          value: 'staffClaimAmount'
        }
      ],
      pageSize: SHARED.DEFAULT_PAGE_SIZE,
      otherReasons: false,
      totalStaffClaimAmount: 0,
      sumClaimAmount: 0,
      sumTotal: 0,
      commissionTier: null
    }
  },
  created() {
    /* Page Init */
    this.searchCriteria = searchHelper.retrieveSearch(SESSION.ANSURAN_CLAIM_PAYOUT_SEARCH)
    this.getClaimPayout()
    this.getReasonTemplatesDdl()
  },
  mounted() {},
  computed: {
    data() {
      return this.$store.state.ansuranClaimPayout.details
    },
    ansuranApplications() {
      if (Array.isArray(this.data.ansuranApplications)) {
        return this.data.ansuranApplications
      } else {
        return []
      }
    },
    reasonTemplatesDdl() {
      return this.$store.state.lookup.reasonTemplateDdl
    },
    payoutNoPaymentDialogDisplay() {
      return this.$store.state.shared.payoutNoPaymentDialogDisplay
    },
    commissionRateDdl() {
      return this.$store.state.ansuranCommissionRate.list
    }
  },
  watch: {
    data: {
      handler(newVal, oldVal) {
        if (!oldVal.role && !oldVal.role.code) {
          this.getAnsuranCommissionRateList(newVal.role.code)
        }
      }
    },
    selectedRows(newVal) {
      this.onSelectionChange(newVal)
    }
  },
  methods: {
    getClaimPayout() {
      return this.$store.dispatch(`${ANSURAN_CLAIM_PAYOUT_DETAILS}`, { id: this.searchCriteria.selectedRecordId, applicationId: this.searchCriteria.selectedRecordId })
    },
    updateClaim() {
      let claims = this.checkClaimsSelected(this.selectedRows)
      if (!claims) return

      let data = this.selectedRows.map((item) => {
        // Pastikan semua numeric field diset
        const payoutId = Number(item.payoutId || 0)
        const payoutDate = this.data.payoutDate || new Date().toISOString()
        const staffClaimAmount = Number(this.sumClaimAmount || 0)
        const commissionAmount = Number(this.commissionTier?.commissionAmount || 0)

        return {
          payoutId,
          ansuranPayoutStatus: 3,
          payoutDate,
          paymentVoucherNumber: this.data.paymentVoucherNumber || '',
          staffClaimAmount,
          commissionTier: {
            amountType: this.commissionTier?.amountType || 'PERCENTAGE',
            commissionAmount
          }
        }
      })

      this.$store.dispatch(`${ANSURAN_CLAIM_PAYOUT_EDIT}`, { data })
    },

    getReasonTemplatesDdl() {
      this.$store.dispatch(`${LOOKUP_REASON_TEMPLATE_DDL}`, { hasOptionAll: false, isActive: true })
    },
    onSelectionChange(selection) {
      if (!selection || selection.length === 0) {
        this.sumTotal = 0
        this.sumClaimAmount = 0
        this.commissionTier = { commissionAmount: 0, amountType: 'PERCENTAGE' }
        return
      }

      // 1️⃣ Kira jumlah total payout (gunakan creditPrice atau staffClaimAmount)
      this.sumTotal = selection.reduce((acc, item) => acc + Number(item.creditPrice || 0), 0)

      // 2️⃣ Ambil rate ikut role user (role tidak diubah)
      const commissionRates = this.commissionRateDdl?.data?.filter((item) => item.roleObj?.code === this.data.role?.code) || []

      // 3️⃣ Cari tier berdasarkan range
      this.commissionTier = commissionRates.find((item) => this.sumTotal >= Number(item.fromAmount || 0) && this.sumTotal <= Number(item.toAmount || 0))

      // 4️⃣ Jika tiada tier jumpa
      if (!this.commissionTier) {
        this.sumClaimAmount = 0
        this.commissionTier = { commissionAmount: 0, amountType: 'PERCENTAGE' }
        return
      }

      // 5️⃣ Kiraan commission
      this.sumClaimAmount = (this.sumTotal * Number(this.commissionTier.commissionAmount || 0)) / 100

      // ✅ Pastikan bukan NaN
      if (isNaN(this.sumClaimAmount)) this.sumClaimAmount = 0
    },

    checkClaimsSelected(claims) {
      if (isEmpty(claims)) {
        let buttonAction = () => {
          this.$store.dispatch(`${SHARED_CLOSE_DIALOG}`, {}, { root: true })
        }
        let msg = localizationHelper.getMessage(`error.noSelectClaims`)
        let messageDialog = sharedHelper.getErrorReloadPageDialog(localizationHelper.getMessage(`label.error`), msg, 'ok', buttonAction)
        this.$store.dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog)
        return false
      }
      return true
    },
    displayNoPaymentDialog() {
      let claims = this.checkClaimsSelected(this.selectedRows)
      if (!claims) return
      this.$store.dispatch(`${SHARED_SHOW_PAYOUT_NO_PAYMENT}`)
    },
    closeNoPaymentDialog() {
      this.$store.dispatch(`${SHARED_CLOSE_PAYOUT_NO_PAYMENT}`)
    },
    updateNoPayment() {
      let data = this.selectedRows.map((item) => {
        return {
          payoutId: Number(item.payoutId) || 0,
          ansuranPayoutStatus: 3,
          payoutDate: this.data.payoutDate,
          paymentVoucherNumber: this.data.paymentVoucherNumber,
          reasonTemplatesId: this.data.reasonTemplatesId,
          reasonRemarks: this.data.reasonRemarks
        }
      })
      this.closeNoPaymentDialog()
      this.$store.dispatch(`${ANSURAN_CLAIM_PAYOUT_CANCEL}`, { data })
    },
    getAnsuranCommissionRateList(roleCode) {
      this.$store.dispatch(`${ANSURAN_COMMISSION_RATE_LIST}`, { filter: { role: roleCode } })
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
