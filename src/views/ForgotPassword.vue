<template>
  <section class="login-card elevation-10 d-flex mx-auto rounded-xxl">
    <div class="login-container-right d-flex flex-column mx-auto">
      <app-breadcrumb-button class="py-5 pr-4" :breadcrumbs="breadcrumbs"></app-breadcrumb-button>
      <!-- Forgot Password Form -->
      <v-form ref="forgotpasswordForm" class="login-form ma-auto text-start" @submit.prevent="submitForgotPassword">
        <v-row no-gutters>
          <v-col cols="12">
            <v-row no-gutters class="pt-6 px-0" align="center" justify="space-around">
              <v-col cols="12">
                <p class="text-caption secondary--text font-weight-light">{{ $t(`label.enterEmailToReceiveResetPasswordEmail`) }}</p>
              </v-col>
              <v-col sm="12" cols="12" class="pb-0">
                <v-row no-gutters>
                  <v-col cols="12" class="pb-4">
                    <app-login-form-field v-model.trim="forgotPasswordObj.username" :placeholder="$t(`label.email`)" :rules="$validators.emailRules()" solo autocomplete="off" />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-row no-gutters align="center" justify="center">
              <v-col cols="12" class="py-0 text-center pb-sm-6">
                <app-button class="primary mt-5 w-100 font-weight-bold" type="submit" :text="$t('label.forgotPassword')"></app-button>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </section>
</template>

<script>
import { USER_FORGOT_PASSWORD } from '@/store/user.module'
import { localizationHelper } from '@/utils'
import { ROUTE_NAME } from '@/constants'

export default {
  name: 'ForgotPasswordView',
  components: {},
  props: {},
  data() {
    return {
      forgotPasswordObj: {
        username: ''
      },
      breadcrumbs: [
        {
          text: localizationHelper.getMessage('button.back'),
          disabled: false,
          to: {
            name: ROUTE_NAME.LOGIN
          },
          exact: true
        }
      ]
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    submitForgotPassword() {
      if (this.$refs.forgotpasswordForm.validate()) {
        const forgotPasswordObj = this.forgotPasswordObj
        this.$store.dispatch(`${USER_FORGOT_PASSWORD}`, { forgotPasswordObj })
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped>
.rounded-xxl {
  border-radius: 10px;
}

.login-card {
  width: max(60vw, 350px);
  max-width: 1200px;
  background-color: white;
}

.login-form {
  max-width: max(50%, 300px);
}

.login-container-right {
  min-height: max(450px, 36vh);
}
</style>
