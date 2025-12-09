<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.updateUser')" class="text-uppercase"></app-section-title>
    </v-row>
    <div class="mx-4">
      <v-form ref="updateForm">
        <v-expansion-panels v-model="openPanelIndex" multiple>
          <!-- User Details -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.userDetails')" class="text-uppercase"></app-section-title>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row no-gutters>
                <v-col cols="12">
                  <v-divider class="my-5 mt-0"></v-divider>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.code')" v-model.trim="data.code" :nonEditable="true" :placeholder="$t(`label.code`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.referredBy')" v-model.trim="data.referredBy" :placeholder="$t(`label.referredBy`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row class="py-4" no-gutters>
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.name')" v-model.trim="data.name" :placeholder="$t(`label.name`)" :rules="$validators.validCharacter()" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.mobileNo')"
                      v-model.trim="data.mobileNo"
                      :placeholder="$t(`label.mobileNo`)"
                      :rules="$validators.phoneNumberRules()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.email')"
                      v-model.trim="data.email"
                      :nonEditable="true"
                      :placeholder="$t(`label.email`)"
                      :rules="$validators.emailRules()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.nric')" v-model.trim="data.nric" :placeholder="$t(`label.nric`)" :rules="$validators.nricRules()" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.userAccountStatus')"
                      v-model.trim="data.userAccountStatus"
                      :items="activationStatusDdl"
                      :rules="$validators.requiredInput()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.gender')" v-model.trim="data.gender" :items="genderStatusDdl" :rules="$validators.requiredInput()" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.roles')" v-model.trim="data.roles" :items="roleDdl" :rules="$validators.requiredInputDdl()" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Address Information -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.address')" class="text-uppercase"></app-section-title>
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
                      :label="$t('label.address1')"
                      v-model.trim="data.address1"
                      type="remark"
                      :rows="3"
                      :maxLength="1000"
                      :placeholder="$t(`label.address1`)"
                      fieldWidth="100%"
                      :rules="$validators.requiredInput()"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.address2')"
                      v-model.trim="data.address2"
                      type="remark"
                      :rows="3"
                      :maxLength="1000"
                      isOptional
                      :placeholder="$t(`label.address2`)"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.address3')"
                      v-model.trim="data.address3"
                      type="remark"
                      :rows="3"
                      :maxLength="1000"
                      isOptional
                      :placeholder="$t(`label.address3`)"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
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
                  <div class="pr-15">
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

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.city')" v-model.trim="data.city" :placeholder="$t(`label.city`)" fieldWidth="100%" :rules="$validators.requiredInput()"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.postalCode')"
                      v-model.trim="data.postalCode"
                      :placeholder="$t(`label.postalCode`)"
                      fieldWidth="100%"
                      :rules="$validators.requiredInput()"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Bank Details -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.bank')" class="text-uppercase"></app-section-title>
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
                      :label="$t('label.bankAccountNumber')"
                      v-model.trim="data.bankAccountNumber"
                      :placeholder="$t(`label.bankAccountNumber`)"
                      fieldWidth="100%"
                      :rules="$validators.requiredInput()"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.bankName')"
                      v-model.trim="data.bank"
                      :items="bankDdl"
                      :rules="$validators.requiredInputDdl()"
                      fieldWidth="100%"
                      :placeholder="$t(`label.selectBank`)"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Company Details -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.company')" class="text-uppercase"></app-section-title>
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
                      :label="$t('label.companyName')"
                      v-model.trim="data.company"
                      :items="companyDdl"
                      :change="() => onCompanyChange(data.company)"
                      :click="getCompanyDdl"
                      fieldWidth="100%"
                      :placeholder="$t(`label.selectCompany`)"
                    ></app-form-field>
                  </div>
                </v-col>

                <!-- <v-col v-if="companyData.id === ''" cols="12" sm="6" md="4" class="py-5">
                  <app-button :text="$t('button.createCompany')" :action="toCompanyCreatePage" color="primary"></app-button>
                </v-col> -->

                <v-col cols="12" sm="6" md="4" class="py-5">
                  <app-button :text="$t('button.createCompany')" :action="showCreateCompanyDialog" color="primary"></app-button>
                </v-col>

                <v-col v-if="companyData.id" cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.businessRegNo')"
                      v-model.trim="companyData.companyRegNumber"
                      :placeholder="$t(`label.businessRegNo`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
              <v-row v-if="companyData.id > 0" class="py-4" no-gutters>
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.companyAddress1')"
                      v-model.trim="companyData.companyAddress1"
                      :placeholder="$t(`label.companyAddress1`)"
                      fieldWidth="100%"
                      :nonEditable="true"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.companyAddress2')"
                      v-model.trim="companyData.companyAddress2"
                      :placeholder="$t(`label.companyAddress2`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.companyAddress3')"
                      v-model.trim="companyData.companyAddress3"
                      :placeholder="$t(`label.companyAddress3`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.selectCountry')"
                      v-model.trim="companyData.companyCountry"
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
                      v-model.trim="companyData.companyRegion"
                      :items="statesDdl"
                      :placeholder="$t(`label.selectRegion`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.companyCity')"
                      v-model.trim="companyData.companyCity"
                      :placeholder="$t(`label.companyCity`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.companyPostalCode')"
                      v-model.trim="companyData.companyPostalCode"
                      :placeholder="$t(`label.companyPostalCode`)"
                      :nonEditable="true"
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
            <app-button v-if="accessEdit" :text="$t('button.update')" :action="updateUser" color="primary"></app-button>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAME, SESSION } from '@/constants'
