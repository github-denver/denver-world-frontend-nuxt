<template>
  <div class="contents">
    <a href="/gallery/hardware/list/1" class="link_local router-link-exact-active router-link-active">{{ title }}</a>

    <div v-if="loading" class="grp_message">
      <p class="txt_message">읽어들이는 중..</p>
    </div>

    <div v-if="!loading && posts.length === 0" class="grp_message">
      <p class="text_message">글이 존재하지 않습니다.</p>
    </div>

    <ul v-if="!loading" class="list_gallery">
      <li v-for="(post, index) in posts" :key="index">
        <nuxt-link to="/hardware" class="link_gallery">
          <div
            class="thumbnail_global"
            :style="{
              'padding-top': '56.25%',
              'background-image': 'url(http://localhost:4000/uploads/' + post.thumbnail + ')',
              'background-position': '50% 50%'
            }"
          >
            <div class="dimmed_global">
              <div class="subject_global">{{ post.subject }}</div>
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>

    <div class="group_button">
      <div class="inner_half"></div>
      <div class="inner_half"><a href="/board/hardware/create" class="link_global link_action">글쓰기</a></div>
    </div>

    <ul class="list_pagination">
      <li>
        <a href="/gallery/hardware/list/1" class="link_pagination current">1</a>
      </li>
    </ul>

    <div class="group_search">
      <div class="group_select">
        <label for="search" class="label_local"><span class="text_local">제목</span> <span class="icon_global icon_arrow"></span></label>
        <select name="search" class="select_local">
          <option value="subject">제목</option>
          <option value="content">내용</option>
        </select>
      </div>

      <span class="group_field">
        <span class="box_field">
          <input id="keyword" type="search" name="keyword" class="field_local" />
        </span>
      </span>

      <a href="/gallery/hardware/list/1?select=subject&amp;keyword=" class="link_global link_search">검색하기</a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'List',
  async fetch() {
    console.log('[List.vue] this.$route: ', this.$route)
    console.log('[List.vue] this.$route.params: ', this.$route.params)

    console.log()

    console.log('[List.vue] this.$route.name: ', this.$route.name)
    console.log('[List.vue] this.$route.params.category: ', this.$route.params.category)
    const category = this.$route.params.category ? this.$route.params.category : this.$route.name
    console.log('[List.vue] category: ', category)

    console.log()

    console.log('[List.vue] this.$route.params.number: ', this.$route.params.number)
    const number = this.$route.params.number ? this.$route.params.number : 1
    console.log('[List.vue] number: ', number)

    console.log()

    await this.fetchPostList({
      category,
      number,
      select: '',
      keyword: ''
    }).then((response) => {
      this.loading = false
      console.log('[List.vue] this.loading: ', this.loading)
    })
  },
  data() {
    return {
      loading: true
    }
  },
  // fetchOnServer: false,
  computed: {
    ...mapState(['posts', 'search'])
  },
  created() {
    // console.log('# this.$route: ', this.$route)
    // console.log('# this.$route.params: ', this.$route.params)

    this.title = this.$route.params.title
    console.log('[List.vue] this.title: ', this.title)

    console.log()
  },
  methods: {
    ...mapActions(['fetchPostList', 'searchInfo'])
  }
}
</script>

<style></style>
