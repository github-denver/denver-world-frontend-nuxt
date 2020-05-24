<template>
  <div class="wrap_welcome">
    <h1 class="tit_l"><nuxt-link :to="{ name: 'index' }" class="link_l">덴버월드</nuxt-link></h1>

    <div class="inner_welcome">
      <strong class="tit_welcome">로그인</strong>

      <!-- <p class="desc_welcome">로그인해주세요!</p> -->
      <p class="desc_welcome">{{ errorMessage ? errorMessage : '로그인해주세요!' }}</p>

      <form method="post" novalidate @submit.prevent="submit">
        <Input v-model="information.member.create.id" :attribute="{ type: 'text', id: 'id', className: 'full', title: '아이디 *' }" />

        <Input v-model="information.member.create.password" :attribute="{ type: 'password', id: 'password', className: 'full', title: '패스워드 *' }" />

        <div class="grp_btn">
          <div class="inner_half">
            <nuxt-link :to="{ name: 'index' }" class="link_g">홈으로</nuxt-link>
          </div>

          <div class="inner_half">
            <button type="submit" class="btn_g btn_action">로그인하기</button>
          </div>
        </div>
        <!-- // group-grp_btn -->
      </form>
    </div>
    <!-- // inner_welcome -->
  </div>
  <!-- // wrap_welcome -->
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Input from '~/components/Input'

export default {
  components: {
    Input
  },
  asyncData(context) {
    const { from } = context

    if (typeof from !== 'undefined' && from !== null) {
      const except = ['list-category-number', 'read-category-number']
      console.log('except: ', except)

      for (let i = 0; i < except.length; i++) {
        console.log('except[' + i + ']: ', except[i])

        console.log('from.name !== except[' + i + ']: ', from.name === except[i])
        if (from.name === except[i]) {
          return {
            history: true
          }
        }
      }
    }

    return {
      history: false
    }
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
        },
        history: null
      }
    }
  },
  computed: {
    ...mapState(['errorMessage'])
  },
  created() {
    console.log('this.errorMessage: ', this.errorMessage)
  },
  methods: {
    ...mapActions(['signin']),
    submit() {
      console.log('this: ', this)

      const { id, password } = this.information.member.create
      console.log('id: ', id)
      console.log('password: ', password)

      // this.$emit('parentSubmit', { id, password })

      // this.signin(payload)

      this.signin({ id, password })
        .then((response) => {
          console.log('response: ', response)

          alert('로그인에 성공했어요!')

          // console.log('[Login.vue] methods() → onSubmit → 로그인에 성공했어요!')
          // console.log('[Login.vue] methods() → onSubmit → response: ', response)

          // console.log('[Login.vue] methods() → onSubmit → 메인으로 이동해요!')

          console.log('this.history: ', this.history)
          if (this.history) {
            this.$router.go(-1)
          } else {
            this.$router.push({ name: 'index' })
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            alert('로그인해주세요!')
          } else {
            alert(error.response.data.message)
          }

          alert('로그인에 실패했어요.. ㅠㅜ')

          // console.log('[Login.vue] 로그인에 실패했어요.. ㅠㅜ')
          // console.log('[Login.vue] error: ', error)
          // console.log('[Login.vue] error.message: ', error.message)
          // console.log('[Login.vue] error.response: ', error.response)
          // console.log('[Login.vue] error.response.data: ', error.response.data)
        })
    }
  },
  middleware: 'isUnauthorized'
}
</script>
