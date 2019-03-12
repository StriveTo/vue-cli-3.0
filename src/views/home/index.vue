<template>
  <div class="home">
    Hello World!
    <qb-button type='primary'>Primary</qb-button>
  </div>
</template>

<script>
import Button from '@/components/button/index.vue'

export default {
  name: 'home',
  components: {
    [Button.name]: Button,
  },
}
</script>
<style scoped lang="stylus">

</style>
