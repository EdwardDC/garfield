<template lang="html">
  <div class="z-avatar" @click="handleClick" :style="avatarStyle">
    <div class="z-avatar-inner">
      <z-icon v-if="icon" :value="icon" :size="iconSize" :class="iconClass"></z-icon>
      <img v-if="src" :src="src" :class="imgClass" />
      <slot></slot>
    </div>
  </div>
</template>

<script>
import _ from '@/libs/util'
import zIcon from '../icon'
export default {
  name: 'zAvartar',
  props: {
    backgroundColor: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconClass: {
      type: [String, Object, Array]
    },
    src: {
      type: String,
      default: ''
    },
    imgClass: {
      type: [String, Object, Array]
    },
    size: {
      type: Number
    },
    iconSize: {
      type: Number
    }
  },
  components: {
    zIcon
  },
  computed: {
    avatarStyle () {
      return {
        width: this.size ? this.size + 'px' : '',
        height: this.size ? this.size + 'px' : '',
        color: _.getColor(this.color),
        'background-color': _.getColor(this.backgroundColor)
      }
    }
  },
  methods: {
    handleClick () {}
  },
  created () {
    this._isAvatar = true
  }
}
</script>

<style lang="less">
@import '../../assets/css/import.less';
.z-avatar {
  display: inline-block;
  height: 40px;
  width: 40px;
  font-size: 20px;
  color: @alternateTextColor;
  background-color: darken(@alternateTextColor, 26%);
  text-align: center;
  border-radius: 50%;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    display: block;
  }
}

.z-avatar-inner {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>
