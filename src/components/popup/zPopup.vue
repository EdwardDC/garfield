<template lang="html">
  <transition :name="transition" @after-enter="show()" @after-leave="hide()">
    <div class="z-popup" ref="popup" v-show="open" :class="popupCss" :style="{'z-index': zIndex}">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import Popup from '../internal/popup'
import _ from '@/libs/util'
export default {
  name: 'zPopup',
  mixins: [Popup],
  props: {
    popupClass: {
      type: [String, Object, Array]
    },
    popupTransition: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      transition: this.popupTransition
    }
  },
  computed: {
    popupCss () {
      const {position, popupClass} = this
      let classNames = []
      if (position) classNames.push('z-popup-' + position)
      return classNames.concat(_.convertClass(popupClass))
    }
  },
  methods: {
    show () {
      this.$emit('show')
    },
    hide () {
      this.$emit('hide')
    }
  },
  watch: {
    popupTransition (val, oldVal) {
      if (val === oldVal) return
      this.transition = val
    }
  },
  created () {
    if (!this.popupTransition) {
      this.transition = `popup-slide-${this.position}`
    }
  }
}
</script>

<style lang="less">
@import '../../assets/css/import.less';
.z-popup {
  position: fixed;
  background-color: @dialogBackgroundColor;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  backface-visibility: hidden;
}

.z-popup-top {
  top: 0;
  right: auto;
  bottom: auto;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}

.z-popup-right {
  top: 50%;
  right: 0;
  bottom: auto;
  left: auto;
  transform: translate3d(0, -50%, 0);
}

.z-popup-bottom {
  top: auto;
  right: auto;
  bottom: 0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}

.z-popup-left {
  top: 50%;
  right: auto;
  bottom: auto;
  left: 0;
  transform: translate3d(0, -50%, 0);
}

.popup-slide-top-enter-active,
.popup-slide-top-leave-active,
.popup-slide-right-enter-active,
.popup-slide-right-leave-active,
.popup-slide-bottom-enter-active,
.popup-slide-bottom-leave-active,
.popup-slide-left-enter-active,
.popup-slide-left-leave-active {
  transition: transform .3s ease;
}

.popup-slide-top-enter,
.popup-slide-top-leave-active {
  transform: translate3d(-50%, -100%, 0);
}

.popup-slide-right-enter,
.popup-slide-right-leave-active {
  transform: translate3d(100%, -50%, 0);
}

.popup-slide-bottom-enter,
.popup-slide-bottom-leave-active {
  transform: translate3d(-50%, 100%, 0);
}

.popup-slide-left-enter,
.popup-slide-left-leave-active {
  transform: translate3d(-100%, -50%, 0);
}

.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity .3s;
}

.popup-fade-enter,
.popup-fade-leave-active {
  opacity: 0;
}
</style>
