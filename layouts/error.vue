<template>
  <fragment>
    <div v-if="error.statusCode">
      <h2>에러</h2>

      <ul>
        <li><em>error.statusCode</em>: {{ error.statusCode }}</li>
        <li><em>error.path</em>: {{ error.path }}</li>
        <li><em>error.message</em>: {{ error.message }}</li>
      </ul>
    </div>

    <p v-else>에러가 발생되었습니다.</p>

    <nuxt-link :to="{ name: 'index' }">메인으로 이동</nuxt-link>
  </fragment>
</template>

<script>
export default {
  // props: ['error'],
  // layout: 'blog' // you can set a custom layout for the error page
  props: {
    error: {
      type: Object,
      default: () => {},
      required: false
    }
  },
  layout: 'errorLayout',
  fetch() {
    // console.log('typeof this.error: ', typeof this.error)
    // console.log('this.error: ', this.error)
  }
}
</script>
