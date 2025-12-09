<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.createAnsuranApplication')" class="text-uppercase"></app-section-title>
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
                    <app-form-field
                      :label="$t('label.productSerialNumber')"
                      v-model="data.productSerialNumber"
                      :items="yesNoList"
                      :placeholder="$t(`label.productSerialNumber`)"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.eMandate')" v-model.trim="data.eMandate" :items="documentStatusDdl" :placeholder="$t(`label.eMandate`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.deliveryOrderNumber')"
                      v-model="data.deliveryOrderNumber"
                      :items="yesNoList"
                      :placeholder="$t(`label.deliveryOrderNumber`)"
                      fieldWidth="100%"
                    ></app-form-field>
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
                    <app-form-field :label="$t('label.pcoCategory')" :items="pcoCategoryDdl" v-model.trim="data.pcoCategory" :placeholder="$t(`label.pcoCategory`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field
                      :label="`${$t('label.pco')} (${pcoPercentage}%)`"
                      v-model.trim="data.pco"
                      :placeholder="$t(`label.pco`)"
                      fieldWidth="100%"
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
              <v-row class="pb-4" no-gutters>
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
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.nric')" v-model.trim="data.nric" :placeholder="$t(`label.nric`)" :rules="$validators.requiredFields()" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-4">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.phone')" v-model.trim="data.phone" :placeholder="$t(`label.phone`)" :rules="$validators.phoneNumberRules()" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.email')" v-model.trim="data.email" :placeholder="$t(`label.email`)" :rules="$validators.emailRules()" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.address1')" v-model.trim="data.addressLine1" :placeholder="$t(`label.address1`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.address2')" v-model.trim="data.addressLine2" :placeholder="$t(`label.address2`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.address3')" v-model.trim="data.addressLine3" :placeholder="$t(`label.address3`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>
              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.city')" v-model.trim="data.city" :placeholder="$t(`label.city`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <div class="pr-5">
                    <app-form-field :label="$t('label.postalCode')" v-model.trim="data.postalCode" :placeholder="$t(`label.postalCode`)" fieldWidth="100%"></app-form-field>
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
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="4">
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
            <app-button v-if="accessCreate" :text="$t('button.create')" :action="createAnsuranApplication" color="primary" icon="mdi-plus"></app-button>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAME, SESSION, AnsuranDetails, testCreateAnsuranData } from '@/constants'
import { searchHelper, permissionHelper, localizationHelper, ddlHelper } from '@/utils'
import { ANSURAN_APPLICATION_CREATE, ANSURAN_APPLICATION_DETAILS_RESET } from '@/store/ansuran-application.module'
import { LOOKUP_USER_DDL, LOOKUP_COUNTRY_DDL, LOOKUP_STATES_DDL, LOOKUP_ANSURAN_STATUS_DDL, LOOKUP_PCO_CATEGORY_DDL, LOOKUP_ANSURAN_APPLICATION_FIRM_DDL } from '@/store/lookup.module'
import { moneyFormat } from '@/utils/filters.helper'
import { SYSTEM_PRODUCT } from '@/constants'
const { id, code, ...restOfDefaultDetails } = new AnsuranDetails()
export default {
  name: 'AnsuranApplicationCreate',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.ANSURAN_APPLICATION)

      t.accessCreate = permissionHelper.isAuthorizedAction(MODULE_ID.ANSURAN_APPLICATION, ACTION.CREATE)
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
      accessCreate: false,
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
      data: {
        ...restOfDefaultDetails,
        ansuranStatus: 1,
        country: 1
        // for testing use below
        // ...testCreateAnsuranData
      },
      // ⭐ (C) SENARAI DROPDOWN YES/NO
      yesNoList: [
        { text: 'Yes', value: 'YES' },
        { text: 'No', value: 'NO' }
      ],
      openPanelIndex: [0, 1],
      documentStatusDdl: ddlHelper.getDocumentStatus(false, true),
      eMandateDdl: ddlHelper.getDocumentStatus(false, true),
      nonEditable: {
        pco: true
      },
      pcoPercentage: 0,

      showInstallmentTerm: false, // tukar ke true kalau nak paparkan
      showStaffClaimAmount: false
    }
  },
  created() {
    this.getAnsuranStatusDdl()
    this.getUserDdl()
    this.getCountryDdl()
    this.getStatesDdl()
    this.getPcoCategoryDdl()
    this.getAnsuranApplicationFirmDdl()
  },
  mounted() {},
  computed: {
    ansuranStatusDdl() {
      let pending = []
      let ddlList = this.$store.state.lookup.ansuranStatusDdl
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
    countryDdl() {
      return this.$store.state.lookup.countryDdl
    },
    statesDdl() {
      return this.$store.state.lookup.statesDdl
    },
    pcoCategoryDdl() {
      return this.$store.state.lookup.pcoCategoryDdl
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
    }
  },
  methods: {
    getAnsuranStatusDdl() {
      this.$store.dispatch(`${LOOKUP_ANSURAN_STATUS_DDL}`, { hasOptionAll: false, isActive: true, strValue: false })
    },
    getUserDdl() {
      this.$store.dispatch(`${LOOKUP_USER_DDL}`, { hasOptionAll: false, isActive: true, product: SYSTEM_PRODUCT.ANSURAN })
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
    createAnsuranApplication() {
      if (this.$refs.createForm.validate()) {
        let data = new AnsuranDetails({
          code: this.data.code,
          applicationDate: this.data.applicationDate,
          ansuranStatus: this.data.ansuranStatus,
          user: this.data.user,
          productName: this.data.productName,
          productModel: this.data.productModel,
          productSerialNumber: this.data.productSerialNumber,
          eMandate: this.data.eMandate,
          creditAccountNumber: this.data.creditAccountNumber,
          deliveryOrderNumber: this.data.deliveryOrderNumber,
          firstMonthPayment: this.data.firstMonthPayment,
          initialPayment: this.data.initialPayment,
          documentConsignmentNumber: this.data.documentConsignmentNumber,
          remarks: this.data.remarks,
          creditPrice: this.data.creditPrice,
          installmentTerm: Number(this.data.installmentTerm),
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
          postcode: this.data.postalCode,
          state: this.data.region,
          country: this.data.country,
          invoiceNumber: this.data.invoiceNumber,
          pcoCategory: this.data.pcoCategory,
          warrantyStartDate: this.data.warrantyStartDate,
          warrantyEndDate: this.data.warrantyEndDate,
          ansuranApplicationFirm: this.data.ansuranApplicationFirm
        })
        this.$store.dispatch(`${ANSURAN_APPLICATION_CREATE}`, { data })
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
