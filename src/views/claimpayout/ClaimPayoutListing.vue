<template>
  <div>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.claimPayout')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
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
              <v-data-table :headers="tableHeaders" :items="tableRowsFiltered" :items-per-page="pageSize" :no-data-text="$t('message.noRecordFound')" class="app-table-card" disable-sort>
                <template v-slot:item="i">
                  <tr>
                    <!-- <td class="text-caption font-weight-medium">{{ $filters.paginateTableIndex(i.index, clientSidePagination.pageNumber) }}</td> -->
                    <td class="text-caption font-weight-medium">{{ i.item.agentID }}</td>
                    <td class="text-caption text-right pr-14 font-weight-medium">{{ i.item.totalClaim | moneyFormat }}</td>
                    <td class="text-caption text-center font-weight-medium">{{ i.item.totalApplication }}</td>
                    <td>
                      <v-row no-gutters>
                        <v-col cols="auto">
                          <v-icon v-if="accessView || accessEdit" @click="toDetailsPage(i.item.id)" class="px-1" size="25" color="secondary" dense>$settingsIcon</v-icon>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>
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
import { permissionHelper, localizationHelper, searchHelper } from '@/utils'
import { CLAIM_PAYOUT_LIST } from '@/store/claimpayout.module'

export default {
  name: 'ClaimPayoutListing',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.CLAIM_PAYOUT)

      t.accessView = permissionHelper.isAuthorizedAction(MODULE_ID.CLAIM_PAYOUT, ACTION.READ)
      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.CLAIM_PAYOUT, ACTION.UPDATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.CLAIM_PAYOUT_DETAILS && to.name != ROUTE_NAME.CLAIM_APPLICATION_LIST) {
      searchHelper.clearSearch(SESSION.CLAIM_PAYOUT_SEARCH)
    }
    next()
  },
  props: {},
  data() {
    return {
      openPanelIndex: [0],
      accessView: false,
      accessEdit: false,
      searchCriteria: {
        claimPayoutId: SHARED.DEFAULT_ALL_VALUE_STR,
        applicationCode: '',
        nric: '',
        agentCode: '',
        orderNumber: ''
      },
      tableRowsFiltered: [],
      tableHeaders: [
        {
          text: localizationHelper.getMessage('label.agentID'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.totalClaim'),
          class: 'caption text-end'
        },
        {
          text: localizationHelper.getMessage('label.totalApplication'),
          class: 'caption',
          align: 'center'
        },
        {
          text: localizationHelper.getMessage('label.action'),
          class: 'caption'
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
      return this.$store.state.claimpayout.list.data
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

      if (searchHelper.hasSearchCriteria(SESSION.CLAIM_PAYOUT_SEARCH)) {
        isDefault = false
        this.searchCriteria = searchHelper.retrieveSearch(SESSION.CLAIM_PAYOUT_SEARCH)
      }

      if (isDefault) {
        this.searchCriteria = {
          claimPayoutId: SHARED.DEFAULT_ALL_VALUE_STR
        }
      }
      this.getClaimPayoutList(this.searchCriteria)
    },
    searchListing() {
      if (this.$refs.searchForm.validate()) {
        this.getClaimPayoutList(this.searchCriteria)
      }
    },
    getClaimPayoutList(filter) {
      this.$store.dispatch(`${CLAIM_PAYOUT_LIST}`, { filter })
      this.searchCriteria = filter
      searchHelper.storeSearch(SESSION.CLAIM_PAYOUT_SEARCH, filter)
    },
    filterByStatus() {
      this.tableRowsFiltered = this.tableRows
    },
    resetSearchCriteria() {
      this.searchCriteria.claimPayoutId = SHARED.DEFAULT_ALL_VALUE_STR
      this.searchCriteria.applicationID = ''
      this.searchCriteria.nric = ''
      this.searchCriteria.agentCode = ''
      this.searchCriteria.orderNumber = ''

      this.$refs.searchForm.resetValidation()
      this.searchListing()
    },
    toDetailsPage(id) {
      let filter = searchHelper.retrieveSearch(SESSION.CLAIM_PAYOUT_SEARCH)
      filter.selectedRecordId = id
      searchHelper.storeSearch(SESSION.CLAIM_PAYOUT_SEARCH, filter)

      this.$router.push({
        name: ROUTE_NAME.CLAIM_PAYOUT_DETAILS
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
