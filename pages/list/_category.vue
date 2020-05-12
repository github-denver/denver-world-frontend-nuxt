<template>
  <fragment>
    <p>variable category: {{ category }}</p>
    <p>variable title: {{ title }}</p>
  </fragment>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: {
    title2: {
      type: String,
      default: ''
    }
  },
  async fetch() {
    console.log('3. [_category.vue] fetch() → this.$route: ', this.$route)
    console.log('3. [_category.vue] fetch() → this.$route.params: ', this.$route.params)

    console.log()

    console.log('3. [_category.vue] fetch() → this.$route.params.category: ', this.$route.params.category)
    const category = this.$route.params.category ? this.$route.params.category : this.$route.name
    console.log('3. [_category.vue] fetch() → category: ', category)

    console.log()

    console.log('3. [_category.vue] fetch() → this.$route.params.number: ', this.$route.params.number)
    const number = this.$route.params.number ? this.$route.params.number : 1
    console.log('3. [_category.vue] fetch() → number: ', number)

    console.log()

    await this.fetchPostList({
      category,
      number,
      select: '',
      keyword: ''
    }).then((response) => {
      console.log('3. [_category.vue] fetch() → response: ', response)

      console.log()

      this.loading = false
      console.log('3. [_category.vue] fetch() → this.loading: ', this.loading)

      console.log()
    })
  },
  asyncData({ params }) {
    console.log('1. [_category.vue] asyncData() → params: ', params)
    console.log('1. [_category.vue] asyncData() → params.category: ', params.category)

    console.log()

    return {
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
    console.log('2. [_category.vue] created() → this.$route: ', this.$route)
    console.log('2. [_category.vue] created() → this.$route.params: ', this.$route.params)
    console.log('2. [_category.vue] created() → this.category: ', this.category)

    console.log('this.title2: ', this.title2)

    console.log()
  },
  methods: {
    ...mapActions(['fetchPostList', 'searchInfo'])
  },
  validate({ params }) {
    const result = params.category
    console.log('?. [_category.vue] validate() → result: ', result)

    console.log()

    return params.category
  }
}
</script>

<style></style>
