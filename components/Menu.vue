<template>
  <div class="grp_menu">
    <div class="inner_menu">
      <Profile />

      <Gnb @parentHamburger="onHamburger" />

      <button type="button" class="btn_g btn_close" @click="onHamburger">
        <span class="ico_g ico_close">주메뉴 닫기</span>
      </button>
    </div>
    <!-- // inner_menu -->
  </div>
  <!-- // grp_menu -->
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
