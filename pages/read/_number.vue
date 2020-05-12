<template>
  <h1>number: {{ number }}</h1>
</template>

<script>
export default {
  asyncData({ params }) {
    console.log('params: ', params)

    return {
      number: params.number
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
