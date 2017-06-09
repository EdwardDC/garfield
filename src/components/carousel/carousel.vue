<template lang="html">
  <div
    class="carousel"
    :class="{
      ready: ready
    }">
    <ol class="carousel-indicators">
      <li
        v-for="index in count"
        :class="{active: (index - 1) === Math.floor(activeIndex / scrollCount)}"
        @click.stop.prevent="changeSlide('index', index - 1)"></li>
        <!-- @mouseenter=""
        @mouseleave="" -->
    </ol>
    <div
      ref="area"
      class="carousel-inner"
      :class="{
        draggable: draggable
      }">
      <div
        ref="track"
        class="carousel-track"
        :style="{
          transition: transition,
          transform: transform,
          width: width
        }">
        <div
          class="carousel-item"
          :id="item._key"
          :class="item._className"
          :style="{
            width: itemWidth
          }"
          v-for="item in list">
          <img :src="item.url" alt="">
        </div>
      </div>
    </div>
    <a class="left carousel-control" href="#" role="button" @click.stop.prevent="changeSlide('prev')">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#" role="button" @click.stop.prevent="changeSlide('next')">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
import _ from '@/libs/util'
let cid = 0
export default {
  name: 'ZCarousel',
  props: {
    adaptiveHeight: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      // center
      default: ''
    },
    arrow: {
      type: Boolean,
      default: true
    },
    arrowClass: {
      type: [String, Array],
      default: 'carousel-indicators'
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    control: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default () {
        return []
      }
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    draggable: {
      type: Boolean,
      default: true
    },
    // recycle
    infinite: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    lazyLoad: {
      type: String,
      default: 'lazy'
    },
    mode: {
      type: String,
      // vertical | horizontal | fade
      default: 'vertical'
    },
    // 显示子元素个数
    showCount: {
      type: Number,
      default: 1
    },
    // 滚动子元素个数
    scrollCount: {
      type: Number,
      default: 1
    },
    trigger: {
      type: String,
      // click | hover
      default: 'click'
    },
    height: String,
    variableWidth: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      width: 0,
      height: 0,
      itemWidth: 0,
      prevIndex: -1,
      transition: '',
      transform: '',
      offset: 0,
      // end
      activeIndex: 0,
      animating: false,
      cid: cid++,
      cssEase: 'ease',
      currentLeft: null,
      direction: 1,
      list: [],
      items: [],
      ready: false,
      slideOffset: 0,
      slideWidth: 0,
      speed: 500,
      timer: null,
      transitionType: 'transform',
      zIndex: 500
    }
  },
  computed: {
    count () {
      let {
        infinite,
        items,
        scrollCount,
        showCount,
        align
      } = this
      let breakPoint = 0
      let counter = 0
      let pagerQty = 0
      let length = items.length
      if (infinite) {
        while (breakPoint < length) {
          ++pagerQty
          breakPoint = counter + scrollCount
          counter += scrollCount <= showCount ? scrollCount : showCount
        }
      } else if (align === 'center') {
        pagerQty = length
      } else {
        while (breakPoint < length) {
          ++pagerQty
          breakPoint = counter + scrollCount
          counter += scrollCount <= showCount ? scrollCount : showCount
        }
      }
      return Math.max(pagerQty, 0)
    }
  },
  methods: {
    addItem (item) {
      let list = this.list
      !list.includes(item) && list.push(item)
    },
    setTransform () {
      let {mode, rtl, offset} = this
      let isVertical = mode === 'vertical'
      offset = Math.ceil(rtl && isVertical ? -offset : offset)

      // TODO 后面使用transitionend事件处理
      this.transform = isVertical
        ? 'translate3d(0px,' + offset + 'px, 0px)' : 'translate3d(' + offset + 'px, 0px, 0px)'
    },
    animateSlide (callback) {
      this.switchTransition()
      this.setTransform()

      if (callback) {
        setTimeout(() => {
          this.switchTransition(false)
          callback.call()
        }, this.speed)
      }
    },
    switchTransition (enabled = true) {
      this.transition = enabled ? (this.mode !== 'fade'
        ? ('transform ' + this.speed + 'ms ' + this.cssEase) : ('opacity ' + this.speed + 'ms ' + this.cssEase)) : ''
    },
    autoPlay () {
      if (!this.autoplay) { return }
      this.pause()
      if (this.items.length > this.showCount) {
        this.timer = setInterval(this.autoPlayIterator, this.interval)
      }
    },
    autoPlayIterator () {
      let {activeIndex, scrollCount} = this
      this.slide(activeIndex + scrollCount)
    },
    buildList () {
      let {showCount, infinite, mode, align, data} = this
      if (infinite && mode !== 'fade') {
        if (align === 'center') {
          showCount += 1
        }
        let i = 0
        let copy = [].concat(data)
        let length = data.length
        let index = -1
        let temp
        // 添加标记
        copy.forEach((item, index) => {
          item._key = index
        })

        for (i = length; i > length - showCount; i--) {
          index = i - 1
          temp = _.cloneDeep({}, data[index])
          temp._key = index - length
          temp._className = ['cloned']
          copy.unshift(temp)
        }

        for (i = 0; i < showCount; i++) {
          index = i
          temp = _.cloneDeep({}, data[index])
          temp._key = index + length
          temp._className = ['cloned']
          copy.push(temp)
        }

        this.list = copy
      }
    },
    caculateSize () {
      let {items, mode, align, variableWidth} = this
      let length = items.length
      let $area = this.$refs.area
      let vertical = mode === 'vertical'
      let center = align === 'center'
      let $first = items[0]

      // 垂直方向 并且 居中模式
      if (!vertical) {
        if (center) {}
      } else {
        setTimeout(function () {
          console.log(_.getElementRect($first, true))
        }, 100)
        // $area.style.height =
      }

      let width = _.getCurrStyle($area, 'width')
      // let height = _.getCurrStyle($area, 'height')
      if (!vertical && !variableWidth) {
        this.slideWidth = Math.ceil(parseFloat(width) / this.showCount)
        this.width = Math.ceil(this.slideWidth * this.list.length) + 'px'
      } else if (variableWidth) {
        this.width = 5000 * length + 'px'
      } else {
        this.slideWidth = Math.ceil(parseFloat(width))
        this.width = Math.ceil(parseFloat(width))
        this.height = Math.ceil(_.getElementRect($first, true).height * this.list.length) + 'px'
      }

      // 有margin padding border的情况
      if (!variableWidth) {
        let offset = _.getElementRect($first, true).width - $first.clientWidth
        this.itemWidth = this.slideWidth - offset + 'px'
      }
    },
    changeSlide (direction, index) {
      let {items, showCount, scrollCount, activeIndex} = this
      let length = items.length
      let unevenOffset = length % scrollCount !== 0
      let indexOffset = unevenOffset ? 0 : (length - activeIndex) % scrollCount
      let slideOffset

      switch (direction) {
        case 'prev':
          slideOffset = indexOffset === 0 ? scrollCount : showCount - indexOffset
          if (length > showCount) {
            this.slide(activeIndex - slideOffset, false)
          }
          break
        case 'next':
          slideOffset = indexOffset === 0 ? scrollCount : indexOffset
          if (length > showCount) {
            this.slide(activeIndex + slideOffset, false)
          }
          break
        case 'index':
          // TODO
          if (length > showCount) {
            this.slide(index, false)
          }
          break
        default:
          break
      }
    },
    setActiveIndex (index) {
      let {activeIndex, scrollCount, items} = this
      let length = items.length

      this.prevIndex = activeIndex

      if (index < 0) {
        if (length % scrollCount !== 0) {
          this.activeIndex = length - (length % scrollCount)
        } else {
          this.activeIndex = length + index
        }
      } else if (index >= length) {
        if (length % scrollCount !== 0) {
          this.activeIndex = 0
        } else {
          this.activeIndex = index - length
        }
      } else {
        this.activeIndex = index
      }
    },
    slide (index) {
      let {animating, items, showCount, autoplay} = this

      if (animating || items.length <= showCount) { return }

      // 先暂停
      if (autoplay) {
        this.pause()
      }
      // 动画开始标记
      this.animating = true
      // 获取偏移值
      this.offset = this.getOffset(index)
      this.setActiveIndex(index)
    },
    doTransform () {
      if (this.mode === 'fade') {
        this.fadeSlideOut()
        this.fadeSlide(() => {
          this.postSlide()
        })
        this.animateHeight()
      } else {
        this.animateSlide(() => {
          this.postSlide()
        })
      }
    },
    fadeSlideOut () {
      // let {prevIndex} = this
    },
    fadeSlide (callback) {
      // let {activeIndex} = this
    },
    getOffset (to) {
      let {slideWidth, items, showCount, scrollCount, align, infinite} = this
      let length = items.length
      let verticalOffset = 0
      let slideOffset = 0
      let offset
      let verticalHeight = _.getElementRect(items[0], true).height
      if (infinite) {
        if (length > showCount) {
          slideOffset = (slideWidth * showCount) * -1
          verticalOffset = (verticalHeight * showCount) * -1
        }

        if (length % scrollCount !== 0) {
          if (to + scrollCount > length && length > showCount) {
            if (to > length) {
              slideOffset = ((showCount - (to - length)) * slideWidth) * -1
              verticalOffset = ((showCount - (to - length)) * verticalHeight) * -1
            } else {
              slideOffset = ((length % scrollCount) * slideWidth) * -1
              verticalOffset = ((length % scrollCount) * verticalHeight) * -1
            }
          }
        }
      } else {
        if (to + showCount > length) {
          slideOffset = ((to + showCount) - length) * slideWidth
          verticalOffset = ((to + showCount) - length) * verticalHeight
        }
      }

      if (length <= showCount) {
        slideOffset = 0
        verticalOffset = 0
      }

      if (align === 'center') {
        if (infinite) {
          slideOffset += slideWidth * Math.floor(showCount / 2) - slideWidth
        } else {
          slideOffset = slideWidth * Math.floor(showCount / 2)
        }
      }

      if (this.mode !== 'vertical') {
        offset = ((to * slideWidth) * -1) + slideOffset
      } else {
        offset = ((to * verticalHeight) * -1) + verticalOffset
      }

      this.slideOffset = slideOffset

      if (this.variableWidth === true) {}
      return offset
    },
    keydown (e) {
      if (/input|textarea/i.test(e.target.tagName)) return

      let keyCode = e.which || e.keyCode
      switch (keyCode) {
        case 37:
          this.prev()
          break
        case 39:
          this.next()
          break
        default:
          break
      }
      e.preventDefault()
    },
    pause () {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    postSlide () {
      this.setPosition()
      this.autoPlay()
      this.animating = false
    },
    removeItem (item) {
      let index = this.list.indexOf(item)
      if (index > -1) {
        this.list.splice(index, 1)
      }
    },
    setFade () {
      let activeIndex = this.activeIndex
      let zIndex = this.zIndex
      let slideWidth = this.slideWidth
      let rtl = this.rtl
      this.items.forEach((item, index) => {
        let actived = activeIndex === index
        let targetLeft = (slideWidth * index) * -1
        item.style.position = 'relative'
        item.style[rtl ? 'right' : 'left'] = targetLeft + 'px'
        item.style.top = 0
        item.style.zInex = actived ? zIndex - 1 : zIndex - 2
        item.style.opacity = actived ? 1 : 0
      })
    },
    setHeight () {
      if (this.showCount === 1 && this.adaptiveHeight && this.mode !== 'vertical') {
        let $area = this.$refs.area
        let $current = this.items[this.activeIndex]
        $area.style.height = _.getElementRect($current, true).height + 'px'
      }
    },
    setPosition () {
      this.caculateSize()
      this.setHeight()
      if (this.mode === 'fade') {
        this.setFade()
      } else {
        this.offset = this.getOffset(this.activeIndex)
        this.setTransform()
      }
    }
  },
  watch: {
    data: {
      immediate: true,
      handler (val) {
        if (val) {
          this.ready = false
          this.buildList()
          this.$nextTick(() => {
            this.items = Array.from(this.$refs.track.querySelectorAll('.carousel-item:not(.cloned)') || [])
            this.setPosition()
            this.autoPlay()
            this.ready = true
          })
        }
      }
    },
    activeIndex (val, oldVal) {
      if (typeof val === 'number') {
        this.doTransform()
      }
    }
  },
  created () {},
  mounted () {
    // this.activeIndex = this.defaultIndex
  }
}
</script>

