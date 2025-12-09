/* 
Custom plugin to make filters accessible in VUE files by:
this.$filters.filterName (omit 'this' if using inside <template>)
*/
import { filtersHelper } from '@/utils'

export default {
  install(Vue, options) {
    Vue.prototype.$filters = { ...filtersHelper }
  }
}
