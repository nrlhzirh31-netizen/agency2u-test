import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/plugins/i18n'
import vuetify from '@/plugins/vuetify'
import constantsPlugin from '@/plugins/constants.plugin'
import validatorsPlugin from '@/plugins/validators.plugin'
import filtersPlugin from '@/plugins/filters.plugin'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faUsers,
  faBuilding,
  faAngleRight,
  faWifi,
  faFileCircleCheck,
  faArrowRightFromBracket,
  faWallet,
  faHouse,
  faGauge,
  faPerson,
  faIndent,
  faPercent,
  faPaperclip,
  faCube,
  faTags,
  faHashtag,
  faBoxArchive,
  faFile,
  faListCheck,
  faBoxesStacked,
  faBox
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueMeta from 'vue-meta'

import '@mdi/font/css/materialdesignicons.css'
import '@/scss/theme.scss'
import '@/scss/app.scss'
import '@/scss/utility-classes.scss'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

import AppBreadcrumbButton from '@/components/AppBreadcrumbButton.vue'
import AppButton from '@/components/AppButton.vue'
import AppDialog from '@/components/dialogs/AppDialog.vue'
import AppMessageDialog from '@/components/dialogs/AppMessageDialog.vue'
import AppFormField from '@/components/AppFormField.vue'
import AppSearchFormField from '@/components/AppSearchFormField.vue'
import AppLoginFormField from '@/components/AppSearchFormField.vue'
import AppSectionCard from '@/components/cards/AppSectionCard.vue'
import AppSectionTitle from '@/components/cards/AppSectionTitle.vue'
import DashboardTitle from '@/components/cards/DashboardTitle.vue'
import AppPagination from '@/components/AppPagination.vue'
import AppDatePicker from '@/components/AppDatePicker.vue'
import BarChart from '@/components/Bar.vue'
import AnsuranBarChart from '@/components/AnsuranBar.vue'

library.add(
  faUser,
  faUsers,
  faBuilding,
  faAngleRight,
  faWifi,
  faFileCircleCheck,
  faArrowRightFromBracket,
  faWallet,
  faHouse,
  faGauge,
  faPerson,
  faIndent,
  faPercent,
  faPaperclip,
  faCube,
  faTags,
  faHashtag,
  faBoxArchive,
  faFile,
  faListCheck,
  faBoxesStacked,
  faBox
)

Vue.component('app-breadcrumb-button', AppBreadcrumbButton)
Vue.component('app-button', AppButton)
Vue.component('app-form-field', AppFormField)
Vue.component('app-search-form-field', AppSearchFormField)
Vue.component('app-login-form-field', AppLoginFormField)
Vue.component('app-section-card', AppSectionCard)
Vue.component('app-section-title', AppSectionTitle)
Vue.component('dashboard-title', DashboardTitle)
Vue.component('app-pagination', AppPagination)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('app-date-picker', AppDatePicker)
Vue.component('BarChart', BarChart)
Vue.component('AnsuranBarChart', AnsuranBarChart)

import AppLayout from '@/components/layouts/AppLayout.vue'
import AppLayoutPublic from '@/components/layouts/AppLayoutPublic.vue'
import { filtersHelper } from './utils'

Vue.component('app-layout', AppLayout)
Vue.component('app-layout-public', AppLayoutPublic)
Vue.component('app-dialog', AppDialog)
Vue.component('app-message-dialog', AppMessageDialog)

Vue.use(VueMeta)
Vue.use(constantsPlugin)
Vue.use(validatorsPlugin)
Vue.use(filtersPlugin)
Object.keys(filtersHelper).forEach((key) => Vue.filter(key, filtersHelper[key]))

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
