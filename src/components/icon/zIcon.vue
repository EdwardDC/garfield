<script>
import _ from '@/libs/util'
export default {
  name: 'zIcon',
  props: {
    value: {
      type: String
    },
    size: {
      type: Number
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconStyle () {
      return {
        'font-size': this.size + 'px',
        'width': this.size + 'px',
        'height': this.size + 'px',
        'color': _.getColor(this.color)
      }
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  },
  render (h) {
    const {value, iconStyle, handleClick} = this
    if (!value) return null
    const isIcon = value.indexOf(':') === 0
    const text = isIcon ? '' : value
    return h('i', {
      class: ['z-icon', isIcon ? value.substring(1) : ''],
      style: iconStyle,
      on: {
        click: handleClick
      }
    }, text)
  }
}
</script>

<style lang="less">
@import '../../assets/css/import.less';
.z-icon {
  font-size: @iconSize;
  cursor: inherit;
}
</style>
