<template>
  <form novalidate @submit.prevent="submit">
    <div class="grp_search">
      <div class="grp_opt">
        <label for="search" class="lab_opt">
          <span class="txt_opt">{{ select.text }}</span>
          <span class="ico_g ico_opt"></span>
        </label>

        <select v-model="select.value" name="search" class="opt_l" @change="onChange">
          <option value="subject">제목</option>
          <option value="content">내용</option>
          <option value="writer">작성자</option>
        </select>
      </div>
      <!-- // grp_opt -->

      <Input v-model="keyword" :attribute="{ type: 'search', name: 'keyword', id: 'keyword' }" />

      <nuxt-link :to="{ name: 'list-category-number', params: { service: category }, query: { select: select.value, keyword: keyword } }" class="link_g link_search" @click.native="submit">검색하기</nuxt-link>
    </div>
    <!-- // grp_search -->
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Input from '~/components/Input'

export default {
  name: 'Search',
  components: { Input },
  props: {
    service: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    number: {
      type: Number,
      default: 0,
      required: false
    }
  },
  data() {
    return {
      select: {
        text: '제목',
        value: 'subject'
      },
      keyword: ''
    }
  },
  computed: {
    ...mapState(['search'])
  },
  created() {
    this.keyword = this.search.keyword
    console.log('[Search.vue] created() → this.keyword: ', this.keyword)
  },
  methods: {
    ...mapActions(['fetchPostList']),
    onChange(event) {
      this.select.text = event.target.options[event.target.selectedIndex].text
      console.log('[Search.vue] methods() → onChange → this.select.text: ', this.select.text)

      this.select.value = event.target.value
      console.log('[Search.vue] methods() → onChange → this.select.text: ', this.select.value)
    },
    submit() {
      this.fetchPostList({
        category: this.category,
        number: 1,
        select: this.select.value,
        keyword: this.keyword
      })
    }
  }
}
</script>
