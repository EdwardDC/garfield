<template lang="html">
  <transition name="el-zoom-in-top">
    <div
      class="autocomplete-droplist"
      v-show="visible">
      123456
    </div>
  </transition>
</template>

<script>
export default {
  name: 'zAutocompleteDroplist',
  props: {
    value: Boolean,
    placement: {
      type: String,
      default: 'bottom'
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      popperElm: null,
      referenceElm: null,
      visible: false,
      dropdownWidth: '',
      ready: false
    }
  },
  methods: {
    createPopper () {
      // this.referenceElm
      // this.popperEl
      this.ready = true
    },
    update () {},
    updatePopper () {
      // 创建Popper
      this.ready ? this.update() : this.createPopper()
    },
    destroyPopper () {
      this.resetTransformOrigin()
    },
    resetTransformOrigin () {
      // let placementMap = {
      //   top: 'bottom',
      //   bottom: 'top',
      //   left: 'right',
      //   right: 'left'
      // }
      // let placement = this.popperJS._popper.getAttribute('x-placement').split('-')[0]
      // let origin = placementMap[placement]
      // this.$el._popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? `center ${ origin }` : `${ origin } center`
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value) {
        this.visible = value
      }
    },
    visible (value) {
      value ? this.updatePopper() : this.destroyPopper()
      this.$emit('input', value)
    }
  },
  created () {
    this.$on('visible', (value, target) => {
      this.dropdownWidth = target.offsetWidth
      this.visible = value
    })
  },
  mounted () {
    this.popperEle = this.$el
    this.referenceEle = this.$parent.reference || this.$parent.input
  },
  beforeDestroy () {
    // 移除元素
    // 解除绑定
  }
}
</script>

<style lang="less">
.el-zoom-in-center-enter-active,
.el-zoom-in-center-leave-active{
  transition: all .3s cubic-bezier(.55,0,.1,1)
}

.el-zoom-in-center-enter,
.el-zoom-in-center-leave-active{
  opacity: 0;
  transform: scaleX(0)
}

.el-zoom-in-top-enter-active,
.el-zoom-in-top-leave-active{
  opacity: 1;
  transform: scaleY(1);
  transition: transform .3s cubic-bezier(.23, 1, .32, 1) .1s, opacity .3s cubic-bezier(.23, 1, .32, 1) .1s;
  transform-origin: center top
}

.el-zoom-in-top-enter,
.el-zoom-in-top-leave-active{
  opacity: 0;
  transform: scaleY(0)
}

.el-zoom-in-bottom-enter-active,
.el-zoom-in-bottom-leave-active{
  opacity: 1;
  transform: scaleY(1);
  transition: transform .3s cubic-bezier(.23, 1, .32, 1) .1s, opacity .3s cubic-bezier(.23, 1, .32, 1) .1s;
  transform-origin: center bottom
}

.el-zoom-in-bottom-enter,
.el-zoom-in-bottom-leave-active{
  opacity: 0;
  transform: scaleY(0)
}
</style>
