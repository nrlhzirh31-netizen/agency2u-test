<template>
  <v-text-field v-model="textFieldModel" v-bind="$attrs" validate-on-blur>
    <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
    <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'AppTextField',
  components: {},
  props: {
    value: { type: String, default: '' }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {
    textFieldModel: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {},
  methods: {},
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
.v-input--is-focused ::v-deep .v-input__slot {
  border: 2px solid var(--v-primary-base);
}
</style>
