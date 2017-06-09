<template lang="html">
  <div ref="client" class="z-scroll"
    @mouseenter="toggleScrollBar"
    @mouseleave="toggleScrollBar">
    <!-- :class="{'z-scrollbar-transition': !moving}" -->
    <div ref="scroll" class="z-scroll-inner"
      :style="styleObject"
      @wheel="scroll"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd">
      <slot></slot>
    </div>
    <z-vertical-scrollbar ref="vBar"
      v-if="vBar && ready"
      :client="{height: clientHeight}"
      :scroll="{height: scrollHeight}"
      :scrolling="offsetY"
      :dragging-from-parent="moving"
      :on-change-position="handleChangePosition"></z-vertical-scrollbar>
    <z-horizontal-scrollbar ref="hBar"
      v-if="hBar && ready"
      :client="{width: clientWidth}"
      :scroll="{width: scrollWidth}"
      :scrolling="offsetX"
      :dragging-from-parent="moving"
      :on-change-position="handleChangePosition"></z-horizontal-scrollbar>
  </div>
</template>

<script>
import _ from '@/libs/util'
import zVerticalScrollbar from './zVerticalScrollbar'
import zHorizontalScrollbar from './zHorizontalScrollbar'
let scrollId = 1
export default {
  name: 'zScroll',
  components: {
    zVerticalScrollbar,
    zHorizontalScrollbar
  },
  props: {
    vBar: {
      type: Boolean,
      default: true
    },
    hBar: {
      type: Boolean,
      default: true
    },
    maxHeight: {
      type: [String, Number],
      default: 400
    },
    maxWidth: {
      type: [String, Number],
      default: 400
    },
    speed: {
      type: Number,
      default: 60
    }
  },
  data () {
    return {
      vShow: false,
      hShow: false,
      ready: false,
      top: 0,
      left: 0,
      start: {
        x: 0,
        y: 0
      },
      offsetX: 0,
      offsetY: 0,
      scrollHeight: 0,
      scrollWidth: 0,
      clientHeight: 0,
      clientWidth: 0,
      moving: false
    }
  },
  computed: {
    styleObject () {
      return {
        marginTop: this.top * -1 + 'px',
        marginLeft: this.left * -1 + 'px'
      }
    }
  },
  methods: {
    computedHorizontal (next) {
      let computed = this.getComputed()
      let distance = computed.scrollWidth - this.clientWidth

      // to bottom
      if (next > distance) {
        next = distance
        this.$emit('scroll-to-end')
      // to top
      } else if (next < 0) {
        next = 0
        this.$emit('scroll-to-top')
      }
      // Update the Horizontal Value
      this.left = next
      this.offsetX = next / computed.scrollWidth * 100
      this.$emit('h-scrolling', this.left)
    },
    computedSize (callback) {
      let computed = this.getComputed()

      if (computed.clientHeight !== this.clientHeight ||
        computed.clientWidth !== this.clientWidth ||
        computed.scrollHeight !== this.scrollHeight ||
        computed.scrollWidth !== this.scrollWidth) {
        // Scroll Height and Width
        this.scrollHeight = computed.scrollHeight
        this.scrollWidth = computed.scrollWidth
        // Scroll Wrapper Height and Width
        this.clientHeight = computed.clientHeight
        this.clientWidth = computed.clientWidth

        this.ready = true
      }

      _.isFunction(callback) && callback()
    },
    computedVertical (next) {
      let computed = this.getComputed()
      let distance = computed.scrollHeight - computed.clientHeight

      // to bottom
      if (next > distance) {
        next = distance
        this.$emit('scroll-to-end')
      // to top
      } else if (next < 0) {
        next = 0
        this.$emit('scroll-to-top')
      }
      this.top = next
      this.offsetY = next / computed.scrollHeight * 100
      this.$emit('v-scrolling', this.top)
    },
    getComputed () {
      let $scroll = this.$refs.scroll
      let $client = this.$refs.client
      return {
        // Scroll Height and Width
        scrollHeight: $scroll.scrollHeight,
        scrollWidth: $scroll.scrollWidth,
        // Scroll Wrapper Height and Width
        clientHeight: $client.clientHeight,
        clientWidth: $client.clientWidth
      }
    },
    handleChangePosition (movement, orientation) {
      this.computedSize(() => {
        let next = movement / 100
        if (orientation === 'vertical') {
          this.computedVertical(next * this.scrollHeight)
        } else if (orientation === 'horizontal') {
          this.computedHorizontal(next * this.scrollWidth)
        }
      })
    },
    /*
     * 区分横向和纵向滚动
    */
    scroll (e) {
      e.preventDefault()
      e.stopPropagation()

      this.computedSize(() => {
        let speed = this.speed

        let shifted = e.shiftKey
        let scrollY = e.deltaY > 0 ? speed : -(speed)
        let scrollX = e.deltaX > 0 ? speed : -(speed)
        // Fix Mozilla Shifted Wheel~
        if (shifted && e.deltaX === 0) {
          scrollX = e.deltaY > 0 ? speed : -(speed)
        }

        let nextY = this.top + scrollY
        let nextX = this.left + scrollX

        let canScrollY = this.scrollHeight > this.clientHeight
        let canScrollX = this.scrollWidth > this.clientWidth
        let vBar = this.vBar
        let hBar = this.hBar
        // 垂直滚动
        if (vBar && canScrollY && !shifted) {
          this.computedVertical(nextY)
        }
        // 水平滚动
        if (hBar && shifted && canScrollX) {
          this.computedHorizontal(nextX)
        }
      })
    },
    scrollToLeft () {
      this.computedSize(() => {
        this.computedHorizontal(0)
      })
    },
    scrollToTop () {
      this.computedSize(() => {
        this.computedVertical(0)
      })
    },
    toggleScrollBar () {
      this.computedSize()
    },
    touchEnd (e) {
      this.moving = false
    },
    touchMove (e) {
      if (this.moving) {
        e.preventDefault()
        e.stopPropagation()

        e = e.changedTouches ? e.changedTouches[0] : e

        // Invers the Movement
        let vDistance = this.start.y - e.clientY
        let hDistance = this.start.x - e.clientX
        // Update the last e.client
        this.start = { x: e.clientX, y: e.clientY }
        // 负值向下或者向右
        let nextX = this.left + hDistance
        let nextY = this.top + vDistance

        this.computedHorizontal(nextX)
        this.computedVertical(nextY)
      }
    },
    touchStart (e) {
      e.preventDefault()
      e.stopPropagation()
      e = e.changedTouches ? e.changedTouches[0] : e

      this.computedSize(() => {
        this.moving = true
        // 触摸点在页面中的位置
        // this.start = { x: e.pageX, y: e.pageY }
        this.start = { x: e.clientX, y: e.clientY }
      })
    }
  },
  mounted () {
    this.scrollId = scrollId++
    this.computedSize()
    this.scroll = _.throttle(this.scroll, 30)
    this.touchMove = _.throttle(this.touchMove, 30)
    _.addEvent(window, 'resize', this.computedSize)
  },
  beforeDestroy () {
    _.removeEvent(window, 'resize', this.computedSize)
  }
}
</script>

<style lang="less">
.z-scrollbar-transition {
  transition: all .3s ease 0s;
}

.z-scroll {
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  &:hover {
    .scrollbar {
      opacity: 1;
    }
  }
}
</style>
