<template lang="html">
  <div class="user-modify">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: 'userManage' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ hasId ? '用户编辑' : '用户新增'}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="userForm" :rules="rules" ref="userForm" label-width="120px" class="form userForm">
      <el-form-item label="账号" prop="account">
        <el-input v-model="userForm.account" class="text" v-if="!hasId"></el-input>
        <p v-else class="input-static">用户账号</p>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="userForm.name" class="text"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="adress">
        <el-input type="textarea" v-model="userForm.adress" :rows="4" class="textarea"></el-input>
      </el-form-item>
      <el-form-item label="身份证" prop="picture">
        <el-upload
          class="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList2"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userForm')">立即创建</el-button>
        <el-button @click="resetForm('userForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'userAdd',
  data () {
    return {
      fileList2: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      userForm: {
        // 账号
        account: '',
        // 用户名
        name: '',
        adress: '',
        // 图片
        picture: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        adress: [
          { maxLength: 100, message: '地址过长', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    hasId () {
      return this.$route.params.userId
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },

    handlePreview (file) {
      console.log(file)
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    console.log(this.$route.params)
  }
}
</script>

<style lang="less">
@import './style.less';
</style>
