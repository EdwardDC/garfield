<template lang="html">
  <div
    class="autocomplete"
    :class="[
      customClass ? customClass : ''
    ]">
    <z-input
      :value="value"
      :placeholder="placeholder"
      @change="changeHandle">
      <i class="fa fa-search" slot="prepend"></i>
    </z-input>
    <z-autocomplete-droplist
      :class="[
        popperClass ? popperClass : ''
      ]"
      :data="result"></z-autocomplete-droplist>
  </div>
</template>

<script>
import zInput from '../input'
import zAutocompleteDroplist from './zAutocompleteDroplist'
export default {
  name: 'zAutocomplete',
  components: {
    zInput,
    zAutocompleteDroplist
  },
  props: {
    fetchHandle: Function,
    popperClass: String,
    customClass: String,
    value: {
      type: String,
      default: ''
    },
    name: String,
    placeholder: String
  },
  data () {
    return {
      visible: false,
      loading: false,
      result: []
    }
  },
  methods: {
    changeHandle (value) {
      if (!value) {
        this.result = []
        return
      }
      this.fetchData(value)
    },
    clickHandle () {
      this.visible = !this.visible
    },
    fetchData (query) {
      this.loading = true
      this.fetchHandle(query, (result = []) => {
        if (Array.isArray(result)) {
          this.result = result
        } else {
          // TODO
        }
      })
    }
  },
  mounted () {},
  watch: {}
}
</script>

<style lang="less">
</style>
