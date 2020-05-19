<template>
  <fragment>
    <p>params: {{ params }}</p>
    <p>query: {{ query }}</p>
  </fragment>
</template>

<script>
export default {
  asyncData({ params, query }) {
    console.log('params: ', params)

    return {
      params,
      query
    }
  },
  validate({ params }) {
    const number = /^\d+$/.test(params.number)
    console.log('[_number.vue] number: ', number)

    return number
  }
}
</script>

<style></style>
