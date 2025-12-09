<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.claimReconcile')" class="text-uppercase"></app-section-title>
    </v-row>
    <div class="mx-4">
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

            <v-row class="py-4" no-gutters>
              <v-col cols="12" sm="6" md="4" class="pb-3">
                <div class="pr-15">
                  <app-form-field :label="$t('label.applicationID')" v-model.trim="data.applicationID" :placeholder="$t(`label.applicationID`)" fieldWidth="100%" :nonEditable="true"></app-form-field>
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
                  <app-date-picker :label="$t('label.activatedDate')" :selectedDateTime.sync="data.activatedDate" date clearable :placeholder="$t(`label.activatedDate`)"></app-date-picker>
                </div>
              </v-col>

              <v-col cols="12" sm="6" md="4" class="pb-3">
                <div class="pr-15">
                  <app-form-field :label="$t('label.agentID')" v-model.trim="data.agentID" :placeholder="$t(`label.agentID`)" fieldWidth="100%" :nonEditable="true"></app-form-field>
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
                  <app-form-field :label="$t('label.remarks')" v-model.trim="data.remarks" :placeholder="$t(`label.remarks`)" fieldWidth="100%"></app-form-field>
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
            <v-row no-gutters>
              <v-col cols="12">
                <v-divider class="my-5 mt-0"></v-divider>
              </v-col>

              <v-col cols="12" sm="6" md="4" class="pb-3">
                <div class="pr-15">
                  <app-form-field :label="$t('label.agentName')" v-model.trim="data.agentName" :placeholder="$t(`label.agentName`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6" md="4" class="pb-3">
                <div class="pr-15">
                  <app-form-field :label="$t('label.nric')" v-model.trim="data.nric" :placeholder="$t(`label.nric`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6" md="4" class="pb-3">
                <div class="pr-15">
                  <app-form-field :label="$t('label.phone')" v-model.trim="data.phone" :placeholder="$t(`label.phone`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6" md="4" class="pb-3">
                <div class="pr-15">
                  <app-form-field :label="$t('label.email')" v-model.trim="data.email" :placeholder="$t(`label.email`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6" md="4" class="pb-3">
                <div class="pr-15">
                  <app-form-field :label="$t('label.bankAcc')" v-model.trim="data.bankAcc" :placeholder="$t(`label.bankAcc`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6" md="4" class="pb-3">
                <div class="pr-15">
                  <app-form-field :label="$t('label.bankName')" v-model.trim="data.bankName" :placeholder="$t(`label.bankName`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                </div>
              </v-col>

              <v-col cols="12" sm="6" md="4" class="pb-3">
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

              <v-col cols="12" sm="6" md="4" class="pb-3">
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

              <v-col cols="12" sm="6" md="4" class="pb-3">
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

              <v-col cols="12" sm="6" md="4" class="pb-3">
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

        <!-- Commission Earning -->
        <v-expansion-panel class="my-3 elevation-0">
          <v-expansion-panel-header>
            <div class="px-2">
              <app-section-title :title="$t('label.commissionEarning')" class="text-uppercase"></app-section-title>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row no-gutters>
              <v-col cols="12">
                <v-divider class="my-5 mt-0"></v-divider>
              </v-col>

              <v-col cols="12" sm="6" md="4" class="pb-3">
                <div class="pr-15">
                  <app-form-field :label="$t('label.claimAmount')" v-model.trim="data.claimAmount" :placeholder="$t(`label.claimAmount`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                </div>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <app-section-card>
      <v-row class="pa-4" no-gutters>
        <v-col cols="auto" class="text-left">
          <app-section-title :title="$t('label.payoutTransaction')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
        </v-col>
        <!-- Table -->
        <v-col cols="12">
          <v-row>
            <v-col>
              <v-data-table :headers="tableHeaders" :items="tableRowsFiltered" :items-per-page="pageSize" :no-data-text="$t('message.noRecordFound')" class="app-table-card" disable-sort>
                <template v-slot:item="i">
                  <tr>
                    <!-- <td class="text-caption font-weight-medium">{{ $filters.paginateTableIndex(i.index, clientSidePagination.pageNumber) }}</td> -->
                    <td class="text-caption font-weight-medium">{{ i.item.claimID }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.applicationID }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.claimAmount }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.downlineAgentID }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.claimStatus }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.claimDate }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.payoutDate }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.paymentVoucherNumber }}</td>
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
              <app-form-field :label="$t('label.tmInvoiceNo')" v-model.trim="data.tmInvoiceNumber" :placeholder="$t(`label.tmInvoiceNo`)" fieldWidth="100%"></app-form-field>
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
import { searchHelper, localizationHelper, permissionHelper } from '@/utils'
import { CLAIM_RECONCILE_DETAILS, CLAIM_APPLICATION_LISTING, CLAIM_APPLICATION_UPDATE } from '@/store/claimreconcile.module'
import { LOOKUP_PAYOUT_DDL, LOOKUP_APPLICATION_TYPE_DDL, LOOKUP_APPLICATION_STATUS_DDL, LOOKUP_RECONCILE_DDL } from '@/store/lookup.module'
import AppSectionCard from '@/components/cards/AppSectionCard.vue'

