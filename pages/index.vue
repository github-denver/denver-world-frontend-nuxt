<template>
  <div class="container">
    <div class="contents">
      <client-only>
        <Padding
          :attribute="{
            category: 'popular',
            select: {
              option: {
                text: '많이 본 소식'
              }
            },
            content: popular,
            style: {
              thumbnail: {
                'padding-top': '56.25%',
                'background-position': '50% 50%'
              }
            },
            slider: {
              items: 1,
              margin: 10,
              stagePadding: 10,
              nav: false,
              dots: false
            }
          }"
        />

        <Shortcut
          :attribute="{
            category: 'category',
            select: {
              option: {
                text: '카테고리'
              }
            },
            content: category,
            slider: {
              items: 1,
              margin: 10,
              stagePadding: 10,
              nav: false,
              dots: false
            }
          }"
        />

        <Padding
          :attribute="{
            category: 'hardware',
            select: {
              option: {
                text: '하드웨어'
              }
            },
            content: hardware,
            style: {
              thumbnail: {
                'padding-top': '56.25%',
                'background-position': '50% 50%'
              }
            },
            slider: {
              items: 1,
              margin: 10,
              stagePadding: 20,
              nav: false,
              dots: false
            }
          }"
        />

        <Padding
          :attribute="{
            category: 'mobile',
            select: {
              option: {
                text: '모바일'
              }
            },
            content: mobile,
            style: {
              thumbnail: {
                'padding-top': '56.25%',
                'background-position': '50% 50%'
              }
            },
            slider: {
              items: 1,
              margin: 10,
              stagePadding: 20,
              nav: false,
              dots: false
            }
          }"
        />

        <Padding
          :attribute="{
            category: 'game',
            select: {
              option: {
                text: '게임'
              }
            },
            content: game,
            style: {
              thumbnail: {
                'padding-top': '56.25%',
                'background-position': '50% 50%'
              }
            },
            slider: {
              items: 1,
              margin: 10,
              stagePadding: 20,
              nav: false,
              dots: false
            }
          }"
        />

        <Padding
          :attribute="{
            category: 'video',
            select: {
              option: {
                text: '영화'
              }
            },
            content: video,
            style: {
              thumbnail: {
                'padding-top': '133.3333333333333%',
                'background-position': '50% 50%'
              }
            },
            slider: {
              items: 2,
              margin: 10,
              stagePadding: 20,
              nav: false,
              dots: false
            }
          }"
        />

        <SimpleList
          :attribute="{
            category: 'talk',
            select: {
              option: {
                text: '톡톡 한마디'
              }
            },
            content: talk
          }"
        />

        <SimpleList
          :attribute="{
            category: 'notice',
            select: {
              option: {
                text: '새소식'
              }
            },
            content: notice
          }"
        />
      </client-only>
      <!-- // links -->
    </div>
    <!-- // contents -->
  </div>
</template>

<script>
import Padding from '~/components/slide/Padding.vue'
import Shortcut from '~/components/slide/Shortcut.vue'
import SimpleList from '~/components/slide/SimpleList.vue'

export default {
  components: {
    Padding,
    Shortcut,
    SimpleList
  },
  async fetch() {
    await this.$axios
      .get('/api/', { headers: { Pragma: 'no-cache' } })
      .then((response) => {
        this.popular.list = response.data.popular
        this.popular.loading = !this.popular.loading

        this.category.list = response.data.category
        this.category.loading = !this.category.loading

        this.hardware.list = response.data.hardware
        this.hardware.loading = !this.hardware.loading

        this.mobile.list = response.data.mobile
        this.mobile.loading = !this.mobile.loading

        this.game.list = response.data.game
        this.game.loading = !this.game.loading

        this.video.list = response.data.video
        this.video.loading = !this.video.loading

        this.talk.list = response.data.talk
        this.talk.loading = !this.talk.loading

        this.notice.list = response.data.notice
        this.notice.loading = !this.notice.loading
      })
      .catch((error) => {
        console.log('[index.vue] created() → error: ', error)
      })
  },
  data() {
    return {
      popular: {
        loading: true,
        list: []
      },
      category: {
        loading: true,
        list: []
      },
      hardware: {
        loading: true,
        list: []
      },
      mobile: {
        loading: true,
        list: []
      },
      game: {
        loading: true,
        list: []
      },
      video: {
        loading: true,
        list: []
      },
      talk: {
        loading: true,
        list: []
      },
      notice: {
        loading: true,
        list: []
      }
    }
  }
}
</script>
