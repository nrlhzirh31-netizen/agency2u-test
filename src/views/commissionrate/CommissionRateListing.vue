<template>
  <div>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.commissionRate')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
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
                  <v-row>
                    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                      <app-form-field :label="$t('label.productIDOrName')" v-model.trim="searchCriteria.productCode" :placeholder="$t(`label.productIDOrName`)"></app-form-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                      <app-form-field :label="$t('label.role')" :items="roleDdl" v-model.trim="searchCriteria.role" :placeholder="$t(`label.all`)"></app-form-field>
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
        <v-col>
          <v-data-table :headers="tableHeaders" :items="tableRowsFiltered" :items-per-page="pageSize" :no-data-text="$t('message.noRecordFound')" class="app-table-card" disable-sort>
            <template v-slot:item="i">
              <tr>
                <!-- <td class="text-caption font-weight-medium">{{ $filters.paginateTableIndex(i.index, clientSidePagination.pageNumber) }}</td> -->
                <td class="text-caption font-weight-medium">{{ i.item.code }}</td>
                <td class="text-caption font-weight-medium">{{ i.item.product }}</td>
                <td class="text-caption font-weight-medium">{{ i.item.role }}</td>
                <td class="text-caption font-weight-medium">{{ i.item.amountType }}</td>
                <td class="text-caption font-weight-medium">{{ i.item.amount }}</td>
                <td>
                  <v-row no-gutters>
                    <v-col cols="auto">
                      <v-icon v-if="accessView || accessEdit" @click="toDetailsPage(i.item.id)" class="px-1" size="25" color="secondary" dense>$settingsIcon</v-icon>
                    </v-col>
                    <v-col cols="auto">
                      <v-icon v-if="accessDelete" @click="submitConfirmation(i.item.id)" class="px-1" size="25" color="red" dense>$deleteIcon</v-icon>
                    </v-col>
                  </v-row>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </app-section-card>
  </div>
</template>

<script>
import { SHARED, SESSION, ROUTE_NAME } from '@/constants'
import { permissionHelper, localizationHelper, searchHelper } from '@/utils'
import { COMMISSION_RATE_LIST, COMMISSION_RATE_DELETE } from '@/store/commissionrate.module'
import { SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'
import { LOOKUP_ROLE_DDL } from '@/store/lookup.module'

export default {
  name: 'CommissionRateListing',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.COMMISSION_RATE)

      t.accessView = permissionHelper.isAuthorizedAction(MODULE_ID.COMMISSION_RATE, ACTION.READ)
      t.accessCreate = permissionHelper.isAuthorizedAction(MODULE_ID.COMMISSION_RATE, ACTION.CREATE)
      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.COMMISSION_RATE, ACTION.UPDATE)
      t.accessDelete = permissionHelper.isAuthorizedAction(MODULE_ID.COMMISSION_RATE, ACTION.DELETE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.COMMISSION_RATE_CREATE && to.name != ROUTE_NAME.COMMISSION_RATE_DETAILS) {
      searchHelper.clearSearch(SESSION.COMMISSION_RATE_SEARCH)
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
        productCode: SHARED.DEFAULT_ALL_VALUE_STR,
        role: ''
      },
      tableRowsFiltered: [],
      tableHeaders: [
        // {
        //   text: localizationHelper.getMessage('label.no'),
        //   class: 'caption'
        // },
        {
          text: localizationHelper.getMessage('label.code'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.product'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.role'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.commissionType'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.commissionRate'),
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
    this.getRoleDdl()
  },
  mounted() {},
  computed: {
    tableRows() {
      return this.$store.state.commissionrate.list.data
    },
    roleDdl() {
      return this.$store.state.lookup.roleDdl
    }
  },
  watch: {
    tableRows() {
      this.filterByStatus()
    },
    roleDdl() {
      this.searchCriteria.role = ''
    }
  },
  methods: {
    getRoleDdl() {
      this.$store.dispatch(`${LOOKUP_ROLE_DDL}`, { hasOptionAll: false, isActive: true, strValue: true })
    },
    initSearchCriteria() {
      let isDefault = true

      if (searchHelper.hasSearchCriteria(SESSION.COMMISSION_RATE_SEARCH)) {
        isDefault = false
        this.searchCriteria = searchHelper.retrieveSearch(SESSION.COMMISSION_RATE_SEARCH)
      }

      if (isDefault) {
        this.searchCriteria = {
          productCode: SHARED.DEFAULT_ALL_VALUE_STR,
          role: ''
        }
      }
      this.getCommissionRateList(this.searchCriteria)
    },
    searchListing() {
      if (this.$refs.searchForm.validate()) {
        this.getCommissionRateList(this.searchCriteria)
      }
    },
    getCommissionRateList(filter) {
      let param = {
        productCode: filter.productCode,
        role: filter.role
      }
      this.$store.dispatch(`${COMMISSION_RATE_LIST}`, { filter: param })
      this.searchCriteria = filter
      searchHelper.storeSearch(SESSION.COMMISSION_RATE_SEARCH, filter)
    },
    filterByStatus() {
      this.tableRowsFiltered = this.tableRows
    },
    resetSearchCriteria() {
      this.searchCriteria.productCode = SHARED.DEFAULT_ALL_VALUE_STR
      this.searchCriteria.role = ''

      this.$refs.searchForm.resetValidation()
      this.searchListing()
    },
    toDetailsPage(id) {
      let filter = searchHelper.retrieveSearch(SESSION.COMMISSION_RATE_SEARCH)
      filter.selectedRecordId = id
      searchHelper.storeSearch(SESSION.COMMISSION_RATE_SEARCH, filter)

      this.$router.push({
        name: ROUTE_NAME.COMMISSION_RATE_DETAILS
      })
    },
    toCreatePage() {
      this.$router.push({
        name: ROUTE_NAME.COMMISSION_RATE_CREATE
      })
    },
    deleteItem(id) {
      this.$store.dispatch(COMMISSION_RATE_DELETE, { id })
    },
    submitConfirmation(id) {
      let messageDialog = {
        messageTitle: localizationHelper.getMessage(`label.delete`),
        messages: [localizationHelper.getMessage(`message.confirmDelete`)],
        buttons: [
          {
            title: localizationHelper.getMessage(`button.cancel`),
            action: () => {
              this.$store.dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog)
            }
          },
          {
            title: localizationHelper.getMessage(`button.ok`),
            action: () => {
              this.$store.dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog)
              this.deleteItem(id)
            }
          }
        ],
        type: this.$const.DIALOG_TYPE.CONFIRMATION
      }

      this.$store.dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog)
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
