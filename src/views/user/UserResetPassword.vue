<template>
  <div>
    <v-form ref="updateForm">
      <app-section-card>
        <v-row class="pa-4" no-gutters>
          <v-col cols="auto" class="text-left">
            <app-section-title :title="$t('label.resetPassword')" class="font-weight-bold text-uppercase d-inline"></app-section-title>
          </v-col>

          <v-col cols="12">
            <v-divider class="my-3"></v-divider>
          </v-col>

          <v-col cols="12" sm="6" md="4" class="pb-3">
            <div class="pr-15">
              <v-text-field
                class="v-input input-field text-caption v-input--hide-details v-input--dense theme--light v-text-field v-text-field--full-width v-text-field--single-line v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-text-field--placeholder"
                v-model.trim="data.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                placeholder="Password"
              ></v-text-field>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="4" class="pb-3">
            <div class="pr-15">
              <v-text-field
                class="v-input input-field text-caption v-input--hide-details v-input--dense theme--light v-text-field v-text-field--full-width v-text-field--single-line v-text-field--is-booted v-text-field--enclosed v-text-field--outlined v-text-field--placeholder"
                v-model.trim="data.passwordConfirm"
                :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPasswordConfirm ? 'text' : 'password'"
                @click:append="showPasswordConfirm = !showPasswordConfirm"
                placeholder="confirm Password"
              ></v-text-field>
            </div>
          </v-col>

          <v-col cols="12" class="text-right">
            <app-button :text="$t('button.update')" :action="updateUserPassword" color="primary"></app-button>
          </v-col>
        </v-row>
      </app-section-card>
    </v-form>
  </div>
</template>

<script>
import { USER_UPDATE_PASSWORD } from '@/store/user.module'
import { SESSION } from '@/constants'

export default {
  name: 'UserResetPassword',
  components: {},
  props: {},
  data() {
    return {
      showPassword: false,
      showPasswordConfirm: false,
      data: {
        password: '',
        passwordConfirm: ''
      }
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    updateUserPassword() {
      let id = localStorage.getItem(SESSION.USERID)

      if (this.$refs.updateForm.validate()) {
        let updatePasswordObj = {
          password: this.data.password,
          passwordConfirm: this.data.passwordConfirm,
          id: id
        }

        this.$store.dispatch(`${USER_UPDATE_PASSWORD}`, { updatePasswordObj })
      }
    }
  },
  beforeDestroy() {}
}
</script>

<style scoped></style>
