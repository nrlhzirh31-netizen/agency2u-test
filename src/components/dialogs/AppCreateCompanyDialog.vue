<template>
  <v-dialog persistent scrollable :value="isShowDialog" :max-width="maxWidth" style="z-index: 9999">
    <v-card class="dialog-card">
      <v-card-title>
        <v-col cols="10" class="mx-0">
          <p class="text-h6 mb-2">{{ $t(`label.createCompany`) }}</p>
        </v-col>
        <v-col v-if="showCloseButton" cols="2" class="text-right py-0">
          <v-btn :ripple="false" icon @click="closeDialog"><v-icon>mdi-close</v-icon></v-btn>
        </v-col>
      </v-card-title>
      <v-card-text style="height: 860px">
        <v-form ref="createCompanyForm" @submit.prevent="createCompany">
          <v-row no-gutters>
            <v-col cols="12">
              <div class="my-3">
                <div cols="12" sm="6" md="4" class="pb-3">
                  <app-form-field
                    :label="$t('label.companyName')"
                    v-model.trim="createCompanyObj.companyName"
                    :placeholder="$t(`label.companyName`)"
                    :rules="$validators.requiredFields()"
                    fieldWidth="100%"
                  ></app-form-field>
                </div>

                <div cols="12" sm="6" md="4" class="pb-3">
                  <app-form-field
                    :label="$t('label.companyPhone')"
                    v-model.trim="createCompanyObj.companyPhone"
                    :placeholder="$t(`label.companyPhone`)"
                    :rules="$validators.requiredFields()"
                    fieldWidth="100%"
                  ></app-form-field>
                </div>

                <div class="pb-3">
                  <app-form-field
                    :label="$t('label.companyEmail')"
                    v-model.trim="createCompanyObj.companyEmail"
                    :placeholder="$t(`label.companyEmail`)"
                    :rules="$validators.requiredFields()"
                    fieldWidth="100%"
                  ></app-form-field>
                </div>

                <div class="pb-3">
                  <app-form-field :label="$t('label.businessRegNo')" v-model.trim="createCompanyObj.businessRegNo" :placeholder="$t(`label.businessRegNo`)" fieldWidth="100%"></app-form-field>
                </div>

                <div class="pb-3">
                  <app-form-field
                    :label="$t('label.companyBankAccountNo')"
                    v-model.trim="createCompanyObj.companyBankAccountNo"
                    :placeholder="$t(`label.companyBankAccountNo`)"
                    fieldWidth="100%"
                    :rules="$validators.requiredInput()"
                  ></app-form-field>
                </div>

                <div class="pb-3">
                  <app-form-field
                    :label="$t('label.companyBank')"
                    v-model.trim="createCompanyObj.companyBank"
                    :items="bankDdl"
                    :rules="$validators.requiredInputDdl()"
                    fieldWidth="100%"
                    :placeholder="$t(`label.selectBank`)"
                  ></app-form-field>
                </div>

                <div class="pb-3">
                  <app-form-field
                    :label="$t('label.companyAddress1')"
                    v-model.trim="createCompanyObj.companyAddress1"
                    :placeholder="$t(`label.companyAddress1`)"
                    fieldWidth="100%"
                    :rules="$validators.requiredInput()"
                  ></app-form-field>
                </div>

                <div class="pb-3">
                  <app-form-field
                    :label="$t('label.companyAddress2')"
                    v-model.trim="createCompanyObj.companyAddress2"
                    :placeholder="$t(`label.companyAddress2`)"
                    fieldWidth="100%"
                    isOptional
                  ></app-form-field>
                </div>

                <div class="pb-3">
                  <app-form-field
                    :label="$t('label.companyAddress3')"
                    v-model.trim="createCompanyObj.companyAddress3"
                    :placeholder="$t(`label.companyAddress3`)"
                    fieldWidth="100%"
                    isOptional
                  ></app-form-field>
                </div>

                <div class="pb-3">
                  <app-form-field
                    :label="$t('label.selectCountry')"
                    v-model.trim="createCompanyObj.companyCountry"
                    :items="countryDdl"
                    :placeholder="$t(`label.selectCountry`)"
                    :rules="$validators.requiredInput()"
                    fieldWidth="100%"
                  ></app-form-field>
                </div>

                <div class="pb-3">
                  <app-form-field
                    :label="$t('label.selectRegion')"
                    v-model.trim="createCompanyObj.companyState"
                    :items="statesDdl"
                    :placeholder="$t(`label.selectRegion`)"
                    :rules="$validators.requiredInput()"
                    fieldWidth="100%"
                  ></app-form-field>
                </div>

                <div class="pb-3">
                  <app-form-field :label="$t('label.companyCity')" v-model.trim="createCompanyObj.companyCity" :placeholder="$t(`label.companyCity`)" fieldWidth="100%"></app-form-field>
                </div>

                <div class="pb-3">
                  <app-form-field
                    :label="$t('label.companyPostalCode')"
                    v-model.trim="createCompanyObj.companyPostalCode"
                    :placeholder="$t(`label.companyPostalCode`)"
                    fieldWidth="100%"
                  ></app-form-field>
                </div>
              </div>

              <div class="text-right my-3">
                <v-btn class="font-weight-bold mx-1 d-inline-block" min-width="120" @click="closeDialog" depressed color="secondary">
                  {{ $t('button.cancel') }}
                </v-btn>
                <v-btn class="font-weight-bold mx-1 d-inline-block" min-width="120" type="submit" depressed color="primary">Create</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { COMPANY_CREATE } from '@/store/user.module'
