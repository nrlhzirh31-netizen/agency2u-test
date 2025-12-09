<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.ansuran') + ' ' + $t('label.updateCommissionRate')" class="text-uppercase"></app-section-title>
    </v-row>
    <div class="mx-4">
      <v-form ref="updateForm">
        <v-expansion-panels v-model="openPanelIndex" multiple>
          <!-- Bank Details -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.ansuran') + ' ' + $t('label.commissionRateDetails')" class="text-uppercase"></app-section-title>
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
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.role')"
                      v-model.trim="data.role"
                      :items="roleDdl"
                      :placeholder="$t(`label.role`)"
                      :rules="$validators.requiredInputDdl()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.fromAmount')"
                      v-model.trim="data.fromAmount"
                      :placeholder="$t(`label.fromAmount`)"
                      :rules="$validators.requiredFields()"
                      fieldWidth="100%"
                      type="number"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.toAmount')"
                      v-model.trim="data.toAmount"
                      :placeholder="$t(`label.toAmount`)"
                      :rules="$validators.requiredFields()"
                      fieldWidth="100%"
                      type="number"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
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
                      :label="$t('label.commissionAmount')"
                      v-model.trim="data.commissionAmount"
                      :placeholder="$t(`label.commissionAmount`)"
                      :rules="$validators.requiredFields()"
                      fieldWidth="100%"
                      type="number"
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
import { ANSURAN_COMMISSION_RATE_DETAILS, ANSURAN_COMMISSION_RATE_EDIT } from '@/store/ansuran-commission-rate.module'
import { LOOKUP_ROLE_DDL, LOOKUP_AMOUNT_TYPE_DDL } from '@/store/lookup.module'
import { AnsuranCommissionRate } from '@/constants/class/ansuran-commission-rate'

export default {
  name: 'CommissionRateDetails',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.ANSURAN_COMMISSION_RATE)

      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.ANSURAN_COMMISSION_RATE, ACTION.UPDATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.ANSURAN_COMMISSION_RATE_LIST) {
      searchHelper.clearSearch(SESSION.ANSURAN_COMMISSION_RATE_SEARCH)
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
            name: ROUTE_NAME.ANSURAN_COMMISSION_RATE_LIST
          },
          exact: true
        }
      ]
    }
  },
  created() {
    /* Page Init */
    this.searchCriteria = searchHelper.retrieveSearch(SESSION.ANSURAN_COMMISSION_RATE_SEARCH)
    console.log('searchCriteria', this.searchCriteria)
    this.getAnsuranCommissionRate()
    this.getRoleDdl()
    this.getAmountTypeDdl()
  },
  mounted() {},
  computed: {
    data() {
      return this.$store.state.ansuranCommissionRate.details
    },
    roleDdl() {
      return this.$store.state.lookup.roleDdl
    },
    amountTypeDdl() {
      return this.$store.state.lookup.amountTypeDdl
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
    getAnsuranCommissionRate() {
      this.$store.dispatch(`${ANSURAN_COMMISSION_RATE_DETAILS}`, { id: this.searchCriteria.selectedRecordId })
    },
    updateCommissionRate() {
      if (this.$refs.updateForm.validate()) {
        let data = new AnsuranCommissionRate({
          id: this.searchCriteria.selectedRecordId,
          code: this.data.code,
          description: this.data.description,
          role: this.data.role,
          fromAmount: this.data.fromAmount,
          toAmount: this.data.toAmount,
          commissionAmount: this.data.commissionAmount,
          amountType: this.data.amountType
        })

        this.$store.dispatch(`${ANSURAN_COMMISSION_RATE_EDIT}`, { id: this.searchCriteria.selectedRecordId, data })
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