<style lang="less">
.carousel {
  margin: 100px auto;
  width: 50%;
  position: relative;
  display: block;

  &.ready {
    .carousel-item {
      display: block;
    }
  }

  &.indicator {
    margin-bottom: 30px;
  }

  .carousel-inner {
    display: block;
    position: relative;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  .carousel-inner,
  .carousel-track {
    transform: translate3d(0, 0, 0);
  }

  .carousel-item {
    margin: 0 20px;
    height: 100%;
    min-height: 1px;
    display: none;
    float: left;

    > img,
    > a > img {
      line-height: 1;
      margin: 0 auto;
      max-width: 100%;
      height: auto;
      display: block;
    }
  }
}

.carousel-control {
  color: #fff;
  background-color: rgba(0, 0, 0, 0);
  font-size: 20px;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, .6);
  width: 15%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  opacity: .5;
  z-index: 3;

  &.left {
    background-image: linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);
    background-repeat: repeat-x;
  }

  &.right {
    right: 0;
    left: auto;
    background-image: linear-gradient(to right, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .5) 100%);
    background-repeat: repeat-x;
  }

  &:hover,
  &:focus {
    color: #fff;
    text-decoration: none;
    outline: 0;
    opacity: .9;
  }

  &.icon-prev,
  &.icon-next,
  &.glyphicon-chevron-left,
  &.glyphicon-chevron-right {
    margin-top: -10px;
    display: inline-block;
    position: absolute;
    top: 50%;
    z-index: 5;
  }

  &.icon-prev,
  &.glyphicon-chevron-left {
    left: 50%;
    margin-left: -10px;
  }

  &.icon-next,
  &.glyphicon-chevron-right {
    right: 50%;
    margin-right: -10px;
  }

  &.icon-prev,
  &.icon-next {
    width: 20px;
    height: 20px;
    font-family: serif;
    line-height: 1;
  }

  &.icon-prev:before {
    content: '\2039';
  }

  &.icon-next:before {
    content: '\203a';
  }
}

