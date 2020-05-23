<template>
  <div class="wrap_welcome">
    <h1 class="tit_l"><nuxt-link :to="{ name: 'index' }" class="link_l">덴버월드</nuxt-link></h1>

    <div class="inner_welcome">
      <strong class="tit_welcome">환영합니다!</strong>
      <p class="desc_welcome">덴버월드에서 사용할 닉네임과 나머지 정보들을<br />입력해 주실수있으세요?</p>

      <div class="grp_btn">
        <div class="inner_half">
          <nuxt-link :to="{ name: 'index' }" class="link_g">싫어요</nuxt-link>
        </div>

        <div class="inner_half">
          <nuxt-link to="/member/create" class="link_g link_action">좋아요</nuxt-link>
        </div>
      </div>
      <!-- // group-button -->
    </div>
  </div>
  <!-- // welcome -->
</template>

<script>
export default {
  middleware: 'isUnauthorized'
}
</script>
