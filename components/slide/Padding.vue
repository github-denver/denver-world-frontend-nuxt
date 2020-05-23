<template>
  <div class="slide">
    <div class="hgrp">
      <nuxt-link :to="{ name: 'list-category-number', params: { category: attribute.category } }" class="link_l">{{ attribute.select.option.text }}</nuxt-link>
    </div>
    <!-- // hgrp -->

    <div v-if="attribute.content.loading" class="grp_message">
      <p class="txt_message">읽어들이는 중..</p>
    </div>
    <!-- // grp_message -->

    <div v-if="!attribute.content.loading && attribute.content.list.length === 0" class="grp_message">
      <p class="txt_message">글이 존재하지 않습니다.</p>
    </div>
    <!-- // grp_message -->

    <vue-owl-carousel v-if="attribute.content.list.length" :items="attribute.slider.items" :margin="attribute.slider.margin" :stage-padding="attribute.slider.stagePadding" :nav="attribute.slider.nav" :dots="attribute.slider.dots" class="grp_owl">
      <nuxt-link v-for="(data, index) in attribute.content.list" :key="index" :to="{ name: 'read-category-number', params: { category: data.category, number: data.number } }" class="link_owl">
        <div
          class="thumbnail_g"
          :style="{
            'padding-top': attribute.style.thumbnail['padding-top'],
            'background-image': `url('${path}/${uploads}/${data.thumbnail}')`,
            'background-position': attribute.style.thumbnail['background-position']
          }"
        >
          <div class="dimmed_g">
            <div class="subject_g">
              {{ data.subject }}
            </div>
            <!-- // subject_g -->
          </div>
          <!-- // dimmed_g -->
        </div>
        <!-- // thumbnail_g -->
      </nuxt-link>
    </vue-owl-carousel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Padding',
  props: {
    attribute: {
      type: Object,
      default: () => {},
      required: true
    }
  },
  computed: {
    ...mapGetters(['path', 'uploads'])
  }
}
</script>
