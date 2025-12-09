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
                <app-section-title :title="$t('label.ansuranApplicationInfo')" class="text-uppercase"></app-section-title>
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
                      :label="$t('label.applicationID')"
                      v-model.trim="data.code"
                      :placeholder="$t(`label.applicationID`)"
                      :nonEditable="nonEditable.code"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
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
                      :disabled="nonEditable.applicationDate"
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
                      :nonEditable="nonEditable.ansuranApplicationFirm"
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
                      :nonEditable="nonEditable.ansuranStatus"
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
                      :nonEditable="nonEditable.user"
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
                      :nonEditable="nonEditable.productName"
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
                      :nonEditable="nonEditable.productModel"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.productSerialNumber')"
                      v-model.trim="data.productSerialNumber"
                      :placeholder="$t(`label.productSerialNumber`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.productSerialNumber"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.eMandate')"
                      v-model.trim="data.eMandate"
                      :items="documentStatusDdl"
                      :placeholder="$t(`label.eMandate`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.eMandate"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.creditAccountNumber')"
                      v-model.trim="data.creditAccountNumber"
                      :placeholder="$t(`label.creditAccountNumber`)"
                      fieldWidth="100%"
                      :rules="$validators.requiredFields()"
                      :nonEditable="nonEditable.creditAccountNumber"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.deliveryOrderNumber')"
                      v-model.trim="data.deliveryOrderNumber"
                      :placeholder="$t(`label.deliveryOrderNumber`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.deliveryOrderNumber"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.invoiceNumber')"
                      v-model.trim="data.invoiceNumber"
                      :placeholder="$t(`label.invoiceNumber`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.invoiceNumber"
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
                      :disabled="nonEditable.warrantyStartDate"
                    ></app-date-picker>
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
                      :disabled="nonEditable.warrantyEndDate"
                    ></app-date-picker>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.firstMonthPayment')"
                      v-model.trim="data.firstMonthPayment"
                      :placeholder="$t(`label.firstMonthPayment`)"
                      fieldWidth="100%"
                      :rules="$validators.requiredInputDdl()"
                      :nonEditable="nonEditable.firstMonthPayment"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.initialPayment')"
                      v-model.trim="data.initialPayment"
                      :placeholder="$t(`label.initialPayment`)"
                      fieldWidth="100%"
                      :rules="$validators.requiredInputDdl()"
                      :nonEditable="nonEditable.initialPayment"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.documentConsignmentNumber')"
                      v-model.trim="data.documentConsignmentNumber"
                      :placeholder="$t(`label.documentConsignmentNumber`)"
                      fieldWidth="100%"
                      :nonEditable="nonEditable.documentConsignmentNumber"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="pb-4" no-gutters>
                <v-col cols="12" sm="6" md="3">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.creditPrice')"
                      v-model.trim="data.creditPrice"
                      :placeholder="$t(`label.creditPrice`)"
                      fieldWidth="100%"
                      type="number"
                      :nonEditable="nonEditable.creditPrice"
                    ></app-form-field>
                  </div>
                </v-col>
                <v-col cols="12" sm="6" md="3" v-if="false">
                  <div class="pr-5">
                    <app-form-field
                      :label="$t('label.installmentTerm')"
                      v-model.trim="data.installmentTerm"
                      :placeholder="$t(`label.installmentTerm`)"
                      fieldWidth="100%"
                      type="number"
                      :nonEditable="nonEditable.installmentTerm"
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
                      :nonEditable="nonEditable.staffClaimAmount"
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
                      type="number"
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
      </v-form>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAME, SESSION } from '@/constants'
import { searchHelper, permissionHelper, ddlHelper, localizationHelper } from '@/utils'
import { ANSURAN_APPLICATION_HISTORY_DETAILS } from '@/store/ansuran-application.module'
import { LOOKUP_ANSURAN_STATUS_DDL, LOOKUP_USER_DDL, LOOKUP_COUNTRY_DDL, LOOKUP_STATES_DDL, LOOKUP_PCO_CATEGORY_DDL, LOOKUP_ANSURAN_APPLICATION_FIRM_DDL } from '@/store/lookup.module'
import { moneyFormat } from '@/utils/filters.helper'

export default {
  name: 'AnsuranApplicationHistoryDetails',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.ANSURAN_APPLICATION)

      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.ANSURAN_APPLICATION, ACTION.UPDATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.ANSURAN_APPLICATION_HISTORY_DETAILS) {
      searchHelper.clearSearch(SESSION.ANSURAN_APPLICATION_HISTORY_SEARCH)
    }
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
            name: ROUTE_NAME.ANSURAN_APPLICATION_HISTORY
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
        applicationDate: true,
        ansuranStatus: true,
        productName: true,
        productModel: true,
        productSerialNumber: true,
        eMandate: true,
        creditAccountNumber: true,
        deliveryOrderNumber: true,
        invoiceNumber: true,
        warrantyStartDate: true,
        warrantyEndDate: true,
        firstMonthPayment: true,
        initialPayment: true,
        documentConsignmentNumber: true,
        creditPrice: true,
        installmentTerm: true,
        staffClaimAmount: true,
        pcoCategory: true,
        remarks: true,
        ansuranApplicationFirm: true
      },
      pcoPercentage: 0,
      validation: {
        productSerialNumber: null
      }
    }
  },
  created() {
    /* Page Init */
    this.searchCriteria = searchHelper.retrieveSearch(SESSION.ANSURAN_APPLICATION_HISTORY_SEARCH)
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
      return this.$store.state.ansuranApplication.historydetails
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
    getAnsuranApplication() {
      this.$store.dispatch(`${ANSURAN_APPLICATION_HISTORY_DETAILS}`, { id: this.searchCriteria.selectedRecordId })
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
    getAnsuranApplicationFirmDdl() {
      this.$store.dispatch(`${LOOKUP_ANSURAN_APPLICATION_FIRM_DDL}`, { hasOptionAll: false, isActive: true, strValue: false })
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
