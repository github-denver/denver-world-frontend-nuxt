<template>
  <fragment>
    <p>/update/index.vue</p>
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
  }
  /* validate({ params }) {
    console.log('[index.vue] params: ', params)

    return params
  } */
}
</script>

<style></style>
