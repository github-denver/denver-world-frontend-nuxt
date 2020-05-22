<template>
  <div class="container">
    <fragment v-if="!loading">
      <Article
        v-if="information.service === 'gallery'"
        :attribute="{
          loading: loading,
          authorized: isAuthorized,
          category: information.category,
          text: information.select.option.text,
          post: post[0],
          event: onDelete
        }"
      />

      <Normal
        v-if="information.service === 'board'"
        :attribute="{
          loading: loading,
          authorized: isAuthorized,
          category: information.category,
          text: information.select.option.text,
          post: post[0],
          event: onDelete
        }"
      />
    </fragment>
  </div>
  <!-- // container -->
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import Normal from '~/components/Normal'
import Article from '~/components/Article'

export default {
  components: {
    Normal,
    Article
  },
  async fetch() {
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
  asyncData({ params, query }) {
    console.log('[_number.vue] asyncData() → params: ', params)
    console.log('[_number.vue] asyncData() → query: ', query)

    return {
      params,
      query
    }
  },
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
    ...mapGetters(['isAuthorized'])
    /*
    classObject() {
      return {
        active: this.information.service === 'gallery',
        'view-danger': this.information.service === 'gallery'
      }
    }
    */
  },
  mounted() {
    console.log('mounted() { .. } → this.information.service: ', this.information.service)

    console.log('mounted() { .. } → this.post: ', this.post)
  },
  created() {
    // console.log('2. [_number.vue] created() → this.$route: ', this.$route)
    console.log('created() { .. } → this.information.service: ', this.information.service)

    this.visible = this.information.service === 'gallery'
    console.log('created() { .. } → this.visible: ', this.visible)

    this.information.category = this.$route.params.category

    this.onChange()
  },
  methods: {
    ...mapActions(['fetchPost', 'searchInfo']),
    onChange() {
      const navigation = this.navigation
      // console.log('[_number.vue] methods() → navigation: ', navigation)

      for (const i in navigation) {
        for (const j in navigation[i].optgroup.option) {
          if (this.information.category === navigation[i].optgroup.option[j].value) {
            console.log('[_number.vue] onChange() → this.information.category: ', this.information.category)

            this.information.select.option.text = navigation[i].optgroup.option[j].text
            console.log('[_number.vue] onChange() → this.information.select.option.text: ', this.information.select.option.text)

            this.information.service = navigation[i].optgroup.option[j].service
            console.log('[_number.vue] onChange() → this.information.service: ', this.information.service)

            // break

            return
          }
        }

        // break
      }
    },
    onDelete() {
      const category = this.category
      console.log('[_number.vue] onDelete() → category: ', category)

      /*
      const number = 0

      api.get(`/api/board/${category}/delete/${number}`).then((response) => {
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
      })
      */
    }
  },
  validate({ params }) {
    const result = params
    console.log('[_number.vue] validate() → result: ', result)

    return result
  }
}
</script>
