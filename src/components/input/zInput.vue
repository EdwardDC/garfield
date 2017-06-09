<template lang="html">
  <div
    :class="[
      type === 'textarea' ? 'z-textarea-1' : 'z-input-1',
      {
        'disabled': disabled,
        'z-input-group': $slots.prepend || $slots.append
      }
    ]">
    <template v-if="type !== 'textarea'">
      <div class="z-input-group-addon" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        class="z-form-control"
        :type="type"
        :name="name"
        :value="inputValue"
        :readonly="readonly"
        :placeholder="placeholder"
        @input="inputHandle">
      <div class="z-input-group-addon" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
      <span v-if="valid"></span>
    </template>
    <textarea
      v-else
      :name="name"></textarea>
  </div>
</template>

<script>
export default {
  name: 'zInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    resize: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    name: String,
    placeholder: String
  },
  data () {
    return {
      inputValue: ''
    }
  },
  computed: {
    valid () {
      return this.$parent.valid === false
    }
  },
  methods: {
    inputHandle (e) {
      let value = e.target.value
      this.setInputValue(value)
      this.$emit('change', value)
    },
    setInputValue (value) {
      if (value === this.inputValue) { return }
      this.inputValue = value
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.setInputValue(val)
      }
    }
  },
  mounted () {}
}
</script>

<style lang="less">
fieldset {
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
}

legend {
  display: block;
  width: 100%;
  padding: 0;
  margin-bottom: 20px;
  font-size: 21px;
  line-height: inherit;
  color: #333;
  border: 0;
  border-bottom: 1px solid #e5e5e5;
}

label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="search"] {
  box-sizing: border-box;
}

input[type="radio"],
input[type="checkbox"] {
  margin: 4px 0 0;
  margin-top: 1px \9;
  line-height: normal;
}

input[type="file"] {
  display: block;
}

input[type="range"] {
  display: block;
  width: 100%;
}

select[multiple],
select[size] {
  height: auto;
}

input[type="file"]:focus,
input[type="radio"]:focus,
input[type="checkbox"]:focus {
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}

output {
  display: block;
  padding-top: 7px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
}

.z-form-control {
  color: #555;
  font-size: 14px;
  line-height: 1.42857143;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  padding: 6px 12px;
  width: 100%;
  height: 34px;
  display: block;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;

  &:focus {
    border-color: #66afe9;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
  }
}

.z-form-control::-moz-placeholder {
  color: #999;
  opacity: 1;
}

.z-form-control:-ms-input-placeholder {
  color: #999;
}

.z-form-control::-webkit-input-placeholder {
  color: #999;
}

.z-form-control::-ms-expand {
  background-color: transparent;
  border: 0;
}


.z-form-control[disabled],
.z-form-control[readonly],
fieldset[disabled] .z-form-control {
  background-color: #eee;
  opacity: 1;
}

.z-form-control[disabled],
fieldset[disabled] .z-form-control {
  cursor: not-allowed;
}

textarea.z-form-control {
  height: auto;
}

input[type="search"] {
  -webkit-appearance: none;
}

.z-input-group {
  display: table;
  position: relative;
  border-collapse: separate;
}

.z-input-group-addon,
.z-input-group-btn,
.z-input-group .z-form-control {
  display: table-cell;
}

.z-input-group-addon:not(:first-child):not(:last-child),
.z-input-group-btn:not(:first-child):not(:last-child),
.z-input-group .z-form-control:not(:first-child):not(:last-child) {
  border-radius: 0;
}

.z-input-group-addon,
.z-input-group-btn {
  width: 1%;
  white-space: nowrap;
  vertical-align: middle;
}

.z-input-group-addon {
  padding: 6px 12px;
  font-size: 14px;
  font-weight: normal;
  line-height: 1;
  color: #555;
  text-align: center;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.z-input-group .z-form-control:first-child,
.z-input-group-addon:first-child {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.z-input-group-addon:first-child {
  border-right: 0;
}

.z-input-group .z-form-control:last-child,
.z-input-group-addon:last-child {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.z-input-group-addon:last-child {
  border-left: 0;
}
</style>