export default {
  name: 'ClaimReconcileDetails',
  components: { AppSectionCard },
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.CLAIM_RECONCILE)

      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.CLAIM_RECONCILE, ACTION.UPDATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.CLAIM_RECONCILE_LIST) {
      searchHelper.clearSearch(SESSION.CLAIM_RECONCILE_SEARCH)
      searchHelper.clearSearch(SESSION.CLAIM_RECONCILE_DETAILS_SEARCH)
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
            name: ROUTE_NAME.CLAIM_RECONCILE_LIST
          },
          exact: true
        }
      ],
      searchApplicationCriteria: {
        applicationId: SHARED.DEFAULT_ALL_VALUE_STR
      },
      tableRowsFiltered: [],
      tableHeaders: [
        // {
        //   text: localizationHelper.getMessage('label.no'),
        //   class: 'caption'
        // },
        {
          text: localizationHelper.getMessage('label.claimID'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.applicationID'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.claimAmount'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.downlineAgentID'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.claimStatus'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.claimDate'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.transactionDate'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.paymentVoucherNumber'),
          class: 'caption'
        }
      ],
      pageSize: SHARED.DEFAULT_PAGE_SIZE
      // pageNumber: SHARED.DEFAULT_PAGE_NUMBER
    }
  },
  created() {
    /* Page Init */
    this.searchCriteria = searchHelper.retrieveSearch(SESSION.CLAIM_RECONCILE_SEARCH)
    this.initSearchCriteria()
    this.getClaimReconcile()
    this.getPayoutDdl()
    this.getApplicationTypeDdl()
    this.getApplicationStatusDdl()
    this.getReconcileStatusDdl()
  },
  mounted() {},
  computed: {
    data() {
      return this.$store.state.claimreconcile.details
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
      return this.$store.state.claimreconcile.applicationList.data
    },
    reconcileStatusDdl() {
      return this.$store.state.lookup.reconcileStatusDdl
    }
  },
  watch: {
    tableRows() {
      this.filterByStatus()
    }
  },
  methods: {
    getClaimReconcile() {
      this.$store.dispatch(`${CLAIM_RECONCILE_DETAILS}`, { id: this.searchCriteria.selectedRecordId, applicationId: this.searchCriteria.selectedRecordId })
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
    getReconcileStatusDdl() {
      this.$store.dispatch(`${LOOKUP_RECONCILE_DDL}`, { hasOptionAll: false, isActive: true })
    },
    initSearchCriteria() {
      let isDefault = true

      if (searchHelper.hasSearchCriteria(SESSION.CLAIM_RECONCILE_DETAILS_SEARCH)) {
        isDefault = false
        this.searchApplicationCriteria = searchHelper.retrieveSearch(SESSION.CLAIM_RECONCILE_DETAILS_SEARCH)
      }

      if (isDefault) {
        this.searchApplicationCriteria = {
          applicationId: SHARED.DEFAULT_ALL_VALUE_STR
        }
      }
      this.getClaimApplication(this.searchApplicationCriteria)
    },
    searchListing() {
      if (this.$refs.searchForm.validate()) {
        this.getClaimApplication(this.searchApplicationCriteria)
      }
    },
    filterByStatus() {
      this.tableRowsFiltered = this.tableRows
    },
    getClaimApplication(filter) {
      this.$store.dispatch(`${CLAIM_APPLICATION_LISTING}`, { id: this.searchCriteria.selectedRecordId })
      this.searchApplicationCriteria = filter
      searchHelper.storeSearch(SESSION.CLAIM_RECONCILE_DETAILS_SEARCH, filter)
    },
    resetSearchCriteria() {
      this.searchApplicationCriteria.applicationId = SHARED.DEFAULT_ALL_VALUE_STR

      this.searchListing()
    },
    updateClaimReconcile() {
      if (this.$refs.updateForm.validate()) {
        let data = {
          tmInvoiceNumber: this.data.tmInvoiceNumber,
          reconcileRemark: this.data.reconcileRemark,
          reconcileStatus: this.data.reconcileStatus
        }

        this.$store.dispatch(`${CLAIM_APPLICATION_UPDATE}`, { id: this.searchCriteria.selectedRecordId, data })
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
