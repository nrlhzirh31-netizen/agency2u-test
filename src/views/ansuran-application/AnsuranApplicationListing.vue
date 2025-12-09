<template>
  <div>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.ansuranApplication')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
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
                      <app-form-field :label="$t('label.ansuranStatus')" :items="ansuranStatusDdl" v-model.trim="searchCriteria.ansuranStatus" :placeholder="$t(`label.all`)"></app-form-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                      <app-form-field :label="$t('label.nric')" v-model.trim="searchCriteria.nric" :placeholder="$t(`label.nric`)"></app-form-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      lg="3"
                      xl="2"
                      v-if="(currentUserInfo.role && currentUserInfo.role.code == 'ANSURAN_STAFF') || (currentUserInfo.role && currentUserInfo.role.code == 'ADMIN')"
                    >
                      <app-form-field :label="$t('label.agentID')" v-model.trim="searchCriteria.agentCode" :placeholder="$t(`label.agentID`)"></app-form-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                      <app-date-picker :label="$t('label.fromDate')" :selectedDateTime.sync="searchCriteria.fromDate" date clearable :placeholder="$t(`label.fromDate`)"></app-date-picker>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                      <app-date-picker :label="$t('label.endDate')" :selectedDateTime.sync="searchCriteria.endDate" date clearable :placeholder="$t(`label.endDate`)"></app-date-picker>
                    </v-col>

                    <v-spacer></v-spacer>

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
      <v-row class="pt-4" no-gutters>
        <v-col cols="12" class="text-right">
          <app-button v-if="accessCreate" :text="$t('button.add')" :action="toCreatePage" class="d-inline-block ml-2" icon="mdi-plus"></app-button>
        </v-col>
      </v-row>
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
                    <td class="text-caption font-weight-medium">{{ i.item.user }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.ansuranApplicationFirm }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.name }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.productName }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.productSerialNumber }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.firstMonthPayment }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.ansuranStatus }}</td>
                    <td>
                      <v-row no-gutters>
                        <v-col cols="auto">
                          <v-icon v-if="accessView || accessEdit" @click="toDetailsPage(i.item.id)" class="px-1" size="25" color="secondary" dense>$settingsIcon</v-icon>
                          <!-- <v-icon v-if="(accessView || accessEdit) && i.item.ansuranStatus === 'Rejected'" @click="toDetailsRejectedPage(i.item.id)" class="px-1" size="25" color="secondary" dense>
                            $settingsIcon
                          </v-icon> -->
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
import { ANSURAN_APPLICATION_LIST } from '@/store/ansuran-application.module'
import { LOOKUP_ANSURAN_STATUS_DDL } from '@/store/lookup.module'

