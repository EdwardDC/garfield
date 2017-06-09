<template lang="html">
  <div :class="['z-drawer', open ? 'open' : '']">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'zDrawer',
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less">
.z-drawer {
  color: rgba(0, 0, 0, .87);
  background-color: #fff;
  width: 256px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: auto;
  z-index: 300;
  visibility: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, .15), 0 3px 10px rgba(0, 0, 0, .22);
  transform: translate3d(-100%, 0, 0);
  transition: all .45s cubic-bezier(.23, 1, .32, 1);
}

.z-drawer.open {
  transform: translateZ(0);
  visibility: visible;
}
</style>
