<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.createCompany')" class="text-uppercase"></app-section-title>
    </v-row>
    <div class="mx-4">
      <v-form ref="createForm">
        <v-expansion-panels v-model="openPanelIndex" multiple>
          <!-- Bank Details -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.companyDetails')" class="text-uppercase"></app-section-title>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="pb-6" no-gutters>
                <v-col cols="12">
                  <v-divider class="my-5 mt-0"></v-divider>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.companyName')"
                      v-model.trim="data.companyName"
                      :placeholder="$t(`label.companyName`)"
                      :rules="$validators.requiredFields()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.companyPhone')"
                      v-model.trim="data.companyPhone"
                      :placeholder="$t(`label.companyPhone`)"
                      :rules="$validators.requiredFields()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.companyEmail')"
                      v-model.trim="data.companyEmail"
                      :placeholder="$t(`label.companyEmail`)"
                      :rules="$validators.requiredFields()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.businessRegNo')" v-model.trim="data.businessRegNo" :placeholder="$t(`label.businessRegNo`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.companyBankAccountNo')"
                      v-model.trim="data.companyBankAccountNo"
                      :placeholder="$t(`label.companyBankAccountNo`)"
                      fieldWidth="100%"
                      :rules="$validators.requiredInput()"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.companyBank')"
                      v-model.trim="data.companyBank"
                      :items="bankDdl"
                      :rules="$validators.requiredInputDdl()"
                      fieldWidth="100%"
                      :placeholder="$t(`label.selectBank`)"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
              <v-row class="pb-3" no-gutters>
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.companyAddress1')"
                      v-model.trim="data.companyAddress1"
                      :placeholder="$t(`label.companyAddress1`)"
                      fieldWidth="100%"
                      :rules="$validators.requiredInput()"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.companyAddress2')" v-model.trim="data.companyAddress2" :placeholder="$t(`label.companyAddress2`)" fieldWidth="100%" isOptional></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.companyAddress3')" v-model.trim="data.companyAddress3" :placeholder="$t(`label.companyAddress3`)" fieldWidth="100%" isOptional></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.selectCountry')"
                      v-model.trim="data.companyCountry"
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
                      v-model.trim="data.companyState"
                      :items="statesDdl"
                      :placeholder="$t(`label.selectRegion`)"
                      :rules="$validators.requiredInput()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.companyCity')" v-model.trim="data.companyCity" :placeholder="$t(`label.companyCity`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.companyPostalCode')" v-model.trim="data.companyPostalCode" :placeholder="$t(`label.companyPostalCode`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-row class="pa-4" no-gutters>
          <v-col cols="12" class="text-right">
            <app-button v-if="accessCreate" :text="$t('button.create')" :action="createCompany" color="primary" icon="mdi-plus"></app-button>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAME, SESSION } from '@/constants'
import { searchHelper, permissionHelper, localizationHelper } from '@/utils'
import { COMPANY_CREATE } from '@/store/company.module'
import { LOOKUP_BANK_DDL, LOOKUP_COUNTRY_DDL, LOOKUP_STATES_DDL } from '@/store/lookup.module'

export default {
  name: 'CompanyCreate',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.USER)

      t.accessCreate = permissionHelper.isAuthorizedAction(MODULE_ID.USER, ACTION.CREATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.COMPANY_LIST) {
      searchHelper.clearSearch(SESSION.COMPANY_SEARCH)
    }
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
            name: ROUTE_NAME.COMPANY_LIST
          },
          exact: true
        }
      ],
      data: {
        companyName: '',
        companyPhone: '',
        companyEmail: '',
        businessRegNo: '',
        companyBank: '',
        companyBankAccountNo: '',
        companyAddress1: '',
        companyAddress2: '',
        companyAddress3: '',
        companyCity: '',
        companyPostalCode: '',
        companyState: '',
        companyCountry: 1
      },
      openPanelIndex: [0]
    }
  },
  created() {
    this.getBankDdl()
    this.getCountryDdl()
    this.getStatesDdl()
  },
  mounted() {},
  computed: {
    bankDdl() {
      return this.$store.state.lookup.bankDdl
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
    getBankDdl() {
      this.$store.dispatch(`${LOOKUP_BANK_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getStatesDdl() {
      this.$store.dispatch(`${LOOKUP_STATES_DDL}`, { hasOptionAll: false, isActive: true })
    },
    getCountryDdl() {
      this.$store.dispatch(`${LOOKUP_COUNTRY_DDL}`, { hasOptionAll: false, isActive: true })
    },
    createCompany() {
      if (this.$refs.createForm.validate()) {
        let data = {
          name: this.data.companyName,
          phone: this.data.companyPhone,
          email: this.data.companyEmail,
          registrationNumber: this.data.businessRegNo,
          companyBank: this.data.companyBank,
          companyBankAccountNo: this.data.companyBankAccountNo,
          companyAddress1: this.data.companyAddress1,
          companyAddress2: this.data.companyAddress2,
          companyAddress3: this.data.companyAddress3,
          companyCity: this.data.companyCity,
          companyPostalCode: this.data.companyPostalCode,
          companyState: this.data.companyState,
          companyCountry: this.data.companyCountry
        }

        this.$store.dispatch(`${COMPANY_CREATE}`, { data })
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
