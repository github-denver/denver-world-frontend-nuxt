// import Cookies from 'js-cookie'
import { ERROR_MESSAGE, FETCH_POST_LIST, SEARCH_INFO, FETCH_POST, SET_ACCESS_TOKEN, SET_MY_INFO, DESTROY_ACCESS_TOKEN, DESTROY_MY_INFO } from './mutation-types'

export const state = () => ({
  posts: [],
  pagination: {},
  search: {
    select: '',
    keyword: ''
  },
  post: null,
  accessToken: '',
  user: null,
  errorMessage: ''
})

export const getters = {
  isAuthorized(state) {
    const { accessToken, user } = state
    console.log('[getters.js] isAuthorized () → accessToken: ', accessToken)
    // console.log('[getters.js] isAuthorized () → user: ', user)

    const result = accessToken.length > 0 && !!user
    console.log('[getters.js] isAuthorized () → result: ', result)

    return result
  },
  path() {
    return 'http://localhost:4000'
  },
  uploads() {
    return 'uploads'
  }
}

export const mutations = {
  [ERROR_MESSAGE](state, payload) {
    console.log('[mutations.js] [ERROR_MESSAGE] → payload: ', payload)

    state.errorMessage = payload.message
    console.log('[mutations.js] [ERROR_MESSAGE] → state.errorMessage: ', state.errorMessage)

    console.log()
  },
  [FETCH_POST_LIST](state, payload) {
    console.log('[mutations.js] [FETCH_POST_LIST] → payload: ', payload)

    state.posts = payload.posts
    console.log('[mutations.js] [FETCH_POST_LIST] → state.posts: ', state.posts)

    state.pagination = payload.pagination
    console.log('[mutations.js] [FETCH_POST_LIST] → state.pagination: ', state.pagination)

    console.log()
  },
  [FETCH_POST](state, post) {
    console.log('[mutations.js] [FETCH_POST] → state.post: ', state.post)
    // console.log('[mutations.js] [FETCH_POST] → post: ', post)

    state.post = post
  },
  [SET_ACCESS_TOKEN](state, accessToken) {
    console.log('[mutations.js] [SET_ACCESS_TOKEN] → accessToken: ', accessToken)
    if (accessToken) {
      state.accessToken = accessToken
      this.$axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`

      this.$cookies.set('accessToken', accessToken)
    }
  },
  [SET_MY_INFO](state, user) {
    // console.log('[mutations.js] [SET_MY_INFO] → user: ', user)

    if (user) {
      state.user = user
    }
  },
  [DESTROY_ACCESS_TOKEN](state) {
    state.accessToken = ''
    delete this.$axios.defaults.headers.common.Authorization

    this.$cookies.remove('accessToken')
  },
  [DESTROY_MY_INFO](state) {
    state.user = null
  },
  [SEARCH_INFO](state, payload) {
    // console.log('[mutations.js] [SEARCH_INFO] → payload: ', payload)

    state.search.select = payload.select
    // console.log('[mutations.js] [SEARCH_INFO] → state.select: ', state.select)

    state.search.keyword = payload.keyword
    // console.log('[mutations.js] [SEARCH_INFO] → state.keyword: ', state.keyword)
  }
}

export const actions = {
  fetchPostList({ commit }, payload) {
    commit(FETCH_POST_LIST, { posts: [], pagination: {} })

    const { category, number, select, keyword } = payload
    console.log('[actions.js] payload: ', payload)

    let url = ''

    if (typeof keyword !== 'undefined' && keyword.length > 0) {
      url = `/api/board/${category}/list/${number}?select=${select}&keyword=${keyword}`
    } else {
      url = `/api/board/${category}/list/${number}`
    }

    console.log('[actions.js] url: ', url)

    return this.$axios
      .get(url, { headers: { Pragma: 'no-cache' } })
      .then((response) => {
        const { list, pagination, select, keyword } = response.data
        console.log('[actions.js] pagination: ', pagination)
        console.log('[actions.js] select: ', select)
        console.log('[actions.js] keyword: ', keyword)

        commit(FETCH_POST_LIST, { posts: list, pagination })
        commit(SEARCH_INFO, { select, keyword })
      })
      .catch((error) => console.error(error))
  },
  fetchPost({ commit }, payload) {
    commit(FETCH_POST, null)

    const { category, number, select, keyword } = payload
    console.log('[actions.js] fetchPost () → payload: ', payload)

    return this.$axios.get(`/api/board/${category}/view/${number}`).then((response) => {
      const { result } = response.data
      // console.log('[actions.js] fetchPost () → result: ', result)

      commit(FETCH_POST, result)
      commit(SEARCH_INFO, { select, keyword })
    })
  },
  deletePost({ commit }, payload) {
    const { category, number } = payload
    console.log('[actions.js] deletePost () → payload: ', payload)

    return this.$axios.get(`/api/board/${category}/delete/${number}`)
  },
  signinByToken({ commit }, token) {
    console.log('[actions.js] signinByToken () → token: ', token)

    commit(SET_ACCESS_TOKEN, token)

    return this.$axios.get('/api/me', { params: { accessToken: token } }).then((response) => {
      // console.log('[actions.js] signinByToken () → response: ', response)

      commit(SET_MY_INFO, response.data.user2)
    })
  },
  signin({ commit }, payload) {
    const { id, password } = payload
    console.log('[actions.js] signin () → payload: ', payload)

    return this.$axios
      .post('/api/login', { id, password })
      .then((response) => {
        console.log('[actions.js] signin () → response: ', response)

        const { accessToken } = response.data
        console.log('[actions.js] signin () → accessToken: ', accessToken)

        commit(SET_ACCESS_TOKEN, accessToken)

        return this.$axios.get('/api/me', {
          params: {
            accessToken
          }
        })
      })
      .then((response) => {
        console.log('[actions.js] signin () → [SET_MY_INFO] > response: ', response)

        commit(SET_MY_INFO, response.data.user2)
      })
  },
  signout({ commit }) {
    return this.$axios.get('/api/logout').then((response) => {
      console.log('[actions.js] signout () → response: ', response.data)

      commit(DESTROY_ACCESS_TOKEN)
      commit(DESTROY_MY_INFO)
    })
  },
  searchInfo({ commit }, payload) {
    const { select, keyword } = payload

    commit(SEARCH_INFO, { select, keyword })
  },
  createProfile(payload) {
    return this.$axios.post('/api/register', payload)

    /* .then((response) => {
      alert('회원가입에 성공했어요!')

      // console.log('[MemberCreate.vue] 회원가입에 성공했어요!')
      // console.log('[MemberCreate.vue] response: ', response)

      this.$router.push({ name: 'MemberLogin' })
    }) */
  },
  updateProfile({ commit }, payload) {
    console.log('[actions.js] updateProfile () → payload: ', payload)

    return this.$axios
      .post('/api/profile', payload)
      .then((response) => {
        const { accessToken } = response.data
        console.log('[actions.js] updateProfile () → accessToken: ', accessToken)

        commit(SET_ACCESS_TOKEN, accessToken)

        return this.$axios.get('/api/me', {
          params: {
            accessToken
          }
        })
      })
      .then((response) => {
        console.log('[actions.js] updateProfile () → response: ', response)

        commit(SET_MY_INFO, response.data.user2)
      })
  },
  createWrite({ commit }, payload) {
    console.log('[actions.js] createWrite () → payload: ', payload)

    return this.$axios.post(`/api/board/${payload.get('category')}/write`, payload)
  },
  updateWrite({ commit }, payload) {
    console.log('[actions.js] updateWrite () → payload: ', payload)

    return this.$axios.post(`/api/board/${payload.get('category')}/modify/${payload.get('number')}`, payload)
  }
}
