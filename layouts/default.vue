<template>
  <fragment>
    <Header />
    <div class="container">
      <nuxt />
    </div>
  </fragment>
</template>

<script>
import Header from '~/components/Header'

export default {
  name: 'Default',
  components: {
    Header
  }
}
</script>

<style></style>
