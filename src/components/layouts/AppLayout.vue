<template>
  <div class="layout-private fill-height background-triangle">
    <header class="header w-100 py-2 elevation-3">
      <v-row class="header-row px-sm-8 px-2" align="center" no-gutters>
        <v-col cols="auto">
          <v-btn v-if="$vuetify.breakpoint.mobile" text depressed @click.stop="openPageNavigationMenu">
            <v-icon color="primary">mdi-menu</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto" class="pl-4">
          <img class="brand-logo" src="/static/logo/agency2u_blue_icon.png" />
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" style="font-size: 14px">
          Welcome
          <b>{{ currentUserInfo.name }}</b>
          <v-btn :ripple="false" class="ml-sm-4 ml-1 d-inline-block" icon rounded @click="openPageNavigationProfileDrawerMenu">
            <v-icon class="header-profile-icon">mdi-account-circle</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </header>
    <!-- Applying the app prop automatically applies position: fixed to the layout element. 
    If your application calls for an absolute element, you can overwrite this functionality by using the absolute prop. -->
    <!-- Sizes your content based upon application components -->
    <v-main v-if="!$vuetify.breakpoint.mobile">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <v-row no-gutters>
          <v-col cols="2">
            <sidebar-menu :menu="menuList" width="300px" widthCollapsed="80px" :hideToggle="true">
              <template v-slot:dropdown-icon>
                <font-awesome-icon icon="fas fa-angle-right" />
              </template>
            </sidebar-menu>
          </v-col>
          <v-col cols="10">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-main v-else>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <slot />
      </v-container>
    </v-main>

    <!-- Page Navigation Menu -->
    <v-menu fixed v-model="isPageNavigationMenuShow" :close-on-content-click="false" transition="scroll-x-reverse-transition" z-index="8" content-class="page-navigation-menu top right">
      <div>
        <v-row no-gutters>
          <v-col cols="12">
            <v-row no-gutters class="px-0" align="center" justify="space-around">
              <v-col cols="11" class="pb-0">
                <sidebar-menu :menu="menuList" width="300px" widthCollapsed="80px" :hideToggle="true">
                  <template v-slot:dropdown-icon>
                    <font-awesome-icon icon="fas fa-angle-right" />
                  </template>
                </sidebar-menu>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-menu>

    <!-- Page Navigation Profile Drawer Menu -->
    <v-menu
      fixed
      v-model="isPageNavigationProfileDrawerMenuShow"
      :close-on-content-click="false"
      transition="scroll-x-reverse-transition"
      z-index="8"
      content-class="page-navigation-profile-drawer-menu top right"
    >
      <div>
        <v-row no-gutters>
          <v-col cols="12">
            <v-row no-gutters class="px-0" align="center" justify="space-around">
              <v-col cols="11" class="pb-0">
                <div>
                  <v-btn
                    text
                    plain
                    class="text-capitalize"
                    @click="closePageNavigationProfileDrawerMenu"
                    :to="{
                      name: routeName.USER_RESET_PASSWORD
                    }"
                    min-width="0"
                  >
                    {{ $t(`label.resetPassword`) }}
                  </v-btn>
                </div>
                <hr class="secondary-color-horizontal-line" />
                <v-btn text plain color="red" class="text-capitalize" @click="logout">{{ $t('button.signOut') }}</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-menu>

    <!-- Message Dialog -->
    <app-dialog :isShowDialog="messageDialogDisplay">
      <app-message-dialog :messageTitle="messageDialog.messageTitle" :messages="messageDialog.messages" :buttons="messageDialog.buttons" :type="messageDialog.type"></app-message-dialog>
    </app-dialog>

    <!-- Create Company Dialog -->
    <app-create-company-dialog :isShowDialog="createCompanyDialogDisplay" :max-width="1000"></app-create-company-dialog>

    <!-- Loading -->
    <app-loading></app-loading>
  </div>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import AppLoading from '@/components/AppLoading.vue'
import AppCreateCompanyDialog from '@/components/dialogs/AppCreateCompanyDialog.vue'
import { sharedHelper, permissionHelper, localizationHelper } from '@/utils'
import { AUTH_LOGIN_TOKEN, AUTH_LOGIN_REFRESH } from '@/store/auth.module'
import { SHARED_SHOW_DIALOG, SHARED_SESSION_EXPIRED } from '@/store/shared.module'
import { ROUTE_NAME, SESSION } from '@/constants'

