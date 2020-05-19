<template>
  <div class="container">
    <div v-if="post && information.service === 'gallery'" class="wrap_visual">
      <div class="inner_g">
        <div class="thumbnail_visual" :style="{ 'background-image': `url('${path}/${uploads}/${post[0].thumbnail}')`, 'background-position': '50% 50%' }"></div>

        <div class="grp_view">
          <div class="view_head outer_cell">
            <Picture :attribute="{ authorized: isAuthorized, user: post[0], picture: post[0].picture, state: 'board' }" />

            <div class="inner_head inner_cell">
              <span class="tit_l">{{ post[0].subject }}</span>

              <div class="info_l">
                <span class="txt_l"><span class="screen_out">작성자</span> {{ post[0].name }}</span>
                <span class="txt_l"><span class="screen_out">등록일</span> {{ post[0].regdate | moment('YY.MM.DD') }}</span>
                <span class="txt_l"><span class="screen_out">조회수</span> {{ post[0].count }}</span>
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

    <div class="contents" :class="classObject">
      <div class="hgrp">
        <nuxt-link :to="{ name: 'list-category', params: { category: information.category } }" class="link_l">{{ information.select.option.text }}</nuxt-link>
      </div>
      <!-- // hgrp -->

      <div v-if="loading" class="grp_message">
        <p class="txt_message">읽어들이는 중..</p>
      </div>
      <!-- // grp_message -->

      <div v-if="post" class="grp_view read">
        <div class="view_head outer_cell">
          <Picture :attribute="{ authorized: '', user: '', picture: post[0].picture, state: 'board' }" />

          <div class="inner_head inner_cell">
            <span class="tit_l">{{ post[0].subject }}</span>

            <div class="info_l">
              <span class="txt_l"><span class="screen_out">작성자</span> {{ post[0].name }}</span>
              <span class="txt_l"><span class="screen_out">등록일</span> {{ post[0].regdate | moment('YY.MM.DD') }}</span>
              <span class="txt_l"><span class="screen_out">조회수</span> {{ post[0].count }}</span>
            </div>
            <!-- // info_l -->
          </div>
          <!-- // inner_head -->
        </div>
        <!-- // view_head -->

        <div class="view_cont">
          <div class="ql-container ql-snow">
            <div class="ql-editor">{{ post[0].content }}</div>
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
          <nuxt-link v-if="false" :to="{ name: 'list-category', params: { category: information.category }, query: { select: '', keyword: '' } }" class="link_g">목록으로</nuxt-link>
          <nuxt-link v-else :to="{ name: 'list-category', params: { category: information.category } }" class="link_g">목록으로</nuxt-link>
        </div>

        <div class="inner_half">
          <nuxt-link :to="{ name: 'index' }" class="link_g link_action">수정하기</nuxt-link>
          <button type="button" class="btn_g btn_delete" @click="onDelete">삭제하기</button>
        </div>
      </div>
      <!-- // grp_btn -->
    </div>
    <!-- // contents -->
  </div>
  <!-- // container -->
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import Picture from '~/components/Picture'

