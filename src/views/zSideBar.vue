<template lang="html">
  <div class="sidebar">
    <el-menu default-active="2" @open="handleOpen" @close="handleClose" router>
      <el-menu-item index="pageone">
        <i class="fa fa-user"></i> 用户管理
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i> 导航二
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i> 导航三
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      active: 1
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