export default {
  name: 'AppLayout',
  components: {
    SidebarMenu,
    AppLoading,
    AppCreateCompanyDialog
  },
  props: {},
  data() {
    return {
      // drawer: null,
      menuList: [],
      isPageNavigationProfileDrawerMenuShow: false,
      routeName: ROUTE_NAME,
      drawer: true,
      isPageNavigationMenuShow: false,
      currentUserInfo: {}
    }
  },
  created() {
    this.$root.$master = this
    clearInterval(this.$options.tokenCheckerInterval)

    if (sharedHelper.hasAuthToken()) {
      //Has refresh token: user logged in
      this.pageInit()
    } else {
      let messageDialog = sharedHelper.getErrorReloadPageDialog(localizationHelper.getMessage(`label.error`), localizationHelper.getMessage(`error.requiredLogin`), 'ok')

      this.$store.dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog)
      //this.pageInit()
    }

    /* To handle when close browser directly */
    window.addEventListener('beforeunload', this.clearAllSettings)
  },
  mounted() {},
  computed: {
    messageDialogDisplay() {
      return this.$store.state.shared.messageDialogDisplay
    },
    messageDialog() {
      return this.$store.state.shared.messageDialog
    },
    createCompanyDialogDisplay() {
      return this.$store.state.shared.createCompanyDialogDisplay
    }
  },
  watch: {},
  methods: {
    async pageInit() {
      if (!sharedHelper.hasAuthToken()) {
        //When user open any page in new tab, not required to re-login
        await this.$store.dispatch(AUTH_LOGIN_TOKEN)
      }

      if (sharedHelper.hasAuthToken()) {
        //Valid user
        this.menuList = permissionHelper.getAuthorizedMenuList()
        this.$options.tokenCheckerInterval = setInterval(this.authTokenChecker, 10000) //Trigger every 10s
      }
      this.currentUserInfo = JSON.parse(localStorage.getItem(SESSION.CURRENT_USER_INFO))
    },
    async authTokenChecker() {
      if (sharedHelper.hasHitError()) {
        //Duplicate login || Inactive user
        let errorCode = localStorage.getItem(SESSION.ERROR_CODE)

        clearInterval(this.$options.tokenCheckerInterval)
        localStorage.setItem(SESSION.ERROR_CODE, '')
        this.showLogoutDialog(errorCode)
      } else if (sharedHelper.isTokenExpired()) {
        if (sharedHelper.hasAuthToken() /* && sharedHelper.isActiveUser()*/) {
          //Refresh token, get latest user info (permissions)
          await this.$store.dispatch(`${AUTH_LOGIN_REFRESH}`)
          //this.$store.dispatch(`${AUTH_INFO}`)
        } else {
          //Refresh token failed || no JWT token || user idle for too long
          sharedHelper.clearAllClientStorage()
          clearInterval(this.$options.tokenCheckerInterval)
          this.$store.dispatch(SHARED_SESSION_EXPIRED)
        }
      }
    },
    showLogoutDialog(errorCode) {
      let buttonAction = () => {
        this.$store.dispatch(AUTH_LOGOUT)
      }
      let msg = errorCode == SHARED.ERROR_CODE_DUPLICATE_LOGIN ? localizationHelper.getMessage(`error.duplicateLogin`) : localizationHelper.getMessage(`error.inactiveUser`)
      let messageDialog = sharedHelper.getErrorReloadPageDialog(localizationHelper.getMessage(`label.error`), msg, 'ok', buttonAction)
      this.$store.dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog)
    },
    clearAllSettings() {
      /* Comment this for localhost */
      // clearInterval(this.$options.tokenCheckerInterval)
      // sharedHelper.clearAllClientStorage()
    },
    openPageNavigationProfileDrawerMenu() {
      this.isPageNavigationProfileDrawerMenuShow = true
    },
    openPageNavigationMenu() {
      this.isPageNavigationMenuShow = true
    },
    closePageNavigationProfileDrawerMenu() {
      this.isPageNavigationProfileDrawerMenuShow = false
    },
    closePageNavigationMenu() {
      this.isPageNavigationMenuShow = false
    },
    logout() {
      this.$router.push({
        name: ROUTE_NAME.LOGOUT
      })
    }
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.clearAllSettings)
    this.clearAllSettings()
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: white !important;
}
.v-sidebar-menu {
  position: inherit;
  background-color: white !important;
  border-radius: 5px;
}

.header-profile-icon {
  font-size: 34px !important;
}

.page-navigation-profile-drawer-menu {
  top: 55px !important;
  left: unset !important;
  right: 5px;
  background-color: #fff;
}

.page-navigation-menu {
  top: 55px !important;
  left: 5px !important;
  background-color: #fff;
}
</style>
