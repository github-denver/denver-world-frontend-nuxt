<template>
  <p>3-1. pages → _category → [_subCategory → _id.vue]</p>
</template>

<script>
export default {
  asyncData({ params }) {
    console.log('3-1. pages → _category → [_subCategory → _id.vue] → params: ', params)

    return {
      id: params.id
    }
  }
}
</script>
