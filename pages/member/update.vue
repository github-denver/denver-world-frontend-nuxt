<template>
  <div class="wrap_welcome">
    <h1 class="tit_l"><nuxt-link :to="{ name: 'index' }" class="link_l">덴버월드</nuxt-link></h1>

    <div class="inner_welcome">
      <strong class="tit_welcome">내 정보</strong>
      <p class="desc_welcome">수정할 정보를 입력해주세요!</p>

      <form method="post" enctype="multipart/form-data" novalidate @submit.prevent="submit">
        <Picture :attribute="{ authorized: '', picture: '', className: 'register' }">
          <template v-slot:upload>
            <Upload :attribute="{ id: 'picture', icon: 'ico_picture' }" @parentChangePicture="onChangePicture">
              <template v-slot:text>프로필 사진</template>
            </Upload>
          </template>
        </Picture>

        <Input v-model="information.member2.name" :attribute="{ type: 'text', id: 'name', className: 'full', title: '닉네임 *', value: user.name }" />

        <Input v-model="information.member2.email" :attribute="{ type: 'text', id: 'email', className: 'full', title: '이메일 *', value: user.email }" />

        <div class="grp_btn">
          <div class="inner_half">
            <nuxt-link :to="{ name: 'index' }" class="link_g">홈으로</nuxt-link>
          </div>

          <div class="inner_half">
            <button type="submit" class="btn_g btn_action">수정하기</button>
          </div>
        </div>
        <!-- // grp_btn -->
      </form>
    </div>
    <!-- // inner_welcome -->
  </div>
  <!-- // welcome -->
</template>

<script>
import { mapState } from 'vuex'

import Picture from '~/components/Picture'
import Upload from '~/components/Upload'
import Input from '~/components/Input'

export default {
  components: {
    Picture,
    Upload,
    Input
  },
  data() {
    return {
      information: {
        category: null,
        select: {
          option: {
            text: null,
            value: null
          }
        },
        service: null,
        number: null,
        subject: null,
        thumbnail: null,
        picture: {
          files: null,
          result: null
        },
        member: {
          create: {
            id: '',
            password: '',
            confirm: '',
            name: '',
            email: '',
            picture: {
              files: null,
              result: null
            }
          }
        },
        member2: {
          id: null,
          name: null,
          email: null,
          picture: null,
          provider: null,
          level: null,
          iat: null,
          exp: null
        },
        editor: {
          category: null,
          subject: null,
          content: null,
          thumbnail: null,
          picture: {
            files: null,
            result: null
          }
        }
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    console.log('[update.vue] created() { .. } → created()에 진입하였습니다.')

    console.log('(before) this.information.member2: ', this.information.member2)

    for (const [key, value] of Object.entries(this.user)) {
      console.log(`${key}: ${value}`)
      this.information.member2[key] = value
    }

    console.log('(after) this.information.member2: ', this.information.member2)
  },
  methods: {
    submit() {
      console.log('submit')
    },
    onChangePicture(payload) {
      this.picture.files = payload.get('files')
      this.picture.result = payload.get('result')
    }
  }
}
</script>
