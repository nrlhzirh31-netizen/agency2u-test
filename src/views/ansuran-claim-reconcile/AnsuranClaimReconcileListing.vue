<template>
  <div>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.ansuran') + ' ' + $t('label.claimReconcile')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
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
                      <app-form-field
                        :label="$t('label.reconcileStatus')"
                        :items="ansuranReconcileStatusDdl"
                        v-model.trim="searchCriteria.ansuranReconcileStatus"
                        :placeholder="$t(`label.all`)"
                      ></app-form-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                      <app-date-picker :label="$t('label.fromDate')" :selectedDateTime.sync="searchCriteria.fromDate" date clearable :placeholder="$t(`label.fromDate`)"></app-date-picker>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                      <app-date-picker :label="$t('label.endDate')" :selectedDateTime.sync="searchCriteria.endDate" date clearable :placeholder="$t(`label.endDate`)"></app-date-picker>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                      <app-form-field :label="$t('label.userCode')" v-model.trim="searchCriteria.agentCode" :placeholder="$t(`label.userCode`)"></app-form-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                      <app-form-field :label="$t('label.productSerialNumber')" v-model.trim="searchCriteria.productSerialNumber" :placeholder="$t(`label.productSerialNumber`)"></app-form-field>
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
              >
                <template v-slot:item="i">
                  <tr>
                    <!-- <td class="text-caption font-weight-medium">{{ $filters.paginateTableIndex(i.index, clientSidePagination.pageNumber) }}</td> -->
                    <td class="text-caption font-weight-medium">{{ i.item.applicationID }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.ansuranApplicationFirm }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.agentID }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.reconcileNumber }}</td>
                    <td class="text-caption font-weight-medium text-right">{{ i.item.creditPrice }}</td>
                    <td class="text-caption font-weight-medium text-right">{{ i.item.pco }}</td>
                    <td class="text-caption font-weight-medium text-right">{{ i.item.amount }}</td>
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
import { ANSURAN_CLAIM_RECONCILE_LIST } from '@/store/ansuran-claim-reconcile.module'
import { LOOKUP_RECONCILE_DDL } from '@/store/lookup.module'

export default {
  name: 'AnsuranClaimReconcileListing',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.ANSURAN_CLAIM_RECONCILE)

      t.accessView = permissionHelper.isAuthorizedAction(MODULE_ID.ANSURAN_CLAIM_RECONCILE, ACTION.READ)
      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.ANSURAN_CLAIM_RECONCILE, ACTION.UPDATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.ANSURAN_CLAIM_RECONCILE_DETAILS) {
      searchHelper.clearSearch(SESSION.ANSURAN_CLAIM_RECONCILE_SEARCH)
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
        claimReconcileId: SHARED.DEFAULT_ALL_VALUE_STR,
        ansuranReconcileStatus: ''
      },
      tableRowsFiltered: [],
      tableHeaders: [
        {
          text: localizationHelper.getMessage('label.applicationID'),
          class: 'caption'
        },
        { text: localizationHelper.getMessage('label.ansuranApplicationFirm'), class: 'caption' },
        {
          text: localizationHelper.getMessage('label.agentID'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.reconcileNumber'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.creditPrice'),
          class: 'caption',
          align: 'center'
        },
        {
          text: localizationHelper.getMessage('label.pco'),
          class: 'caption',
          align: 'center'
        },
        {
          text: localizationHelper.getMessage('label.claimAmount'),
          class: 'caption',
          align: 'center'
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
    this.getAnsuranReconcileStatusDdl()
  },
  mounted() {},
  computed: {
    tableRows() {
      return this.$store.state.ansuranClaimReconcile.list.data
    },
    ansuranReconcileStatusDdl() {
      console.log('ddl', this.$store.state.lookup.reconcileStatusDdl)
      return this.$store.state.lookup.reconcileStatusDdl
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

      if (searchHelper.hasSearchCriteria(SESSION.ANSURAN_CLAIM_RECONCILE_SEARCH)) {
        isDefault = false
        this.searchCriteria = searchHelper.retrieveSearch(SESSION.ANSURAN_CLAIM_RECONCILE_SEARCH)
      }

      if (isDefault) {
        this.searchCriteria = {
          claimReconcileId: SHARED.DEFAULT_ALL_VALUE_STR
        }
      }
      this.getAnsuranClaimReconcileList(this.searchCriteria)
    },
    searchListing() {
      if (this.$refs.searchForm.validate()) {
        this.getAnsuranClaimReconcileList(this.searchCriteria)
      }
    },
    getAnsuranClaimReconcileList(filter) {
      if (filter.ansuranReconcileStatus) {
        filter.ansuranReconcileStatus = this.ansuranReconcileStatusDdl.find((x) => x.value == filter.ansuranReconcileStatus).code
      }
      this.$store.dispatch(`${ANSURAN_CLAIM_RECONCILE_LIST}`, { filter })
      this.searchCriteria = filter
      searchHelper.storeSearch(SESSION.ANSURAN_CLAIM_RECONCILE_SEARCH, filter)
    },
    filterByStatus() {
      this.tableRowsFiltered = this.tableRows
    },
    resetSearchCriteria() {
      searchHelper.clearSearch(SESSION.ANSURAN_CLAIM_RECONCILE_SEARCH)
      this.searchCriteria.fromDate = ''
      this.searchCriteria.endDate = ''
      this.searchCriteria.agentCode = ''
      this.searchCriteria.productSerialNumber = ''
      this.searchCriteria.ansuranReconcileStatus = ''

      this.searchListing()
    },
    toDetailsPage(id) {
      let filter = searchHelper.retrieveSearch(SESSION.ANSURAN_CLAIM_RECONCILE_SEARCH)
      filter.selectedRecordId = id
      searchHelper.storeSearch(SESSION.ANSURAN_CLAIM_RECONCILE_SEARCH, filter)

      this.$router.push({
        name: ROUTE_NAME.ANSURAN_CLAIM_RECONCILE_DETAILS
      })
    },
    getAnsuranReconcileStatusDdl() {
      this.$store.dispatch(`${LOOKUP_RECONCILE_DDL}`, { hasOptionAll: false, isActive: true, raw: true })
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
