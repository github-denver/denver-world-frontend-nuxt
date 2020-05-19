<template>
  <div>
    <p>2-2. pages → _category → [_subCategory → index.vue]</p>
  </div>
</template>

<script>
export default {
  asyncData({ params }) {
    console.log('2-2. pages → _category → [_subCategory → index.vue] → params: ', params)

    return {
      params
    }
  }
}
</script>
