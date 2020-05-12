<template>
  <fragment>
    <p>params: {{ params }}</p>
    <p>query: {{ query }}</p>
  </fragment>
</template>

<script>
export default {
  asyncData({ params, query }) {
    console.log('1. [index.vue] asyncData() → params: ', params)
    console.log('1. [index.vue] asyncData() → query: ', query)
    console.log()

    return {
      params,
      query
    }
  },
  validate({ params, query }) {
    console.log('2. [index.vue] validate() → params: ', params)
    console.log('2. [index.vue] validate() → query: ', query)
    console.log()

    return {
      params,
      query
    }
  }
}
</script>

<style></style>
