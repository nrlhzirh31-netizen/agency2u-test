<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <app-section-card>
      <v-row class="pa-4" no-gutters>
        <app-section-title :title="$t('label.createAgent')" class="text-uppercase"></app-section-title>
      </v-row>
    </app-section-card>
    <div class="mx-4">
      <v-form ref="createForm">
        <v-expansion-panels v-model="openPanelIndex" multiple>
          <!-- User Details -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.agentDetails')" class="text-uppercase"></app-section-title>
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
                    <app-form-field :label="$t('label.gender')" v-model.trim="data.gender" :items="genderStatusDdl" :rules="$validators.requiredInput()" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.roles')"
                      v-model.trim="data.roles"
                      :items="roleDdl"
                      :rules="$validators.requiredInputDdl()"
                      :multipleSelectOverflowText="$t('label.roles')"
                      :multipleSelectMaxDisplay="3"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.referredBy')" v-model.trim="data.referredBy" :placeholder="$t(`label.referredBy`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
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
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.address1')" v-model.trim="data.address1" :nonEditable="true" :placeholder="$t(`label.address1`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.address2')" v-model.trim="data.address2" :nonEditable="true" :placeholder="$t(`label.address2`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.address3')" v-model.trim="data.address3" :nonEditable="true" :placeholder="$t(`label.address3`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.city')" v-model.trim="data.city" :nonEditable="true" :placeholder="$t(`label.city`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.postalCode')" v-model.trim="data.postalCode" :nonEditable="true" :placeholder="$t(`label.postalCode`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.state')" v-model.trim="data.state" :nonEditable="true" :placeholder="$t(`label.state`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.country')" v-model.trim="data.country" :nonEditable="true" :placeholder="$t(`label.country`)" fieldWidth="100%"></app-form-field>
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
                    <app-form-field :label="$t('label.bankAccountNumber')" v-model.trim="data.bankAccountNumber" :placeholder="$t(`label.bankAccountNumber`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.bankName')" v-model.trim="data.bank.id" :placeholder="$t(`label.bankName`)" fieldWidth="100%"></app-form-field>
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
                    <app-form-field :label="$t('label.companyName')" v-model.trim="data.company.id" :placeholder="$t(`label.companyName`)" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.businessRegNo')"
                      v-model.trim="data.businessRegNo"
                      :placeholder="$t(`label.businessRegNo`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
              <v-row class="py-4" no-gutters>
                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.companyAddress1')"
                      v-model.trim="data.companyAddress1"
                      :placeholder="$t(`label.companyAddress1`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.companyAddress2')"
                      v-model.trim="data.companyAddress2"
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
                      v-model.trim="data.companyAddress3"
                      :placeholder="$t(`label.companyAddress3`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.companyCity')" v-model.trim="data.companyCity" :placeholder="$t(`label.companyCity`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.companyPostalCode')"
                      v-model.trim="data.companyPostalCode"
                      :placeholder="$t(`label.companyPostalCode`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.companyState')" v-model.trim="data.companyState" :placeholder="$t(`label.companyState`)" :nonEditable="true" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.companyCountry')"
                      v-model.trim="data.companyCountry"
                      :placeholder="$t(`label.companyCountry`)"
                      :nonEditable="true"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-- Password -->
          <v-expansion-panel class="my-3 elevation-0">
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

                <v-col cols="12" class="text-right">
                  <app-button v-if="accessCreate" :text="$t('button.create')" :action="creatUser" color="primary"></app-button>
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
import { searchHelper, permissionHelper, localizationHelper, ddlHelper } from '@/utils'
import { LOOKUP_ROLE_DDL } from '@/store/lookup.module'
import { USER_CREATE } from '@/store/user.module'

export default {
  name: 'UserCreate',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let moduleIds = permissionHelper.getAllModules()
      let actions = permissionHelper.getAllActions(moduleIds.user)

      t.accessCreate = permissionHelper.isAuthorizedAction(moduleIds.user, actions.create)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.USER_LIST) {
      searchHelper.clearSearch(SESSION.USER_SEARCH)
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
            name: ROUTE_NAME.USER_LIST
          },
          exact: true
        }
      ],
      data: {
        name: '',
        email: '',
        mobileNo: '',
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
        state: '',
        country: '',
        businessRegNo: '',
        companyAddress1: '',
        companyAddress2: '',
        companyAddress3: '',
        companyCity: '',
        companyPostalCode: '',
        companyState: '',
        companyCountry: ''
      },
      genderStatusDdl: ddlHelper.getGenderStatus(false, false),
      openPanelIndex: [0, 1, 2, 3, 4]
    }
  },
  created() {
    this.getRoleDdl()
  },
  mounted() {},
  computed: {
    roleDdl() {
      return this.$store.state.lookup.roleDdl
    }
  },
  watch: {},
  methods: {
    getRoleDdl() {
      this.$store.dispatch(`${LOOKUP_ROLE_DDL}`, { hasOptionAll: false, isActive: true })
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
          company: parseInt(this.data.company),
          bank: parseInt(this.data.bank),
          bankAccountNumber: this.data.bankAccountNumber,
          referredBy: this.data.referredBy,
          gender: this.data.gender,
          roles: this.data.roles
        }

        this.$store.dispatch(`${USER_CREATE}`, { data })
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
