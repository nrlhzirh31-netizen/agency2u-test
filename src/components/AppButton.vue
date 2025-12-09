<template>
  <v-btn v-bind="$attrs" v-on="$listeners" @click="action" :color="color" depressed :min-width="minWidth" :min-height="minHeight" :max-height="maxHeight" :outlined="outlined">
    <v-icon left v-if="icon">{{ icon }}</v-icon>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: 'AppButton',
  components: {},
  props: {
    text: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false,
      default: null
    },
    color: {
      type: String,
      required: false,
      default: 'primary'
    },
    action: {
      type: Function,
      required: false,
      default: () => {}
    },
    minWidth: {
      type: String,
      required: false,
      default: '80px'
    },
    minHeight: {
      type: String,
      required: false,
      default: '35px'
    },
    maxHeight: {
      type: String,
      required: false,
      default: '35px'
    },
    outlined: {
      type: Boolean,
      required: false,
      default: false
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
