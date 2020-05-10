<template>
  <div class="header">
    <div class="inner_local">
      <h1 class="tit_local">
        <a href="/" class="link_local">덴버월드</a>
      </h1>

      <button type="button" class="btn_global btn_hamburger" @click="onHamburger">
        <span class="ico_global ico_hamburger">주메뉴 열기</span>
      </button>

      <ul class="list_utility">
        <li>
          <a href="/member/login" class="link_utility"><span class="ico_global ico_login">로그인</span></a>
        </li>
        <li>
          <a href="/welcome" class="link_utility"><span class="ico_global ico_join">회원가입</span></a>
        </li>
      </ul>

      <Menu v-if="visible" @parentHamburger="onHamburger" />
    </div>
  </div>
</template>

<script>
import Menu from '~/components/Menu'

export default {
  name: 'Header',
  components: {
    Menu
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    onHamburger() {
      this.visible = !this.visible
    }
  }
}
</script>

<style></style>
