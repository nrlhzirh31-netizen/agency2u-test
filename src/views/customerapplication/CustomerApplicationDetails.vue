<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.updateCustomerApplication')" class="text-uppercase"></app-section-title>
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
                  <div class="pr-5">
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
                  <div class="pr-5">
                    <app-date-picker
                      :label="$t('label.activatedDate')"
                      :selectedDateTime.sync="data.activatedDate"
                      date
                      clearable
                      :placeholder="$t(`label.activatedDate`)"
                      :disabled="nonEditable.activatedDate"
                    ></app-date-picker>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <!-- <app-form-field :label="$t('label.applicationDate')" v-model.trim="data.applicationDate" :placeholder="$t(`label.applicationDate`)" fieldWidth="100%"></app-form-field> -->
                    <app-date-picker
                      :label="$t('label.applicationDate')"
                      :selectedDateTime.sync="data.applicationDate"
                      date
                      clearable
                      :placeholder="$t(`label.applicationDate`)"
                      :disabled="nonEditable.applicationDate"
                    ></app-date-picker>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.applicationStatus')"
                      :items="applicationStatusDdl"
                      v-model.trim="data.applicationStatus"
                      :placeholder="$t(`label.applicationStatus`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.applicationStatus"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="8" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.agentID')" :items="userDdl" v-model.trim="data.user" :placeholder="$t(`label.agentID`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.gpsLongitude')"
                      v-model.trim="data.gpsLongitude"
                      :placeholder="$t(`label.gpsLongitude`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.gpsLongitude"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.gpsLatitude')"
                      v-model.trim="data.gpsLatitude"
                      :placeholder="$t(`label.gpsLatitude`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.gpsLatitude"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.orderNumber')"
                      v-model.trim="data.orderNumber"
                      :placeholder="$t(`label.orderNumber`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.orderNumber"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.eFormNumber')"
                      v-model.trim="data.eFormNumber"
                      :placeholder="$t(`label.eFormNumber`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.eFormNumber"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.sporaNumber')"
                      v-model.trim="data.sporaNumber"
                      :placeholder="$t(`label.sporaNumber`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.sporaNumber"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.processingId')"
                      v-model.trim="data.processingId"
                      :placeholder="$t(`label.processingId`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.processingId"
                    ></app-form-field>
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
                      :nonEditable="nonEditable.product"
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

                <v-col v-if="data.productPrice > 0" cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
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

                <v-col v-if="data.applicationType > 0" cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
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
                      :nonEditable="nonEditable.documentCompleted"
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
                      :nonEditable="nonEditable.remarks"
                    ></app-form-field>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="4" class="pb-3" v-if="isRejectedCheck">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.rejectedReason')"
                      v-model.trim="data.rejectedReason"
                      type="remark"
                      :rows="5"
                      :maxLength="1000"
                      show-counter
                      :placeholder="$t(`label.rejectedReason`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.rejectedReason"
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
                      :nonEditable="nonEditable.customerName"
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
                      :nonEditable="nonEditable.customernric"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.phone')"
                      v-model.trim="data.phone"
                      :placeholder="$t(`label.phone`)"
                      :rules="$validators.phoneNumberRules()"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.phone"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.email')"
                      v-model.trim="data.email"
                      :placeholder="$t(`label.email`)"
                      :rules="$validators.emailRules()"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.email"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.address1')"
                      v-model.trim="data.addressLine1"
                      :placeholder="$t(`label.address1`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.address1"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.address2')"
                      v-model.trim="data.addressLine2"
                      :placeholder="$t(`label.address2`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.address2"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.address3')"
                      v-model.trim="data.addressLine3"
                      :placeholder="$t(`label.address3`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.address3"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.city')" v-model.trim="data.city" :placeholder="$t(`label.city`)" fieldWidth="100%" :nonEditable="nonEditable.city"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.postalCode')"
                      v-model.trim="data.postcode"
                      :placeholder="$t(`label.postalCode`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.postalCode"
                    ></app-form-field>
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
                      :nonEditable="nonEditable.selectCountry"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.selectRegion')"
                      v-model.trim="data.state"
                      :items="statesDdl"
                      :placeholder="$t(`label.selectRegion`)"
                      :rules="$validators.requiredInput()"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.selectRegion"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-row class="pa-4" no-gutters v-if="!isRejected">
          <v-col cols="12" class="text-right">
            <app-button v-if="accessEdit" :text="$t('button.update')" :action="updateCustomer" color="primary"></app-button>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAME, SESSION } from '@/constants'
