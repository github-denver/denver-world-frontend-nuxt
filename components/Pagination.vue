<template>
  <ul v-if="search.keyword" class="list_pagination">
    <li v-if="pagination.current > 1">
      <nuxt-link :to="{ name: 'list-category-number', params: { service: service, category: category, number: (pagination.current - 1).toString() }, query: { select: search.select, keyword: search.keyword } }" class="link_pagination">이전</nuxt-link>
    </li>
    <li v-for="(i, index) in paginate" :key="index">
      <nuxt-link v-if="pagination.current === i" :to="{ name: 'list-category-number', params: { service: service, category: category, number: i.toString() }, query: { select: search.select, keyword: search.keyword } }" class="link_pagination current">{{ i }}</nuxt-link>
      <nuxt-link v-else :to="{ name: 'list-category-number', params: { service: service, category: category, number: i.toString() }, query: { select: search.select, keyword: search.keyword } }" class="link_pagination">{{ i }}</nuxt-link>
    </li>
    <li v-if="pagination.current < pagination.total">
      <nuxt-link :to="{ name: 'list-category-number', params: { service: service, category: category, number: (pagination.current + 1).toString() }, query: { select: search.select, keyword: search.keyword } }" class="link_pagination">다음</nuxt-link>
    </li>
  </ul>

  <ul v-else class="list_pagination">
    <li v-if="pagination.current > 1">
      <nuxt-link :to="{ name: 'list-category-number', params: { service: service, category: category, number: (pagination.current - 1).toString() } }" class="link_pagination">이전</nuxt-link>
    </li>
    <li v-for="(i, index) in paginate" :key="index">
      <nuxt-link v-if="pagination.current === i" :key="i" :to="{ name: 'list-category-number', params: { service: service, category: category, number: i.toString() } }" class="link_pagination current">{{ i }}</nuxt-link>

      <nuxt-link v-else :to="{ name: 'list-category-number', params: { service: service, category: category, number: i.toString() } }" class="link_pagination">{{ i }}</nuxt-link>
    </li>
    <li v-if="pagination.current < pagination.total">
      <nuxt-link :to="{ name: 'list-category-number', params: { service: service, category: category, number: (pagination.current + 1).toString() } }" class="link_pagination">다음</nuxt-link>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Pagination',
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
  computed: {
    ...mapState(['pagination', 'search']),
    paginate() {
      const paginate = []

      for (let i = this.pagination.start; i <= this.pagination.end; i++) {
        paginate.push(i)
      }

      return paginate
    }
  },
  created() {
    console.log('[Pagination.vue] created() { .. }')
    console.log('this.service: ', this.service)
    console.log('this.category: ', this.category)
  }
}
</script>
