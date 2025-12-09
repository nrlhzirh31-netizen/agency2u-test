<template>
  <div class="input-field-container" :style="style">
    <p v-if="label" class="text-caption text-left input-label">{{ label }}</p>

    <v-text-field
      v-if="items && items.length <= 0 && type != 'remark'"
      :prefix="prefix"
      :rules="isOptional ? (value.length > 0 ? rules : []) : rules"
      :value="value"
      :readonly="nonEditable"
      :disabled="nonEditable"
      :placeholder="placeholder"
      :maxlength="maxLength"
      @input="update"
      class="input-field text-caption"
      outlined
      dense
      validate-on-blur
      background-color="red"
      full-width
      hide-details="auto"
    >
      <template v-slot:append>
        <slot name="input-field-append"></slot>
      </template>
    </v-text-field>

    <v-textarea
      v-if="type == 'remark'"
      :rules="isOptional ? (value && value.length > 0 ? rules : []) : rules"
      :value="value"
      class="input-field text-caption"
      :class="{ 'has-counter': showCounter }"
      :readonly="nonEditable"
      :disabled="nonEditable"
      @input="update"
      @keydown="keydown"
      outlined
      dense
      validate-on-blur
      hide-details="auto"
      :rows="rows"
      :maxlength="maxLength"
      :counter="showCounter ? maxLength : false"
    ></v-textarea>

    <v-select
      v-if="items && items.length > 0 && type == ''"
      :rules="isOptional ? (value.length > 0 ? rules : []) : rules"
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      :value="value"
      :placeholder="placeholder"
      :readonly="nonEditable"
      :disabled="nonEditable"
      :multiple="multipleSelect"
      @input="update"
      @change="change"
      class="input-field text-caption"
      :menu-props="{ contentClass: 'with-disabled-styles' }"
      append-icon="mdi-chevron-down"
      height="35px"
      hide-details="auto"
      outlined
      dense
      validate-on-blur
    >
      <template v-slot:selection="{ item, index }">
        <span v-if="index > 0 && index < multipleSelectMaxDisplay" class="right-space">,</span>
        <span v-if="index < multipleSelectMaxDisplay">{{ item.text }}</span>
        <span v-if="index === multipleSelectMaxDisplay" class="left-space grey--text caption">(+{{ value.length - multipleSelectMaxDisplay }} {{ multipleSelectOverflowText }})</span>
      </template>
    </v-select>
    <v-autocomplete
      v-if="items && items.length > 0 && type == 'filterable'"
      :rules="isOptional ? (value.length > 0 ? rules : []) : rules"
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      :value="value"
      :placeholder="placeholder"
      :readonly="nonEditable"
      :disabled="nonEditable"
      :multiple="multipleSelect"
      :filter="filter"
      @input="update"
      @change="change"
      class="input-field text-caption"
      append-icon="mdi-chevron-down"
      height="35px"
      hide-details="auto"
      outlined
      dense
      validate-on-blur
    >
      <template v-if="multipleSelect" v-slot:selection="{ item, index }">
        <span v-if="index > 0 && index < multipleSelectMaxDisplay" class="right-space">,</span>
        <span v-if="index < multipleSelectMaxDisplay">{{ item.text }}</span>
        <span v-if="index === multipleSelectMaxDisplay" class="left-space grey--text caption">(+{{ value.length - multipleSelectMaxDisplay }} {{ multipleSelectOverflowText }})</span>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'AppSearchFormField',
  components: {},
  props: {
    placeholder: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false,
      default: null
    },
    prefix: {
      type: String,
      required: false
    },
    items: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
    },
    value: {
      required: true
    },
    rules: {
      type: Array,
      required: false,
      default: () => []
    },
    change: {
      type: Function,
      required: false,
      default: function () {}
    },
    isOptional: {
      type: Boolean,
      required: false,
      default: false
    },
    itemText: {
      type: String,
      required: false,
      default: 'text'
    },
    itemValue: {
      type: String,
      required: false,
      default: 'value'
    },
    nonEditable: {
      type: Boolean,
      required: false,
      default: false
    },
    multipleSelect: {
      type: Boolean,
      required: false,
      default: false
    },
    fieldWidth: {
      type: String,
      required: false
    },
    multipleSelectOverflowText: {
      type: String,
      required: false,
      default: 'Other'
    },
    multipleSelectMaxDisplay: {
      type: Number,
      required: false,
      default: 1
    },
    maxLength: {
      type: Number,
      required: false
    },
    keydown: {
      type: Function,
      required: false,
      default: function () {}
    },
    rows: {
      type: Number,
      required: false,
      default: 1
    },
    filter: {
      type: Function,
      required: false,
      default: (item, queryText, itemText) => itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1
    },
    showCounter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {
    style() {
      return 'width: ' + this.fieldWidth
    }
  },
  watch: {},
  methods: {
    update(newValue) {
      this.$emit('input', newValue)
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="scss">
.input-label {
  color: var(--v-grey-lighten1);
}
.input-field > .v-input__control > .v-input__slot {
  background-color: var(--v-primary-lighten1) !important;
}

.input-field {
  .v-input__control {
    .v-input__slot {
      fieldset {
        border-width: 0px !important;
      }
    }
  }
}

.search-form-field-set {
  button {
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }
  .input-field-container {
    display: inline-block;
    border-radius: 0;
    &:first-child {
      border-top-left-radius: 25px;
      border-bottom-left-radius: 25px;
    }
    .input-field {
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;

      input {
        text-align: center !important;
      }
    }
  }
}

.left-space {
  margin-left: 3px;
}

.right-space {
  margin-right: 4px;
}

/* disabled option styles */
.with-disabled-styles .v-list-item.v-list-item--disabled {
  color: var(--v-grey-lighten1) !important;

  .v-simple-checkbox .v-icon {
    color: var(--v-grey-lighten1) !important;
  }
}

/* style counter to be same as editor counter (right against the right edge without any padding) */
.has-counter {
  .v-text-field__details {
    padding-inline: 0 !important;
  }
}
</style>
