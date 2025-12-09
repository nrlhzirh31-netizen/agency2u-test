<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.createBank')" class="text-uppercase"></app-section-title>
    </v-row>
    <div class="mx-4">
      <v-form ref="createForm">
        <v-expansion-panels v-model="openPanelIndex" multiple>
          <!-- Bank Details -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.bankDetails')" class="text-uppercase"></app-section-title>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="pb-4" no-gutters>
                <v-col cols="12">
                  <v-divider class="my-5 mt-0"></v-divider>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.code')" v-model.trim="data.code" :placeholder="$t(`label.code`)" :rules="$validators.requiredFields()" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.name')" v-model.trim="data.name" :placeholder="$t(`label.name`)" :rules="$validators.requiredFields()" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field
                      :label="$t('label.description')"
                      v-model.trim="data.description"
                      :placeholder="$t(`label.description`)"
                      :rules="$validators.requiredFields()"
                      fieldWidth="100%"
                    ></app-form-field>
                  </div>
                </v-col>

                <v-col cols="12" class="text-right">
                  <app-button v-if="accessCreate" :text="$t('button.create')" :action="createBank" color="primary"></app-button>
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
import { searchHelper, permissionHelper, localizationHelper } from '@/utils'
import { BANK_CREATE } from '@/store/bank.module'

export default {
  name: 'BankCreate',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.COMMON_PARAMS)

      t.accessCreate = permissionHelper.isAuthorizedAction(MODULE_ID.COMMON_PARAMS, ACTION.CREATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.BANK_LIST) {
      searchHelper.clearSearch(SESSION.BANK_SEARCH)
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
            name: ROUTE_NAME.BANK_LIST
          },
          exact: true
        }
      ],
      data: {
        code: '',
        name: '',
        description: ''
      },
      openPanelIndex: [0]
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    createBank() {
      if (this.$refs.createForm.validate()) {
        let data = {
          code: this.data.code,
          name: this.data.name,
          description: this.data.description
        }

        this.$store.dispatch(`${BANK_CREATE}`, { data })
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
