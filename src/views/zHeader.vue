<template lang="html">
  <header class="header">
    <img :src="logo" alt="logo" class="header-logo">
    <ul class="header-operations">
      <li>1233444</li>
      <li>666666</li>
    </ul>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import zAvatar from '@/components/avarta'
import logo from '@/assets/images/logo.png'
export default {
  name: 'zHeader',
  components: {
    zAvatar
  },
  data () {
    return {
      logo: logo
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  watch: {
    '$route' (newVal, oldVal) {
      // var name = newVal.path
      // if (newVal) {
      //   if (name.indexOf('product-list') > -1) {
      //     this.activeIndex = 'product-list'
      //   } else if (name.indexOf('org') > -1) {
      //     this.activeIndex = 'org'
      //   } else if (name.indexOf('combination') > -1) {
      //     this.activeIndex = 'combination'
      //   } else if (name.indexOf('analysis') > -1) {
      //     this.activeIndex = 'analysis'
      //   } else if (name.indexOf('config') > -1) {
      //     this.activeIndex = 'config'
      //   }
      // }
    }
  }
}
</script>
