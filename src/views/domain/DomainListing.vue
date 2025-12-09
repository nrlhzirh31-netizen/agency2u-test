<template>
  <div>
    <app-section-card>
      <v-row class="pa-4" no-gutters>
        <v-col cols="auto" class="text-left">
          <app-section-title :title="$t('label.domains')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
        </v-col>
        <v-spacer></v-spacer>
        <!-- Search Criteria -->
        <v-col cols="auto" class="text-right">
          <v-form ref="searchForm" class="search-form-field-set d-inline-block">
            <app-search-form-field :placeholder="$t('label.domainId')" v-model.trim="searchCriteria.domainId"></app-search-form-field>
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
          <app-button v-if="accessCreate" :text="$t('button.add')" :action="toCreatePage" class="d-inline-block ml-2" icon="mdi-plus"></app-button>
        </v-col>

        <!-- Table -->
        <v-col cols="12">
          <v-row>
            <v-col>
              <v-data-table
                :headers="tableHeaders"
                :items="tableRowsFiltered"
                :page.sync="clientSidePagination.pageNumber"
                :items-per-page="clientSidePagination.pageSize"
                @page-count="clientSidePagination.lastPage = $event"
                :no-data-text="$t('message.noRecordFound')"
                class="app-table-card"
                hide-default-footer
                disable-sort
              >
                <template v-slot:item="i">
                  <tr>
                    <!-- <td class="text-caption font-weight-medium">{{ i.item.id }}</td> -->
                    <td class="text-caption font-weight-medium">{{ $filters.paginateTableIndex(i.index, clientSidePagination.pageNumber) }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.code }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.name }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.description }}</td>
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

                <!--Pagination-->
                <template v-slot:footer>
                  <app-pagination :pagination="clientSidePagination" :clientSidePagination="true"></app-pagination>
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
import { DOMAIN_LIST, DOMAIN_DELETE } from '@/store/domain.module'
import { SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'

export default {
  name: 'DomainListing',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.DOMAIN)

      t.accessView = permissionHelper.isAuthorizedAction(MODULE_ID.DOMAIN, ACTION.READ)
      t.accessCreate = permissionHelper.isAuthorizedAction(MODULE_ID.DOMAIN, ACTION.CREATE)
      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.DOMAIN, ACTION.UPDATE)
      t.accessDelete = permissionHelper.isAuthorizedAction(MODULE_ID.DOMAIN, ACTION.DELETE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.DOMAIN_CREATE && to.name != ROUTE_NAME.DOMAIN_DETAILS) {
      searchHelper.clearSearch(SESSION.DOMAIN_SEARCH)
    }
    next()
  },
  props: {},
  data() {
    return {
      accessView: false,
      accessEdit: false,
      accessCreate: false,
      accessDelete: false,
      searchCriteria: {
        domainId: SHARED.DEFAULT_ALL_VALUE_STR
      },
      tableRowsFiltered: [],
      tableHeaders: [
        {
          text: localizationHelper.getMessage('label.no'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.code'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.name'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.description'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.action'),
          class: 'caption'
        }
      ],
      clientSidePagination: {
        pageNumber: 0,
        pageSize: 0,
        lastPage: 0,
        tableRowsCount: 0
      }
    }
  },
  created() {
    /* Page Init */
    this.initSearchCriteria()
  },
  mounted() {},
  computed: {
    tableRows() {
      return this.$store.state.domain.list.data
    },
    pagination() {
      return this.$store.state.domain.list.pagination
    }
  },
  watch: {
    tableRows() {
      this.filterByStatus()
    },
    pagination() {
      this.clientSidePagination = sharedHelper.getClientSidePagination(SHARED.DEFAULT_PAGE_SIZE, this.pagination.pageNumber, this.pagination.tableRowsCount)
    }
  },
  methods: {
    initSearchCriteria() {
      let isDefault = true

      if (searchHelper.hasSearchCriteria(SESSION.DOMAIN_SEARCH)) {
        isDefault = false
        this.searchCriteria = searchHelper.retrieveSearch(SESSION.DOMAIN_SEARCH)
      }

      if (isDefault) {
        this.searchCriteria = {
          bankId: SHARED.DEFAULT_ALL_VALUE_STR
        }
      }
      this.getBankList(this.searchCriteria)
    },
    searchListing() {
      if (this.$refs.searchForm.validate()) {
        this.getBankList(this.searchCriteria)
      }
    },
    getBankList(filter) {
      this.$store.dispatch(`${DOMAIN_LIST}`, { filter })
      this.searchCriteria = filter
      searchHelper.storeSearch(SESSION.DOMAIN_SEARCH, filter)
    },
    filterByStatus() {
      this.tableRowsFiltered = this.tableRows
      this.clientSidePagination = sharedHelper.getClientSidePagination(SHARED.DEFAULT_PAGE_SIZE, SHARED.DEFAULT_PAGE_NUMBER, this.tableRowsFiltered.length)
    },
    resetSearchCriteria() {
      this.searchCriteria.bankId = SHARED.DEFAULT_ALL_VALUE_STR

      this.searchListing()
    },
    toDetailsPage(id) {
      let filter = searchHelper.retrieveSearch(SESSION.DOMAIN_SEARCH)
      filter.selectedRecordId = id
      searchHelper.storeSearch(SESSION.DOMAIN_SEARCH, filter)

      this.$router.push({
        name: ROUTE_NAME.DOMAIN_DETAILS
      })
    },
    toCreatePage() {
      this.$router.push({
        name: ROUTE_NAME.DOMAIN_CREATE
      })
    },
    deleteItem(id) {
      this.$store.dispatch(DOMAIN_DELETE, { id })
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
