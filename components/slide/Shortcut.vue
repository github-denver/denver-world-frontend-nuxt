<template>
  <div class="wrap_shortcut">
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

    <div v-if="attribute.content.list.length" class="grp_shortcut">
      <ul class="list_shortcut">
        <li v-for="(list, index) in attribute.content.list" :key="index">
          <div class="box_shortcut">
            <router-link :key="index" :to="list.url" class="link_shortcut">
              <span class="outer_cell">
                <span class="inner_cell">{{ list.country }}</span>
              </span>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- // wrap_shortcut -->
</template>

<script>
export default {
  name: 'Shortcut',
  props: {
    attribute: {
      type: Object,
      default: () => {},
      required: true
    }
  }
}
</script>
