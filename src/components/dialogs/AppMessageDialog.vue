<template>
  <v-container class="fill-height px-0 text-center">
    <v-row no-gutters>
      <v-col cols="12">
        <v-icon v-if="type == $const.DIALOG_TYPE.ERROR" class="dialog-icon red">mdi-close</v-icon>
        <v-icon v-else-if="type == $const.DIALOG_TYPE.SUCCESS" class="dialog-icon primary">mdi-check-bold</v-icon>
        <v-icon v-else-if="type == $const.DIALOG_TYPE.CONFIRMATION" class="dialog-icon red">mdi-delete</v-icon>
        <v-icon v-else class="dialog-icon primary">mdi-exclamation-thick</v-icon>
        <p class="font-weight-bold mx-auto d-block my-4">{{ messageTitle }}</p>
        <v-card-text class="px-4 py-1" v-for="(msg, i) in messages" :key="i" v-html="msg"></v-card-text>
        <div class="mt-8">
          <v-btn
            v-for="(btn, i) in buttons"
            :key="i"
            :class="btn.class"
            @click="btn.action"
            class="font-weight-bold mx-1 d-inline-block"
            :color="buttons.length == 1 || (buttons.length > 1 && i == '1') ? 'primary' : 'secondary'"
            min-width="120"
            depressed
          >
            {{ btn.title }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { DIALOG_TYPE } from '@/constants/enums'

export default {
  name: 'AppMessageDialog',
  props: {
    messageTitle: {
      type: String,
      required: false,
      default: ''
    },
    messages: {
      type: Array,
      required: false,
      default: () => []
    },
    buttons: {
      type: Array,
      required: false,
      default: () => []
    },
    type: {
      type: String,
      required: false,
      default: DIALOG_TYPE.SYSTEM
    }
  }
}
</script>
<style lang="scss">
.dialog-icon {
  font-size: 35px !important;
  border-radius: 50%;
  padding: 20px !important;
  color: white !important;
}
</style>
