<template>
  <v-app class="background-wave">
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script>
import { SHARED } from '@/constants'

export default {
  name: 'App',
  components: {},
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {
    layout() {
      //return this.$const.SHARED.DEFAULT_LAYOUT
      return this.$route.meta.layout || SHARED.PUBLIC_LAYOUT
    }
  },
  watch: {},
  methods: {},
  beforeDestroy() {}
}
</script>

<style>
#app {
  font-family: 'Assistant', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #555555; */
}
</style>
