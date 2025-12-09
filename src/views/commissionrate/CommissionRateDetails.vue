<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.updateCommissionRate')" class="text-uppercase"></app-section-title>
    </v-row>
    <div class="mx-4">
      <v-form ref="updateForm">
        <v-expansion-panels v-model="openPanelIndex" multiple>
          <!-- Bank Details -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.commissionRateDetails')" class="text-uppercase"></app-section-title>
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
                    <app-form-field :label="$t('label.code')" v-model.trim="data.code" :placeholder="$t(`label.code`)" fieldWidth="100%" :rules="$validators.requiredFields()"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.description')"
                      v-model.trim="data.description"
                      :placeholder="$t(`label.description`)"
                      :rules="$validators.requiredFields()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="12" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.product')"
                      v-model.trim="data.product"
                      :items="productsDdl"
                      fieldWidth="100%"
                      :placeholder="$t(`label.product`)"
                      :rules="$validators.requiredInputDdl()"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.roles')"
                      v-model.trim="data.role"
                      :items="roleDdl"
                      :rules="$validators.requiredInputDdl()"
                      fieldWidth="100%"
                      :placeholder="$t(`label.selectRole`)"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.commissionType')"
                      v-model.trim="data.amountType"
                      :items="amountTypeDdl"
                      :placeholder="$t(`label.commissionType`)"
                      :rules="$validators.requiredInputDdl()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.commissionRate')"
                      v-model.trim="data.amount"
                      :placeholder="$t(`label.commissionRate`)"
                      fieldWidth="100%"
                      :rules="$validators.requiredFields()"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" class="text-right">
                  <app-button v-if="accessEdit" :text="$t('button.update')" :action="updateCommissionRate" color="primary"></app-button>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-form>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAME, SESSION } from '@/constants'
import { searchHelper, permissionHelper, localizationHelper } from '@/utils'
import { COMMISSION_RATE_DETAILS, COMMISSION_RATE_EDIT } from '@/store/commissionrate.module'
import { LOOKUP_PRODUCTS_DDL, LOOKUP_ROLE_DDL, LOOKUP_AMOUNT_TYPE_DDL } from '@/store/lookup.module'

export default {
  name: 'CommissionRateDetails',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.COMMISSION_RATE)

      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.COMMISSION_RATE, ACTION.UPDATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.COMMISSION_RATE_LIST) {
      searchHelper.clearSearch(SESSION.COMMISSION_RATE_SEARCH)
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
            name: ROUTE_NAME.COMMISSION_RATE_LIST
          },
          exact: true
        }
      ]
    }
  },
  created() {
    /* Page Init */
    this.searchCriteria = searchHelper.retrieveSearch(SESSION.COMMISSION_RATE_SEARCH)
    this.getCommissionRate()
    this.getProductsDdl()
    this.getRoleDdl()
    this.getAmountTypeDdl()
  },
  mounted() {},
  computed: {
    data() {
      return this.$store.state.commissionrate.details
    },
    roleDdl() {
      return this.$store.state.lookup.roleDdl
    },
    amountTypeDdl() {
      return this.$store.state.lookup.amountTypeDdl
    },
    productsDdl() {
      return this.$store.state.lookup.productsDdl
    }
  },
  watch: {},
  methods: {
    getRoleDdl() {
      this.$store.dispatch(`${LOOKUP_ROLE_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getAmountTypeDdl() {
      this.$store.dispatch(`${LOOKUP_AMOUNT_TYPE_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getCommissionRate() {
      this.$store.dispatch(`${COMMISSION_RATE_DETAILS}`, { id: this.searchCriteria.selectedRecordId })
    },
    getProductsDdl() {
      this.$store.dispatch(`${LOOKUP_PRODUCTS_DDL}`, { hasOptionAll: false, isActive: true })
    },
    updateCommissionRate() {
      if (this.$refs.updateForm.validate()) {
        let data = {
          code: this.data.code,
          description: this.data.description,
          product: this.data.product,
          role: this.data.role,
          amountType: this.data.amountType,
          amount: this.data.amount
        }

        this.$store.dispatch(`${COMMISSION_RATE_EDIT}`, { id: this.searchCriteria.selectedRecordId, data })
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