import { searchHelper, permissionHelper, ddlHelper, localizationHelper } from '@/utils'
import { CUSTOMER_APPLICATION_DETAILS, CUSTOMER_APPLICATION_EDIT } from '@/store/customerapplication.module'
import { LOOKUP_APPLICATION_STATUS_DDL, LOOKUP_USER_DDL, LOOKUP_PRODUCTS_DDL, LOOKUP_APPLICATION_TYPE_DDL, LOOKUP_COUNTRY_DDL, LOOKUP_STATES_DDL } from '@/store/lookup.module'
import { PRODUCT_DETAILS, PRODUCT_DETAILS_RESET } from '@/store/product.module'

export default {
  name: 'CustomerApplicationDetails',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.APPLICATION)

      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.APPLICATION, ACTION.UPDATE)
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
      openPanelIndex: [0, 1],
      accessEdit: false,
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
      documentStatusDdl: ddlHelper.getDocumentStatus(false, true),
      nonEditable: {
        activatedDate: false,
        applicationDate: false,
        claimStatus: false,
        remarks: false,
        gpsLongitude: false,
        gpsLatitude: false,
        orderNumber: false,
        eFormNumber: false,
        sporaNumber: false,
        processingId: false,
        product: false,
        documentCompleted: false,
        customerName: false,
        customernric: false,
        phone: false,
        email: false,
        address1: false,
        address2: false,
        address3: false,
        city: false,
        postalCode: false,
        selectCountry: false,
        selectRegion: false,
        applicationStatus: false,
        remarks: false,
        rejectedReason: true
      },
      isRejected: false
    }
  },
  created() {
    /* Page Init */
    this.searchCriteria = searchHelper.retrieveSearch(SESSION.CUSTOMER_APPLICATION_SEARCH)
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
      return this.$store.state.customerapplication.details
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
    },
    isRejectedCheck() {
      if (this.applicationStatusDdl.length > 0) {
        let status = this.applicationStatusDdl.find((i) => i.text === 'Rejected')
        if (status && this.data && this.data.applicationStatus === status.value) return true
      }
      return false
    }
  },
  watch: {
    isRejectedCheck(check) {
      console.log('check is rejected', check)
      this.nonEditable.activatedDate = check ? true : false
      this.nonEditable.remarks = check ? true : false
      this.nonEditable.claimStatus = check ? true : false
      this.nonEditable.documentCompleted = check ? true : false
      this.nonEditable.gpsLongitude = check ? true : false
      this.nonEditable.gpsLatitude = check ? true : false
      this.nonEditable.orderNumber = check ? true : false
      this.nonEditable.eFormNumber = check ? true : false
      this.nonEditable.sporaNumber = check ? true : false
      this.nonEditable.processingId = check ? true : false
      this.nonEditable.product = check ? true : false
      this.nonEditable.applicationDate = check ? true : false
      this.nonEditable.applicationStatus = check ? true : false
      this.nonEditable.customerName = check ? true : false
      this.nonEditable.customernric = check ? true : false
      this.nonEditable.phone = check ? true : false
      this.nonEditable.email = check ? true : false
      this.nonEditable.address1 = check ? true : false
      this.nonEditable.address2 = check ? true : false
      this.nonEditable.address3 = check ? true : false
      this.nonEditable.city = check ? true : false
      this.nonEditable.postalCode = check ? true : false
      this.nonEditable.selectCountry = check ? true : false
      this.nonEditable.selectRegion = check ? true : false
      this.remarks = check ? true : false
      this.isRejected = check ? true : false
      this.nonEditable.rejectedReason = check ? true : false
    }
  },
  methods: {
    getCustomerApplication() {
      console.log('searchCriteria', this.searchCriteria)
      this.$store.dispatch(`${CUSTOMER_APPLICATION_DETAILS}`, { id: this.searchCriteria.selectedRecordId })
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
    },
    updateCustomer() {
      if (this.$refs.updateForm.validate()) {
        let data = {
          name: this.data.name,
          nric: this.data.nric,
          phone: this.data.phone,
          email: this.data.email,
          addressLine1: this.data.addressLine1,
          addressLine2: this.data.addressLine2,
          addressLine3: this.data.addressLine3,
          city: this.data.city,
          postcode: this.data.postcode,
          state: this.data.state,
          country: this.data.country,
          orderNumber: this.data.orderNumber,
          eFormNumber: this.data.eFormNumber,
          product: this.data.product,
          applicationStatus: this.data.applicationStatus,
          user: this.data.user,
          applicationDate: this.data.applicationDate,
          activatedDate: this.data.activatedDate,
          gpsLongitude: this.data.gpsLongitude,
          gpsLatitude: this.data.gpsLatitude,
          ociNumber: this.data.ociNumber,
          documentCompleted: this.data.documentCompleted,
          remarks: this.data.remarks,
          // attachments: this.data.attachments,
          sporaNumber: this.data.sporaNumber,
          processingId: this.data.processingId
        }

        this.$store.dispatch(`${CUSTOMER_APPLICATION_EDIT}`, { id: this.searchCriteria.selectedRecordId, data })
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
