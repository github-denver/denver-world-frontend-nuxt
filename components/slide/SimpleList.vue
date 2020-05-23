<template>
  <div class="wrap_simple">
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

    <ul v-if="attribute.content.list.length" class="list_simple">
      <li v-for="(data, index) in attribute.content.list" :key="index">
        <nuxt-link :to="{ name: 'read-category-number', params: { category: attribute.category, number: data.number } }" class="link_simple">
          {{ data.subject }}
        </nuxt-link>
      </li>
    </ul>
  </div>
  <!-- // wrap_simple -->
</template>

<script>
export default {
  name: 'SimpleList',
  props: {
    attribute: {
      type: Object,
      default: () => {},
      required: true
    }
  }
}
</script>
