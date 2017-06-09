<template lang="html">
  <div class="search-input">
    <div class="z-input" :class="{'is-disabled': disabled}">
      <z-icon v-if="icon" :class="iconClass" :value="icon" @click="iconClick"></z-icon>
      <input type="text" name="search" class="z-input_inner"
        v-model="inputValue" autocomplete="off" :disabled="disabled" @keyup.enter="debounceHandle">
    </div>
  </div>
</template>

<script>
import _ from '@/libs/util'
import zIcon from '../icon'
export default {
  name: 'zSearch',
  components: {
    zIcon
  },
  props: {
    icon: {
      type: String,
      default: ':icon-magnifier'
    },
    iconClass: {
      type: [String, Array, Object],
      default: 'search-icon'
    },
    debounce: {
      type: Number,
      default: 500
    },
    value: {},
    disabled: {
      type: Boolean,
      default: false
    },
    auto: {
      type: Boolean,
      default: false
    },
    url: {
      type: String
    }
  },
  data () {
    return {
      searchUrl: this.url,
      inputValue: this.value
    }
  },
  methods: {
    iconClick (e) {
      this.debounceHandle()
    },
    fetch () {
      var val = this.inputValue || ''
      if (val) {
        var url = val ? (this.url + '?text=' + val) : this.url
        this.$http.get(url).then(resp => {
          // console.log(resp)
        })
      }
    }
  },
  mounted () {
    if (_.type(this.url) !== 'string') throw new Error('z-search needs configuration: "url"=>String')
    if (this.debounce) {
      this.debounceHandle = _.debounce(() => {
        this.fetch()
      }, this.debounce, false)
    }
    if (this.inputValue) {
      this.fetch()
    }
  },
  watch: {}
}
</script>

<style lang="less">
@import '../../assets/css/import.less';

.search-input {
  // .z-input {
  //   float: right;
  // }

  .search-icon {
    font-size: 16px;
    position: absolute;
    top: 6px;
    left: 14px;
  }

  .z-input_inner {
    color: #fff;
    background: #2E2E2E;
    border-color: #2E2E2E;
    border-radius: 100px;
    padding-left: 35px;
    height: 30px;
  }
}

.z-input {
  font-size: 14px;
  position: relative;
  display: inline-block;
}

.z-input.is-disabled .z-input_inner {
  background-color: #eef1f6;
  border-color: #d1dbe5;
  color: #bbb;
  cursor: not-allowed;
}

.z-input.is-disabled .z-input_inner::placeholder {
  color: #bfcbd9;
}

.z-input.is-active .z-input_inner {
  outline: 0;
  border-color: #20a0ff
}

.z-input_inner {
  color: #1f2d3d;
  background-color: #fff;
  background-image: none;
  font-size: 14px;
  line-height: 1.42857142;
  border: 1px solid #bfcbd9;
  border-radius: 4px;
  padding: 3px 10px;
  width: 100%;
  height: 36px;
  display: block;
  box-sizing: border-box;
  outline: none;
  appearance: none;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);

  &:focus {
    outline: 0;
    border-color: #20a0ff;
  }
}
</style>
