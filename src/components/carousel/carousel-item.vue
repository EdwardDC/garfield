<template lang="html">
  <div class="carousel-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ZCarouselItem',
  props: {},
  computed: {
    owner () {
      let parent = this.$parent
      while (parent && parent.$options.name !== 'ZCarousel') {
        parent = parent.$parent
      }
      return parent
    }
  },
  methods: {
    addCarouselItem () {
      this.owner.addItem(this)
    },
    removeItem (item) {
      let index = this.list.indexOf(item)
      if (index > -1) {
        this.list.splice(index, 1)
      }
    }
  },
  watch: {},
  mounted () {
    this.addCarouselItem()
  },
  beforeDestroy () {
    this.owner.removeItem(this)
  }
}
</script>

<style lang="less">
</style>
