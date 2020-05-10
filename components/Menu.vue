<template>
  <div class="grp_menu">
    <div class="inner_scroll">
      <Profile />
      <Gnb />

      <button type="button" class="btn_global btn_close" @click="onHamburger">
        <span class="ico_global ico_close">주메뉴 닫기</span>
      </button>
    </div>
  </div>
</template>

<script>
import Profile from '~/components/Profile'
import Gnb from '~/components/Gnb'

export default {
  name: 'Menu',
  components: {
    Profile,
    Gnb
  },
  methods: {
    onHamburger() {
      this.$emit('parentHamburger')
    }
  }
}
</script>

<style></style>