import { LOOKUP_BANK_DDL, LOOKUP_COUNTRY_DDL, LOOKUP_STATES_DDL } from '@/store/lookup.module'
import { SHARED_CLOSE_CREATE_COMPANY_DIALOG } from '@/store/shared.module'

export default {
  name: 'AppCreateCompanyDialog',
  components: {},
  data: () => ({
    createCompanyObj: {
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
    }
  }),
  computed: {
    dialogIsOpen() {
      return this.$root.$app.isCreateCompanyDialogShow
    },
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
  props: {
    closeAction: {
      required: false,
      default: null
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    maxWidth: {
      type: Number,
      required: false,
      default: 350
    },
    isShowDialog: {
      type: Boolean,
      required: true,
      default: false
    },
    customClass: {
      type: String,
      required: false,
      default: 'pa-3'
    },
    showCloseButton: {
      type: Boolean,
      default: true
    }
  },
  watch: {},
  created() {
    this.getBankDdl()
    this.getCountryDdl()
    this.getStatesDdl()
  },
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
    closeDialog() {
      this.$store.dispatch(`${SHARED_CLOSE_CREATE_COMPANY_DIALOG}`)
    },
    createCompany() {
      if (this.$refs.createCompanyForm.validate()) {
        let data = {
          name: this.createCompanyObj.companyName,
          phone: this.createCompanyObj.companyPhone,
          email: this.createCompanyObj.companyEmail,
          registrationNumber: this.createCompanyObj.businessRegNo,
          companyBank: this.createCompanyObj.companyBank,
          companyBankAccountNo: this.createCompanyObj.companyBankAccountNo,
          companyAddress1: this.createCompanyObj.companyAddress1,
          companyAddress2: this.createCompanyObj.companyAddress2,
          companyAddress3: this.createCompanyObj.companyAddress3,
          companyCity: this.createCompanyObj.companyCity,
          companyPostalCode: this.createCompanyObj.companyPostalCode,
          companyState: this.createCompanyObj.companyState,
          companyCountry: this.createCompanyObj.companyCountry
        }

        this.$store.dispatch(`${COMPANY_CREATE}`, { data })
      }
    }
  }
}
</script>
