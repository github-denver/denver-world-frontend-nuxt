<template>
  <div class="header">
    <div class="inner_header">
      <h1 class="tit_l"><nuxt-link :to="{ name: 'index' }" class="link_l">덴버월드</nuxt-link></h1>

      <button type="button" class="btn_g btn_hamburger" @click="onHamburger">
        <span class="ico_g ico_hamburger">주메뉴 열기</span>
      </button>

      <ul v-if="isAuthorized" class="list_util">
        <li>
          <nuxt-link :to="{ name: 'member-login' }" class="link_util"><span class="ico_g ico_profile">내 정보</span></nuxt-link>
        </li>
        <li>
          <button type="button" class="btn_g" @click="onSignout">
            <span class="ico_g ico_logout">로그아웃</span>
          </button>
        </li>
      </ul>

      <ul v-else class="list_util">
        <li>
          <nuxt-link :to="{ name: 'member-login' }" class="link_util"><span class="ico_g ico_login">로그인</span></nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{ name: 'member-welcome' }" class="link_util"><span class="ico_g ico_join">회원가입</span></nuxt-link>
        </li>
      </ul>

      <Menu v-if="visible" @parentHamburger="onHamburger" />
    </div>
    <!-- // inner_header -->
  </div>
  <!-- // header -->
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

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
  computed: {
    ...mapGetters(['isAuthorized']),
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['signout']),
    onHamburger() {
      this.visible = !this.visible
    },
    onSignout() {
      this.signout()

      alert('로그아웃 됐어요!')
    }
  }
}
</script>
