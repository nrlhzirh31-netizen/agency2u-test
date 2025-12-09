<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.update') + ' ' + $t('label.ansuranApplicationDetails')" class="text-uppercase"></app-section-title>
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

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-date-picker
                      :label="$t('label.applicationDate')"
                      :selectedDateTime.sync="data.applicationDate"
                      date
                      clearable
                      :placeholder="$t(`label.applicationDate`)"
                      :min="new Date()"
                    ></app-date-picker>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.ansuranApplicationFirm')"
                      :items="ansuranApplicationFirmDdl"
                      v-model.trim="data.ansuranApplicationFirm"
                      :placeholder="$t(`label.ansuranApplicationFirm`)"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.ansuranStatus')"
                      :items="ansuranStatusDdl"
                      v-model.trim="data.ansuranStatus"
                      :placeholder="$t(`label.ansuranStatus`)"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.agentID')"
                      :items="userDdl"
                      v-model.trim="data.user"
                      :placeholder="$t(`label.agentID`)"
                      fieldWidth="100%"
                      :rules="$validators.requiredInputDdl()"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.productName')"
                      v-model.trim="data.productName"
                      :placeholder="$t(`label.productName`)"
                      fieldWidth="100%"
                      :rules="$validators.requiredFields()"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.productModel')"
                      v-model.trim="data.productModel"
                      :placeholder="$t(`label.productModel`)"
                      fieldWidth="100%"
                      :rules="$validators.requiredFields()"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-date-picker
                      :label="$t('label.warrantyStartDate')"
                      :selectedDateTime.sync="data.warrantyStartDate"
                      date
                      clearable
                      :placeholder="$t(`label.warrantyStartDate`)"
                      :min="new Date()"
                    ></app-date-picker>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.creditAccountNumber')" v-model.trim="data.creditAccountNumber" :placeholder="$t(`label.creditAccountNumber`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.productSerialNumber')" v-model.trim="data.productSerialNumber" :placeholder="$t(`label.productSerialNumber`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.eMandate')" v-model.trim="data.eMandate" :items="documentStatusDdl" :placeholder="$t(`label.eMandate`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.deliveryOrderNumber')" v-model.trim="data.deliveryOrderNumber" :placeholder="$t(`label.deliveryOrderNumber`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.invoiceNumber')" v-model.trim="data.invoiceNumber" :placeholder="$t(`label.invoiceNumber`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.initialPayment')" v-model.trim="data.initialPayment" :placeholder="$t(`label.initialPayment`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.creditPrice')" v-model.trim="data.creditPrice" :placeholder="$t(`label.creditPrice`)" fieldWidth="100%" type="number"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.documentConsignmentNumber')"
                      v-model.trim="data.documentConsignmentNumber"
                      :placeholder="$t(`label.documentConsignmentNumber`)"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-date-picker
                      :label="$t('label.warrantyEndDate')"
                      :selectedDateTime.sync="data.warrantyEndDate"
                      date
                      clearable
                      :placeholder="$t(`label.warrantyEndDate`)"
                      :min="new Date()"
                    ></app-date-picker>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.installmentTerm')"
                      v-model.trim="data.installmentTerm"
                      :placeholder="$t(`label.installmentTerm`)"
                      fieldWidth="100%"
                      type="number"
                    ></app-form-field>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.staffClaimAmount')"
                      v-model.trim="data.staffClaimAmount"
                      :placeholder="$t(`label.staffClaimAmount`)"
                      fieldWidth="100%"
                      type="number"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.pcoCategory')"
                      :items="pcoCategoryDdl"
                      v-model.trim="data.pcoCategory"
                      :placeholder="$t(`label.pcoCategory`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.pcoCategory"
                    ></app-form-field>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field
                      :label="`${$t('label.pco')} (${pcoPercentage}%)`"
                      v-model.trim="data.pco"
                      :placeholder="$t(`label.pco`)"
                      fieldWidth="100%"
                      type="text"
                      :nonEditable="nonEditable.pco"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="12" sm="6" md="4">
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
                <v-col cols="12" sm="6" md="4" v-if="isRejectedCheck">
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
              <v-row class="pb-3" no-gutters>
                <v-col cols="12">
                  <v-divider class="my-5 mt-0"></v-divider>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.customerNameOnly')"
                      v-model.trim="data.customerName"
                      :placeholder="$t(`label.customerNameOnly`)"
                      :rules="$validators.validCharacter()"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.customerName"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.nric')"
                      v-model.trim="data.nric"
                      :placeholder="$t(`label.nric`)"
                      :rules="$validators.requiredFields()"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.nric"
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

                <v-col cols="12" sm="6" md="4">
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

              <v-row class="pb-3" no-gutters>
                <v-col cols="12" sm="6" md="4">
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

                <v-col cols="12" sm="6" md="4">
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

                <v-col cols="12" sm="6" md="4">
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
              </v-row>
              <v-row class="pb-3" no-gutters>
                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.city')" v-model.trim="data.city" :placeholder="$t(`label.city`)" fieldWidth="100%" :nonEditable="nonEditable.city"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
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

                <v-col cols="12" sm="6" md="4">
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
              </v-row>
              <v-row class="pb-3" no-gutters>
                <v-col cols="12" sm="6" md="4">
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
            <app-button v-if="accessEdit" :text="$t('button.update')" :action="updateAnsuran" color="primary"></app-button>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { AnsuranDetails, ROUTE_NAME, SESSION } from '@/constants'
