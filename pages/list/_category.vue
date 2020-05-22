<template>
  <div class="container">
    <div class="contents">
      <div class="hgrp">
        <nuxt-link :to="{ name: 'list-category', params: { category: information.category } }" class="link_l">{{ information.select.option.text }}</nuxt-link>
      </div>
      <!-- // hgrp -->

      <div v-if="loading" class="grp_message">
        <p class="txt_message">읽어들이는 중..</p>
      </div>
      <!-- // grp_message -->

      <div v-if="!loading && posts.length === 0" class="grp_message">
        <p class="txt_message">글이 존재하지 않습니다.</p>
      </div>
      <!-- // grp_message -->

      <fragment v-if="!loading">
        <ul v-if="information.service === 'gallery'" class="list_gallery">
          <li v-for="(post, index) in posts" :key="index">
            <nuxt-link :to="{ name: 'read-category-number', params: { category: information.category, number: post.number } }" class="link_gallery">
              <div class="thumbnail_g" :style="{ 'padding-top': '56.25%', 'background-image': 'url(http://localhost:4000/uploads/' + post.thumbnail + ')', 'background-position': '50% 50%' }">
                <div class="dimmed_g">
                  <div class="subject_g">{{ post.subject }}</div>
                </div>
              </div>
            </nuxt-link>
          </li>
        </ul>

        <ul v-if="information.service === 'board'" class="list_board">
          <li v-for="post in posts" :key="post.number">
            <nuxt-link :to="{ name: 'read-category-number', params: { category: information.category, number: post.number } }" class="grp_view">
              <div class="view_head outer_cell">
                <Picture :attribute="{ picture: post.picture, state: 'board' }" />

                <div class="inner_head inner_cell">
                  <span class="inner_head">{{ post.subject }}</span>

                  <div class="info_l">
                    <span class="txt_l"><span class="screen_out">작성자</span> {{ post.name }}</span>
                    <span class="txt_l"><span class="screen_out">등록일</span> {{ post.regdate | moment('YY.MM.DD') }}</span>
                    <span class="txt_l"><span class="screen_out">조회수</span> {{ post.count }}</span>
                  </div>
                  <!-- // info_l -->
                </div>
                <!-- // inner_head -->
              </div>
              <!-- // view_head -->
            </nuxt-link>
          </li>
        </ul>
      </fragment>

      <div class="grp_btn">
        <div class="inner_half">&nbsp;</div>
        <div class="inner_half">
          <nuxt-link :to="{ name: 'create-category', params: { category: information.category } }" class="link_g link_action">글쓰기</nuxt-link>
        </div>
      </div>
      <!-- // grp_btn -->

      <Pagination :service="information.service" :category="information.category" />

      <Search :service="information.service" :category="information.category" :number="information.number" />
    </div>
    <!-- // contents -->
  </div>
  <!-- // container -->
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Picture from '~/components/Picture'
import Pagination from '~/components/Pagination'
import Search from '~/components/Search'

export default {
  components: {
    Picture,
    Pagination,
    Search
  },
  async fetch() {
    console.log('[_category.vue] fetch() → this.$route: ', this.$route)

    this.information.category = this.$route.params.category ? this.$route.params.category : this.$route.name
    this.information.number = this.$route.params.number ? this.$route.params.number : 1

    await this.fetchPostList({
      category: this.information.category,
      number: this.information.number,
      select: '',
      keyword: ''
    })
      .then((response) => {
        this.loading = false
        console.log('[_category.vue] fetch() → this.loading: ', this.loading)
      })
      .catch((error) => {
        alert(error)

        console.error(error)

        console.log('[_category.vue] fetch() → error.response: ', error.response)

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
    ...mapState(['posts', 'search'])
  },
  created() {
    // console.log('[_category.vue] created() → this.$route: ', this.$route)

    this.information.category = this.$route.params.category

    this.onChange()
  },
  methods: {
    ...mapActions(['fetchPostList', 'searchInfo']),
    onChange() {
      console.log('★ 1. [_category.vue] methods() → this.information.category: ', this.information.category)

      const navigation = this.navigation
      // console.log('★ 2. [_category.vue] methods() → navigation: ', navigation)

      for (const i in navigation) {
        console.log('★ 3. navigation[i].optgroup.option: ', navigation[i].optgroup.option)

        for (const j in navigation[i].optgroup.option) {
          console.log('★ 4. navigation[i].optgroup.option[j].value: ', navigation[i].optgroup.option[j].value)

          if (this.information.category === navigation[i].optgroup.option[j].value) {
            console.log('☆ 5. [_category.vue] methods() → this.information.category: ', this.information.category)

            this.information.select.option.text = navigation[i].optgroup.option[j].text
            console.log('☆ 6. [_category.vue] this.information.select.option.text: ', this.information.select.option.text)

            this.information.service = navigation[i].optgroup.option[j].service
            console.log('☆ 7. [_category.vue] this.information.service: ', this.information.service)

            // break

            return
          }
        }

        // break
      }
    }
  }
  /* validate({ params }) {
    const result = params
    console.log('[_category.vue] validate() → result: ', result)

    return result
  } */
}
</script>
