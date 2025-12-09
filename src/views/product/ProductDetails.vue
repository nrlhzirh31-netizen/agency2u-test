<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.updateProduct')" class="text-uppercase"></app-section-title>
    </v-row>
    <div class="mx-4">
      <v-form ref="updateForm">
        <v-expansion-panels v-model="openPanelIndex" multiple>
          <!-- Bank Details -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.productDetails')" class="text-uppercase"></app-section-title>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-divider class="my-5 mt-0"></v-divider>
                </v-col>
              </v-row>

              <v-row class="py-4" no-gutters>
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.productName')"
                      v-model.trim="data.name"
                      :placeholder="$t(`label.productName`)"
                      :rules="$validators.requiredFields()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.productDescription')"
                      v-model.trim="data.description"
                      :placeholder="$t(`label.productDescription`)"
                      :rules="$validators.requiredFields()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.price')" v-model.trim="data.price" :placeholder="$t(`label.price`)" :rules="$validators.requiredFields()" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.applicationType')"
                      v-model.trim="data.applicationType.id"
                      :items="applicationTypeDdl"
                      :rules="$validators.requiredInputDdl()"
                      fieldWidth="100%"
                      :placeholder="$t(`label.selectApplicationType`)"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-row class="pa-4" no-gutters>
          <v-col cols="12" class="text-right">
            <app-button v-if="accessEdit" :text="$t('button.update')" :action="updateProduct" color="primary"></app-button>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAME, SESSION } from '@/constants'
import { searchHelper, permissionHelper, localizationHelper } from '@/utils'
import { PRODUCT_DETAILS, PRODUCT_EDIT } from '@/store/product.module'
import { LOOKUP_APPLICATION_TYPE_DDL } from '@/store/lookup.module'

export default {
  name: 'ProductDetails',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.PRODUCT)

      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.PRODUCT, ACTION.UPDATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.PRODUCT_LIST) {
      searchHelper.clearSearch(SESSION.PRODUCT_SEARCH)
    }
    next()
  },
  props: {},
  data() {
    return {
      openPanelIndex: [0],
      accessEdit: false,
      breadcrumbs: [
        {
          text: localizationHelper.getMessage('button.back'),
          disabled: false,
          to: {
            name: ROUTE_NAME.PRODUCT_LIST
          },
          exact: true
        }
      ]
    }
  },
  created() {
    /* Page Init */
    this.searchCriteria = searchHelper.retrieveSearch(SESSION.PRODUCT_SEARCH)
    this.getProduct()
    this.getApplicationTypeDdl()
  },
  mounted() {},
  computed: {
    data() {
      return this.$store.state.product.details
    },
    applicationTypeDdl() {
      return this.$store.state.lookup.applicationTypeDdl
    }
  },
  watch: {},
  methods: {
    getApplicationTypeDdl() {
      this.$store.dispatch(`${LOOKUP_APPLICATION_TYPE_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getProduct() {
      this.$store.dispatch(`${PRODUCT_DETAILS}`, { id: this.searchCriteria.selectedRecordId })
    },
    updateProduct() {
      if (this.$refs.updateForm.validate()) {
        let data = {
          name: this.data.name,
          description: this.data.description,
          price: parseFloat(this.data.price),
          applicationType: this.data.applicationType.id
        }

        this.$store.dispatch(`${PRODUCT_EDIT}`, { id: this.searchCriteria.selectedRecordId, data })
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
