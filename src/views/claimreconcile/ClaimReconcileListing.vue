<template>
  <div>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.claimReconcile')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
    </v-row>
    <!-- Search Criteria -->
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
                      <app-date-picker :label="$t('label.fromDate')" :selectedDateTime.sync="searchCriteria.fromDate" date clearable :placeholder="$t(`label.fromDate`)"></app-date-picker>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                      <app-date-picker :label="$t('label.endDate')" :selectedDateTime.sync="searchCriteria.endDate" date clearable :placeholder="$t(`label.endDate`)"></app-date-picker>
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
        <v-col cols="auto" class="text-left">
          <app-section-title :title="$t('label.claimReconcile')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
        </v-col>
        <v-spacer></v-spacer>

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
                    <td class="text-caption font-weight-medium">{{ i.item.applicationID }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.agentID }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.productPackage }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.orderNo }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.productPrice }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.applicationType }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.amount }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.claimStatus }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.reconcileStatus }}</td>
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
import { CLAIM_RECONCILE_LIST } from '@/store/claimreconcile.module'

export default {
  name: 'ClaimReconcileListing',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.CLAIM_RECONCILE)

      t.accessView = permissionHelper.isAuthorizedAction(MODULE_ID.CLAIM_RECONCILE, ACTION.READ)
      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.CLAIM_RECONCILE, ACTION.UPDATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.CLAIM_RECONCILE_DETAILS) {
      searchHelper.clearSearch(SESSION.CLAIM_RECONCILE_SEARCH)
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
        claimReconcileId: SHARED.DEFAULT_ALL_VALUE_STR
      },
      tableRowsFiltered: [],
      tableHeaders: [
        // {
        //   text: localizationHelper.getMessage('label.no'),
        //   class: 'caption'
        // },
        {
          text: localizationHelper.getMessage('label.applicationID'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.agentID'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.productPackage'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.orderNo'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.productPrice'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.applicationType'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.claimAmount'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.claimStatus'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.reconcileStatus'),
          class: 'caption'
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
      return this.$store.state.claimreconcile.list.data
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

      if (searchHelper.hasSearchCriteria(SESSION.CLAIM_RECONCILE_SEARCH)) {
        isDefault = false
        this.searchCriteria = searchHelper.retrieveSearch(SESSION.CLAIM_RECONCILE_SEARCH)
      }

      if (isDefault) {
        this.searchCriteria = {
          claimReconcileId: SHARED.DEFAULT_ALL_VALUE_STR
        }
      }
      this.getClaimReconcileList(this.searchCriteria)
    },
    searchListing() {
      if (this.$refs.searchForm.validate()) {
        this.getClaimReconcileList(this.searchCriteria)
      }
    },
    getClaimReconcileList(filter) {
      this.$store.dispatch(`${CLAIM_RECONCILE_LIST}`, { filter })
      this.searchCriteria = filter
      searchHelper.storeSearch(SESSION.CLAIM_RECONCILE_SEARCH, filter)
    },
    filterByStatus() {
      this.tableRowsFiltered = this.tableRows
    },
    resetSearchCriteria() {
      searchHelper.clearSearch(SESSION.CLAIM_RECONCILE_SEARCH)
      this.searchCriteria.fromDate = ''
      this.searchCriteria.endDate = ''
      this.searchCriteria.agentCode = ''

      this.searchListing()
    },
    toDetailsPage(id) {
      let filter = searchHelper.retrieveSearch(SESSION.CLAIM_RECONCILE_SEARCH)
      filter.selectedRecordId = id
      searchHelper.storeSearch(SESSION.CLAIM_RECONCILE_SEARCH, filter)

      this.$router.push({
        name: ROUTE_NAME.CLAIM_RECONCILE_DETAILS
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