import { searchHelper, permissionHelper, ddlHelper, localizationHelper } from '@/utils'
import { ANSURAN_APPLICATION_DETAILS, ANSURAN_APPLICATION_EDIT, ANSURAN_APPLICATION_DETAILS_RESET } from '@/store/ansuran-application.module'
import { LOOKUP_ANSURAN_STATUS_DDL, LOOKUP_USER_DDL, LOOKUP_COUNTRY_DDL, LOOKUP_STATES_DDL, LOOKUP_PCO_CATEGORY_DDL, LOOKUP_ANSURAN_APPLICATION_FIRM_DDL } from '@/store/lookup.module'
import { moneyFormat } from '@/utils/filters.helper'

export default {
  name: 'AnsuranApplicationDetails',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.ANSURAN_APPLICATION)

      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.ANSURAN_APPLICATION, ACTION.UPDATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.ANSURAN_APPLICATION_LIST) {
      searchHelper.clearSearch(SESSION.ANSURAN_APPLICATION_SEARCH)
    }
    this.$store.dispatch(`${ANSURAN_APPLICATION_DETAILS_RESET}`)
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
            name: ROUTE_NAME.ANSURAN_APPLICATION_LIST
          },
          exact: true
        }
      ],
      documentStatusDdl: ddlHelper.getDocumentStatus(false, true),
      nonEditable: {
        code: true,
        customerName: true,
        user: true,
        nric: true,
        phone: true,
        email: true,
        address1: true,
        address2: true,
        address3: true,
        city: true,
        postalCode: true,
        selectCountry: true,
        selectRegion: true,
        pco: true,
        pcoCategory: true,
        creditPrice: false,
        initialPayment: false,
        staffClaimAmount: false,
        ansuranApplicationFirm: false
      },
      isRejected: false,
      pcoPercentage: 0,
      validation: {
        productSerialNumber: null
      }
    }
  },
  created() {
    /* Page Init */
    this.searchCriteria = searchHelper.retrieveSearch(SESSION.ANSURAN_APPLICATION_SEARCH)
    this.getAnsuranApplication()
    this.getAnsuranStatusDdl()
    this.getUserDdl()
    this.getCountryDdl()
    this.getStatesDdl()
    this.getPcoCategoryDdl()
    this.getAnsuranApplicationFirmDdl()
  },
  mounted() {},
  computed: {
    data() {
      return this.$store.state.ansuranApplication.details
    },
    ansuranStatusDdl() {
      return this.$store.state.lookup.ansuranStatusDdl
    },
    userDdl() {
      return this.$store.state.lookup.userDdl
    },
    countryDdl() {
      return this.$store.state.lookup.countryDdl
    },
    statesDdl() {
      return this.$store.state.lookup.statesDdl
    },
    pcoCategoryDdl() {
      return this.$store.state.lookup.pcoCategoryDdl
    },
    isRejectedCheck() {
      if (this.ansuranStatusDdl.length > 0) {
        let status = this.ansuranStatusDdl.find((i) => i.text === 'Rejected')
        if (status && this.data && this.data.ansuranStatus === status.value) return true
      }
      return false
    },
    ansuranApplicationFirmDdl() {
      return this.$store.state.lookup.ansuranApplicationFirmDdl
    }
  },
  watch: {
    'data.creditPrice'(newVal) {
      if (newVal && this.data.pcoCategory) {
        this.data.pco = moneyFormat(newVal - newVal * (this.pcoPercentage / 100))
      } else {
        this.data.pco = ''
      }
    },
    'data.pcoCategory'(newVal) {
      if (newVal) {
        console.log('new value', newVal)
        this.pcoPercentage = this.pcoCategoryDdl.find((x) => x.value == newVal).percentage
        if (this.data.creditPrice) {
          this.data.pco = moneyFormat(this.data.creditPrice - this.data.creditPrice * (this.pcoPercentage / 100))
        }
      } else {
        this.data.pco = ''
        this.pcoPercentage = 0
      }
    },
    isRejectedCheck(check) {
      this.nonEditable.ansuranStatus = check ? true : false
      this.nonEditable.code = check ? true : false
      this.nonEditable.applicationDate = check ? true : false
      this.nonEditable.user = check ? true : false
      this.nonEditable.nric = check ? true : false
      this.nonEditable.phone = check ? true : false
      this.nonEditable.email = check ? true : false
      this.nonEditable.address1 = check ? true : false
      this.nonEditable.address2 = check ? true : false
      this.nonEditable.address3 = check ? true : false
      this.nonEditable.city = check ? true : false
      this.nonEditable.postalCode = check ? true : false
      this.nonEditable.selectCountry = check ? true : false
      this.nonEditable.selectRegion = check ? true : false
      this.nonEditable.pco = check ? true : false
      this.nonEditable.rejectedReason = check ? true : false
      this.nonEditable.firstMonthPayment = check ? true : false
      this.nonEditable.initialPayment = check ? true : false
      this.nonEditable.documentConsignmentNumber = check ? true : false
      this.nonEditable.creditPrice = check ? true : false
      this.nonEditable.installmentTerm = check ? true : false
      this.nonEditable.staffClaimAmount = check ? true : false
      this.nonEditable.pcoCategory = check ? true : false
      this.nonEditable.productName = check ? true : false
      this.nonEditable.productModel = check ? true : false
      this.nonEditable.productSerialNumber = check ? true : false
      this.nonEditable.eMandate = check ? true : false
      this.nonEditable.creditAccountNumber = check ? true : false
      this.nonEditable.deliveryOrderNumber = check ? true : false
      this.nonEditable.invoiceNumber = check ? true : false
      this.nonEditable.warrantyStartDate = check ? true : false
      this.nonEditable.warrantyEndDate = check ? true : false
      this.nonEditable.remarks = check ? true : false
      this.remarks = check ? true : false
      this.isRejected = check ? true : false
      this.nonEditable.ansuranApplicationFirm = check ? true : false
    }
  },
  methods: {
    getAnsuranApplication() {
      this.$store.dispatch(`${ANSURAN_APPLICATION_DETAILS}`, { id: this.searchCriteria.selectedRecordId })
    },
    getAnsuranStatusDdl() {
      this.$store.dispatch(`${LOOKUP_ANSURAN_STATUS_DDL}`, { hasOptionAll: false, isActive: true, strValue: false })
    },
    getUserDdl() {
      this.$store.dispatch(`${LOOKUP_USER_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getCountryDdl() {
      this.$store.dispatch(`${LOOKUP_COUNTRY_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getStatesDdl() {
      this.$store.dispatch(`${LOOKUP_STATES_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getPcoCategoryDdl() {
      this.$store.dispatch(`${LOOKUP_PCO_CATEGORY_DDL}`, { hasOptionAll: false, isActive: true })
    },
    updateAnsuran() {
      if (this.$refs.updateForm.validate()) {
        // Assign default for PCO Category (supaya backend terima)
        if (!this.data.pcoCategory) {
          this.data.pcoCategory = this.pcoCategoryDdl[0]?.value || null
        }

        // Assign default for PCO (calculate based on creditPrice & pcoPercentage)
        if (!this.data.pco) {
          const creditPrice = this.data.creditPrice || 0
          const percentage = this.pcoCategoryDdl.find((x) => x.value == this.data.pcoCategory)?.percentage || 0
          this.data.pco = moneyFormat(creditPrice - creditPrice * (percentage / 100))
        }

        // Assign default for First Month Payment (walaupun hidden)
        if (!this.data.firstMonthPayment) {
          this.data.firstMonthPayment = 0
        }
        // Default invoiceNumber supaya backend terima
        if (!this.data.invoiceNumber) {
          this.data.invoiceNumber = '-' // atau 'N/A'
        }

        // Default documentConsignmentNumber (BC PO Number)
        if (!this.data.creditAccountNumber) this.data.creditAccountNumber = ''

        // Pastikan field lain yang wajib backend ada nilai
        if (!this.data.creditPrice) this.data.creditPrice = 0
        if (!this.data.initialPayment) this.data.initialPayment = 0
        if (!this.data.staffClaimAmount) this.data.staffClaimAmount = 0
        let data = new AnsuranDetails({
          ...this.data,
          id: this.searchCriteria.selectedRecordId,
          user: this.data.user,
          applicationDate: this.data.applicationDate,
          ansuranStatus: this.data.ansuranStatus,
          productName: this.data.productName,
          productModel: this.data.productModel,
          productSerialNumber: this.data.productSerialNumber,
          eMandate: this.data.eMandate,
          creditAccountNumber: this.data.creditAccountNumber,
          deliveryOrderNumber: this.data.deliveryOrderNumber,
          firstMonthPayment: this.data.firstMonthPayment,
          initialPayment: this.data.initialPayment,
          documentConsignmentNumber: this.data.documentConsignmentNumber || '-',
          invoiceNumber: this.data.invoiceNumber || '-',
          remarks: this.data.remarks,
          creditPrice: this.data.creditPrice,
          installmentTerm: this.data.installmentTerm,
          pco: this.data.pco,
          staffClaimAmount: this.data.staffClaimAmount,
          customerName: this.data.customerName,
          nric: this.data.nric,
          phone: this.data.phone,
          email: this.data.email,
          addressLine1: this.data.addressLine1,
          addressLine2: this.data.addressLine2,
          addressLine3: this.data.addressLine3,
          city: this.data.city,
          postcode: this.data.postcode,
          state: this.data.state,
          country: this.data.country
        })
        this.$store.dispatch(`${ANSURAN_APPLICATION_EDIT}`, { id: this.searchCriteria.selectedRecordId, data })
      }
    },
    getAnsuranApplicationFirmDdl() {
      this.$store.dispatch(`${LOOKUP_ANSURAN_APPLICATION_FIRM_DDL}`, { hasOptionAll: false, isActive: true, strValue: false })
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
