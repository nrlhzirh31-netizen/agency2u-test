<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.applicationHistoryDetails')" class="text-uppercase"></app-section-title>
    </v-row>
    <div class="mx-4">
      <v-form ref="updateForm">
        <v-expansion-panels v-model="openPanelIndex" multiple>
          <!-- User Details -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.applicationInfo')" class="text-uppercase"></app-section-title>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="pb-4" no-gutters>
                <v-col cols="12">
                  <v-divider class="my-5 mt-0"></v-divider>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.applicationID')"
                      v-model.trim="data.applicationID"
                      :placeholder="$t(`label.applicationID`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-date-picker
                      :label="$t('label.activatedDate')"
                      :selectedDateTime.sync="data.activatedDate"
                      date
                      clearable
                      :placeholder="$t(`label.activatedDate`)"
                      :nonEditable="true"
                    ></app-date-picker>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <!-- <app-form-field :label="$t('label.applicationDate')" v-model.trim="data.applicationDate" :placeholder="$t(`label.applicationDate`)" fieldWidth="100%"></app-form-field> -->
                    <app-date-picker :label="$t('label.applicationDate')" :selectedDateTime.sync="data.applicationDate" date clearable :placeholder="$t(`label.applicationDate`)"></app-date-picker>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.applicationStatus')"
                      :items="applicationStatusDdl"
                      v-model.trim="data.applicationStatus"
                      :placeholder="$t(`label.applicationStatus`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="8" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.agentID')" :items="userDdl" v-model.trim="data.user" :placeholder="$t(`label.agentID`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.gpsLongitude')" v-model.trim="data.gpsLongitude" :placeholder="$t(`label.gpsLongitude`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.gpsLatitude')" v-model.trim="data.gpsLatitude" :placeholder="$t(`label.gpsLatitude`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.orderNumber')" v-model.trim="data.orderNumber" :placeholder="$t(`label.orderNumber`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.eFormNumber')" v-model.trim="data.eFormNumber" :placeholder="$t(`label.eFormNumber`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.sporaNumber')" v-model.trim="data.sporaNumber" :placeholder="$t(`label.sporaNumber`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.processingId')" v-model.trim="data.processingId" :placeholder="$t(`label.processingId`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="12" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.product')"
                      v-model.trim="data.product"
                      :items="productsDdl"
                      :change="() => onProductChange(data.product)"
                      fieldWidth="100%"
                      :placeholder="$t(`label.product`)"
                      :nonEditable="true"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col v-if="productData.id > 0" cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.price')"
                      v-model.trim="productData.price"
                      :placeholder="$t(`label.price`)"
                      :rules="$validators.requiredFields()"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col v-if="data.productPrice > 0" cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.price')"
                      v-model.trim="data.productPrice"
                      :placeholder="$t(`label.price`)"
                      :rules="$validators.requiredFields()"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col v-if="productData.id > 0" cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.applicationType')"
                      v-model.trim="productData.applicationType.id"
                      :items="applicationTypeDdl"
                      :rules="$validators.requiredInputDdl()"
                      fieldWidth="100%"
                      :placeholder="$t(`label.selectApplicationType`)"
                      :nonEditable="true"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col v-if="data.applicationType > 0" cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.applicationType')"
                      v-model.trim="data.applicationType"
                      :items="applicationTypeDdl"
                      :rules="$validators.requiredInputDdl()"
                      fieldWidth="100%"
                      :placeholder="$t(`label.selectApplicationType`)"
                      :nonEditable="true"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <!-- <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.attachments')" v-model.trim="data.attachments" :placeholder="$t(`label.attachments`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col> -->

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.documentCompleted')"
                      v-model.trim="data.documentCompleted"
                      :items="documentStatusDdl"
                      :placeholder="$t(`label.documentCompleted`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.remarks')"
                      v-model.trim="data.remarks"
                      type="remark"
                      :rows="5"
                      :maxLength="1000"
                      show-counter
                      :placeholder="$t(`label.remarks`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Customer Information -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.customerInfo')" class="text-uppercase"></app-section-title>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-divider class="my-5 mt-0"></v-divider>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.customerName')"
                      v-model.trim="data.name"
                      :placeholder="$t(`label.customerName`)"
                      :rules="$validators.validCharacter()"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.customernric')"
                      v-model.trim="data.nric"
                      :placeholder="$t(`label.customernric`)"
                      :rules="$validators.requiredFields()"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.phone')"
                      v-model.trim="data.phone"
                      :placeholder="$t(`label.phone`)"
                      :rules="$validators.phoneNumberRules()"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.email')"
                      v-model.trim="data.email"
                      :placeholder="$t(`label.email`)"
                      :rules="$validators.emailRules()"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.address1')" v-model.trim="data.addressLine1" :placeholder="$t(`label.address1`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.address2')" v-model.trim="data.addressLine2" :placeholder="$t(`label.address2`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.address3')" v-model.trim="data.addressLine3" :placeholder="$t(`label.address3`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.city')" v-model.trim="data.city" :placeholder="$t(`label.city`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.postalCode')" v-model.trim="data.postcode" :placeholder="$t(`label.postalCode`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.selectCountry')"
                      v-model.trim="data.country"
                      :items="countryDdl"
                      :placeholder="$t(`label.selectCountry`)"
                      :rules="$validators.requiredInput()"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.selectRegion')"
                      v-model.trim="data.state"
                      :items="statesDdl"
                      :placeholder="$t(`label.selectRegion`)"
                      :rules="$validators.requiredInput()"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
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
import { searchHelper, permissionHelper, ddlHelper, localizationHelper } from '@/utils'
import { APPLICATION_HISTORY_DETAILS } from '@/store/customerapplication.module'
import { LOOKUP_APPLICATION_STATUS_DDL, LOOKUP_USER_DDL, LOOKUP_PRODUCTS_DDL, LOOKUP_APPLICATION_TYPE_DDL, LOOKUP_COUNTRY_DDL, LOOKUP_STATES_DDL } from '@/store/lookup.module'
import { PRODUCT_DETAILS, PRODUCT_DETAILS_RESET } from '@/store/product.module'

