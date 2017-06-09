<template lang="html">
  <div class="z-table z-scroll-table z-table-fit z-table__enable-row-hover"
    :class="{
      'z-table-border': border
    }">
    <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
    <z-scroll
      ref="hbar"
      :v-bar="false">
      <div class="z-table-inner" :style="{'height': maxHeight + 'px'}">
        <div class="z-table__header-wrapper"
          ref="headerWrapper"
          :style="{ width: layout.bodyWidth ? layout.bodyWidth + 'px' : '' }"
          v-if="showHeader">
          <table-header
            :store="store"
            :layout="layout"
            :default-sort="defaultSort"
            :style="{ width: layout.bodyWidth ? layout.bodyWidth + 'px' : '' }"></table-header>
        </div>
        <div class="z-table__body-wrapper" ref="bodyWrapper">
            <z-scroll
              ref="vbar"
              @scroll-to-end="scrollToEnd"
              @scroll-to-top="scrollToTop"
              :h-bar="false"
              :style="{'max-height': maxHeight - 40 + 'px'}">
              <table-body
                :store="store"
                :layout="layout"
                :style="{ width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''}"></table-body>
            </z-scroll>
            <div :style="{ width: layout.bodyWidth }" class="z-table__empty-block" v-if="!data || data.length === 0">
              <span class="z-table__empty-text">
                <slot name="empty">{{ emptyText }}</slot>
              </span>
            </div>
        </div>
      </div>
    </z-scroll>
  </div>
</template>

<script>
import zScroll from '../scroll'
import TableStore from '../table/table-store'
import TableHeader from '../table/table-header'
import TableBody from '../table/table-body'
import TableLayout from '../table/table-layout'

let tableIdSeed = 1

export default {
  name: 'zScrollTable',
  components: {
    TableHeader,
    TableBody,
    zScroll
  },
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    maxHeight: {
      type: [String, Number],
      default: 600
    },
    maxWidth: {
      type: [String, Number]
    },
    border: {
      type: Boolean,
      default: false
    },
    fit: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    defaultSort: Object,
    emptyText: {
      type: String,
      default: '没有数据'
    }
  },
  data () {
    const store = new TableStore(this)
    const layout = new TableLayout({
      store,
      table: this,
      fit: this.fit,
      showHeader: this.showHeader
    })
    return {
      store,
      layout
    }
  },
  computed: {
    selection () {
      return this.store.selection
    },
    columns () {
      return this.store.states.columns
    }
  },
  methods: {
    scrollToEnd () {
      this.$emit('scroll-to-end', this)
    },
    scrollToTop () {
      this.$emit('scroll-to-top', this)
    },
    doLayout () {
      this.store.updateColumns()
      this.layout.update()
      // this.updateScrollY()
      // this.$nextTick(() => {
      //   if (this.height) {
      //     this.layout.setHeight(this.height)
      //   } else if (this.maxHeight) {
      //     this.layout.setMaxHeight(this.maxHeight)
      //   } else if (this.shouldUpdateHeight) {
      //     this.layout.updateHeight()
      //   }
      // })
    }
  },
  created () {
    this.tableId = 'z-table_' + tableIdSeed + '_'
  },
  mounted () {
    this.vbar = this.$refs.vbar
    this.hbar = this.$refs.hbar
    this.doLayout()
    this.store.states.columns.forEach(column => {
      if (column.filteredValue && column.filteredValue.length) {
        this.store.commit('filterChange', {
          column,
          values: column.filteredValue,
          silent: true
        })
      }
    })
    this.$ready = true
  },
  watch: {
    data: {
      immediate: true,
      handler (val) {
        this.store.commit('setData', val)
      }
    }
  }
}
</script>

<style lang="less">
@import '../table/table.less';
</style>
