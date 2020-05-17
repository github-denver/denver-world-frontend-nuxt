<template>
  <div class="wrap_welcome">
    <h1 class="tit_l"><nuxt-link :to="{ name: 'index' }" class="link_l">덴버월드</nuxt-link></h1>

    <div class="inner_welcome">
      <strong class="tit_welcome">얼마 안 남았어요!</strong>
      <p class="desc_welcome">나머지 정보를 입력해주세요!</p>

      <form method="post" enctype="multipart/form-data" novalidate @submit.prevent="submit">
        <Picture :attribute="{ authorized: '', picture: '', className: 'register' }">
          <template v-slot:upload>
            <Upload :attribute="{ id: 'picture', icon: 'ico_picture' }" @parentChangePicture="onChangePicture">
              <template v-slot:text>프로필 사진</template>
            </Upload>
          </template>
        </Picture>

        <Input v-model="information.member.create.id" :attribute="{ type: 'text', id: 'id', className: 'full', title: '아이디 *' }" />

        <Input v-model="information.member.create.password" :attribute="{ type: 'password', id: 'password', className: 'full', title: '패스워드 *' }" />

        <Input v-model="information.member.create.confirm" :attribute="{ type: 'password', id: 'confirm', className: 'full', title: '패스워드 확인 *' }" />

        <Input v-model="information.member.create.name" :attribute="{ type: 'text', id: 'name', className: 'full', title: '닉네임 *' }" />

        <Input v-model="information.member.create.email" :attribute="{ type: 'text', id: 'email', className: 'full', title: '이메일 *' }" />

        <div class="grp_btn">
          <div class="inner_half">
            <nuxt-link :to="{ name: 'index' }" class="link_g">홈으로</nuxt-link>
          </div>

          <div class="inner_half">
            <button type="submit" class="btn_g btn_action">등록하기</button>
          </div>
        </div>
        <!-- // grp_btn -->
      </form>
    </div>
    <!-- // inner_welcome -->
  </div>
  <!-- // wrap_welcome -->
</template>

<script>
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
  methods: {
    onChangePicture(payload) {
      this.picture.files = payload.get('files')
      this.picture.result = payload.get('result')
    }
  }
}
</script>
