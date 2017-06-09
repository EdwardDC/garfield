<template lang="html">
  <div class="z-card">
    <z-appbar>
      <span class="title" slot="left">{{title}}</span>
      <slot name="center"></slot>
      <div class="action" slot="right">
        <slot name="action"></slot>
      </div>
    </z-appbar>
    <div class="body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import zAppbar from '../appbar'
export default {
  name: 'z-card',
  props: {
    title: {
      type: String
    }
  },
  components: {
    zAppbar
  },
  mounted () {}
}
</script>

<style lang="less">
@import '../../assets/css/colors.less';
.z-card {
  margin: 10px 0;

  .z-appbar {
    background-color: @black2a2a2a;
    padding: 0 20px;
    height: 40px;

    .title {
      font-size: 14px;
      line-height: 1;
      margin-right: 20px;
      padding: 13px 0;
      border-bottom: 3px solid #0091d5;
      height: 40px;
      display: inline-block;
    }

    .center {
      line-height: 50px;
    }
  }

  .body {
    background: @black232323;
    padding: 20px;
    /*box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.2);*/
  }
}
</style>
