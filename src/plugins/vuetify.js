import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import '@mdi/font/css/materialdesignicons.css'

/* Custom icons */
import SettingsIcon from '@/assets/icons/SettingsIcon.vue'
import DeleteIcon from '@/assets/icons/DeleteIcon.vue'
import ResetIcon from '@/assets/icons/ResetIcon.vue'
import PaginationNextIcon from '@/assets/icons/PaginationNextIcon.vue'
import PaginationPrevIcon from '@/assets/icons/PaginationPrevIcon.vue'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      settingsIcon: {
        component: SettingsIcon
      },
      resetIcon: {
        component: ResetIcon
      },
      paginationNextIcon: {
        component: PaginationNextIcon
      },
      paginationPrevIcon: {
        component: PaginationPrevIcon
      },
      deleteIcon: {
        component: DeleteIcon
      }
    }
  },
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: {
          base: '#009bdd', //agency2u brand colour
          darken1: '#005993', //dark variant
          lighten1: '#F0F5EE' //light variant
        },
        secondary: {
          base: '#BBBBBB',
          darken1: '#777777' //dark variant
        },
        primaryBg: {
          base: '#111111',
          darken1: '#161616', //dark variant
          lighten1: '#1D1D1D' //light variant
        },
        baseColor: {
          base: '#222222',
          darken1: '#2E2E2E', //medium base
          lighten1: '#EEEEEE' //light base
        },
        grey: {
          base: '#555555', //dark medium grey
          lighten1: '#888888' //light medium grey
        },
        border: {
          base: '#323232',
          lighten1: '#444444'
        },
        red: '#C8323C',
        blue: '#005993'
      },
      dark: {
        primary: {
          base: '#009bdd', //agency2u brand colour
          darken1: '#005993', //dark variant
          lighten1: '#F0F5EE' //light variant
        },
        secondary: {
          base: '#BBBBBB',
          darken1: '#777777' //dark variant
        },
        primaryBg: {
          base: '#111111',
          darken1: '#161616', //dark variant
          lighten1: '#1D1D1D' //light variant
        },
        baseColor: {
          base: '#222222',
          darken1: '#2E2E2E', //medium base
          lighten1: '#EEEEEE' //light base
        },
        grey: {
          base: '#555555', //dark medium grey
          lighten1: '#888888' //light medium grey
        },
        border: {
          base: '#323232',
          lighten1: '#444444'
        },
        red: '#C8323C',
        blue: '#005993'
      }
    }
  }
})
