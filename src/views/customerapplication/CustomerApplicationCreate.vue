<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.createCustomerApplication')" class="text-uppercase"></app-section-title>
    </v-row>
    <div class="mx-4">
      <v-form ref="createForm">
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
                  <div class="pr-5">
                    <!-- <app-form-field :label="$t('label.applicationDate')" v-model.trim="data.applicationDate" :placeholder="$t(`label.applicationDate`)" fieldWidth="100%"></app-form-field> -->
                    <app-date-picker :label="$t('label.applicationDate')" :selectedDateTime.sync="data.applicationDate" date clearable :placeholder="$t(`label.applicationDate`)"></app-date-picker>
                  </div>
                </v-col>

                <!-- <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-date-picker :label="$t('label.activatedDate')" :selectedDateTime.sync="data.activatedDate" date clearable :placeholder="$t(`label.activatedDate`)"></app-date-picker>
                  </div>
                </v-col> -->

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.applicationStatus')"
                      :items="applicationStatusDdl"
                      v-model.trim="data.applicationStatus"
                      :placeholder="$t(`label.applicationStatus`)"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="12" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.agentID')" :items="userDdl" v-model.trim="data.user" :placeholder="$t(`label.agentID`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.gpsLongitude')" v-model.trim="data.gpsLongitude" :placeholder="$t(`label.gpsLongitude`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.gpsLatitude')" v-model.trim="data.gpsLatitude" :placeholder="$t(`label.gpsLatitude`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.orderNumber')" v-model.trim="data.orderNumber" :placeholder="$t(`label.orderNumber`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.eFormNumber')" v-model.trim="data.eFormNumber" :placeholder="$t(`label.eFormNumber`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.sporaNumber')" v-model.trim="data.sporaNumber" :placeholder="$t(`label.sporaNumber`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="pb-3">
                  <div class="pr-5">
                    <!-- <app-form-field
                      :label="$t('label.processingId')"
                      v-model.trim="data.processingId"
                      :items="processingIdDdl"
                      :rules="$validators.requiredInputDdl()"
                      :placeholder="$t(`label.processingId`)"
                    ></app-form-field> -->
                    <app-form-field :label="$t('label.processingId')" v-model.trim="data.processingId" :placeholder="$t(`label.processingId`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="12" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.product')"
                      v-model.trim="data.product"
                      :items="productsDdl"
                      :change="() => onProductChange(data.product)"
                      fieldWidth="100%"
                      :placeholder="$t(`label.product`)"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col v-if="productData.id > 0" cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
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

                <v-col v-if="productData.id > 0" cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
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
              </v-row>

              <v-row no-gutters>
                <!-- <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.attachments')" v-model.trim="data.attachments" :placeholder="$t(`label.attachments`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col> -->

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.documentCompleted')"
                      v-model.trim="data.documentCompleted"
                      :items="documentStatusDdl"
                      :placeholder="$t(`label.documentCompleted`)"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.remarks')"
                      v-model.trim="data.remarks"
                      type="remark"
                      :rows="5"
                      :maxLength="1000"
                      show-counter
                      :placeholder="$t(`label.remarks`)"
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
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.customerName')"
                      v-model.trim="data.name"
                      :placeholder="$t(`label.customerName`)"
                      :rules="$validators.validCharacter()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.customernric')"
                      v-model.trim="data.nric"
                      :placeholder="$t(`label.customernric`)"
                      :rules="$validators.requiredFields()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.phone')" v-model.trim="data.phone" :placeholder="$t(`label.phone`)" :rules="$validators.phoneNumberRules()" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.email')" v-model.trim="data.email" :placeholder="$t(`label.email`)" :rules="$validators.emailRules()" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.address1')" v-model.trim="data.addressLine1" :placeholder="$t(`label.address1`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.address2')" v-model.trim="data.addressLine2" :placeholder="$t(`label.address2`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.address3')" v-model.trim="data.addressLine3" :placeholder="$t(`label.address3`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.city')" v-model.trim="data.city" :placeholder="$t(`label.city`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.postalCode')" v-model.trim="data.postalCode" :placeholder="$t(`label.postalCode`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.selectCountry')"
                      v-model.trim="data.country"
                      :items="countryDdl"
                      :placeholder="$t(`label.selectCountry`)"
                      :rules="$validators.requiredInput()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.selectRegion')"
                      v-model.trim="data.region"
                      :items="statesDdl"
                      :placeholder="$t(`label.selectRegion`)"
                      :rules="$validators.requiredInput()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-row class="pa-4" no-gutters>
          <v-col cols="12" class="text-right">
            <app-button v-if="accessCreate" :text="$t('button.create')" :action="createCustomerApplication" color="primary" icon="mdi-plus"></app-button>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAME, SESSION } from '@/constants'
