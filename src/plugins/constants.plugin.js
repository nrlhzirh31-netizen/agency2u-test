/* 
Custom plugin to make constants accessible in VUE files by:
this.$const.constantName (omit 'this' if using inside <template>)
*/
import * as constants from '@/constants'
import * as enums from '@/constants/enums'

export default {
  install(Vue, options) {
    Vue.prototype.$const = {
      ...enums,
      ...constants
    }
  }
}
