<template>
  <div>
    <app-breadcrumb-button :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
    <v-row class="pa-4" no-gutters>
      <app-section-title :title="$t('label.createRole')" class="text-uppercase"></app-section-title>
    </v-row>
    <div class="mx-4">
      <v-form ref="createForm">
        <app-section-card class="pt-6">
          <v-row no-gutters>
            <v-col class="pb-3">
              <div class="pr-15">
                <app-form-field
                  :label="$t('label.roleName')"
                  v-model.trim="data.roleName"
                  :placeholder="$t(`label.roleName`)"
                  :rules="$validators.requiredValidCharacterExtended()"
                  fieldWidth="100%"
                ></app-form-field>
              </div>
            </v-col>

            <v-col class="pb-3">
              <div class="pr-15">
                <app-form-field
                  :label="$t('label.description')"
                  v-model.trim="data.description"
                  :placeholder="$t(`label.description`)"
                  :rules="$validators.requiredValidCharacterExtended()"
                  fieldWidth="100%"
                ></app-form-field>
              </div>
            </v-col>

            <!-- Permissions -->
            <v-row no-gutters class="pb-3">
              <v-col cols="12">
                <v-card-title class="title pa-0">{{ $t('label.permissions') }}</v-card-title>
                <v-divider class="pb-2"></v-divider>
              </v-col>
              <v-col cols="12" md="4" sm="6" v-for="(item, i) in permissionList" :key="i" class="pa-1">
                <v-expansion-panels v-model="openPanelIndex" accordion multiple :key="i">
                  <!-- Permission List -->
                  <v-expansion-panel>
                    <v-expansion-panel-header class="denseHeight">
                      <v-card-title class="pa-0">
                        <label class="subtitle-2">{{ i + 1 }}.&nbsp;{{ item.moduleName }}</label>
                      </v-card-title>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-row no-gutters>
                        <v-col cols="12" sm="4" md="4" v-for="(pItem, j) in item.permissions" :key="j">
                          <v-checkbox
                            v-model="selectedPermission"
                            :label="`${pItem.text}`"
                            :value="pItem.value"
                            @click.capture.stop="toggleAllCheckbox(item.allPermissions, pItem.value)"
                            color="primary"
                            class="ma-0 py-1 check-box-input"
                            hide-details
                            dense
                          ></v-checkbox>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-row>
        </app-section-card>
        <v-row class="pa-4" no-gutters>
          <v-col cols="12" class="text-right">
            <app-button v-if="accessCreate" :text="$t('button.create')" :action="createRole" color="primary" icon="mdi-plus"></app-button>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAME, SESSION } from '@/constants'
import { searchHelper, permissionHelper, localizationHelper, sharedHelper } from '@/utils'
import { ROLE_CREATE } from '@/store/role.module'
import { LOOKUP_PERMISSION_LIST } from '@/store/lookup.module'
import { SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'

export default {
  name: 'RoleCreate',
  components: {},
  beforeRouteEnter(to, from, next) {
    next((t) => {
      let MODULE_ID = permissionHelper.getAllModules()
      let ACTION = permissionHelper.getAllActions(MODULE_ID.ACCESS_MATRIX)

      t.accessCreate = permissionHelper.isAuthorizedAction(MODULE_ID.ACCESS_MATRIX, ACTION.CREATE)
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != ROUTE_NAME.ROLE_LIST) {
      searchHelper.clearSearch(SESSION.ROLE_SEARCH)
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
            name: ROUTE_NAME.ROLE_LIST
          },
          exact: true
        }
      ],
      data: {
        roleName: '',
        description: '',
        permissions: []
      },
      openPanelIndex: [],
      selectedAllPermissions: [],
      selectedPermission: []
    }
  },
  created() {
    this.getPermissionList()
  },
  mounted() {},
  computed: {
    permissionList() {
      return this.$store.state.lookup.permissionList
    }
  },
  watch: {
    permissionList() {
      if (this.permissionList.length > 0) {
        this.expandAllPanels()
      }
    }
  },
  methods: {
    getPermissionList() {
      this.$store.dispatch(`${LOOKUP_PERMISSION_LIST}`)
    },
    createRole() {
      if (this.selectedPermission.length == 0) {
        let messageDialog = sharedHelper.getValidationErrorMessageDialog(localizationHelper.getMessage('error.requiredPermission'), () => {
          this.$store.dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog)
        })
        this.$store.dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog)
      } else if (this.$refs.createForm.validate()) {
        let modules = this.permissionList

        for (let j = 0; j < modules.length; j++) {
          let permissionsArray = modules[j].permissions

          for (let k = 0; k < permissionsArray.length; k++) {
            for (let i = 0; i < this.selectedPermission.length; i++) {
              if (this.selectedPermission[i] === permissionsArray[k].value) {
                this.data.permissions.push({
                  id: this.selectedPermission[i],
                  action: permissionsArray[k].text,
                  description: permissionsArray[k].text
                })
              }
            }
          }
        }

        let data = {
          name: this.data.roleName,
          description: this.data.description,
          permissions: [...new Set(this.data.permissions)] //get unique value
        }

        this.$store.dispatch(`${ROLE_CREATE}`, { data })
      }
    },
    expandAllPanels() {
      this.openPanelIndex = [...Array(this.permissionList.length).keys()].map((k, i) => i)
    },
    toggleAllCheckbox(allPermissions, isSingleCheck) {
      let permissionsArray = allPermissions.split(',')

      if (isSingleCheck) {
        //Checked single checkbox
        for (let i = 0; i < permissionsArray.length; i++) {
          if (!this.selectedPermission.includes(permissionsArray[i])) {
            //When a single checkbox for the module has unchecked, unchecked All checkbox
            if (this.selectedAllPermissions.includes(allPermissions)) {
              this.selectedAllPermissions.splice(this.selectedAllPermissions.indexOf(allPermissions), 1)
            }
            break
          } else if (!this.selectedAllPermissions.includes(allPermissions)) {
            //When all single checkbox for the module has checked, checked All checkbox
            this.selectedAllPermissions.push(allPermissions)
          }
        }
      } else {
        //Checked All checkbox
        if (!this.selectedAllPermissions.includes(allPermissions)) {
          //Unchecked All single checkbox
          for (let i = 0; i < permissionsArray.length; i++) {
            if (this.selectedPermission.includes(permissionsArray[i])) this.selectedPermission.splice(this.selectedPermission.indexOf(permissionsArray[i]), 1)
          }
        } else {
          //Checked All single checkbox
          for (let i = 0; i < permissionsArray.length; i++) {
            if (!this.selectedPermission.includes(permissionsArray[i])) this.selectedPermission.push(permissionsArray[i])
          }
        }
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
