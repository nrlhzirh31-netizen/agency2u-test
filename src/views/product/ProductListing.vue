<template>
  <div>
    <app-section-card>
      <v-row class="pa-4" no-gutters>
        <v-col cols="auto" class="text-left">
          <app-section-title :title="$t('label.products')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
        </v-col>
        <v-spacer></v-spacer>
        <!-- Search Criteria -->
        <v-col cols="auto" class="text-right">
          <v-form ref="searchForm" class="search-form-field-set d-inline-block">
            <app-search-form-field :placeholder="$t('label.productId')" v-model.trim="searchCriteria.productId"></app-search-form-field>
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
              <v-data-table :headers="tableHeaders" :items="tableRowsFiltered" :items-per-page="pageSize" :no-data-text="$t('message.noRecordFound')" class="app-table-card" disable-sort>
                <template v-slot:item="i">
                  <tr>
                    <!-- <td class="text-caption font-weight-medium">{{ $filters.paginateTableIndex(i.index, clientSidePagination.pageNumber) }}</td> -->
                    <td class="text-caption font-weight-medium">{{ i.item.code }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.name }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.description }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.price }}</td>
                    <td class="text-caption font-weight-medium">{{ i.item.applicationType }}</td>
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
        </v-col>
      </v-row>
    </app-section-card>
  </div>
</template>

<script>
import { SHARED, SESSION, ROUTE_NAME } from '@/constants'
import { permissionHelper, localizationHelper, searchHelper } from '@/utils'
import { PRODUCT_LIST, PRODUCT_DELETE } from '@/store/product.module'
import { SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'

export default {
  name: 'ProductListing',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.PRODUCT)

      t.accessView = permissionHelper.isAuthorizedAction(MODULE_ID.PRODUCT, ACTION.READ)
      t.accessCreate = permissionHelper.isAuthorizedAction(MODULE_ID.PRODUCT, ACTION.CREATE)
      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.PRODUCT, ACTION.UPDATE)
      t.accessDelete = permissionHelper.isAuthorizedAction(MODULE_ID.PRODUCT, ACTION.DELETE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.PRODUCT_CREATE && to.name != ROUTE_NAME.PRODUCT_DETAILS) {
      searchHelper.clearSearch(SESSION.PRODUCT_SEARCH)
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
        productId: SHARED.DEFAULT_ALL_VALUE_STR
      },
      tableRowsFiltered: [],
      tableHeaders: [
        // {
        //   text: localizationHelper.getMessage('label.no'),
        //   class: 'caption'
        // },
        {
          text: localizationHelper.getMessage('label.productCode'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.productName'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.productDescription'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.price'),
          class: 'caption'
        },
        {
          text: localizationHelper.getMessage('label.applicationType'),
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
      return this.$store.state.product.list.data
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

      if (searchHelper.hasSearchCriteria(SESSION.PRODUCT_SEARCH)) {
        isDefault = false
        this.searchCriteria = searchHelper.retrieveSearch(SESSION.PRODUCT_SEARCH)
      }

      if (isDefault) {
        this.searchCriteria = {
          productId: SHARED.DEFAULT_ALL_VALUE_STR
        }
      }
      this.getProductList(this.searchCriteria)
    },
    searchListing() {
      if (this.$refs.searchForm.validate()) {
        this.getProductList(this.searchCriteria)
      }
    },
    getProductList(filter) {
      this.$store.dispatch(`${PRODUCT_LIST}`, { filter })
      this.searchCriteria = filter
      searchHelper.storeSearch(SESSION.PRODUCT_SEARCH, filter)
    },
    filterByStatus() {
      this.tableRowsFiltered = this.tableRows
    },
    resetSearchCriteria() {
      this.searchCriteria.productId = SHARED.DEFAULT_ALL_VALUE_STR

      this.searchListing()
    },
    toDetailsPage(id) {
      let filter = searchHelper.retrieveSearch(SESSION.PRODUCT_SEARCH)
      filter.selectedRecordId = id
      searchHelper.storeSearch(SESSION.PRODUCT_SEARCH, filter)

      this.$router.push({
        name: ROUTE_NAME.PRODUCT_DETAILS
      })
    },
    toCreatePage() {
      this.$router.push({
        name: ROUTE_NAME.PRODUCT_CREATE
      })
    },
    deleteItem(id) {
      this.$store.dispatch(PRODUCT_DELETE, { id })
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
