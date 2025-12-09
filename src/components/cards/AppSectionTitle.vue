<template>
  <div>
    <v-card-title class="text-h5 pa-0 black--text font-weight-bold">{{ title }}</v-card-title>
  </div>
</template>

<script>
export default {
  name: 'AppSectionTitle',
  components: {},
  props: {
    title: {
      type: String,
      required: true
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

<style scoped>
.text-h5 {
  color: #005993 !important;
}
</style>