import { searchHelper, permissionHelper, localizationHelper, ddlHelper } from '@/utils'
import { CUSTOMER_APPLICATION_CREATE } from '@/store/customerapplication.module'
import {
  LOOKUP_APPLICATION_STATUS_DDL,
  LOOKUP_USER_DDL,
  LOOKUP_PRODUCTS_DDL,
  LOOKUP_APPLICATION_TYPE_DDL,
  LOOKUP_COUNTRY_DDL,
  LOOKUP_STATES_DDL,
  LOOKUP_PROCESSING_ID_DDL
} from '@/store/lookup.module'
import { PRODUCT_DETAILS, PRODUCT_DETAILS_RESET } from '@/store/product.module'

export default {
  name: 'CustomerApplicationCreate',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.APPLICATION)

      t.accessCreate = permissionHelper.isAuthorizedAction(MODULE_ID.APPLICATION, ACTION.CREATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.CUSTOMER_APPLICATION_LIST) {
      searchHelper.clearSearch(SESSION.CUSTOMER_APPLICATION_SEARCH)
    }
    this.$store.dispatch(`${PRODUCT_DETAILS_RESET}`)
    next()
  },
  props: {},
  data() {
    return {
      accessCreate: false,
      breadcrumbs: [
        {
          text: localizationHelper.getMessage('button.back'),
          disabled: false,
          to: {
            name: ROUTE_NAME.CUSTOMER_APPLICATION_LIST
          },
          exact: true
        }
      ],
      data: {
        name: '',
        nric: '',
        phone: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        city: '',
        postcode: '',
        state: '',
        country: 1,
        orderNumber: '',
        eFormNumber: '',
        product: '',
        applicationStatus: 1,
        user: '',
        applicationDate: '',
        // activatedDate: '',
        gpsLongitude: '',
        gpsLatitude: '',
        ociNumber: '',
        documentCompleted: '',
        remarks: '',
        // attachments: '',
        sporaNumber: '',
        processingId: ''
      },
      openPanelIndex: [0, 1],
      documentStatusDdl: ddlHelper.getDocumentStatus(false, true)
    }
  },
  created() {
    this.getApplicationStatusDdl()
    this.getUserDdl()
    this.getProductsDdl()
    this.getApplicationTypeDdl()
    this.getCountryDdl()
    this.getStatesDdl()
    this.getProcessingIdDdl()
  },
  mounted() {},
  computed: {
    applicationStatusDdl() {
      let pending = []
      let ddlList = this.$store.state.lookup.applicationStatusDdl
      for (let i = 0; i < ddlList.length; i++) {
        if (ddlList[i].value === 1) {
          pending.push(ddlList[i])
        }
      }
      return pending
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
    },
    processingIdDdl() {
      return this.$store.state.lookup.processingIdDdl
    }
  },
  watch: {},
  methods: {
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
    },
    getApplicationTypeDdl() {
      this.$store.dispatch(`${LOOKUP_APPLICATION_TYPE_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getCountryDdl() {
      this.$store.dispatch(`${LOOKUP_COUNTRY_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getStatesDdl() {
      this.$store.dispatch(`${LOOKUP_STATES_DDL}`, { hasOptionAll: false, isActive: true })
    },
    createCustomerApplication() {
      if (this.$refs.createForm.validate()) {
        let data = {
          name: this.data.name,
          nric: this.data.nric,
          phone: this.data.phone,
          email: this.data.email,
          addressLine1: this.data.addressLine1,
          addressLine2: this.data.addressLine2,
          addressLine3: this.data.addressLine3,
          city: this.data.city,
          postcode: this.data.postalCode,
          state: this.data.region,
          country: this.data.country,
          orderNumber: this.data.orderNumber,
          eFormNumber: this.data.eFormNumber,
          product: this.data.product,
          applicationStatus: this.data.applicationStatus,
          user: this.data.user,
          applicationDate: this.data.applicationDate,
          // activatedDate: this.data.activatedDate,
          gpsLongitude: this.data.gpsLongitude,
          gpsLatitude: this.data.gpsLatitude,
          ociNumber: this.data.ociNumber,
          documentCompleted: this.data.documentCompleted,
          remarks: this.data.remarks,
          // attachments: this.data.attachments,
          sporaNumber: this.data.sporaNumber,
          processingId: this.data.processingId
        }

        this.$store.dispatch(`${CUSTOMER_APPLICATION_CREATE}`, { data })
      }
    },
    getProcessingIdDdl() {
      this.$store.dispatch(`${LOOKUP_PROCESSING_ID_DDL}`, { hasOptionAll: false, isActive: true, strValue: true })
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
