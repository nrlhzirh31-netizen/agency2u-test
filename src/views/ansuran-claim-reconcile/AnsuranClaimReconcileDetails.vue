<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.ansuran') + ' ' + $t('label.claimReconcile')" class="text-uppercase"></app-section-title>
    </v-row>
    <div class="mx-4">
      <v-form ref="updateForm">
        <v-expansion-panels v-model="openPanelIndex" multiple>
          <!-- Application Information -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.claimReconcileDetails')" class="text-uppercase"></app-section-title>
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
                    <app-form-field
                      :label="$t('label.applicationID')"
                      v-model.trim="data.code"
                      :placeholder="$t(`label.applicationID`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.code"
                    ></app-form-field>
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
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3">
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

                <v-col cols="12" sm="6" md="3">
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

                <v-col cols="12" sm="6" md="3">
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

                <v-col cols="12" sm="6" md="3">
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
                <v-col cols="12" sm="6" md="3">
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
                <v-col cols="12" sm="6" md="3">
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
                <v-col cols="12" sm="6" md="3">
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

                <v-col cols="12" sm="6" md="3">
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
                <v-col cols="12" sm="6" md="3">
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
                <v-col cols="12" sm="6" md="3">
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
                <v-col cols="12" sm="6" md="3">
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

          <!-- Agent Information -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.agentInfo')" class="text-uppercase"></app-section-title>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="pb-4" no-gutters>
                <v-col cols="12">
                  <v-divider class="my-5 mt-0"></v-divider>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.agentName')" v-model.trim="data.agent.name" :placeholder="$t(`label.agentName`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.nric')" v-model.trim="data.agent.nric" :placeholder="$t(`label.nric`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.phone')" v-model.trim="data.agent.phone" :placeholder="$t(`label.phone`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="6" md="4">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.email')" v-model.trim="data.agent.email" :placeholder="$t(`label.email`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.bankAcc')" v-model.trim="data.agent.bankAcc" :placeholder="$t(`label.bankAcc`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.bankName')" v-model.trim="data.agent.bankName" :placeholder="$t(`label.bankName`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-15">
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

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-15">
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

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-15">
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

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-15">
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
        </v-expansion-panels>
      </v-form>
    </div>

    <!-- Commission Earning -->
    <app-section-card>
      <v-row class="pa-4" no-gutters>
        <v-col cols="auto" class="text-left">
          <app-section-title :title="$t('label.commissionEarning')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
        </v-col>
        <!-- Table -->
        <v-col cols="12">
          <v-row>
            <v-col>
              <v-data-table :headers="tableHeaders" :items="data.payouts" :no-data-text="$t('message.noRecordFound')" class="app-table-card" disable-sort item-key="payoutId">
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

                <template slot="body.append">
                  <tr>
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
                    <td colspan="2">
                      <div class="text-right pr-5">
                        <span class="text-right">{{ data.commissionTier ? data.commissionTier.description : null }}</span>
                        <br />
                        <span class="price-heading">{{ $t('label.commissionEarning') }}</span>
                      </div>
                    </td>
                    <td>
                      <div class="text-right pr-5 font-weight-bold price-heading">{{ data.payoutCommissionAmount | moneyFormat }}</div>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </app-section-card>
    <v-form ref="updateForm">
      <app-section-card>
        <v-row class="pa-4" no-gutters>
          <v-col cols="12">
            <app-section-title :title="$t('label.transactionDetails')" class="text-uppercase"></app-section-title>
            <v-divider class="my-3"></v-divider>
          </v-col>

          <v-col cols="12" sm="6" md="4" class="pb-3">
            <div class="pr-15">
              <app-form-field :label="$t('label.ansuranInvoiceNumber')" v-model.trim="data.ansuranInvoiceNumber" :placeholder="$t(`label.ansuranInvoiceNumber`)" fieldWidth="100%"></app-form-field>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="4" class="pb-3">
            <div class="pr-15">
              <app-form-field
                :label="$t('label.reconcileStatus')"
                v-model.trim="data.reconcileStatus"
                :items="reconcileStatusDdl"
                :placeholder="$t(`label.reconcileStatus`)"
                fieldWidth="100%"
              ></app-form-field>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <div class="pr-5">
              <app-date-picker :label="$t('label.closingDate')" :selectedDateTime.sync="data.closingDate" date clearable :placeholder="$t(`label.closingDate`)" :min="new Date()"></app-date-picker>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="4" class="pb-3">
            <div class="pr-15">
              <app-form-field :label="$t('label.remarks')" v-model.trim="data.reconcileRemark" :placeholder="$t(`label.remarks`)" fieldWidth="100%"></app-form-field>
            </div>
          </v-col>
        </v-row>
      </app-section-card>
      <v-row class="pa-4" no-gutters>
        <v-col cols="12" class="text-right">
          <app-button v-if="accessEdit" :text="$t('button.update')" :action="updateClaimReconcile" color="primary"></app-button>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { ROUTE_NAME, SESSION, SHARED } from '@/constants'
import { searchHelper, localizationHelper, permissionHelper, ddlHelper } from '@/utils'
import { ANSURAN_CLAIM_RECONCILE_DETAILS, ANSURAN_CLAIM_APPLICATION_UPDATE } from '@/store/ansuran-claim-reconcile.module'
import { LOOKUP_RECONCILE_DDL, LOOKUP_PCO_CATEGORY_DDL, LOOKUP_ANSURAN_STATUS_DDL, LOOKUP_ANSURAN_APPLICATION_FIRM_DDL } from '@/store/lookup.module'
import AppSectionCard from '@/components/cards/AppSectionCard.vue'

export default {
  name: 'AnsuranClaimReconcileDetails',
  components: { AppSectionCard },
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.ANSURAN_CLAIM_RECONCILE)

      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.ANSURAN_CLAIM_RECONCILE, ACTION.UPDATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.ANSURAN_CLAIM_RECONCILE_LIST) {
      searchHelper.clearSearch(SESSION.ANSURAN_CLAIM_RECONCILE_SEARCH)
      searchHelper.clearSearch(SESSION.ANSURAN_CLAIM_RECONCILE_DETAILS_SEARCH)
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
            name: ROUTE_NAME.ANSURAN_CLAIM_RECONCILE_LIST
          },
          exact: true
        }
      ],
      searchApplicationCriteria: {
        applicationId: SHARED.DEFAULT_ALL_VALUE_STR
      },
      tableHeaders: [
        {
          text: localizationHelper.getMessage('label.claimID'),
          class: 'caption',
          value: 'code'
        },
        {
          text: localizationHelper.getMessage('label.paymentVoucherNumber'),
          class: 'caption',
          value: 'paymentVoucherNumber'
        },
        {
          text: localizationHelper.getMessage('label.claimStatus'),
          class: 'caption',
          value: 'payoutStatus'
        },
        {
          text: localizationHelper.getMessage('label.claimDate'),
          class: 'caption',
          value: 'claimDate'
        },
        {
          text: localizationHelper.getMessage('label.transactionDate'),
          class: 'caption',
          value: 'payoutDate'
        },
        {
          text: localizationHelper.getMessage('label.staffClaimAmount'),
          class: 'caption',
          align: 'end',
          value: 'staffClaimAmount'
        }
      ],
      pageSize: SHARED.DEFAULT_PAGE_SIZE,
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
        remarks: true,
        ansuranApplicationFirm: true
      },
      isRejected: false,
      documentStatusDdl: ddlHelper.getDocumentStatus(false, true),
      pcoPercentage: 0
    }
  },
  created() {
    /* Page Init */
    this.searchCriteria = searchHelper.retrieveSearch(SESSION.ANSURAN_CLAIM_RECONCILE_SEARCH)
    this.getAnsuranClaimReconcile()
    this.getPcoCategoryDdl()
    this.getAnsuranStatusDdl()
    this.getReconcileStatusDdl()
    this.getAnsuranApplicationFirmDdl()
  },
  mounted() {},
  computed: {
    data() {
      return this.$store.state.ansuranClaimReconcile.details
    },
    ansuranStatusDdl() {
      return this.$store.state.lookup.ansuranStatusDdl
    },
    pcoCategoryDdl() {
      return this.$store.state.lookup.pcoCategoryDdl
    },
    sumTotal() {
      let sum = 0
      if (this.data && this.data.payouts) {
        this.data.payouts.forEach((item) => {
          sum += item.staffClaimAmount
        })
      }
      return sum
    },
    tableRows() {
      return this.$store.state.ansuranClaimReconcile.applicationList.data
    },
    reconcileStatusDdl() {
      return this.$store.state.lookup.reconcileStatusDdl
    },
    ansuranApplicationFirmDdl() {
      return this.$store.state.lookup.ansuranApplicationFirmDdl
    }
  },
  watch: {
    tableRows() {
      this.filterByStatus()
    }
  },
  methods: {
    getAnsuranClaimReconcile() {
      this.$store.dispatch(`${ANSURAN_CLAIM_RECONCILE_DETAILS}`, { id: this.searchCriteria.selectedRecordId, applicationId: this.searchCriteria.selectedRecordId })
    },
    getAnsuranStatusDdl() {
      this.$store.dispatch(`${LOOKUP_ANSURAN_STATUS_DDL}`, { hasOptionAll: false, isActive: true, strValue: false })
    },
    getReconcileStatusDdl() {
      this.$store.dispatch(`${LOOKUP_RECONCILE_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getPcoCategoryDdl() {
      this.$store.dispatch(`${LOOKUP_PCO_CATEGORY_DDL}`, { hasOptionAll: false, isActive: true })
    },
    updateClaimReconcile() {
      if (this.$refs.updateForm.validate()) {
        let data = {
          ansuranInvoiceNumber: this.data.ansuranInvoiceNumber,
          reconcileRemark: this.data.reconcileRemark,
          reconcileStatus: this.data.reconcileStatus,
          closingDate: this.data.closingDate
        }

        this.$store.dispatch(`${ANSURAN_CLAIM_APPLICATION_UPDATE}`, { id: this.searchCriteria.selectedRecordId, data })
      }
    },
    getAnsuranApplicationFirmDdl() {
      this.$store.dispatch(`${LOOKUP_ANSURAN_APPLICATION_FIRM_DDL}`, { hasOptionAll: false, isActive: true, strValue: false })
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
