<template>
  <fragment>
    <div v-if="attribute.loading" class="grp_message">
      <p class="txt_message">읽어들이는 중..</p>
    </div>
    <!-- // grp_message -->

    <div v-if="attribute.post" class="wrap_visual">
      <div class="inner_g">
        <div class="thumbnail_visual" :style="{ 'background-image': `url('${path}/${uploads}/${attribute.post.thumbnail}')`, 'background-position': '50% 50%' }"></div>

        <div class="grp_view">
          <div class="view_head outer_cell">
            <Picture :attribute="{ authorized: attribute.authorized, user: attribute.post, picture: attribute.post.picture, state: 'board' }" />

            <div class="inner_head inner_cell">
              <span class="tit_l">{{ attribute.post.subject }}</span>

              <div class="info_l">
                <span class="txt_l"><span class="screen_out">작성자</span> {{ attribute.post.name }}</span>
                <span class="txt_l"><span class="screen_out">등록일</span> {{ attribute.post.regdate | moment('YY.MM.DD') }}</span>
                <span class="txt_l"><span class="screen_out">조회수</span> {{ attribute.post.count }}</span>
              </div>
              <!-- // info_l -->
            </div>
            <!-- // inner_head -->
          </div>
          <!-- // view_head -->
        </div>
        <!-- // grp_view -->
      </div>
      <!-- // inner_g -->
    </div>
    <!-- // wrap_visual -->

    <div v-if="attribute.post" class="contents">
      <div class="grp_view">
        <div class="view_cont">
          <div class="ql-container ql-snow">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="ql-editor" v-html="attribute.post.content"></div>
            <!-- eslint-enable -->
          </div>

          <client-only>
            <vue-editor></vue-editor>
          </client-only>
        </div>
        <!-- // view_cont -->
      </div>
      <!-- // grp_view -->

      <div class="grp_btn">
        <div class="inner_half">
          <nuxt-link v-if="false" :to="{ name: 'list-category-number', params: { category: attribute.category, number: attribute.page }, query: { select: '', keyword: '' } }" class="link_g">목록으로</nuxt-link>
          <nuxt-link v-else :to="{ name: 'list-category-number', params: { category: attribute.category, number: attribute.page } }" class="link_g">목록으로</nuxt-link>
        </div>

        <div class="inner_half">
          <nuxt-link :to="{ name: 'update-category-number' }" class="link_g link_action">수정하기</nuxt-link>
          <button type="button" class="btn_g btn_delete" v-on="attribute.event ? { click: attribute.event } : null">삭제하기</button>
        </div>
      </div>
      <!-- // grp_btn -->
    </div>
    <!-- // contents -->
  </fragment>
</template>

<script>
import { mapGetters } from 'vuex'

import Picture from '~/components/Picture'

export default {
  name: 'Article',
  components: {
    Picture
  },
  props: {
    attribute: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['path', 'uploads'])
  }
}
</script>
