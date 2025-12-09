<template>
  <v-card elevation="8" class="app-card mx-4 my-3 px-4 elevation-3" :color="cardColor" :to="namedPath">
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  name: 'AppSectionCard',
  components: {},
  props: {
    cardColor: {
      type: String,
      required: false,
      default: 'white'
    },
    namedPath: {
      type: Object,
      required: false
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

<style lang="scss" scoped>
.app-card {
  &.full-height {
    height: 100%;
  }
}

.app-card-div {
  padding: 30px;
}
</style>
