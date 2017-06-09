<template>
  <div class="z-appbar" :class="['z-paper-' + zDepth]">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center" :class="titleClass">
      <slot>
        <span>{{title}}</span>
      </slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'zAppbar',
  props: {
    title: {
      type: String,
      default: ''
    },
    zDepth: {
      type: Number,
      default: 1
    },
    titleClass: {
      type: [String, Array, Object]
    }
  }
}
</script>

<style lang="less">
@import '../../assets/css/import.less';
@appbarColor: @primaryColor;
@appbarTextColor: @alternateTextColor;

.z-appbar {
  color: @alternateTextColor;
  background-color: @appbarColor;
  padding: 0 8px;
  width: 100%;
  height: 50px;
  display: flex;
  align-self: flex-start;
  justify-content: flex-start;
  align-items: center;
  .flex-shrink(0);

  > .left,
  > .right {
    .flex-shrink(0);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
  }

  > .center {
    flex: 1;
    padding-left: 8px;
    padding-right: 8px;
    white-space: nowrap;
    overflow: hidden;
    font-size: 20px;
    font-weight: 400;
    line-height: 50px;
  }
}
</style>
