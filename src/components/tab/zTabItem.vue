<template>
  <div class="tab-item"
    :class="{
      'active': active,
      'dark-theme': darkTheme,
      'light-theme': lightTheme,
      'card': cardType,
      'border-card': borderType
    }">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'tabItem',
    data () {
      return {
        active: false,
        darkTheme: false,
        lightTheme: false,
        cardType: false,
        borderType: false
      }
    },
    props: {
      tabTheme: {
        type: String,
        default: 'dark'
      },
      tabType: {
        type: String,
        default: 'card'
      },
      label: ''
    },
    computed: {
      owner () {
        let parent = this.$parent
        while (parent && parent.$options.name !== 'tab') {
          parent = parent.$parent
        }
        return parent
      }
    },
    methods: {
      update (index, i) {
        this.active = index === i
      }
    },
    mounted () {
      if (this.tabTheme === 'dark') {
        this.darkTheme = true
      } else {
        this.lightTheme = true
      }
      if (this.tabType === 'card') {
        this.cardType = true
      } else {
        this.borderType = true
      }
      this.owner.addItem(this)
    },
    beforeDestroy () {
      this.owner.removeItem(this)
    }
  }
</script>
<style lang="less">
  .tab {
    .dark {
      .tab-item {
        display: none;
        &.active {
          display: block;
        }
      }
    }
    .tab-item {
      display: none;
      &.active {
        padding: 12px 20px;
        display: block;
      }
    }
  }
</style>
