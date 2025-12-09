<template>
  <div>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.userSetup')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
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
                      <app-form-field :label="$t('label.agentIDOrName')" v-model.trim="searchCriteria.agentCode" :placeholder="$t(`label.agentIDOrName`)"></app-form-field>
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
                <!-- <td class="text-caption font-weight-medium">{{ $filters.paginateTableIndex(i.index, pageNumber) }}</td> -->
                <td class="text-caption font-weight-medium">{{ i.item.email }}</td>
                <td class="text-caption font-weight-medium">{{ i.item.createdAt }}</td>
                <td class="text-caption font-weight-medium">{{ i.item.code }}</td>
                <td class="text-caption font-weight-medium">{{ i.item.name }}</td>
                <td class="text-caption font-weight-medium">{{ i.item.phone }}</td>
                <td class="text-caption font-weight-medium">{{ i.item.role }}</td>
                <td class="text-caption font-weight-medium">{{ i.item.referredBy }}</td>
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
import { USER_LIST, USER_DELETE } from '@/store/user.module'
import { SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'

export default {
  name: 'UserListing',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.USER)

      t.accessView = permissionHelper.isAuthorizedAction(MODULE_ID.USER, ACTION.READ)
      t.accessCreate = permissionHelper.isAuthorizedAction(MODULE_ID.USER, ACTION.CREATE)
      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.USER, ACTION.UPDATE)
      t.accessDelete = permissionHelper.isAuthorizedAction(MODULE_ID.USER, ACTION.DELETE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.USER_CREATE && to.name != ROUTE_NAME.USER_DETAILS) {
      searchHelper.clearSearch(SESSION.USER_SEARCH)
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
        agentCode: '' //agent code or name
      },
      tableRowsFiltered: [],
      tableHeaders: [
        // {
        //   text: localizationHelper.getMessage('label.no'),
        //   class: 'caption'
        // },
        {
          text: localizationHelper.getMessage('label.email'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.createdAt'),
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
          text: localizationHelper.getMessage('label.phone'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.role'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.referredBy'),
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
      return this.$store.state.user.list.data
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

      if (searchHelper.hasSearchCriteria(SESSION.USER_SEARCH)) {
        isDefault = false
        this.searchCriteria = searchHelper.retrieveSearch(SESSION.USER_SEARCH)
        this.getUserList(this.searchCriteria)
      }

      if (isDefault) {
        this.searchCriteria = {
          agentCode: SHARED.DEFAULT_ALL_VALUE_STR
        }
      }
      this.getUserList(this.searchCriteria)
    },
    searchListing() {
      if (this.$refs.searchForm.validate()) {
        this.getUserList(this.searchCriteria)
      }
    },
    getUserList(filter) {
      let param = {
        agentCode: filter.agentCode
      }
      this.$store.dispatch(`${USER_LIST}`, { filter: param })
      this.searchCriteria = filter
      searchHelper.storeSearch(SESSION.USER_SEARCH, filter)
    },
    filterByStatus() {
      this.tableRowsFiltered = this.tableRows
    },
    resetSearchCriteria() {
      this.searchCriteria.agentCode = SHARED.DEFAULT_ALL_VALUE_STR

      this.searchListing()
    },
    toDetailsPage(id) {
      let filter = searchHelper.retrieveSearch(SESSION.USER_SEARCH)
      filter.selectedRecordId = id
      searchHelper.storeSearch(SESSION.USER_SEARCH, filter)

      this.$router.push({
        name: ROUTE_NAME.USER_DETAILS
      })
    },
    toCreatePage() {
      this.$router.push({
        name: ROUTE_NAME.USER_CREATE
      })
    },
    deleteItem(id) {
      this.$store.dispatch(USER_DELETE, { id })
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
