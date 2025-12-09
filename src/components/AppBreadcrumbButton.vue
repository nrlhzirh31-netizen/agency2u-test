<template>
  <div class="text-left pl-4">
    <div class="d-inline-block" v-for="breadcrumb in breadcrumbs" :key="breadcrumb.name">
      <v-icon size="20" class="px-0" color="#417c91">{{ divider }}</v-icon>
      <v-btn :to="breadcrumb.to" color="#417c91" class="px-0 text-capitalize" height="auto" :ripple="false" text link plain>{{ breadcrumb.text }}</v-btn>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAME } from '@/constants'
import { localizationHelper } from '@/utils'

export default {
  name: 'AppBreadcrumbButton',
  components: {},
  props: {
    breadcrumbs: {
      type: Array,
      required: true,
      default: function () {
        return [
          {
            text: localizationHelper.getMessage('label.back'),
            to: {
              name: ROUTE_NAME.HOME
            }
          }
        ]
      }
    },
    divider: {
      type: String,
      required: false,
      default: 'mdi-chevron-left'
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {},
  beforeDestroy() {}
}
</script>

<style scoped></style>
