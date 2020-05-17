<template>
  <div class="grp_profile">
    <nuxt-link :to="{ name: 'member-login' }" class="link_profile">
      <Picture :attribute="{ authorized: isAuthorized, user: user }" />

      <span v-if="user" class="txt_profile">{{ user.name }}</span>
      <span v-else class="txt_profile">로그인해주세요.</span>
    </nuxt-link>
  </div>
  <!-- // grp_profile -->
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import Picture from '~/components/Picture'

export default {
  name: 'Profile',
  components: {
    Picture
  },
  computed: {
    ...mapGetters(['isAuthorized']),
    ...mapState(['user'])
  }
}
</script>
