<template lang="html">
  <div class="user-manage">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form class="queryform" ref="form" inline :model="form" :rules="rules" label-width="80px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动时间" prop="time">
        <el-date-picker v-model="form.time" type="daterange" placeholder="选择日期范围">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">查询</el-button>
        <el-button type="primary" @click="addUserHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table class="table" :data="tableData" highlight-current-row
      @current-change="handleCurrentChange" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="date" label="日期" width="120"></el-table-column>
      <el-table-column property="name" label="姓名" width="120"></el-table-column>
      <el-table-column property="address" label="地址"></el-table-column>
      <el-table-column property="zipcode" label="邮编"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentPagerChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'userManage',
  data () {
    return {
      currentPage: 1,
      currentRow: null,
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          zipcode: 1000
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          zipcode: 2000
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          zipcode: 3000
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          zipcode: 4000
        }
      ],
      form: {
        name: '',
        time: ''
      },
      rules: {
        name: {
          min: 3,
          max: 5,
          message: '长度在 3 到 5 个字符',
          trigger: 'blur'
        },
        time: {
          validator: this.validTime,
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    addUserHandle () {
      this.$router.push({name: 'userModify'})
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentPagerChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
    },
    handleEdit (index, row) {
      this.$router.push({name: 'userModify', params: {userId: row.id}})
    },
    handleDelete () {},
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    validTime (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入日期'))
      } else {
        callback()
      }
    }
  }
}
</script>
