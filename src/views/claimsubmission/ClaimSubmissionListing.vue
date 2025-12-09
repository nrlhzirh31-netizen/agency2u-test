<template>
  <div>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.claimSubmission')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
    </v-row>
    <div class="mx-4">
      <v-form ref="searchForm">
        <v-expansion-panels v-model="openPanelIndex" multiple>
          <!-- Search Criteria -->
          <v-expansion-panel>
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.searchCriteria')" class="text-uppercase"></app-section-title>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="rounded-0">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-divider class="my-5 mt-0"></v-divider>
                </v-col>

                <v-col cols="12">
                  <v-row class="d-flex">
                    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                      <app-form-field :label="$t('label.applicationID')" v-model.trim="searchCriteria.applicationID" :placeholder="$t(`label.applicationID`)"></app-form-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                      <app-form-field :label="$t('label.orderNumber')" v-model.trim="searchCriteria.orderNumber" :placeholder="$t(`label.orderNumber`)"></app-form-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                      <app-form-field :label="$t('label.userCode')" v-model.trim="searchCriteria.agentCode" :placeholder="$t(`label.userCode`)"></app-form-field>
                    </v-col>

                    <v-col class="d-flex justify-end" align-self="end">
                      <app-button
                        v-if="accessView"
                        :text="$t('button.reset')"
                        :action="resetSearchCriteria"
                        class="d-inline-block summerSky--text text-caption button-link mr-2"
                        color="transparent"
                        icon="$resetIcon"
                        v-ripple="false"
                      />
                      <app-button v-if="accessView" :text="$t('button.search')" :action="searchListing" class="d-inline-block font--text" color="summerSky" icon="mdi-magnify" rounded></app-button>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-form>
    </div>
    <app-section-card>
      <v-row class="pa-4" no-gutters>
        <!-- Table -->
        <v-col cols="12">
          <v-row>
            <v-col>
              <v-data-table
                v-model="selectedRows"
                :headers="tableHeaders"
                :items="tableRowsFiltered"
                :items-per-page="pageSize"
                :no-data-text="$t('message.noRecordFound')"
                class="app-table-card"
                disable-sort
                item-key="id"
                show-select
                unselectable
              >
                <template v-slot:item.productPrice="{ item }">
                  <div class="text-right pr-5">
                    {{ item.productPrice | moneyFormat }}
                  </div>
                </template>
                <template v-slot:item.amount="{ item }">
                  <div class="text-right pr-5">
                    {{ item.amount | moneyFormat }}
                  </div>
                </template>
                <template v-slot:top>
                  <v-row no-gutters>
                    <v-col cols="12" class="text-right pt-5">
                      <app-button v-if="accessEdit" :text="$t('button.submit')" :action="updateClaim" color="primary"></app-button>
                    </v-col>
                  </v-row>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-row no-gutters>
                    <v-col cols="auto">
                      <v-icon v-if="accessView || accessEdit" @click="toDetailsPage(item.id)" class="px-1" size="25" color="secondary" dense>$settingsIcon</v-icon>
                    </v-col>
                  </v-row>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </app-section-card>
  </div>
</template>

