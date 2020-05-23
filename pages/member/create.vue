<template>
  <div class="wrap_welcome">
    <h1 class="tit_l"><nuxt-link :to="{ name: 'index' }" class="link_l">덴버월드</nuxt-link></h1>

    <div class="inner_welcome">
      <strong class="tit_welcome">얼마 안 남았어요!</strong>
      <p class="desc_welcome">나머지 정보를 입력해주세요!</p>

      <form method="post" enctype="multipart/form-data" novalidate @submit.prevent="submit">
        <Picture :attribute="{ authorized: isAuthorized, picture: information.member.create.picture.result, className: 'register' }">
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
import { mapGetters, mapActions } from 'vuex'

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
  computed: {
    ...mapGetters(['isAuthorized'])
  },
  methods: {
    ...mapActions(['createProfile']),
    onChangePicture(payload) {
      console.log('payload.get("files"): ', payload.get('files'))

      this.information.member.create.picture.files = payload.get('files')
      this.information.member.create.picture.result = payload.get('result')
    },
    submit(payload) {
      console.log('[create.vue] methods() { .. } → submit → payload: ', payload)

      // const { id, password, confirm, name, email } = this
      // const picture = this.picture.files

      const id = this.information.member.create.id
      console.log('id: ', id)

      const password = this.information.member.create.password
      console.log('password: ', password)

      const confirm = this.information.member.create.confirm
      console.log('confirm: ', confirm)

      const name = this.information.member.create.name
      console.log('name: ', name)

      const email = this.information.member.create.email
      console.log('email: ', email)

      const picture = this.information.member.create.picture.files
      console.log('picture: ', picture)

      const idCheck = RegExp(/^[A-Za-z0-9_.-]{4,12}$/)
      const passwordCheck = RegExp(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\|[\]{};:'",.<>/?]).{8,16}$/)
      const nameCheck = RegExp(/^[가-힣a-zA-Z0-9]{2,6}$/)
      const emailCheck = RegExp(/^[A-Za-z0-9_.-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+/)

      if (!id || !password || !confirm || !name || !email) {
        alert('필수 정보를 입력해주세요!')

        return false
      }

      if (!idCheck.test(id)) {
        alert('아이디는 알파벳 소·대문자 / 숫자 / - / . / _만 입력 가능하고 4자리 이상 8자리 이하로 입력해 주세요!')

        // this.$refs.id.focus()
        document.querySelector('#id').focus()

        return false
      }

      if (!passwordCheck.test(password)) {
        alert('패스워드는 알파벳 소문자 / 숫자 / 특수문자를 하나 이상 포함하고 6자리 이상 12자리 이하로 입력해 주세요!')

        // this.$refs.password.focus()
        document.querySelector('#password').focus()

        return false
      }

      if (password !== confirm) {
        alert('입력하신 패스워드가 일치하지 않아요!')

        // this.$refs.confirm.focus()
        document.querySelector('#confirm').focus()

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
      formData.append('id', id)
      formData.append('name', name)
      formData.append('password', password)
      formData.append('email', email)
      formData.append('picture', picture)

      this.createProfile(formData)
        .then(() => {
          alert('회원가입에 성공했어요!')

          this.$router.push({ name: 'member-login' })
        })
        .catch((error) => {
          alert('회원가입에 실패했어요.. ㅠㅜ')

          console.log(error)
        })
    }
  },
  middleware: 'isUnauthorized'
}
</script>
