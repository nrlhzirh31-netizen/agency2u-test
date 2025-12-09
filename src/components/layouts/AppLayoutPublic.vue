<template>
  <div class="h-100">
    <v-row class="fill-height" align-content="center">
      <!-- <img class="d-block mx-auto login-logo" src="/static/logo/agency2u_blue_icon.png" /> -->
      <!-- Sizes your content based upon application components -->
      <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <slot />
        </v-container>
      </v-main>
    </v-row>

    <!-- Message Dialog -->
    <app-dialog :isShowDialog="messageDialogDisplay">
      <app-message-dialog :messageTitle="messageDialog.messageTitle" :messages="messageDialog.messages" :buttons="messageDialog.buttons" :type="messageDialog.type"></app-message-dialog>
    </app-dialog>

    <!-- Loading -->
    <app-loading></app-loading>
  </div>
</template>

<script>
import AppLoading from '@/components/AppLoading.vue'

export default {
  name: 'AppLayoutPublic',
  components: {
    AppLoading
  },
  props: {},
  data() {
    return {}
  },
  created() {
    this.$root.$master = this
  },
  mounted() {},
  computed: {
    messageDialogDisplay() {
      return this.$store.state.shared.messageDialogDisplay
    },
    messageDialog() {
      return this.$store.state.shared.messageDialog
    }
  },
  watch: {},
  methods: {},
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
.login-logo {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  max-width: 250px;
}

.v-main {
  padding: 0px !important;
}
</style>
