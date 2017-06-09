<template lang="html">
  <div ref="wrap" class="z-scrollbar-wrap_horizontal"
    @click="moveTo">
    <div ref="scrollbar" class="scrollbar"
      :class="{'z-scrollbar-transition': !(moving || draggingFromParent)}"
      :style="{width: width + '%', left: scrolling + '%'}"
      @mousedown="startDrag"></div>
      <!--
      @touchstart="startDrag"
      @mousedown="startDrag"
      -->
  </div>
</template>

<script>
import _ from '@/libs/util'
export default {
  name: 'zHorizantalScrollbar',
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
      startPos: 0,
      width: 0,
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
    }
  },
  methods: {
    // 获得起点
    startDrag (e) {
      e.preventDefault()
      e.stopPropagation()

      e = e.changedTouches ? e.changedTouches[0] : e

      this.moving = true
      this.startPos = e.clientX
    },
    onDrag (e) {
      if (this.moving) {
        e.preventDefault()
        e.stopPropagation()
        this.owner.moving = true

        e = e.changedTouches ? e.changedTouches[0] : e

        let offset = e.clientX - this.startPos
        let percent = offset / this.client.width * 100

        this.start = e.clientX

        let next = this.scrolling + percent

        this.onChangePosition(next, 'horizontal')
      }
    },
    stopDrag (e) {
      e.preventDefault()
      e.stopPropagation()

      if (this.moving) {
        this.owner.moving = true
        this.moving = false
      }
    },
    moveTo (e) {
      e.preventDefault()
      e.stopPropagation()

      let fromWrap = e.target === this.$refs.wrap
      if (fromWrap) {
        // Get the Element Position
        let position = this.$refs.scrollbar.getBoundingClientRect()
        // Calculate the vertical Movement
        let yMovement = e.clientX - position.left
        let centerize = (this.width / 2)
        let yMovementPercentage = yMovement / this.client.width * 100 - centerize
        // Update the last e.clientY
        this.start = e.clientX
        // The next Vertical Value will be
        let next = this.scrolling + yMovementPercentage
        // Tell the parent to change the position
        this.onChangePosition(next, 'horizontal')
      }
    },
    computedWidth () {
      let percent = this.client.width / this.scroll.width * 100
      this.width = percent < 100 ? percent : 0
    },
    // element-ui存在bug，暂时不支持拖拽
    bindEvent (action = 'addEvent') {
      // let $el = this.$refs.wrap
      _[action](document, 'mousemove', this.onDrag)
      _[action](document, 'mouseup', this.stopDrag)
      // _[action]($el, 'touchmove', this.onDrag)
      // _[action]($el, 'touchend', this.stopDrag)
    }
  },
  mounted () {
    this.computedWidth()
    this.bindEvent()
  },
  watch: {
    'client.width' (val, old) {
      this.computedWidth()
    },
    'scroll.width' (val, old) {
      this.computedWidth()
    }
  },
  beforeDestroy () {
    this.bindEvent('removeEvent')
  }
}
</script>

<style lang="less">
.z-scrollbar-wrap_horizontal {
  background-color: transparent;
  width: 100%;
  height: 10px;
  display: block;
  position: absolute;
  bottom: 1px;
  left: 0;
  z-index: 100;

  .scrollbar {
    background-color: rgba(0, 0, 0, 0.5);
    height: 10px;
    display: block;
    position: relative;
    opacity: 0;
  }
}
</style>
