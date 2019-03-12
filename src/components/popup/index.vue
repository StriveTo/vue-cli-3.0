<template>
  <div
    v-show="isPopupShow"
    class="qb-popup"
    :class="[
      hasMask ? 'with-mask' : '',
      position
    ]"
  >
    <transition name="qb-mask-fade">
      <div
        v-show="hasMask && isPopupBoxShow"
        @click="$_onPopupMaskClick"
        class="qb-popup-mask"
      ></div>
    </transition>
    <qb-transition
      :name="transition"
      @before-enter="$_onPopupTransitionStart"
      @before-leave="$_onPopupTransitionStart"
      @after-enter="$_onPopupTransitionEnd"
      @after-leave="$_onPopupTransitionEnd"
    >
      <div
        v-show="isPopupBoxShow"
        class="qb-popup-box"
        :class="[
          transition
        ]"
      >
        <slot></slot>
      </div>
    </qb-transition>
  </div>
</template>

<script>
import Transition from '../transition'
import popupMixin from './mixins'

export default {
  name: 'qb-popup',

  mixins: [popupMixin],

  components: {
    'qb-transition': Transition,
  },

  props: {
    position: {
      type: String,
      default: 'center',
    },
    transition: {
      type: String,
      default() {
        switch (this.position) {
          case 'bottom':
            return 'qb-slide-up'
          /* istanbul ignore next */
          case 'top':
            return 'qb-slide-down'
          /* istanbul ignore next */
          case 'left':
            return 'qb-slide-right'
          /* istanbul ignore next */
          case 'right':
            return 'qb-slide-left'
          default:
            return 'qb-fade' // fade/fade-bounce/fade-slide/fade-zoom
        }
      },
    },
    preventScroll: {
      type: Boolean,
      default: false,
    },
    preventScrollExclude: {
      type: [String, Function],
      default() {
        return ''
      },
    },
    // Mixin Props
    // value: {
    //   type: Boolean,
    //   default: false,
    // },
    // hasMask: {
    //   type: Boolean,
    //   default: true,
    // },
    // maskClosable: {
    //   type: Boolean,
    //   default: true,
    // },
  },

  data() {
    return {
      // controle popup mask & popup box
      isPopupShow: false,
      // controle popup box
      isPopupBoxShow: false,
      // transtion lock
      isAnimation: false,
    }
  },

  watch: {
    value(val) {
      /* istanbul ignore next */
      if (val) {
        if (this.isAnimation) {
          setTimeout(() => {
            this.$_showPopupBox()
          }, 50)
        } else {
          this.$_showPopupBox()
        }
      } else {
        this.$_hidePopupBox()
      }
    },
    preventScrollExclude(val, oldVal) {
      // remove old listener before add
      /* istanbul ignore next */
      this.$_preventScrollExclude(false, oldVal)
      /* istanbul ignore next */
      this.$_preventScrollExclude(true, val)
    },
  },

  mounted() {
    this.value && this.$_showPopupBox()
  },

  methods: {
    // MARK: private methods
    $_showPopupBox() {
      this.isPopupShow = true
      this.isAnimation = true
      // popup box enter the animation after popup show
      this.$nextTick(() => {
        this.isPopupBoxShow = true
        /* istanbul ignore if */
        if (process.env.NODE_ENV === 'test') {
          this.$_onPopupTransitionStart()
          this.$_onPopupTransitionEnd()
        }
      })

      this.preventScroll && this.$_preventScroll(true)
    },
    $_hidePopupBox() {
      this.isAnimation = true
      this.isPopupBoxShow = false
      this.preventScroll && this.$_preventScroll(false)
      this.$emit('input', false)
      /* istanbul ignore if */
      if (process.env.NODE_ENV === 'test') {
        this.$_onPopupTransitionStart()
        this.$_onPopupTransitionEnd()
      }
    },
    $_preventScroll(isBind) {
      const handler = isBind ? 'addEventListener' : 'removeEventListener'
      const masker = this.$el.querySelector('.qb-popup-mask')
      const boxer = this.$el.querySelector('.qb-popup-box')

      masker && masker[handler]('touchmove', this.$_preventDefault, false)
      boxer && boxer[handler]('touchmove', this.$_preventDefault, false)
      this.$_preventScrollExclude(isBind)
    },
    $_preventScrollExclude(isBind, preventScrollExclude) {
      const handler = isBind ? 'addEventListener' : 'removeEventListener'
      preventScrollExclude = preventScrollExclude || this.preventScrollExclude
      const excluder =
        preventScrollExclude && typeof preventScrollExclude === 'string'
          ? this.$el.querySelector(preventScrollExclude)
          : preventScrollExclude
      excluder && excluder[handler]('touchmove', this.$_stopImmediatePropagation, false)
    },
    $_preventDefault(event) {
      event.preventDefault()
    },
    $_stopImmediatePropagation(event) {
      /* istanbul ignore next */
      event.stopImmediatePropagation()
    },

    // MARK: event handler
    $_onPopupTransitionStart() {
      if (!this.isPopupBoxShow) {
        this.$emit('beforeHide')
        this.$emit('before-hide')
      } else {
        this.$emit('beforeShow')
        this.$emit('before-show')
      }
    },
    $_onPopupTransitionEnd() {
      /* istanbul ignore next */
      if (!this.isAnimation) {
        return
      }

      /* istanbul ignore next */
      if (!this.isPopupBoxShow) {
        // popup hide after popup box finish animation
        this.isPopupShow = false
        this.$emit('hide')
      } else {
        this.$emit('show')
      }

      /* istanbul ignore next */
      this.isAnimation = false
    },
    $_onPopupMaskClick() {
      if (this.maskClosable) {
        this.$_hidePopupBox()
        this.$emit('maskClick')
      }
    },
  },
}

</script>

<style lang="stylus">
.qb-popup
  absolute-pos()
  position fixed
  display flex
  pointer-events none
  z-index popup-zindex

  &.center
    align-items center
    justify-content center

  &.top
    flex-direction column
    justify-content flex-start
    .qb-popup-box
      width 100%

  &.bottom
    flex-direction column
    justify-content flex-end
    .qb-popup-box
      width 100%

  &.left
    justify-content flex-start
    .qb-popup-box
      height 100%

  &.right
    justify-content flex-end
    .qb-popup-box
      height 100%

  &.inner-popup .qb-popup-box
    background-color color-bg-inverse
    border-radius popup-title-bar-radius popup-title-bar-radius 0 0

.qb-popup-mask
  absolute-pos()
  position absolute
  pointer-events auto
  z-index 1
  background-color popup-mask-bg

.qb-popup-box
  position relative
  pointer-events auto
  z-index 2
  max-width 100%
  max-height 100%
  overflow auto

.qb-mask-fade
  &-enter, &-leave-to
    opacity 0.01
  &-enter-active, &-leave-active
    transition opacity 250ms
</style>
