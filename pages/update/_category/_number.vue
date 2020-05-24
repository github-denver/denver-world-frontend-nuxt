<template>
  <div class="container type_write">
    <div class="contents">
      <form method="post" enctype="multipart/form-data" novalidate @submit.prevent="submit">
        <Select :attribute="{ className: 'full' }" :navigation="navigation" :category="information.category" @parentChangeOpt="onChangeOpt" />

        <div class="grp_view">
          <div class="view_head">
            <Input v-model="information.editor.subject" :attribute="{ type: 'text', id: 'subject', title: '제목', className: 'underline', value: information.editor.subject }" />
          </div>
          <!-- // view_head -->

          <client-only>
            <vue-editor v-model="information.editor.content" use-custom-image-handler @image-added="handleImageAdded"></vue-editor>
          </client-only>

          <div class="view_foot">
            <Input v-model="information.editor.thumbnail" :attribute="{ type: 'file', id: 'thumbnail', title: '대표 이미지', className: 'full' }" @parentChangePicture="onChangePicture" />
          </div>
          <!-- // view_foot -->
        </div>
        <!-- // grp_view -->

        <div class="grp_btn">
          <div class="inner_half">
            <nuxt-link :to="{ name: 'list-category-number', params: { category: information.category } }" class="link_g">취소하기</nuxt-link>
          </div>

          <div class="inner_half">
            <button type="submit" class="btn_g btn_action">완료하기</button>
          </div>
        </div>
        <!-- // grp_btn -->
      </form>
    </div>
    <!-- // contents -->
  </div>
  <!-- // container -->
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import Select from '~/components/Select'
import Input from '~/components/Input'

export default {
  components: {
    Select,
    Input
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
                text: '하드웨어',
                value: 'hardware',
                service: 'gallery'
              },
              {
                text: '모바일',
                value: 'mobile',
                service: 'gallery'
              },
              {
                text: '게임',
                value: 'game',
                service: 'gallery'
              },
              {
                text: '영화',
                value: 'video',
                service: 'gallery'
              },
              {
                text: '새소식',
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
            option: [
              {
                text: '음악',
                value: 'music'
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
    ...mapState(['post']),
    ...mapGetters(['isAuthorized'])
  },
  created() {
    this.information.category = this.$route.params.category ? this.$route.params.category : this.$route.name
    this.information.number = this.$route.params.number ? this.$route.params.number : 1

    this.fetchPost({
      category: this.information.category,
      number: this.information.number,
      select: '',
      keyword: ''
    })
      .then((response) => {
        this.loading = false
        console.log('[_number.vue] fetch() → this.loading: ', this.loading)

        console.log('[_number.vue] this.post[0]: ', this.post[0])

        this.information.editor.subject = this.post[0].subject
        this.information.editor.content = this.post[0].content
        this.information.editor.thumbnail = this.post[0].thumbnail
      })
      .catch((error) => {
        alert(error)

        console.error(error)

        console.log('[_number.vue] fetch() → error.response: ', error.response)

        // this.$router.back()
      })
  },
  methods: {
    ...mapActions(['fetchPost', 'updateWrite']),
    onChangeOpt(payload) {
      const { value } = payload
      console.log('[_number.vue] onChangeOpt() → payload: ', payload)

      this.information.category = value
    },
    onChangePicture(payload) {
      this.information.picture.files = payload.get('files')
      console.log('this.information.picture.files: ', this.information.picture.files)

      this.information.picture.result = payload.get('result')
      console.log('this.information.picture.result: ', this.information.picture.result)
    },
    submit() {
      const number = this.information.number
      console.log('[_number.vue] submit() → number: ', number)

      const category = this.information.category
      console.log('[_number.vue] submit() → category: ', category)

      const subject = this.information.editor.subject
      console.log('[_number.vue] submit() → subject: ', subject)

      const content = this.information.editor.content
      console.log('[_number.vue] submit() → content: ', content)

      const thumbnail = this.information.picture.files
      console.log('[_number.vue] submit() → thumbnail: ', thumbnail)

      const formData = new FormData()
      formData.append('number', number)
      formData.append('category', category)
      formData.append('subject', subject)
      formData.append('content', content)
      formData.append('thumbnail', thumbnail)

      // this.$emit('parentSubmit', formData)

      this.updateWrite(formData)
        .then((response) => {
          alert('글 수정에 성공했어요!')

          this.$router.push({
            name: 'list-category-number',
            params: {
              category
            }
          })
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert('로그인해주세요!')
          } else {
            alert('글 수정에 실패했어요.. ㅠㅜ')

            // console.log('[PostCreate.vue] 글 수정에 실패했어요.. ㅠㅜ')
            // console.log('[PostCreate.vue] error.response.data: ', error.response.data)
            // console.log('[PostCreate.vue] error.response.data.message: ', error.response.data.message)
          }
        })
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('picture', file)

      /* api
        .post(`/api/board/${this.category}/upload`, formData)
        .then((result) => {
          const folder = 'uploads'
          const url = result.data.image.imageurl
          // console.log('[Update.vue] methods() → handleImageAdded → url: ', url)

          const name = result.data.image.filename
          // console.log('[Update.vue] methods() → handleImageAdded → name: ', name)

          Editor.insertEmbed(cursorLocation, 'image', `${this.path}${url}`)

          resetUploader()
        })
        .catch((error) => {
          alert('이미지 업로드에 실패했어요.. ㅠㅜ')

          // console.log(error)
        }) */
    }
  },
  middleware: 'isAuthorized'
}
</script>