.carousel-indicators {
  text-align: center;
  margin-left: -30%;
  padding-left: 0;
  width: 60%;
  position: absolute;
  bottom: 10px;
  left: 50%;
  z-index: 15;
  list-style: none;

  li {
    background-color: rgba(0, 0, 0, 0);
    text-indent: -999px;
    margin: 1px;
    border: 1px solid #fff;
    border-radius: 10px;
    width: 10px;
    height: 10px;
    display: inline-block;
    cursor: pointer;
  }

  .active {
    background-color: #fff;
    margin: 0;
    width: 12px;
    height: 12px;
  }
}

.carousel-caption {
  color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, .6);
  position: absolute;
  right: 15%;
  bottom: 20px;
  left: 15%;
  z-index: 10;

  .btn {
    text-shadow: none;
  }
}

@media screen and (min-width: 768px) {
  .carousel-control {
    .glyphicon-chevron-left,
    .glyphicon-chevron-right,
    .icon-prev,
    .icon-next {
      font-size: 30px;
      margin-top: -10px;
      width: 30px;
      height: 30px;
    }
  }

  .carousel-control {
    .glyphicon-chevron-left,
    .icon-prev {
      margin-left: -10px;
    }
  }

  .carousel-control {
    .glyphicon-chevron-right,
    .icon-next {
      margin-right: -10px;
    }
  }

  .carousel-caption {
    right: 20%;
    left: 20%;
    padding-bottom: 30px;
  }

  .carousel-indicators {
    bottom: 20px;
  }
}
</style>
