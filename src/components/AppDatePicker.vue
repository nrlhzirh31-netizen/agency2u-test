<template>
  <v-menu v-model="dateMenu" :disabled="disabled" :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ on, attrs }">
      <div class="input-field-container">
        <p v-if="label" class="text-caption text-left input-label">{{ label }}</p>

        <v-text-field
          :value="`${formattedDateTime()}`"
          :rules="isOptional ? (selectedDateTime.length > 0 ? rules : []) : rules"
          readonly
          v-bind="attrs"
          v-on="on"
          v-on:append="on"
          @update="update"
          class="input-field text-caption"
          outlined
          dense
          validate-on-blur
          background-color="red"
          full-width
          hide-details="auto"
          :placeholder="placeholder"
          :clearable="clearable && !disabled"
          @click:clear="clearDateTime"
        >
          <template v-slot:append>
            <slot name="input-field-append"></slot>
          </template>
        </v-text-field>
      </div>
    </template>
    <div v-if="!dateTime">
      <div class="d-flex justify-center white">
        <v-date-picker
          @change="dateMenu = false"
          v-model.trim="dateSelected"
          :show-current="true"
          color="primary"
          header-color="primary"
          :min="minDateTime"
          :max="maxDateTime"
          show-adjacent-months
          no-title
        ></v-date-picker>
      </div>
    </div>

    <div v-else>
      <v-card>
        <v-card-text class="px-0 py-0">
          <v-tabs fixed-tabs v-model="activeTab">
            <v-tab key="calendar">
              <slot name="dateIcon">
                <v-icon>mdi-calendar</v-icon>
              </slot>
            </v-tab>
            <v-tab key="timer" :disabled="!dateSelected">
              <slot name="timeIcon">
                <v-icon>mdi-clock</v-icon>
              </slot>
            </v-tab>
            <v-tab-item key="calendar">
              <div class="d-flex justify-center white">
                <v-date-picker
                  v-model="dateSelected"
                  @input="showTimePicker"
                  :show-current="true"
                  color="primary"
                  header-color="primary"
                  :min="minDateTime"
                  :max="maxDateTime"
                  show-adjacent-months
                  no-title
                ></v-date-picker>
              </div>
            </v-tab-item>
            <v-tab-item key="timer">
              <v-time-picker
                ref="timer"
                class="v-time-picker-custom"
                v-model="timeSelected"
                :show-current="true"
                color="primary"
                header-color="primary"
                show-adjacent-months
                no-title
                full-width
                @change="close"
              ></v-time-picker>
            </v-tab-item>
          </v-tabs>
        </v-card-text>
      </v-card>
    </div>
  </v-menu>
</template>

<script>
import moment from 'moment'

export default {
  name: 'AppDatePicker',
  components: {},
  props: {
    label: {
      type: String,
      required: false,
      default: null
    },
    placeholder: {
      type: String,
      required: false
    },
    selectedDateTime: {
      type: String,
      required: false
    },
    dateTime: {
      type: Boolean,
      required: false,
      default: false
    },
    clearable: {
      type: Boolean,
      required: false,
      default: false
    },
    isOptional: {
      type: Boolean,
      required: false,
      default: false
    },
    rules: {
      type: Array,
      required: false,
      default: () => []
    },
    minDateTime: {
      type: String,
      required: false,
      default: ''
    },
    maxDateTime: {
      type: String,
      required: false,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      dateMenu: false,
      dateSelected: null,
      timeSelected: '00:00',
      activeTab: 0
    }
  },
  created() {
    if (this.selectedDateTime) {
      const momentDateTime = moment(this.selectedDateTime)
      this.dateSelected = momentDateTime.format('YYYY-MM-DD')
      // this.timeSelected = momentDateTime.format('HH:mm')
      this.timeSelected = '00:00'
    }
  },
  mounted() {},
  computed: {},
  watch: {
    selectedDateTime(newValue) {
      if (newValue) {
        const momentDateTime = moment(this.selectedDateTime)
        this.dateSelected = momentDateTime.format('YYYY-MM-DD')
        // this.timeSelected = momentDateTime.format('HH:mm')
        this.timeSelected = '00:00'
      } else {
        this.dateSelected = null
        this.timeSelected = '00:00'
      }
    }
  },
  methods: {
    update(newValue) {
      this.$emit('input', newValue)
    },
    showTimePicker() {
      this.activeTab = 1
    },
    resetPicker() {
      this.dateMenu = false
      this.activeTab = 0
      if (this.$refs.timer) {
        // Current bug - it will selecting minute instead of hour
        this.$refs.timer.selectingHour = true
      }
    },
    close() {
      this.resetPicker()
      this.$forceUpdate()
    },
    formattedDateTime() {
      if (!this.dateSelected) {
        return ''
      }

      const time = this.timeSelected
      const dateTimeString = this.dateSelected + ' ' + `${time.length === 5 ? `${time}:00` : time}`

      this.$emit('update:selectedDateTime', this.$filters.getDateTimeRawString(dateTimeString))

      return this.dateTime ? this.$filters.getDateTimeFormat(dateTimeString) : this.$filters.getDateFormat(this.dateSelected)
    },
    clearDateTime() {
      this.$emit('update:selectedDateTime', null)
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="scss" scoped></style>
