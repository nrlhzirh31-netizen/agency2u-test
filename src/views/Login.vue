<template>
  <section class="login-card elevation-10 d-flex mx-auto rounded-xxl">
    <div class="login-container-right w-50 d-flex flex-column mx-auto py-10">
      <!-- Login Form -->
      <v-form ref="loginForm" class="login-form w-100 ma-auto text-start" @submit.prevent="submitLogin()">
        <v-row no-gutters>
          <v-col cols="12">
            <v-row no-gutters class="pt-6 px-0" align="center" justify="space-around">
              <v-col sm="12" cols="12" class="pb-0">
                <v-row no-gutters>
                  <v-col cols="12" class="pb-15">
                    <img class="d-block mx-auto" src="/static/logo/agency2u_blue_logo.png" />
                  </v-col>
                </v-row>
              </v-col>
              <v-col sm="12" cols="12" class="pb-0">
                <v-row no-gutters>
                  <v-col cols="12" class="pb-4">
                    <app-login-form-field v-model.trim="loginObj.email" :placeholder="$t(`label.email`)" :rules="$validators.emailRules()" solo autocomplete="off" />
                  </v-col>
                  <v-col cols="12" class="pb-4">
                    <v-text-field
                      class="v-input input-field text-caption v-input--hide-details v-input--dense theme--light v-text-field v-text-field--full-width v-text-field--single-line v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-text-field--placeholder"
                      v-model.trim="loginObj.password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
                      placeholder="Password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="auto" class="pt-0">
                    <v-btn plain min-width="auto" text :ripple="false" class="px-0 text-caption text-decoration-underline text-capitalize" @click="toForgotPasswordPage()">
                      {{ $t(`label.forgotPassword`) }}?
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-row no-gutters align="center" justify="center">
              <v-col cols="12" class="py-0 text-center pb-sm-6">
                <app-button class="primary mt-5 w-100 font-weight-bold" type="submit" :text="$t('button.login')"></app-button>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </section>
</template>

<script>
import { AUTH_LOGIN_TOKEN, AUTH_RESET_LOGIN_STORE } from '@/store/auth.module'
import { localizationHelper } from '@/utils'
import { ROUTE_NAME } from '@/constants'

export default {
  name: 'LoginView',
  components: {},
  props: {},
  data() {
    return {
      loginObj: {
        email: '',
        password: ''
      },
      showPassword: false
    }
  },
  created() {},
  mounted() {},
  computed: {
    loginResult() {
      return this.$store.state.auth.loginResult
    }
  },
  watch: {
    loginResult() {
      if (this.loginResult.complete) {
        if (this.loginResult.success) {
          this.loginCompletedDialog(this.loginResult)
        }
      }
    }
  },
  methods: {
    submitLogin() {
      if (this.$refs.loginForm.validate()) {
        const loginObj = this.loginObj
        this.$store.dispatch(`${AUTH_LOGIN_TOKEN}`, { loginObj })
      }
    },
    loginCompletedDialog(result) {
      if (!result) {
        let dialog = {
          title: localizationHelper.getMessage(`label.login`),
          messages: [localizationHelper.getMessage(`message.loginFailed`)],
          buttons: [{ title: localizationHelper.getMessage(`button.ok`), color: 'primary', class: 'white--text', action: this.loginCompleted }],
          closeAction: this.loginCompleted
        }
        this.$root.$master.openMessageDialog(dialog)
        this.clearLoginForm()
      }

      this.$store.dispatch(`${AUTH_RESET_LOGIN_STORE}`)
    },
    loginCompleted() {
      this.$root.$master.closeMessageDialog()
    },
    clearLoginForm() {
      this.loginObj = {
        email: '',
        password: ''
      }
    },
    toForgotPasswordPage() {
      this.$router.push({
        name: ROUTE_NAME.FORGOT_PASSWORD
      })
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
  min-height: max(450px, 50vh);
}
</style>
