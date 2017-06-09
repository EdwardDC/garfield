<template>
  <div class="tab">
    <div 
      class="tab-caption"
      :class="{
      'card': cardType,
      'border-card': borderType}">
      <ul :class="{
        'dark-theme': darkTheme,
        'light-theme': lightTheme
      }">
        <li 
          v-for="(item, index) in list" 
          :class="{
            'active': active === index}"
            @click.stop="handleClick($event, index)">{{item.label}}</li>
      </ul>
    </div>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'tab',
    props: {
      defaultIndex: {
        type: Number
      }
    },
    data () {
      return {
        active: -1,
        list: [],
        darkTheme: false,
        lightTheme: false,
        cardType: false,
        borderType: false
      }
    },
    methods: {
      updateItem (index) {
        this.active = index
        this.list.forEach(($vm, i) => {
          $vm.update(index, i)
        })
      },
      handleClick (e, index) {
        if (this.active === index) {
          this.active = -1
        } else {
          this.active = index
        }
        this.updateItem(this.active)
        this.$emit('tab-click', this.active)
      },
      addItem (item) {
        let list = this.list
        !list.includes(item) && list.push(item)
      },
      removeItem (item) {
        let index = this.list.indexOf(item)
        if (index > -1) {
          this.list.splice(index, 1)
        }
      }
    },
    mounted () {
      this.updateItem(this.defaultIndex)
      if (this.list.length) {
        let data = this.list[0]
        this.darkTheme = data.darkTheme
        this.lightTheme = data.lightTheme
        this.cardType = data.cardType
        this.borderType = data.borderType
      }
      // let {'darkTheme', 'lightTheme', 'cardType', 'borderType'} = this.list[0]
      // setTimeout(() => {
      //   this.list.splice(0, 1)
      // }, 2000)
    }
  }
</script>
<style lang="less">
  .tab {
    .card {
      ul {
        background: #2a2a2a;
        margin: 0;
        height: 40px;
        line-height: 40px;
      }
      .dark-theme{
        padding: 0;
        li {
          list-style: none;
          display: inline-block;
          background: #2a2a2a;
          font-size: 16px;
          color: #fff;
          padding: 0 25px;
          /*border-bottom: 1px solid #e5e5e5;*/
          cursor: pointer;
        }
        .active {
          border-bottom: 2px solid #3388ff;
        }
      }
      .light-theme {
        padding: 0;
        border-bottom: 1px solid #e5e5e5;
        li {
          list-style: none;
          display: inline-block;
          padding: 3px 15px;
          /*border-bottom: 1px solid #e5e5e5;*/
          cursor: pointer;
        }
        .active {
          color: #3388ff;
          border-bottom: 2px solid #3388ff;
        }
      }
    }
    .border-card {
      ul {
        background: #2a2a2a;
        margin: 0;
        height: 40px;
        line-height: 40px;
      }
      .dark-theme{
        padding: 0;
        li {
          background: #2a2a2a;
          color: #fff;
          font-size: 14px;
          letter-spacing: 0;
          display: inline-block;
          padding: 0 25px;
          border-right: 1px solid #232323;
          list-style: none;
          cursor: pointer;
        }
        .active {
          color: #1492D2;
          background: #232323;
        }
      }
      .light-theme {
        padding: 0;
        border-bottom: 1px solid #e5e5e5;
        li {
          list-style: none;
          display: inline-block;
          padding: 3px 15px;
          /*border-bottom: 1px solid #e5e5e5;*/
          cursor: pointer;
        }
        .active {
          color: #3388ff;
          border-bottom: 2px solid #3388ff;
        }
      }
    }
    .tab-content {
      background-color: #232323;
      color: #fff;
    }
  }
</style>
