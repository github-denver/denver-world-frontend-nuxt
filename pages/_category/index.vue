<template>
  <p>1-2. pages → [_category → index.vue]</p>
</template>

<script>
export default {
  asyncData({ params }) {
    console.log('1-2. pages → [_category → index.vue] → params: ', params)

    return {
      params
    }
  }
}
</script>
