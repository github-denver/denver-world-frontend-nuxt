<template>
  <fragment>
    <ul class="list_gnb">
      <li>
        <span class="txt_gnb">새소식</span>
        <ul class="list_lnb">
          <li>
            <nuxt-link :to="{ name: 'hardware', params: { category: 'hardware', title: '컴퓨터 &amp; 하드웨어' } }" class="link_lnb"
              >컴퓨터 &amp; 하드웨어</nuxt-link
            >
          </li>
          <li>
            <nuxt-link :to="{ name: 'mobile', params: { category: 'mobile', title: '모바일 &amp; 태블릿' } }" class="link_lnb">모바일 &amp; 태블릿</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ name: 'game', params: { category: 'game', title: '신작 게임 &amp; 업데이트' } }" class="link_lnb"
              >신작 게임 &amp; 업데이트</nuxt-link
            >
          </li>
          <li>
            <nuxt-link :to="{ name: 'video', params: { category: 'video', title: '넷플릭스 출시 예정 &amp; 신작' } }" class="link_lnb"
              >넷플릭스 출시 예정 &amp; 신작</nuxt-link
            >
          </li>
          <li>
            <nuxt-link :to="{ name: 'notice', params: { category: 'notice', title: '공지사항 &amp; 업데이트' } }" class="link_lnb"
              >공지사항 &amp; 업데이트</nuxt-link
            >
          </li>
        </ul>
      </li>
      <li>
        <span class="txt_gnb">커뮤니티</span>
        <ul class="list_lnb">
          <li>
            <nuxt-link :to="{ name: 'talk', params: { category: 'talk' } }" class="link_lnb">톡톡 한마디</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ name: 'gallery', params: { category: 'gallery' } }" class="link_lnb">이미지 게시판</nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </fragment>
</template>

<script>
export default {
  name: 'Gnb'
}
</script>

<style></style>
