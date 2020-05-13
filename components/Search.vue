<template>
  <form novalidate @submit.prevent="submit">
    <div class="group_search">
      <div class="group_select">
        <label for="search" class="label_local">
          <span class="text_local">{{ select.text }}</span>
          <span class="icon_global icon_arrow"></span>
        </label>

        <select v-model="select.value" name="search" class="select_local" @change="onChange">
          <option value="subject">제목</option>
          <option value="content">내용</option>
          <option value="writer">작성자</option>
        </select>
      </div>
      <!-- // group_select -->

      <Input v-model="keyword" :attribute="{ type: 'search', name: 'keyword', id: 'keyword' }" />

      <router-link :to="{ name: this.$route.params.service === 'notice' || this.$route.params.service === 'talk' ? 'PostList' : 'GalleryList', params: { service: category.value, number: '1' }, query: { select: select.value, keyword: keyword } }" class="link_global link_search" @click.native="submit"
        >검색하기</router-link
      >
    </div>
    <!-- // group_search -->
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Search'
}
</script>
