<template lang="html">
  <div class="rights-manage">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input
      class="rights-search-text"
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
    <el-tree
      class="filter-tree"
      show-checkbox
      :props="defaultProps"
      :data="data2"
      node-key="id"
      highlight-current
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree2">
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'rightsManage',
  data () {
    return {
      filterText: '',
      data2: [
        {
          id: 1,
          label: '权限 1',
          children: [
            {
              id: 4,
              label: '权限 1-1',
              children: [
                {
                  id: 9,
                  label: '权限 1-1-1'
                },
                {
                  id: 10,
                  label: '权限 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '权限 2',
          children: [
            {
              id: 5,
              label: '权限 2-1'
            },
            {
              id: 6,
              label: '权限 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '权限 3',
          children: [
            {
              id: 7,
              label: '权限 3-1'
            },
            {
              id: 8,
              label: '权限 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val)
    }
  }
}
</script>

<style lang="less">
  @import './style.less';
</style>
