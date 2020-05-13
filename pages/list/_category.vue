<template>
  <fragment>
    <p>variable service: {{ service }}</p>
    <p>variable category: {{ category }}</p>
    <p>variable title: {{ title }}</p>

    <div class="contents">
      <nuxt-link :to="`/${service}/${category}/list/1`" class="link_local">{{ title }}</nuxt-link>

      <div v-if="loading" class="grp_message">
        <p class="txt_message">읽어들이는 중..</p>
      </div>
      <!-- //grp_message -->

      <div v-if="!loading && posts.length === 0" class="grp_message">
        <p class="text_message">글이 존재하지 않습니다.</p>
      </div>
      <!-- // grp_message -->

      <ul v-if="!loading" class="list_gallery">
        <li v-for="(post, index) in posts" :key="index">
          <nuxt-link :to="`/${category}`" class="link_gallery">
            <div class="thumbnail_global" :style="{ 'padding-top': '56.25%', 'background-image': 'url(http://localhost:4000/uploads/' + post.thumbnail + ')', 'background-position': '50% 50%' }">
              <div class="dimmed_global">
                <div class="subject_global">{{ post.subject }}</div>
              </div>
            </div>
          </nuxt-link>
        </li>
      </ul>

      <div class="group_button">
        <div class="inner_half"></div>
        <div class="inner_half">
          <nuxt-link :to="`/${service}/${category}/create`" class="link_global link_action">글쓰기</nuxt-link>
        </div>
      </div>
      <!-- // group_button -->

      <Pagination :service="service" :category="category" />

      <!-- <Search /> -->
    </div>
    <!-- // contents -->
  </fragment>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Pagination from '~/components/Pagination'
// import Search from '~/components/Search'

export default {
  components: {
    Pagination
    // Search
  },
  async fetch() {
    // console.log('3. [_category.vue] fetch() → this.$route: ', this.$route)
    // console.log('3. [_category.vue] fetch() → this.$route.params: ', this.$route.params)

    // console.log()

    // console.log('3. [_category.vue] fetch() → this.$route.params.category: ', this.$route.params.category)
    const category = this.$route.params.category ? this.$route.params.category : this.$route.name
    // console.log('3. [_category.vue] fetch() → category: ', category)

    // console.log()

    // console.log('3. [_category.vue] fetch() → this.$route.params.number: ', this.$route.params.number)
    const number = this.$route.params.number ? this.$route.params.number : 1
    // console.log('3. [_category.vue] fetch() → number: ', number)

    // console.log()

    await this.fetchPostList({
      category,
      number,
      select: '',
      keyword: ''
    }).then((response) => {
      // console.log('3. [_category.vue] fetch() → response: ', response)

      // console.log()

      this.loading = false
      // console.log('3. [_category.vue] fetch() → this.loading: ', this.loading)

      // console.log()
    })
  },
  asyncData({ params }) {
    // console.log('1. [_category.vue] asyncData() → params: ', params)

    // console.log()

    return {
      service: params.service,
      category: params.category,
      title: params.title
    }
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    ...mapState(['posts', 'search'])
  },
  created() {
    // console.log('2. [_category.vue] created() → this.$route: ', this.$route)
    // console.log('2. [_category.vue] created() → this.$route.params: ', this.$route.params)
    // console.log()
  },
  methods: {
    ...mapActions(['fetchPostList', 'searchInfo'])
  },
  validate({ params }) {
    const result = params.category
    // console.log('?. [_category.vue] validate() → result: ', result)

    // console.log()

    return result
  }
}
</script>
