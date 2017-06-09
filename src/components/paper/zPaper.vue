<template lang="html">
  <div class="z-paper" :class="paperClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'zPaper',
  props: {
    circle: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: true
    },
    zDepth: {
      type: Number,
      default: 1
    }
  },
  computed: {
    paperClass () {
      var arr = []
      if (this.circle) arr.push('z-paper-circle')
      if (this.rounded) arr.push('z-paper-round')
      arr.push('z-paper-' + this.zDepth)
      return arr
    }
  }
}
</script>

<style lang="less">
  @import '../../assets/css/import.less';

  .z-paper {
    transition: all .45s @easeOutFunction;
    color: @textColor;
    background-color: @dialogBackgroundColor;
    .depth(1);
  }

  .z-paper-round {
    border-radius: 2px;
  }

  .z-paper-circle {
    border-radius: 50%;
  }

  .z-paper-1 {
    .depth(1);
  }

  .z-paper-2 {
    .depth(2);
  }

  .z-paper-3 {
    .depth(4);
  }

  .z-paper-4 {
    .depth(4);
  }

  .z-paper-5 {
    .depth(5);
  }
</style>
