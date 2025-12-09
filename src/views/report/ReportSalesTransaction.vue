<template>
  <div>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.reportSalesTransaction')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
    </v-row>
    <div class="mx-4">
      <v-expansion-panels v-model="openPanelIndex" multiple>
        <!-- Search Criteria -->
        <v-expansion-panel class="my-3 elevation-0">
          <v-expansion-panel-header>
            <div class="px-2">
              <app-section-title :title="$t('label.searchCriteria')" class="text-uppercase"></app-section-title>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class="pb-4" no-gutters>
              <v-col cols="12">
                <v-divider class="my-5 mt-0"></v-divider>
              </v-col>

              <v-col cols="12" class="pb-8">
                <v-form ref="searchForm">
                  <v-row>
                    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                      <app-form-field :label="$t('label.agentID')" :items="userDdl" v-model.trim="searchCriteria.user" :placeholder="$t(`label.agentID`)" fieldWidth="100%"></app-form-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                      <app-date-picker :label="$t('label.fromDate')" :selectedDateTime.sync="searchCriteria.fromDate" date clearable :placeholder="$t(`label.fromDate`)"></app-date-picker>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                      <app-date-picker :label="$t('label.endDate')" :selectedDateTime.sync="searchCriteria.endDate" date clearable :placeholder="$t(`label.endDate`)"></app-date-picker>
                    </v-col>

                    <v-spacer></v-spacer>

                    <v-col class="shrink d-flex" align-self="end">
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
                </v-form>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
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
                    <td class="text-caption font-weight-medium">{{ i.item.applicationDate }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.applicationID }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.applicationType }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.agentID }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.agentName }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.eFormNumber }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.orderNo }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.productPackage }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.productPrice }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.phone }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.address }}</td>
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
import { REPORT_SALES_TRANSACTION } from '@/store/report.module'
import { LOOKUP_USERCODE_DDL } from '@/store/lookup.module'

export default {
  name: 'ReportSalesTransaction',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.REPORT)

      t.accessView = permissionHelper.isAuthorizedAction(MODULE_ID.REPORT, ACTION.READ)
      t.accessCreate = permissionHelper.isAuthorizedAction(MODULE_ID.REPORT, ACTION.CREATE)
      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.REPORT, ACTION.UPDATE)
      t.accessDelete = permissionHelper.isAuthorizedAction(MODULE_ID.REPORT, ACTION.DELETE)
    })
  },
  beforeRouteLeave(to, from, next) {
    // if (to.name != ROUTE_NAME.CUSTOMER_APPLICATION_CREATE && to.name != ROUTE_NAME.CUSTOMER_APPLICATION_DETAILS) {
    //   searchHelper.clearSearch(SESSION.CUSTOMER_APPLICATION_SEARCH)
    // }
    searchHelper.clearSearch(SESSION.REPORT_CLAIM_PAYOUT)
    next()
  },
  props: {},
  data() {
    return {
      openPanelIndex: [0],
      accessView: false,
      accessEdit: false,
      accessCreate: false,
      accessDelete: false,
      searchCriteria: {
        user: '',
        fromDate: '',
        endDate: ''
      },
      tableRowsFiltered: [],
      tableHeaders: [
        // {
        //   text: localizationHelper.getMessage('label.no'),
        //   class: 'caption'
        // },
        {
          text: localizationHelper.getMessage('label.applicationDate'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.applicationID'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.applicationType'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.agentID'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.agentName'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.eFormNumber'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.orderNo'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.productPackage'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.productPrice'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.phone'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.address'),
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
    this.getUserDdl()
  },
  mounted() {},
  computed: {
    tableRows() {
      return this.$store.state.report.saleslist.data
    },
    userDdl() {
      return this.$store.state.lookup.userDdl
    }
  },
  watch: {
    tableRows() {
      this.filterByStatus()
    },
    userDdl() {
      this.searchCriteria.user = ''
    }
  },
  methods: {
    getUserDdl() {
      this.$store.dispatch(`${LOOKUP_USERCODE_DDL}`, { hasOptionAll: false, isActive: true })
    },
    initSearchCriteria() {
      let isDefault = true

      if (searchHelper.hasSearchCriteria(SESSION.REPORT_SALES_TRANSACTION)) {
        isDefault = false
        this.searchCriteria = searchHelper.retrieveSearch(SESSION.REPORT_SALES_TRANSACTION)
        this.getReportSalesTransaction(this.searchCriteria)
      }

      if (isDefault) {
        this.searchCriteria = {
          user: '',
          fromDate: '',
          endDate: ''
        }
      }
      this.getReportSalesTransaction(this.searchCriteria)
    },
    searchListing() {
      if (this.$refs.searchForm.validate()) {
        this.getReportSalesTransaction(this.searchCriteria)
      }
    },
    getReportSalesTransaction(filter) {
      let param = {
        user: filter.user,
        fromDate: filter.fromDate,
        endDate: filter.endDate
      }
      this.$store.dispatch(`${REPORT_SALES_TRANSACTION}`, { filter: param })
      this.searchCriteria = filter
      searchHelper.storeSearch(SESSION.REPORT_SALES_TRANSACTION, filter)
    },
    filterByStatus() {
      this.tableRowsFiltered = this.tableRows
    },
    resetSearchCriteria() {
      searchHelper.clearSearch(SESSION.REPORT_SALES_TRANSACTION)
      this.searchCriteria.user = ''
      this.searchCriteria.fromDate = ''
      this.searchCriteria.endDate = ''

      this.$refs.searchForm.resetValidation()
      this.getReportSalesTransaction(this.searchCriteria)
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
