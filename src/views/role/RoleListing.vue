<template>
  <div>
    <app-section-card>
      <v-row class="pa-4" no-gutters>
        <v-col cols="auto" class="text-left">
          <app-section-title :title="$t('label.rolesPermissions')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
        </v-col>
        <v-spacer></v-spacer>
        <!-- Search Criteria -->
        <v-col cols="auto" class="text-right">
          <v-form ref="searchForm" class="search-form-field-set d-inline-block">
            <app-search-form-field :placeholder="$t('label.id')" v-model.trim="searchCriteria.id"></app-search-form-field>
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

        <v-col cols="12">
          <v-row>
            <v-col>
              <v-data-table :headers="tableHeaders" :items="tableRowsFiltered" :items-per-page="pageSize" :no-data-text="$t('message.noRecordFound')" class="app-table-card" disable-sort>
                <template v-slot:item="i">
                  <tr>
                    <!-- <td class="text-caption font-weight-medium">{{ $filters.paginateTableIndex(i.index, clientSidePagination.pageNumber) }}</td> -->
                    <td class="text-caption font-weight-medium">{{ i.item.name }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.description }}</td>
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
import { localizationHelper, searchHelper, permissionHelper } from '@/utils'
import { ROLE_LIST } from '@/store/role.module'

export default {
  name: 'RoleListing',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.ACCESS_MATRIX)

      t.accessView = permissionHelper.isAuthorizedAction(MODULE_ID.ACCESS_MATRIX, ACTION.READ)
      t.accessCreate = permissionHelper.isAuthorizedAction(MODULE_ID.ACCESS_MATRIX, ACTION.CREATE)
      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.ACCESS_MATRIX, ACTION.MANAGE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.ROLE_CREATE && to.name != ROUTE_NAME.ROLE_DETAILS) {
      searchHelper.clearSearch(SESSION.ROLE_SEARCH)
    }
    next()
  },
  props: {},
  data() {
    return {
      accessView: false,
      accessEdit: false,
      accessCreate: false,
      searchCriteria: {
        userId: SHARED.DEFAULT_ALL_VALUE_STR
      },
      tableHeaders: [
        // {
        //   text: localizationHelper.getMessage('label.no'),
        //   class: 'caption'
        // },
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
      tableRowsFiltered: [],
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
      return this.$store.state.role.list.data
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

      if (searchHelper.hasSearchCriteria(SESSION.ROLE_SEARCH)) {
        isDefault = false
        this.searchCriteria = searchHelper.retrieveSearch(SESSION.ROLE_SEARCH)
      }

      if (isDefault) {
        this.searchCriteria = {
          id: SHARED.DEFAULT_ALL_VALUE_STR
        }
      }
      this.getRoleList(this.searchCriteria)
    },
    getRoleList(filter) {
      this.$store.dispatch(`${ROLE_LIST}`, { filter })
      this.searchCriteria = filter
      searchHelper.storeSearch(SESSION.ROLE_SEARCH, filter)
    },
    searchListing() {
      if (this.$refs.searchForm.validate()) {
        this.getUserList(this.searchCriteria)
      }
    },
    filterByStatus() {
      this.tableRowsFiltered = this.tableRows
    },
    resetSearchCriteria() {
      this.searchCriteria.id = SHARED.DEFAULT_ALL_VALUE_STR

      this.searchListing()
    },
    toDetailsPage(id) {
      let filter = searchHelper.retrieveSearch(SESSION.ROLE_SEARCH)
      filter.selectedRecordId = id
      searchHelper.storeSearch(SESSION.ROLE_SEARCH, filter)

      this.$router.push({
        name: ROUTE_NAME.ROLE_DETAILS
      })
    },
    toCreatePage() {
      this.$router.push({
        name: ROUTE_NAME.ROLE_CREATE
      })
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