export default {
  name: 'AnsuranApplicationListing',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.ANSURAN_APPLICATION)

      t.accessView = permissionHelper.isAuthorizedAction(MODULE_ID.ANSURAN_APPLICATION, ACTION.READ)
      t.accessCreate = permissionHelper.isAuthorizedAction(MODULE_ID.ANSURAN_APPLICATION, ACTION.CREATE)
      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.ANSURAN_APPLICATION, ACTION.UPDATE)
      t.accessDelete = permissionHelper.isAuthorizedAction(MODULE_ID.ANSURAN_APPLICATION, ACTION.DELETE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.ANSURAN_APPLICATION_CREATE && to.name != ROUTE_NAME.ANSURAN_APPLICATION_DETAILS) {
      searchHelper.clearSearch(SESSION.ANSURAN_APPLICATION_SEARCH)
    }
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
        ansuranStatus: '',
        fromDate: '',
        endDate: '',
        nric: '',
        agentCode: '',
        address: ''
      },
      tableRowsFiltered: [],
      tableHeaders: [
        {
          text: localizationHelper.getMessage('label.applicationDate'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.agentID'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.ansuranApplicationFirm'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.customerNameOnly'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.productName'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.productSerialNumber'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.firstMonthPayment'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.ansuranStatus'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.action'),
          class: 'caption'
        }
      ],
      pageSize: SHARED.DEFAULT_PAGE_SIZE,
      currentUserInfo: {}
    }
  },
  created() {
    /* Page Init */
    this.initSearchCriteria()
    this.getAnsuranStatusDdl()
  },
  mounted() {
    this.currentUserInfo = localStorage.getItem(SESSION.CURRENT_USER_INFO) ? JSON.parse(localStorage.getItem(SESSION.CURRENT_USER_INFO)) : null
  },
  computed: {
    tableRows() {
      return this.$store.state.ansuranApplication.list.data
    },
    ansuranStatusDdl() {
      return this.$store.state.lookup.ansuranStatusDdl
    }
  },
  watch: {
    tableRows() {
      this.filterByStatus()
    },
    ansuranStatusDdl() {
      this.searchCriteria.ansuranStatus = ''
    }
  },
  methods: {
    getAnsuranStatusDdl() {
      this.$store.dispatch(`${LOOKUP_ANSURAN_STATUS_DDL}`, { hasOptionAll: false, isActive: true, strValue: true })
    },
    initSearchCriteria() {
      let isDefault = true

      if (searchHelper.hasSearchCriteria(SESSION.ANSURAN_APPLICATION_SEARCH)) {
        isDefault = false
        this.searchCriteria = searchHelper.retrieveSearch(SESSION.ANSURAN_APPLICATION_SEARCH)
        this.getAnsuranApplicationList(this.searchCriteria)
      }

      if (isDefault) {
        this.searchCriteria = {
          ansuranStatus: '',
          fromDate: '',
          endDate: '',
          nric: '',
          agentCode: '',
          address: ''
        }
      }
      this.getAnsuranApplicationList(this.searchCriteria)
    },
    searchListing() {
      if (this.$refs.searchForm.validate()) {
        this.getAnsuranApplicationList(this.searchCriteria)
      }
    },
    getAnsuranApplicationList(filter) {
      let param = {
        ansuranStatus: filter.ansuranStatus,
        fromDate: filter.fromDate,
        endDate: filter.endDate,
        nric: filter.nric,
        agentCode: filter.agentCode,
        address: filter.address
      }
      this.$store.dispatch(`${ANSURAN_APPLICATION_LIST}`, { filter: param })
      this.searchCriteria = filter
      searchHelper.storeSearch(SESSION.ANSURAN_APPLICATION_SEARCH, filter)
    },
    filterByStatus() {
      this.tableRowsFiltered = this.tableRows
    },
    resetSearchCriteria() {
      searchHelper.clearSearch(SESSION.ANSURAN_APPLICATION_SEARCH)
      this.searchCriteria.ansuranStatus = ''
      this.searchCriteria.fromDate = ''
      this.searchCriteria.endDate = ''
      this.searchCriteria.nric = ''
      this.searchCriteria.agentCode = ''
      this.searchCriteria.orderNumber = ''
      this.searchCriteria.address = ''

      this.$refs.searchForm.resetValidation()
      this.getAnsuranApplicationList(this.searchCriteria)
    },
    toDetailsPage(id) {
      let filter = searchHelper.retrieveSearch(SESSION.ANSURAN_APPLICATION_SEARCH)
      filter.selectedRecordId = id
      searchHelper.storeSearch(SESSION.ANSURAN_APPLICATION_SEARCH, filter)

      this.$router.push({
        name: ROUTE_NAME.ANSURAN_APPLICATION_DETAILS
      })
    },
    toDetailsRejectedPage(id) {
      let filter = searchHelper.retrieveSearch(SESSION.ANSURAN_APPLICATION_SEARCH)
      filter.selectedRecordId = id
      console.log('set fitler', filter)
      searchHelper.storeSearch(SESSION.ANSURAN_APPLICATION_SEARCH, filter)
      console.log('stored fileter value', searchHelper.retrieveSearch(SESSION.ANSURAN_APPLICATION_SEARCH))

      this.$router.push({
        name: ROUTE_NAME.ANSURAN_APPLICATION_DETAILS_REJECTED
      })
    },
    toCreatePage() {
      this.$router.push({
        name: ROUTE_NAME.ANSURAN_APPLICATION_CREATE
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
.text-body-2 {
  color: #005993 !important;
}
</style>
