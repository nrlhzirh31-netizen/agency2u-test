<template>
  <v-dialog persistent scrollable :value="isShowDialog" :max-width="maxWidth" style="z-index: 9999">
    <v-card class="dialog-card">
      <v-row no-gutters class="dialog-header" v-if="closeAction != null || title != ''">
        <label class="title pa-3 ma-0 text-center secondary--text text-capitalize font-weight-bold d-block full-width">{{ title }}</label>
        <v-icon class="dialog-close-icon secondary--text" @click="closeAction">mdi-close</v-icon>
      </v-row>
      <!-- v-if is to allow component to reinitialize it Life cycle -->
      <v-row v-if="isShowDialog" class="d-block dialog-row" :class="customClass" no-gutters>
        <slot></slot>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AppDialog',
  components: {},
  props: {
    closeAction: {
      required: false,
      default: null
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    maxWidth: {
      type: Number,
      required: false,
      default: 350
    },
    isShowDialog: {
      type: Boolean,
      required: true,
      default: false
    },
    customClass: {
      type: String,
      required: false,
      default: 'pa-3'
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

<style>
.v-dialog {
  overflow: hidden;
}
.v-dialog:not(.v-dialog--fullscreen) {
  max-height: 100%;
}
</style>

<style lang="scss" scoped>
.dialog-card {
  border-radius: 10px !important;
}
.dialog-header {
  position: relative;
}
.dialog-close-icon {
  position: absolute;
  top: 50%;
  right: 0;
  padding-right: 10px;
  font-size: 30px !important;
  cursor: pointer;
  font-size: 40px;
  transform: translateY(-50%);
}
</style>
