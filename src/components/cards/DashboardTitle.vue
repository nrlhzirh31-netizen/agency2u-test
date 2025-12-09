<template>
  <div>
    <v-card-title class="pa-0 black--text">{{ title }}</v-card-title>
  </div>
</template>

<script>
export default {
  name: 'DashboardTitle',
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
  color: #fff !important;
}
</style>
