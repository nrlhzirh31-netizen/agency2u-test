<template>
  <div>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.ansuran') + ' ' + $t('label.claimHistory')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
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
                      <app-form-field :label="$t('label.applicationID')" v-model.trim="searchCriteria.code" :placeholder="$t(`label.applicationID`)"></app-form-field>
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
                item-key="id"
                disable-sort
              >
                <template v-slot:item.creditPrice="{ item }">
                  <div class="text-right pr-5">
                    {{ item.creditPrice | moneyFormat }}
                  </div>
                </template>
                <template v-slot:item.pco="{ item }">
                  <div class="text-right pr-5">
                    {{ item.pco | moneyFormat }}
                  </div>
                </template>
                <template v-slot:item.claimAmount="{ item }">
                  <div class="text-right pr-5">
                    {{ item.claimAmount | moneyFormat }}
                  </div>
                </template>
                <template v-slot:item.actions="{ item }">
                  <div class="text-right pr-5">
                    <v-icon v-if="accessView || accessEdit" @click="toDetailsPage(item.id)" class="px-1" size="25" color="secondary" dense>$settingsIcon</v-icon>
                  </div>
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
import { ANSURAN_CLAIM_HISTORY_LIST } from '@/store/ansuran-claim-history.module'

export default {
  name: 'AnsuranClaimHistoryListing',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.ANSURAN_CLAIM_HISTORY)

      t.accessView = permissionHelper.isAuthorizedAction(MODULE_ID.ANSURAN_CLAIM_HISTORY, ACTION.READ)
      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.ANSURAN_CLAIM_HISTORY, ACTION.UPDATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.ANSURAN_CLAIM_HISTORY_DETAILS) {
      searchHelper.clearSearch(SESSION.ANSURAN_CLAIM_HISTORY_SEARCH)
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
        ansuranClaimHistoryId: SHARED.DEFAULT_ALL_VALUE_STR,
        applicationCode: '',
        nric: '',
        agentCode: '',
        referenceNumber: ''
      },
      tableRowsFiltered: [],
      tableHeaders: [
        {
          text: localizationHelper.getMessage('label.applicationID'),
          class: 'caption',
          value: 'code'
        },
        { text: localizationHelper.getMessage('label.ansuranApplicationFirm'), class: 'caption', value: 'ansuranApplicationFirm' },
        {
          text: localizationHelper.getMessage('label.agentID'),
          class: 'caption',
          value: 'agentID'
        },
        {
          text: localizationHelper.getMessage('label.productName'),
          class: 'caption',
          value: 'productName'
        },
        {
          text: localizationHelper.getMessage('label.creditPrice'),
          class: 'caption',
          align: 'center',
          value: 'creditPrice'
        },
        {
          text: localizationHelper.getMessage('label.pco'),
          class: 'caption',
          align: 'center',
          value: 'pco'
        },
        {
          text: localizationHelper.getMessage('label.staffClaimAmount'),
          class: 'caption',
          align: 'center',
          value: 'staffClaimAmount'
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
      return this.$store.state.ansuranClaimHistory.list.data
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

      if (searchHelper.hasSearchCriteria(SESSION.ANSURAN_CLAIM_HISTORY_SEARCH)) {
        isDefault = false
        this.searchCriteria = searchHelper.retrieveSearch(SESSION.ANSURAN_CLAIM_HISTORY_SEARCH)
      }

      if (isDefault) {
        this.searchCriteria = {
          ansuranClaimHistoryId: SHARED.DEFAULT_ALL_VALUE_STR
        }
      }
      this.getAnsuranClaimHistoryList(this.searchCriteria)
    },
    searchListing() {
      if (this.$refs.searchForm.validate()) {
        this.getAnsuranClaimHistoryList(this.searchCriteria)
      }
    },
    getAnsuranClaimHistoryList(filter) {
      this.$store.dispatch(`${ANSURAN_CLAIM_HISTORY_LIST}`, { filter })
      this.searchCriteria = filter
      searchHelper.storeSearch(SESSION.ANSURAN_CLAIM_HISTORY_SEARCH, filter)
    },
    filterByStatus() {
      this.tableRowsFiltered = this.tableRows
    },
    resetSearchCriteria() {
      this.searchCriteria.ansuranClaimHistoryId = SHARED.DEFAULT_ALL_VALUE_STR
      this.searchCriteria.code = ''
      this.searchCriteria.nric = ''
      this.searchCriteria.agentCode = ''
      this.searchCriteria.referenceNumber = ''

      this.$refs.searchForm.resetValidation()
      this.searchListing()
    },
    toDetailsPage(id) {
      let filter = searchHelper.retrieveSearch(SESSION.ANSURAN_CLAIM_HISTORY_SEARCH)
      filter.selectedRecordId = id
      searchHelper.storeSearch(SESSION.ANSURAN_CLAIM_HISTORY_SEARCH, filter)

      this.$router.push({
        name: ROUTE_NAME.ANSURAN_CLAIM_HISTORY_DETAILS
      })
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