export default {
  components: {
    Picture
  },
  async fetch() {
    console.log('[_number.vue] fetch() → this.$route: ', this.$route)

    this.information.category = this.$route.params.category ? this.$route.params.category : this.$route.name
    this.information.number = this.$route.params.number ? this.$route.params.number : 1

    await this.fetchPost({
      category: this.information.category,
      number: this.information.number,
      select: '',
      keyword: ''
    })
      .then((response) => {
        this.loading = false
        console.log('[_number.vue] fetch() → this.loading: ', this.loading)
      })
      .catch((error) => {
        alert(error)

        console.error(error)

        console.log('[_number.vue] fetch() → error.response: ', error.response)

        // this.$router.back()
      })
  },
  /* asyncData({ params, query }) {
    console.log('[_category.vue] asyncData() → params: ', params)
    console.log('[_category.vue] asyncData() → query: ', query)

    return {}
  }, */
  data() {
    return {
      loading: true,
      navigation: [
        {
          optgroup: {
            text: '새소식',
            value: 'news',
            service: 'board',
            option: [
              {
                text: '많이 본 소식',
                value: 'popular',
                service: 'gallery'
              },
              {
                text: '컴퓨터 &amp; 하드웨어',
                value: 'hardware',
                service: 'gallery'
              },
              {
                text: '모바일 &amp; 태블릿',
                value: 'mobile',
                service: 'gallery'
              },
              {
                text: '신작 게임 &amp; 업데이트 동영상',
                value: 'game',
                service: 'gallery'
              },
              {
                text: '넷플릭스 출시 예정 &amp; 신작 동영상',
                value: 'video',
                service: 'gallery'
              },
              {
                text: '공지사항 &amp; 업데이트',
                value: 'notice',
                service: 'board'
              }
            ]
          }
        },
        {
          optgroup: {
            text: '커뮤니티',
            value: 'community',
            service: 'board',
            option: [
              {
                text: '톡톡 한마디',
                value: 'talk',
                service: 'board'
              },
              {
                text: '이미지 게시판',
                value: 'gallery',
                service: 'gallery'
              }
            ]
          }
        },
        {
          optgroup: {
            text: '자료실',
            value: 'library',
            service: 'gallery',
            option: [
              {
                text: '음악',
                value: 'music',
                service: 'gallery'
              }
            ]
          }
        }
      ],
      information: {
        category: null,
        select: {
          option: {
            text: null,
            value: null
          }
        },
        service: null,
        number: null,
        subject: null,
        thumbnail: null,
        picture: {
          files: null,
          result: null
        },
        editor: {
          category: null,
          subject: null,
          content: null,
          thumbnail: null,
          picture: {
            files: null,
            result: null
          }
        }
      }
    }
  },
  computed: {
    ...mapState(['post', 'search']),
    ...mapGetters(['path', 'uploads']),
    classObject() {
      return {
        active: this.information.service === 'gallery',
        'view-danger': this.information.service === 'gallery'
      }
    }
  },
  created() {
    console.log('2. [_number.vue] created() → this.$route: ', this.$route)

    this.information.category = this.$route.params.category

    this.onChange()
  },
  methods: {
    ...mapActions(['fetchPost', 'searchInfo']),
    onChange() {
      const navigation = this.navigation
      console.log('[_number.vue] methods() → navigation: ', navigation)

      for (const i in navigation) {
        for (const j in navigation[i].optgroup.option) {
          if (this.information.category === navigation[i].optgroup.option[j].value) {
            console.log('[_number.vue] methods() → this.information.category: ', this.information.category)

            this.information.select.option.text = navigation[i].optgroup.option[j].text
            console.log('[_number.vue] this.information.select.option.text: ', this.information.select.option.text)

            this.information.service = navigation[i].optgroup.option[j].service
            console.log('[_number.vue] this.information.service: ', this.information.service)

            // break

            return
          }
        }

        // break
      }
    },
    onDelete() {
      const category = this.category
      console.log('category: ', category)

      /*
      const number = 0

      api
        .get(`/api/board/${category}/delete/${number}`)
        .then((response) => {
          alert('게시물이 삭제됐어요!')

          this.$router.push({
            name: this.$route.params.service === 'notice' || this.$route.params.service === 'talk' ? 'PostList' : 'GalleryList',
            params: {
              service: response.data.service,
              number: '1'
            }
          })
        })
        .catch((error) => {
          // console.log(error.response)

          if (error.response.status === 401) {
            // UnAuthorized
            alert('로그인이 필요해요!')
          } else {
            // alert(error.response.data.message)
          }
        }) */
    }
  }
  /* validate({ params }) {
    const result = params
    console.log('[_category.vue] validate() → result: ', result)

    return result
  } */
}
</script>
