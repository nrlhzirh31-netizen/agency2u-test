<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.createUser')" class="text-uppercase"></app-section-title>
    </v-row>
    <div class="mx-4">
      <v-form ref="createForm">
        <v-expansion-panels v-model="openPanelIndex" multiple>
          <!-- User Details -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.userDetails')" class="text-uppercase"></app-section-title>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="pb-4" no-gutters>
                <v-col cols="12">
                  <v-divider class="my-5 mt-0"></v-divider>
                </v-col>
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
                    <app-form-field :label="$t('label.email')" v-model.trim="data.email" :placeholder="$t(`label.email`)" :rules="$validators.emailRules()" fieldWidth="100%"></app-form-field>
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
                      :label="$t('label.gender')"
                      v-model.trim="data.gender"
                      :items="genderStatusDdl"
                      :placeholder="$t(`label.selectGender`)"
                      :rules="$validators.requiredInputDdl()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.roles')"
                      v-model.trim="data.roles"
                      :items="roleDdl"
                      :rules="$validators.requiredInputDdl()"
                      fieldWidth="100%"
                      :placeholder="$t(`label.selectRole`)"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.referredBy')" v-model.trim="data.referredBy" :placeholder="$t(`label.referredBy`)" fieldWidth="100%"></app-form-field>
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
              <v-row class="pb-4" no-gutters>
                <v-col cols="12">
                  <v-divider class="my-5 mt-0"></v-divider>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.address1')"
                      v-model.trim="data.address1"
                      :placeholder="$t(`label.address1`)"
                      fieldWidth="100%"
                      :rules="$validators.requiredInput()"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.address2')" v-model.trim="data.address2" isOptional :placeholder="$t(`label.address2`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.address3')" v-model.trim="data.address3" isOptional :placeholder="$t(`label.address3`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.selectCountry')"
                      v-model.trim="data.country"
                      :items="countryDdl"
                      :placeholder="$t(`label.selectCountry`)"
                      :rules="$validators.requiredInputDdl()"
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
                      :rules="$validators.requiredInputDdl()"
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

                <v-col cols="12" sm="6" md="4" class="py-5">
                  <app-button :text="$t('button.createCompany')" :action="showCreateCompanyDialog" color="primary"></app-button>
                </v-col>

                <v-col v-if="companyData.id > 0" cols="12" sm="6" md="4" class="pb-3">
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

          <!-- Password -->
          <!-- <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.password')" class="text-uppercase"></app-section-title>
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
                      type="password"
                      v-model.trim="data.password"
                      :placeholder="$t(`label.newPassword`)"
                      :label="$t(`label.newPassword`)"
                      :maxLength="25"
                      :rules="$validators.passwordRules()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      type="password"
                      v-model.trim="data.passwordConfirm"
                      :placeholder="$t(`label.confirmPassword`)"
                      :label="$t(`label.confirmPassword`)"
                      :maxLength="25"
                      :rules="$validators.confirmPasswordRules(data.password, data.passwordConfirm)"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel> -->
        </v-expansion-panels>
        <v-row class="pa-4" no-gutters>
          <v-col cols="12" class="text-right">
            <app-button v-if="accessCreate" :text="$t('button.create')" :action="creatUser" color="primary" icon="mdi-plus"></app-button>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAME, SESSION } from '@/constants'
import { searchHelper, permissionHelper, localizationHelper, ddlHelper } from '@/utils'
import { LOOKUP_ROLE_DDL, LOOKUP_BANK_DDL, LOOKUP_COMPANY_DDL, LOOKUP_COUNTRY_DDL, LOOKUP_STATES_DDL } from '@/store/lookup.module'
import { USER_CREATE } from '@/store/user.module'
import { COMPANY_DETAILS, COMPANY_DETAILS_RESET } from '@/store/company.module'
import { SHARED_SHOW_CREATE_COMPANY_DIALOG } from '@/store/shared.module'

export default {
  name: 'UserCreate',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.USER)

      t.accessCreate = permissionHelper.isAuthorizedAction(MODULE_ID.USER, ACTION.CREATE)
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
      accessCreate: false,
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
      data: {
        name: '',
        mobileNo: '',
        email: '',
        password: '',
        passwordConfirm: '',
        nric: '',
        company: '',
        bank: '',
        bankAccountNumber: '',
        referredBy: '',
        gender: '',
        roles: '',
        address1: '',
        address2: '',
        address3: '',
        city: '',
        postalCode: '',
        region: '',
        country: 1
      },
      genderStatusDdl: ddlHelper.getGenderStatus(false, false),
      openPanelIndex: [0, 1, 2, 3, 4]
    }
  },
  created() {
    this.getRoleDdl()
    this.getBankDdl()
    this.getCompanyDdl()
    this.getCountryDdl()
    this.getStatesDdl()
  },
  mounted() {},
  computed: {
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
    getStatesDdl() {
      this.$store.dispatch(`${LOOKUP_STATES_DDL}`, { hasOptionAll: false, isActive: true })
    },
    onCompanyChange(companyId) {
      this.$store.dispatch(`${COMPANY_DETAILS}`, { id: companyId })
    },
    creatUser() {
      if (this.$refs.createForm.validate()) {
        let data = {
          name: this.data.name,
          phone: this.data.mobileNo,
          email: this.data.email,
          password: this.data.password,
          passwordConfirm: this.data.passwordConfirm,
          nric: this.data.nric,
          company: this.data.company === '' ? null : parseInt(this.data.company),
          bank: parseInt(this.data.bank),
          bankAccountNumber: this.data.bankAccountNumber,
          referredBy: this.data.referredBy,
          gender: this.data.gender,
          roles: this.data.roles,
          address1: this.data.address1,
          address2: this.data.address2,
          address3: this.data.address3,
          city: this.data.city,
          postalCode: this.data.postalCode,
          state: this.data.region,
          country: this.data.country
        }

        this.$store.dispatch(`${USER_CREATE}`, { data })
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