import { searchHelper, permissionHelper, ddlHelper, localizationHelper } from '@/utils'
import { USER_DETAILS, USER_EDIT } from '@/store/user.module'
import { LOOKUP_ROLE_DDL, LOOKUP_BANK_DDL, LOOKUP_COMPANY_DDL, LOOKUP_COUNTRY_DDL, LOOKUP_STATES_DDL } from '@/store/lookup.module'
import { COMPANY_DETAILS_RESET, COMPANY_DETAILS } from '@/store/company.module'
import { SHARED_SHOW_CREATE_COMPANY_DIALOG } from '@/store/shared.module'

export default {
  name: 'UserDetails',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.USER)

      t.accessEdit = permissionHelper.isAuthorizedAction(MODULE_ID.USER, ACTION.UPDATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.USER_LIST) {
      searchHelper.clearSearch(SESSION.USER_SEARCH)
    }
    this.$store.dispatch(`${COMPANY_DETAILS_RESET}`)
    next()
  },
  props: {},
  data() {
    return {
      openPanelIndex: [0, 1, 2, 3, 4],
      accessEdit: false,
      breadcrumbs: [
        {
          text: localizationHelper.getMessage('button.back'),
          disabled: false,
          to: {
            name: ROUTE_NAME.USER_LIST
          },
          exact: true
        }
      ],
      activationStatusDdl: ddlHelper.getActivationStatus(false, false),
      genderStatusDdl: ddlHelper.getGenderStatus(false, false)
    }
  },
  created() {
    /* Page Init */
    this.searchCriteria = searchHelper.retrieveSearch(SESSION.USER_SEARCH)
    this.getUser()
    this.getRoleDdl()
    this.getBankDdl()
    this.getCompanyDdl()
    this.getCountryDdl()
    this.getStatesDdl()
  },
  mounted() {},
  computed: {
    data() {
      return this.$store.state.user.details
    },
    roleDdl() {
      return this.$store.state.lookup.roleDdl
    },
    bankDdl() {
      return this.$store.state.lookup.bankDdl
    },
    companyDdl() {
      return this.$store.state.lookup.companyDdl
    },
    countryDdl() {
      return this.$store.state.lookup.countryDdl
    },
    statesDdl() {
      return this.$store.state.lookup.statesDdl
    },
    companyData() {
      return this.$store.state.company.details
    }
  },
  watch: {},
  methods: {
    getUser() {
      this.$store.dispatch(`${USER_DETAILS}`, { id: this.searchCriteria.selectedRecordId })
    },
    getRoleDdl() {
      this.$store.dispatch(`${LOOKUP_ROLE_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getBankDdl() {
      this.$store.dispatch(`${LOOKUP_BANK_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getCompanyDdl() {
      this.$store.dispatch(`${LOOKUP_COMPANY_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getCountryDdl() {
      this.$store.dispatch(`${LOOKUP_COUNTRY_DDL}`, { hasOptionAll: false, isActive: true })
    },
    onCompanyChange(companyId) {
      this.$store.dispatch(`${COMPANY_DETAILS}`, { id: companyId })
    },
    getStatesDdl() {
      this.$store.dispatch(`${LOOKUP_STATES_DDL}`, { hasOptionAll: false, isActive: true })
    },
    updateUser() {
      if (this.$refs.updateForm.validate()) {
        let data = {
          id: this.data.id,
          name: this.data.name,
          phone: this.data.mobileNo,
          nric: this.data.nric,
          userAccountStatus: this.data.userAccountStatus,
          company: this.data.company === '' ? null : this.data.company,
          bank: this.data.bank.id,
          bankAccountNumber: this.data.bankAccountNumber,
          referredBy: this.data.referredBy,
          gender: this.data.gender,
          roles: this.data.roles,
          address1: this.data.address1,
          address2: this.data.address2,
          address3: this.data.address3,
          country: this.data.country,
          state: this.data.region,
          postalCode: this.data.postalCode,
          city: this.data.city,
          addressBookId: this.data.addressBookId
        }

        this.$store.dispatch(`${USER_EDIT}`, { id: this.searchCriteria.selectedRecordId, data })
      }
    },
    showCreateCompanyDialog() {
      this.$store.dispatch(`${SHARED_SHOW_CREATE_COMPANY_DIALOG}`)
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
