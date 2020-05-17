<template>
  <div v-if="attribute.state !== 'board'" :class="['grp_picture', attribute.className]">
    <img v-if="attribute.authorized" :src="!!attribute.picture ? attribute.picture : `${path}/${uploads}/${user.picture}`" class="thumbnail_l 111" :alt="user.name" />
    <img v-else :src="!!attribute.picture ? attribute.picture : `${path}/${uploads}/default_picture.png`" class="thumbnail_l 222" alt="" />

    <slot name="upload"></slot>
  </div>

  <div v-else :class="['grp_picture', attribute.className]">
    <img :src="`${path}/${uploads}/${attribute.picture}`" class="thumbnail_l" alt="" />

    <slot name="upload"></slot>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

// import Upload from '~/components/Upload'

export default {
  name: 'Picture',
  // components: { Upload },
  props: {
    attribute: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['path', 'uploads']),
    ...mapState(['user'])
  },
  methods: {}
}
</script>
