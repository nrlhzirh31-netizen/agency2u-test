<template>
  <v-overlay opacity="0.3" z-index="300" :value="loadingIndex > 0">
    <v-progress-circular :size="75" color="primary" indeterminate></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  name: 'AppLoading',
  components: {},
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {
    loadingIndex() {
      return this.$store.state.shared.loadingIndex
    }
  },
  watch: {},
  methods: {},
  beforeDestroy() {}
}
</script>

<style scoped></style>
