<template>
  <div class="grp_gnb">
    <ul class="list_gnb">
      <li>
        <span class="txt_gnb">새소식</span>
        <ul class="list_lnb">
          <li>
            <nuxt-link :to="{ name: 'list-category-number', params: { category: 'hardware' } }" class="link_lnb" @click.native="$emit('parentHamburger')">컴퓨터 &amp; 하드웨어</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ name: 'list-category-number', params: { category: 'mobile' } }" class="link_lnb" @click.native="$emit('parentHamburger')">모바일 &amp; 태블릿</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ name: 'list-category-number', params: { category: 'game' } }" class="link_lnb" @click.native="$emit('parentHamburger')">신작 게임 &amp; 업데이트</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ name: 'list-category-number', params: { category: 'video' } }" class="link_lnb" @click.native="$emit('parentHamburger')">넷플릭스 출시 예정 &amp; 신작</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ name: 'list-category-number', params: { category: 'notice' } }" class="link_lnb" @click.native="$emit('parentHamburger')">공지사항 &amp; 업데이트</nuxt-link>
          </li>
        </ul>
      </li>
      <li>
        <span class="txt_gnb">커뮤니티</span>
        <ul class="list_lnb">
          <li>
            <nuxt-link :to="{ name: 'list-category-number', params: { category: 'talk' } }" class="link_lnb" @click.native="$emit('parentOnClose')">톡톡 한마디</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ name: 'list-category-number', params: { category: 'gallery' } }" class="link_lnb" @click.native="$emit('parentOnClose')">이미지 게시판</nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <!-- // grp_gnb -->
</template>

<script>
export default {
  name: 'Gnb'
}
</script>
