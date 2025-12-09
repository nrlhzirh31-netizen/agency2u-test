/* 
Custom plugin to make validation rules accessible in VUE files by:
this.$rules.ruleName (omit 'this' if using inside <template>)
*/
import { validators } from '@/utils'

export default {
  install(Vue, options) {
    Vue.prototype.$validators = { ...validators }
  }
}
