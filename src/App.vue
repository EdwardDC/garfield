<template>
  <div id="app">
    <template v-if="!signin">
      <z-header ref="header" v-show="!signin"/>
      <el-row class="wrap" :style="{'min-height': screenHeight + 'px'}">
        <el-col :sm="4" class="menu">
          <z-sidebar></z-sidebar>
        </el-col>
        <el-col :sm="20" class="content">
          <router-view class="router-view"/>
        </el-col>
      </el-row>
      <z-footer ref="footer" v-show="!signin"></z-footer>
    </template>
    <router-view v-else class="router-view"/>
  </div>
</template>

<script>
import zHeader from '@/views/zHeader'
import zSidebar from '@/views/zSidebar'
import zFooter from '@/views/zFooter'
import { mapState } from 'vuex'
import _ from '@/libs/util'
export default {
  name: 'app',
  components: {
    zHeader,
    zSidebar,
    zFooter
  },
  data () {
    return {
      headerHeight: 0,
      footerHeight: 0,
      screenHeight: 0
    }
  },
  computed: {
    ...mapState({
      user: state => state.user,
      signin: state => state.ui.signin
    })
  },
  methods: {
    resize () {
      window.screenHeight = document.body.clientHeight
      this.screenHeight = window.screenHeight - this.headerHeight - this.footerHeight
    }
  },
  mounted () {
    this.headerHeight = this.$refs.header ? this.$refs.header.$el.clientHeight : 0
    this.footerHeight = this.$refs.footer ? this.$refs.footer.$el.clientHeight : 0
    this.screenHeight = document.body.clientHeight - this.headerHeight - this.footerHeight
    _.addEvent(window, 'resize', this.resize)
    this.$auth.signin()
  },
  beforeCreate () {
    console.log('beforeCreate')
    // 如果浏览器不支持 给出提示
  },
  beforeDestroy () {
    _.removeEvent(window, 'resize', this.resize)
  }
}
</script>
<style lang="less">
.z-pop-out-enter-active,
.z-pop-out-leave-active,
.z-pop-in-enter-active,
.z-pop-in-leave-active {
  will-change: transform;
  height: 100%;
  position: absolute;
  left: 0;
}

.z-pop-out-enter-active {
  animation-name: popInLeft;
}

.z-pop-out-leave-active {
  animation-name: popOutRight;
}

.z-pop-in-enter-active {
  perspective: 1000;
  animation-name: popInRight;
}

.z-pop-in-leave-active {
  animation-name: popOutLeft;
}

@keyframes popInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes popOutLeft {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes popInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes popOutRight {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}
</style>
