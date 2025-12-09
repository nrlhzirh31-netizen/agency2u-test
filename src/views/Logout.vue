<template>
  <section></section>
</template>

<script>
import { AUTH_LOGOUT } from '@/store/auth.module'
import { sharedHelper } from '@/utils'

export default {
  name: 'LogoutView',
  components: {},
  props: {},
  data() {
    return {}
  },
  created() {
    this.logout()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    logout() {
      if (sharedHelper.hasAuthToken()) {
        this.$store.dispatch(`${AUTH_LOGOUT}`)
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped></style>