<script>
import { SHARED, SESSION, ROUTE_NAME } from '@/constants'
import { permissionHelper, localizationHelper, searchHelper, sharedHelper } from '@/utils'
import { CLAIM_SUBMISSION_LIST, CLAIM_SUBMISSION_EDIT } from '@/store/claimsubmission.module'
import { SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'

export default {
  name: 'ClaimSubmissionListing',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.CLAIM_SUBMISSION)

      t.accessView = permissionHelper.isAuthorizedAction(MODULE_ID.CLAIM_SUBMISSION, ACTION.READ)
      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.CLAIM_SUBMISSION, ACTION.UPDATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.CLAIM_SUBMISSION_CREATE && to.name != ROUTE_NAME.CLAIM_SUBMISSION_DETAILS) {
      searchHelper.clearSearch(SESSION.CLAIM_SUBMISSION_SEARCH)
    }
    next()
  },
  props: {},
  data() {
    return {
      openPanelIndex: [0],
      selectedRows: [],
      accessView: false,
      accessEdit: false,
      searchCriteria: {
        claimSubmissionId: SHARED.DEFAULT_ALL_VALUE_STR,
        applicationCode: '',
        nric: '',
        agentCode: '',
        orderNumber: ''
      },
      tableRowsFiltered: [],
      tableHeaders: [
        {
          text: localizationHelper.getMessage('label.applicationID'),
          class: 'caption',
          value: 'claimID'
        },
        {
          text: localizationHelper.getMessage('label.agentID'),
          class: 'caption',
          value: 'agentID'
        },
        {
          text: localizationHelper.getMessage('label.productPackage'),
          class: 'caption',
          value: 'productPackage'
        },
        {
          text: localizationHelper.getMessage('label.orderNo'),
          class: 'caption',
          value: 'orderNo'
        },
        {
          text: localizationHelper.getMessage('label.productPrice'),
          class: 'caption',
          align: 'center',
          value: 'productPrice'
        },
        {
          text: localizationHelper.getMessage('label.applicationStatus'),
          class: 'caption',
          value: 'applicationStatus'
        },
        {
          text: localizationHelper.getMessage('label.claimAmount'),
          class: 'caption',
          align: 'center',
          value: 'amount'
        },
        {
          text: localizationHelper.getMessage('label.action'),
          class: 'caption',
          value: 'actions'
        }
      ],
      pageSize: SHARED.DEFAULT_PAGE_SIZE
      // pageNumber: SHARED.DEFAULT_PAGE_NUMBER
    }
  },
  created() {
    /* Page Init */
    this.initSearchCriteria()
  },
  mounted() {},
  computed: {
    tableRows() {
      return this.$store.state.claimsubmission.list.data
    },
    hasMessageDialog() {
      return this.$store.state.shared.messageDialog.messageTitle
    }
  },
  watch: {
    tableRows() {
      this.filterByStatus()
    }
  },
  methods: {
    initSearchCriteria() {
      let isDefault = true

      if (searchHelper.hasSearchCriteria(SESSION.CLAIM_SUBMISSION_SEARCH)) {
        isDefault = false
        this.searchCriteria = searchHelper.retrieveSearch(SESSION.CLAIM_SUBMISSION_SEARCH)
      }

      if (isDefault) {
        this.searchCriteria = {
          claimSubmissionId: SHARED.DEFAULT_ALL_VALUE_STR
        }
      }
      this.getClaimSubmissionList(this.searchCriteria)
    },
    searchListing() {
      if (this.$refs.searchForm.validate()) {
        this.getClaimSubmissionList(this.searchCriteria)
      }
    },
    getClaimSubmissionList(filter) {
      this.$store.dispatch(`${CLAIM_SUBMISSION_LIST}`, { filter })
      this.searchCriteria = filter
      searchHelper.storeSearch(SESSION.CLAIM_SUBMISSION_SEARCH, filter)
    },
    filterByStatus() {
      this.tableRowsFiltered = this.tableRows
    },
    resetSearchCriteria() {
      this.searchCriteria.claimSubmissionId = SHARED.DEFAULT_ALL_VALUE_STR
      this.searchCriteria.applicationID = ''
      this.searchCriteria.nric = ''
      this.searchCriteria.agentCode = ''
      this.searchCriteria.orderNumber = ''

      this.$refs.searchForm.resetValidation()
      this.searchListing()
    },
    toDetailsPage(id) {
      let filter = searchHelper.retrieveSearch(SESSION.CLAIM_SUBMISSION_SEARCH)
      filter.selectedRecordId = id
      searchHelper.storeSearch(SESSION.CLAIM_SUBMISSION_SEARCH, filter)

      this.$router.push({
        name: ROUTE_NAME.CLAIM_SUBMISSION_DETAILS
      })
    },
    async updateClaim() {
      let d = this.selectedRows
      let data = []

      if (d != '' && d != 'undefined' && d != null) {
        for (let i = 0; i < d.length; i++) {
          for (let j = 0; j < d[i].payoutId.length; j++) {
            let r = {
              payoutId: d[i].payoutId[j].Id,
              payoutStatus: 2
            }
            data.push(r)
          }
        }
        const completed = await this.$store.dispatch(`${CLAIM_SUBMISSION_EDIT}`, { data, fromListing: true })
        if (completed) {
          location.reload()
        }
      } else {
        let buttonAction = () => {
          this.$store.dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
        }
        let msg = localizationHelper.getMessage(`error.noSelectClaims`)
        let messageDialog = sharedHelper.getErrorReloadPageDialog(localizationHelper.getMessage(`label.error`), msg, 'ok', buttonAction)
        this.$store.dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog)
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
.search-form-field-set ::v-deep {
  .input-field-container {
    vertical-align: bottom;
  }
}
</style>
