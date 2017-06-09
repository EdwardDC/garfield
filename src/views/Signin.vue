<template lang="html">
  <div class="signin">
    <div class="map">
      <div class="form">
        <h2 class="title">登录借钱宝</h2>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px">
          <el-form-item prop="name" label-width="0">
            <el-input v-model="form.name" placeholder="邮箱/手机/会员名">
              <template slot="prepend">
                <i class="fa fa-user"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="name" label-width="0">
            <el-input v-model="form.passowrd" type="password">
              <template slot="prepend">
                <i class="fa fa-lock"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label-width="0">
            <el-button type="primary" @click="onSubmit('form')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <div class="notice">
      <span class="icon">最新公告</span>
      <ul class="list">
        <li>
          <a href="javscript:;" class="new">
            <span><i class="fa fa-calendar"></i> 5.2</span> <span>关于xxxxxx</span>
          </a>
        </li>
        <li>
          <a href="javscript:;">
            <span><i class="fa fa-money"></i> 5.3</span> <span>关于xxxxxx</span>
          </a>
        </li>
        <li>
          <a href="javscript:;">
            <span><i class="fa fa-map-marker"></i> 5.4</span> <span>关于xxxxxx</span>
          </a>
        </li>
        <li>
          <a href="javscript:;">
            <span><i class="fa fa-calendar"></i> 5.5</span> <span>关于xxxxxx</span>
          </a>
        </li>
      </ul>
    </div> -->
    <div class="service">
      <ul class="list">
        <li>
          <a href="javscript:;">
            <div class="icon">
              <i class="fa fa-commenting-o"></i>
            </div>
            <h3 class="title">电脑网站支付</h3>
            <div class="description">
              用户在商家网站上完成付款
            </div>
            <span class="link">我要接入</span>
          </a>
        </li>
        <li>
          <a href="javscript:;">
            <div class="icon">
              <i class="fa fa-commenting-o"></i>
            </div>
            <h3 class="title">电脑网站支付</h3>
            <div class="description">
              用户在商家网站上完成付款
            </div>
            <span class="link">我要接入</span>
          </a>
        </li>
        <li>
          <a href="javscript:;">
            <div class="icon">
              <i class="fa fa-commenting-o"></i>
            </div>
            <h3 class="title">电脑网站支付</h3>
            <div class="description">
              用户在商家网站上完成付款
            </div>
            <span class="link">我要接入</span>
          </a>
        </li>
        <li>
          <a href="javscript:;">
            <div class="icon">
              <i class="fa fa-commenting-o"></i>
            </div>
            <h3 class="title">电脑网站支付</h3>
            <div class="description">
              用户在商家网站上完成付款
            </div>
            <span class="link">我要接入</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="qrcode">

    </div>
    <div class="copyrights">
      Copyright ©2008-2017 xxxx信息科技有限公司, All Rights Reserved.
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import map from '@/assets/images/map.png'
export default {
  name: 'signin',
  data () {
    return {
      mapPic: map,
      form: {
        name: '',
        passowrd: ''
      },
      rules: {
        name: {
          min: 3,
          max: 5,
          message: '长度在 3 到 5 个字符',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateSigninStatus'
    ]),
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    this.updateSigninStatus({signin: true})
  },
  beforeDestroy () {
    this.updateSigninStatus({signin: false})
  }
}
</script>

<style lang="less">

.signin {
  background-color: #f7f7f7;
  text-align: center;

  .map {
    background: url(../assets/images/map.png) center no-repeat #008de1;
    background-size: cover;
    height: 400px;
    position: relative;
  }

  .form {
    background-color: rgba(0, 0, 0, 0.3);
    margin: 0 auto;
    border: 1px solid transparent;
    border-radius: 3px;
    padding: 20px 30px;
    width: 300px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);

    .title {
      color: #fff;
      font-size: 18px;
      font-weight: 400;
      letter-spacing: 1px;
      margin: 0 0 20px;
    }
  }

  .notice {
    margin: 0 auto;
    padding: 20px 0 20px 100px;
    width: 1200px;
    position: relative;

    .icon {
      color: #fff;
      line-height: 24px;
      background-color: #fa991b;
      margin-top: -12px;
      border-radius: 2px;
      padding: 0 8px;
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
    }

    .list {
      overflow: hidden;

      li {
        float: left;
        padding-right: 20px;
        width: 25%;

        &:last-child {
          padding-right: 0;
        }

        a {
          color: #1a1a1a;
          padding-right: 40px;
          max-width: 100%;
          display: block;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: left;
          text-decoration: none;

          &:hover {
            color: #20a0ff;
          }

          &.new:after {
            content: 'new';
            color: #fff;
            font-size: 12px;
            background-color: #e04646;
            margin-left: 5px;
            border-radius: 2px;
            padding: 1px 2px;
            display: inline-block;
            position: absolute;
            top: -2px;
          }
        }

        .fa {
          color: #20a0ff;
        }
      }
    }
  }

  .service {
    margin: 20px auto;
    width: 1200px;

    .list {
      &:before,
      &:after {
        content: "";
        display: table;
      }

      &:after {
        clear: both;
      }

      li {
        padding-left: 30px;
        width: 25%;
        float: left;

        &:first-child {
          padding-left: 0;
        }

        a {
          color: #20a0ff;
          border: 1px solid transparent;
          border-radius: 4px;
          padding: 50px 20px;
          height: 310px;
          display: block;
          text-decoration: none;
          transition: all 0.18s ease 0s;

          &:hover {
            border-color: #ccc;
            .link {
              display: block;
            }
          }
        }

        .icon {
          margin: 0 auto;
          border: 2px solid #20a0ff;
          border-radius: 50%;
          width: 100px;
          height: 100px;

          .fa {
            font-size: 50px;
            line-height: 100px;
          }
        }

        .title {
          color: #3e3e3e;
          font-size: 20px;
          line-height: 1;
          font-weight: 400;
          margin: 0;
          padding: 15px 0 12px;
        }

        .description {
          color: #9a9a9a;
          height: 40px;
          overflow: hidden;
        }

        .link {
          color: #fff;
          background-color: #19acf7;
          margin: 5px auto;
          padding: 13px 20px;
          border-radius: 5px;
          display: none;
        }
      }
    }
  }

  .copyrights {
    margin: 10px auto;
  }
}

</style>
