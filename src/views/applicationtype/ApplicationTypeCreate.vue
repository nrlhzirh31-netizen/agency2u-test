<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.createApplicationType')" class="text-uppercase"></app-section-title>
    </v-row>
    <div class="mx-4">
      <v-form ref="createForm">
        <v-expansion-panels v-model="openPanelIndex" multiple>
          <!-- Bank Details -->
          <v-expansion-panel class="my-3 elevation-0">
            <v-expansion-panel-header>
              <div class="px-2">
                <app-section-title :title="$t('label.applicationTypeDetails')" class="text-uppercase"></app-section-title>
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="pb-4" no-gutters>
                <v-col cols="12">
                  <v-divider class="my-5 mt-0"></v-divider>
                </v-col>

                <v-col cols="12" sm="6" md="4" class="pb-3">
                  <div class="pr-15">
                    <app-form-field :label="$t('label.name')" v-model.trim="data.name" :placeholder="$t(`label.name`)" :rules="$validators.requiredFields()" fieldWidth="100%"></app-form-field>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-row class="pa-4" no-gutters>
          <v-col cols="12" class="text-right">
            <app-button v-if="accessCreate" :text="$t('button.create')" :action="createApplicationType" color="primary" icon="mdi-plus"></app-button>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAME, SESSION } from '@/constants'
import { searchHelper, permissionHelper, localizationHelper } from '@/utils'
import { APPLICATION_TYPE_CREATE } from '@/store/applicationtype.module'

export default {
  name: 'ApplicationTypeCreate',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.APPLICATION_TYPE)

      t.accessCreate = permissionHelper.isAuthorizedAction(MODULE_ID.APPLICATION_TYPE, ACTION.CREATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.APPLICATION_TYPE_LIST) {
      searchHelper.clearSearch(SESSION.APPLICATION_TYPE_SEARCH)
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
            name: ROUTE_NAME.APPLICATION_TYPE_LIST
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
    createApplicationType() {
      if (this.$refs.createForm.validate()) {
        let data = {
          name: this.data.name
        }

        this.$store.dispatch(`${APPLICATION_TYPE_CREATE}`, { data })
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
