<template>
  <div>
    <app-section-card>
      <v-row class="pa-4" no-gutters>
        <v-col cols="auto" class="text-left">
          <app-section-title :title="$t('label.reportClaimSubmission')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
        </v-col>
        <v-spacer></v-spacer>
        <!-- Search Criteria -->
        <v-col cols="auto" class="text-right">
          <v-form ref="searchForm" class="search-form-field-set d-inline-block">
            <app-search-form-field :placeholder="$t('label.claimHistoryId')" v-model.trim="searchCriteria.claimHistoryId"></app-search-form-field>
            <v-btn v-if="accessView" @click="searchListing()" elevation="0" class="search-button" color="summerSky" tile height="40" min-width="auto">
              <v-icon dense color="black">mdi-magnify</v-icon>
            </v-btn>
          </v-form>
          <app-button
            v-if="accessView"
            :text="$t('button.reset')"
            :action="resetSearchCriteria"
            class="d-inline-block summerSky--text text-caption button-link mr-2"
            color="transparent"
            icon="$resetIcon"
            v-ripple="false"
          />
        </v-col>

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
              >
                <template v-slot:item="i">
                  <tr>
                    <!-- <td class="text-caption font-weight-medium">{{ $filters.paginateTableIndex(i.index, clientSidePagination.pageNumber) }}</td> -->
                    <td class="text-caption font-weight-medium">{{ i.item.agentID }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.agentName }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.bank }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.bankAccNo }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.email }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.totalApplication }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.totalAmountClaim }}</td>
                    <!-- <td>
                      <v-row no-gutters>
                        <v-col cols="auto">
                          <v-icon v-if="accessView || accessEdit" @click="toDetailsPage(i.item.id)" class="px-1" size="25" color="secondary" dense>$settingsIcon</v-icon>
                        </v-col>
                      </v-row>
                    </td> -->
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
import { SHARED, SESSION } from '@/constants'
import { permissionHelper, localizationHelper, searchHelper } from '@/utils'
import { REPORT_PAYOUT } from '@/store/report.module'

export default {
  name: 'ReportListing',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.REPORT)

      t.accessView = permissionHelper.isAuthorizedAction(MODULE_ID.REPORT, ACTION.READ)
      // t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.REPORT, ACTION.UPDATE)
    })
  },
  props: {},
  data() {
    return {
      selectedRows: [],
      accessView: false,
      // accessEdit: false,
      searchCriteria: {
        reportId: SHARED.DEFAULT_ALL_VALUE_STR
      },
      tableRowsFiltered: [],
      tableHeaders: [
        // {
        //   text: localizationHelper.getMessage('label.no'),
        //   class: 'caption'
        // },
        {
          text: localizationHelper.getMessage('label.agentID'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.agentName'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.bank'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.bankAccNo'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.email'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.totalApplication'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.totalAmtClaim'),
          class: 'caption'
        }
        // {
        //   text: localizationHelper.getMessage('label.action'),
        //   class: 'caption'
        // }
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
      return this.$store.state.report.payoutlist.data
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
          reportId: SHARED.DEFAULT_ALL_VALUE_STR
        }
      }
      this.getClaimPayoutReport(this.searchCriteria)
    },
    searchListing() {
      if (this.$refs.searchForm.validate()) {
        this.getClaimPayoutReport(this.searchCriteria)
      }
    },
    getClaimPayoutReport(filter) {
      this.$store.dispatch(`${REPORT_PAYOUT}`, { filter })
      this.searchCriteria = filter
      searchHelper.storeSearch(SESSION.CLAIM_PAYOUT_SEARCH, filter)
    },
    filterByStatus() {
      this.tableRowsFiltered = this.tableRows
    },
    resetSearchCriteria() {
      this.searchCriteria.reportId = SHARED.DEFAULT_ALL_VALUE_STR

      this.searchListing()
    }
    // toDetailsPage(id) {
    //   let filter = searchHelper.retrieveSearch(SESSION.CLAIM_HISTORY_SEARCH)
    //   filter.selectedRecordId = id
    //   searchHelper.storeSearch(SESSION.CLAIM_HISTORY_SEARCH, filter)

    //   this.$router.push({
    //     name: ROUTE_NAME.CLAIM_HISTORY_DETAILS
    //   })
    // }
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
