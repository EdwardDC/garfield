<template lang="html">
  <div class="z-table">
    <z-paper>
      <div class="z-table-title" v-if="title">
        <z-appbar :title="title">
          <el-button v-bind="btn"
            :disabled="btn.disabled"
            :key="btn.name"
            v-for="(btn, index) in actions"
            @click="btnHandle(btn)" slot="right"></el-button>
        </z-appbar>
      </div>
      <div class="z-table-body">
        <el-table
          :ref='config.ref'
          :data="tableData"
          v-bind="config.table"
          style="width: 100%"
          v-loading="loading" element-loading-text="加载中">
          <template v-if="config.expand">
            <el-table-column type="expand">
              <template scope="scope">
                <slot name="expand" :row="scope.row"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-for="(column, index) in config.columns">
            <template v-if="column.slot">
              <el-table-column v-bind="column">
                <template scope="scope">
                  <slot :name="column.slot" :row="scope.row"></slot>
                </template>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column v-bind="column"></el-table-column>
            </template>
          </template>
          <template v-if="config.inline">
            <el-table-column label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  type="text"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="small"
                  type="text"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
      <div class="z-table-footer" v-if="config.pagination" v-show="pager.total">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pager.currentPage"
          :page-sizes="pageSizes"
          :page-size="pager.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pager.total">
        </el-pagination>
      </div>
    </z-paper>
    <z-popup :open="open" position="right" :popupClass="popupClass" @close="closePopup" class="z-table-popup" v-if="config.search">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="searchForm">
        <el-form-item :label="item.label" :prop="item.prop" :key="item.prop" v-for="(item, index) in config.search">
          <template v-if="item.tag === 'input'">
            <el-input
              :type="item.type"
              v-model="form[item.prop]"
              :placeholder="item.placeholder"></el-input>
          </template>
          <template v-else-if="item.tag === 'select'">
            <el-select v-model="form[item.prop]">
              <el-option
                :label="option.label"
                :value="option.value"
                :key="item.value"
                :placeholder="item.placeholder"
                v-for="(option, i) in item.options"></el-option>
            </el-select>
          </template>
          <template v-else-if="item.tag === 'textarea'">
            <el-select v-model="form[item.prop]">
              <el-option
                :label="option.label"
                :value="option.value"
                :key="item.value"
                :placeholder="item.placeholder"
                v-for="(option, i) in item.options"></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </z-popup>
  </div>
</template>

<script>
import _ from '@/libs/util'
import zPaper from '../paper'
import zAppbar from '../appbar'
import zPopup from '../popup'
export default {
  name: 'zTable',
  components: {
    zPaper,
    zAppbar,
    zPopup
  },
  props: {
    options: Object,
    title: {
      type: String,
      default: '表格'
    },
    searchClass: {
      type: [String, Array, Object]
    }
  },
  data () {
    return {
      loading: false,
      form: {},
      rules: {},
      open: false,
      config: '',
      tableData: [],
      actions: [],
      pageSizes: [10, 20, 30, 40],
      pager: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  computed: {
    popupClass () {
      var arr = ['popup-right']
      return arr
    }
  },
  methods: {
    configHandle () {
      var _default = {
        ref: 'z-Table_' + _.getUniqId(),
        url: '', // ajax url
        data: [], // 静态数据
        // 是否自动生成动作列
        inline: true,
        // 顶部按钮组(靠右)
        actions: [],
        // 是否有展开子表格
        expand: false,
        // 搜索配置
        search: null,
        table: { // table配置
          border: true,
          maxHeight: 400
        },
        // 列配置
        columns: [],
        // 分页配置
        pagination: {
          pageNo: 1,
          limitPage: 10
        }
      }
      var config = _.cloneDeep({}, _default, this.options)
      this.filterActions(config)
      this.config = config
    },
    filterActions ({actions}) {
      // var _actions = ['add', 'edit', 'delete', 'search']
      // if (actions) {
      //   console.log(_actions)
      // }
      this.actions = _.clone(actions)
    },
    fetchData () {
      let {url} = this.config
      let pager = this.pager
      url = `${url}?currentPage=${pager.currentPage}&pageSize=${pager.pageSize}`
      this.loading = true
      this.$http.get(url).then(resp => {
        if (resp.code === 0) {
          let data = resp.data
          this.pager.currentPage = data.currentPage
          this.pager.pageSize = data.pageSize
          this.pager.total = data.total
          this.tableData = data.data || []
          // success()
          setTimeout(() => {
            this.loading = false
          }, 1000)
        }
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    dataHandle () {
      var { data } = this.config
      if (data.length) {
        this.tableData = data
      } else {
        this.fetchData()
      }
    },
    addDefault () {},
    editDefault () {},
    deleteDefault () {},
    viewDefault () {},
    searchDefault (btn) {
      this.open = !this.open
      console.log('search')
    },
    btnHandle (btn) {
      var {name, handle} = btn
      if (_.isFunction(handle)) {
        if (name === 'search') {
          this[name + 'Default'](btn)
        } else {
          handle.call()
        }
      }
      // this.$emit('btnClick', btnName)
    },
    eventHandle () {
      if (this.config.inline) {
        this.$refs[this.config.ref].$on('row-contextmenu', (row, ev) => {
          console.log(ev)
          ev.preventDefault()
        })
      }
    },
    closePopup (from) {
      console.log(from)
      this.open = !this.open
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (size) {
      this.pager.size = size
      this.fetchData()
    },
    handleCurrentChange (currentPage) {
      this.pager.currentPage = currentPage
      this.fetchData()
    }
  },
  beforeCreate () {},
  created () {
    this.configHandle()
  },
  beforeMount () {},
  mounted () {
    this.dataHandle()
    this.eventHandle()
  },
  beforeUpdate () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {}
}
</script>

<style lang="less">
.z-table {
  .z-paper {
    padding: 10px;
  }

  .z-table-footer {
    margin: 10px auto;
    text-align: right;
  }
}

.z-table-popup .searchForm {
  width: 100%;
}

.popup-right {
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 375px;
  align-items: center;
  padding: 24px;
}

.popup-bottom {
  background: #fff;
  width: 100%;
  height: 100%;
  max-height: 375px;
}
</style>
