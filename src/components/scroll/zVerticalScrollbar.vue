<template lang="html">
  <div ref="wrap" class="z-scrollbar-wrap_vertical"
    @click="moveTo">
    <div ref="scrollbar" class="scrollbar"
      :class="{'z-scrollbar-transition': !(moving || draggingFromParent)}"
      :style="{height: height + '%', top: top + '%'}"
      @mousedown="startDrag"></div>
      <!-- @touchstart="startDrag" -->
  </div>
</template>

<script>
import _ from '@/libs/util'
export default {
  name: 'zVerticalScrollbar',
  props: {
    client: {
      type: Object
    },
    scroll: {
      type: Object
    },
    scrolling: {
      type: Number,
      default: 0
    },
    draggingFromParent: {
      type: Boolean
    },
    onChangePosition: {
      type: Function
    }
  },
  data () {
    return {
      moving: false,
      start: 0,
      height: 0,
      offset: 10
    }
  },
  computed: {
    owner () {
      let parent = this.$parent
      while (parent && !parent.scrollId) {
        parent = parent.$parent
      }
      return parent
    },
    top () {
      let percent = this.scrolling
      if (this.height + this.scrolling > 100) {
        percent = 100 - this.height
      }
      return percent
    }
  },
  methods: {
    // 获得起点
    startDrag (e) {
      e.preventDefault()
      e.stopPropagation()

      e = e.changedTouches ? e.changedTouches[0] : e

      this.moving = true
      this.start = e.clientY
    },
    onDrag (e) {
      if (this.moving) {
        this.owner.moving = true

        e = e.changedTouches ? e.changedTouches[0] : e

        let offsetY = e.clientY - this.start
        let percent = offsetY / this.client.height * 100

        this.start = e.clientY

        let next = this.scrolling + percent
        this.onChangePosition(next, 'vertical')
      }
    },
    stopDrag (e) {
      e.preventDefault()
      e.stopPropagation()

      if (this.moving) {
        this.owner.moving = false
        this.moving = false
      }
    },
    moveTo (e) {
      e.preventDefault()
      e.stopPropagation()

      let fromWrap = e.target === this.$refs.wrap
      if (fromWrap) {
        // 获取元素相对浏览器视窗的位置
        let position = this.$refs.scrollbar.getBoundingClientRect()
        // Calculate the vertical Movement
        let yMovement = e.clientY - position.top
        let centerize = (this.height / 2)
        let yMovementPercentage = yMovement / this.client.height * 100 - centerize
        // Update the last e.clientY
        this.start = e.clientY
        // The next Vertical Value will be
        let next = this.scrolling + yMovementPercentage
        // Tell the parent to change the position
        this.onChangePosition(next, 'vertical')
      }
    },
    computedHeight () {
      let percent = this.client.height / this.scroll.height * 100
      this.height = percent < 100 ? percent : 0
    },
    // element-ui存在bug，暂时不支持拖拽
    bindEvent (action = 'addEvent') {
      // let $el = this.$refs.scrollbar
      _[action](document, 'mousemove', this.onDrag)
      _[action](document, 'mouseup', this.stopDrag)
      // _[action]($el, 'touchmove', this.onDrag)
      // _[action]($el, 'touchend', this.stopDrag)
    }
  },
  mounted () {
    this.computedHeight()
    this.bindEvent()
  },
  watch: {
    'client.height' (val, old) {
      if (val !== old) {
        this.computedHeight()
      }
    },
    'scroll.height' (val, old) {
      if (val !== old) {
        this.computedHeight()
      }
    }
  },
  beforeDestroy () {
    this.bindEvent('removeEvent')
  }
}
</script>

<style lang="less">
.z-scrollbar-wrap_vertical {
  width: 10px;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  right: 1px;
  z-index: 100;

  .scrollbar {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    display: block;
    position: relative;
    opacity: 0;
  }
}
</style>
