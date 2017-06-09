<template lang="html">
  <div class="sidebar">
    <el-menu :default-active="activeRoute" @open="handleOpen" @close="handleClose" router>
      <el-menu-item index="userManage">
        <i class="fa fa-user"></i> 用户管理
      </el-menu-item>
      <el-menu-item index="rightsManage">
        <i class="el-icon-menu"></i> 权限管理
      </el-menu-item>
      <el-menu-item index="orderManage">
        <i class="el-icon-setting"></i> 订单管理
      </el-menu-item>
      <el-menu-item index="orderManage1">
        <i class="el-icon-setting"></i> 订单管理
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      activeRoute: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  watch: {
    '$route' ({name}) {
      if (name) {
        this.activeRoute = name
      }
    }
  }
}
</script>
