<template>
  <div class="wrap_welcome">
    <h1 class="tit_l"><nuxt-link :to="{ name: 'index' }" class="link_l">덴버월드</nuxt-link></h1>

    <div class="inner_welcome">
      <strong class="tit_welcome">내 정보</strong>
      <p class="desc_welcome">수정할 정보를 입력해주세요!</p>

      <form method="post" enctype="multipart/form-data" novalidate @submit.prevent="submit">
        <Picture :attribute="{ authorized: isAuthorized, picture: information.member.create.picture.result, className: 'register' }">
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
import { mapState, mapGetters, mapActions } from 'vuex'

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
    ...mapState(['user']),
    ...mapGetters(['isAuthorized'])
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
    ...mapActions(['updateProfile']),
    onChangePicture(payload) {
      console.log('payload.get("files"): ', payload.get('files'))

      this.information.member.create.picture.files = payload.get('files')
      this.information.member.create.picture.result = payload.get('result')
    },
    submit(payload) {
      console.log('[update.vue] methods() { .. } → submit → payload: ', payload)

      // const { name, email } = this
      // console.log('this: ', this)

      // const picture = this.picture.files
      // console.log('picture: ', picture)

      const name = this.information.member2.name
      console.log('name: ', name)

      const email = this.information.member2.email
      console.log('email: ', email)

      const picture = this.information.member.create.picture.files
      console.log('picture: ', picture)

      // const idCheck = RegExp(/^[A-Za-z0-9_\.\-]{4,12}$/)
      // const passwordCheck = RegExp(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/)
      const nameCheck = RegExp(/^[가-힣a-zA-Z0-9]{2,6}$/)
      const emailCheck = RegExp(/^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/)

      if (!name || !email) {
        alert('필수 정보를 입력해주세요!')

        return false
      }

      if (!nameCheck.test(name)) {
        alert('닉네임은 한글과 알파벳 / 숫자만 입력 가능하고 2자리 이상 6자리 이하로 입력해 주세요!')

        // this.$refs.name.focus()
        document.querySelector('#name').focus()

        return false
      }

      if (!emailCheck.test(email)) {
        alert('이메일을 바르게 입력해 주세요!')

        // this.$refs.email.focus()
        document.querySelector('#email').focus()

        return false
      }

      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('picture', picture)

      this.updateProfile(formData)
        .then(() => {
          alert('회원정보 수정에 성공했어요!')
        })
        .catch((error) => {
          alert('회원가입에 실패했어요.. ㅠㅜ')

          console.log(error)
        })
    }
  }
}
</script>