export default {
  name: 'ApplicationHistoryDetails',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.APPLICATION)

      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.APPLICATION, ACTION.UPDATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.APPLICATION_HISTORY) {
      searchHelper.clearSearch(SESSION.APPLICATION_HISTORY_SEARCH)
    }
    this.$store.dispatch(`${PRODUCT_DETAILS_RESET}`)
    next()
  },
  props: {},
  data() {
    return {
      openPanelIndex: [0, 1],
      accessEdit: false,
      breadcrumbs: [
        {
          text: localizationHelper.getMessage('button.back'),
          disabled: false,
          to: {
            name: ROUTE_NAME.APPLICATION_HISTORY
          },
          exact: true
        }
      ],
      documentStatusDdl: ddlHelper.getDocumentStatus(false, true)
    }
  },
  created() {
    /* Page Init */
    this.searchCriteria = searchHelper.retrieveSearch(SESSION.APPLICATION_HISTORY_SEARCH)
    this.getCustomerApplication()
    this.getApplicationStatusDdl()
    this.getUserDdl()
    this.getProductsDdl()
    this.getApplicationTypeDdl()
    this.getCountryDdl()
    this.getStatesDdl()
  },
  mounted() {},
  computed: {
    data() {
      return this.$store.state.customerapplication.historydetails
    },
    applicationStatusDdl() {
      return this.$store.state.lookup.applicationStatusDdl
    },
    userDdl() {
      return this.$store.state.lookup.userDdl
    },
    productsDdl() {
      return this.$store.state.lookup.productsDdl
    },
    productData() {
      return this.$store.state.product.details
    },
    applicationTypeDdl() {
      return this.$store.state.lookup.applicationTypeDdl
    },
    countryDdl() {
      return this.$store.state.lookup.countryDdl
    },
    statesDdl() {
      return this.$store.state.lookup.statesDdl
    }
  },
  watch: {},
  methods: {
    getCustomerApplication() {
      this.$store.dispatch(`${APPLICATION_HISTORY_DETAILS}`, { id: this.searchCriteria.selectedRecordId })
    },
    getApplicationStatusDdl() {
      this.$store.dispatch(`${LOOKUP_APPLICATION_STATUS_DDL}`, { hasOptionAll: false, isActive: true, strValue: false })
    },
    getUserDdl() {
      this.$store.dispatch(`${LOOKUP_USER_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getProductsDdl() {
      this.$store.dispatch(`${LOOKUP_PRODUCTS_DDL}`, { hasOptionAll: false, isActive: true })
    },
    onProductChange(productId) {
      this.$store.dispatch(`${PRODUCT_DETAILS}`, { id: productId })
      this.data.productPrice = 0
      this.data.applicationType = 0
    },
    getApplicationTypeDdl() {
      this.$store.dispatch(`${LOOKUP_APPLICATION_TYPE_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getCountryDdl() {
      this.$store.dispatch(`${LOOKUP_COUNTRY_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getStatesDdl() {
      this.$store.dispatch(`${LOOKUP_STATES_DDL}`, { hasOptionAll: false, isActive: true })
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
