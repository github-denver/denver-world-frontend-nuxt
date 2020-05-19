<template>
  <div>
    <p>1-1. pages → [_category.vue] → params.category: {{ category }}</p>

    <nuxt-child />
  </div>
</template>

<script>
export default {
  asyncData({ params }) {
    console.log('1-1. pages → [_category.vue] → params.category: ', params)

    return {
      category: params.category
    }
  }
}
</script>
