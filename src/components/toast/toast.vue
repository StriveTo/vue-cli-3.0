<template>
  <div class="qb-toast" :class="[position]">
    <qb-popup
      :value="visible"
      @hide="$_onHide"
      :hasMask="hasMask"
      :maskClosable="false"
    >
      <div class="qb-toast-content">
        <qb-icon v-if="icon" :name="icon" size="lg" :svg="iconSvg"/>
        <div class="qb-toast-text" v-if="content" v-text="content"></div>
      </div>
    </qb-popup>
  </div>
</template>

<script>
import Popup from '../popup'
import Icon from '../icon'

export default {
  name: 'qb-toast',

  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
  },

  props: {
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    content: {
      type: [String, Number],
      default: '',
    },
    duration: {
      type: Number,
      default: 0,
    },
    position: {
      // top, left, bottom
      type: String,
      default: 'center',
    },
    hasMask: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      visible: true,
    }
  },

  beforeDestroy() {
    if (this.$_timer) {
      clearTimeout(this.$_timer)
    }
  },

  methods: {
    $_onHide() {
      this.$emit('hide')
    },
    fire() {
      if (this.$_timer) {
        clearTimeout(this.$_timer)
      }
      if (this.visible && this.duration) {
        this.$_timer = setTimeout(() => {
          this.hide()
        }, this.duration)
      }
    },
    hide() {
      this.visible = false
    },
  },
}

</script>

<style lang="stylus">
.qb-toast
  .qb-popup
    z-index toast-zindex
  .qb-icon
    flex-shrink 0
    color toast-color
  .qb-icon + .qb-toast-text
    margin-left h-gap-xs
  .qb-popup
    .qb-popup-box
      width 540px
      display flex
      justify-content center
    .qb-popup-mask
      background transparent
  &.bottom
    .qb-popup .qb-popup-box
      position absolute
      bottom 50px
  &.top
    .qb-popup .qb-popup-box
      position absolute
      top 50px

.qb-toast-content
  display inline-flex
  align-items center
  max-width 100%
  min-width 80px
  padding toast-padding
  border-radius toast-radius
  font-size toast-font-size
  text-align left
  line-height 1.42857142
  color toast-color
  background-color toast-fill
  box-sizing border-box
  overflow hidden

.qb-toast-text
  white-space nowrap
  text-overflow: ellipsis
  overflow hidden
</style>
