import { FETCH_POST_LIST, SEARCH_INFO, FETCH_POST, SET_ACCESS_TOKEN, SET_MY_INFO, DESTROY_ACCESS_TOKEN, DESTROY_MY_INFO } from './mutation-types'

// import api2 from '~/plugins/axios'

export const state = () => ({
  posts: [],
  pagination: {},
  search: {
    select: '',
    keyword: ''
  },
  post: null,
  accessToken: '',
  user: null
})

export const mutations = {
  [FETCH_POST_LIST](state, payload) {
    // console.log('[mutations.js] [FETCH_POST_LIST] → payload: ', payload)

    state.posts = payload.posts
    // console.log('[mutations.js] [FETCH_POST_LIST] → state.posts: ', state.posts)

    state.pagination = payload.pagination
    console.log('[mutations.js] [FETCH_POST_LIST] → state.pagination: ', state.pagination)

    console.log()
  },
  [SEARCH_INFO](state, payload) {
    // console.log('[mutations.js] [SEARCH_INFO] → payload: ', payload)

    state.search.select = payload.select
    // console.log('[mutations.js] [SEARCH_INFO] → state.select: ', state.select)

    state.search.keyword = payload.keyword
    // console.log('[mutations.js] [SEARCH_INFO] → state.keyword: ', state.keyword)
  },
  [FETCH_POST](state, post) {
    // console.log('[mutations.js] [FETCH_POST] → state.post: ', state.post)
    // console.log('[mutations.js] [FETCH_POST] → post: ', post)

    state.post = post
  },
  [SET_ACCESS_TOKEN](state, accessToken) {
    // console.log('[mutations.js] [SET_ACCESS_TOKEN] → accessToken: ', accessToken)
    /* if (accessToken) {
      state.accessToken = accessToken
      this.$axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      Cookies.set('accessToken', accessToken)
    } */
  },
  [SET_MY_INFO](state, user) {
    // console.log('[mutations.js] [SET_MY_INFO] → user: ', user)

    if (user) {
      state.user = user
    }
  },
  [DESTROY_ACCESS_TOKEN](state) {
    /* state.accessToken = ''
    delete this.$axios.defaults.headers.common.Authorization
    Cookies.remove('accessToken') */
  },
  [DESTROY_MY_INFO](state) {
    state.user = null
  }
}

export const actions = {
  fetchPostList({ commit }, payload) {
    // this.$axios.setBaseURL('http://localhost:4000')

    // commit(FETCH_POST_LIST, { posts: [], pagination: {} })

    const { category, number, select, keyword } = payload
    console.log('[actions.js] payload: ', payload)

    console.log()

    let url = ''

    if (typeof keyword !== 'undefined' && keyword.length > 0) {
      url = `/api/board/${category}/list/${number}?select=${select}&keyword=${keyword}`
    } else {
      url = `/api/board/${category}/list/${number}`
    }

    return this.$axios
      .get(url, { headers: { Pragma: 'no-cache' } })
      .then((response) => {
        const { list, pagination, select, keyword } = response.data

        commit(FETCH_POST_LIST, { posts: list, pagination })
        commit(SEARCH_INFO, { select, keyword })
      })
      .catch((error) => console.error(error))
  },
  searchInfo({ commit }, payload) {
    const { select, keyword } = payload

    commit(SEARCH_INFO, { select, keyword })
  },
  updateProfile({ commit }, payload) {
    return this.$axios
      .post('/api/profile', payload)
      .then((response) => {
        const { accessToken } = response.data
        // console.log('[actions.js] updateProfile () → accessToken: ', accessToken)

        commit(SET_ACCESS_TOKEN, accessToken)

        return this.$axios.get('/api/me', {
          params: {
            accessToken
          }
        })
      })
      .then((response) => {
        // console.log('[actions.js] signin () → [SET_MY_INFO] > response: ', response)

        commit(SET_MY_INFO, response.data.user2)
      })
  },
  fetchPost({ commit }, payload) {
    const { category, number, select, keyword } = payload
    // console.log('[actions.js] fetchPost () → payload: ', payload)

    // console.log('[actions.js] fetchPost () → `/board/${category}/view/${number}`: ', `/board/${category}/view/${number}`)

    return this.$axios.get(`/api/board/${category}/view/${number}`).then((response) => {
      // console.log('[actions.js] fetchPost () → response: ', response)

      const { result } = response.data

      commit(FETCH_POST, result)
      commit(SEARCH_INFO, { select, keyword })
    })
  },
  signin({ commit }, payload) {
    const { id, password } = payload
    // console.log('[actions.js] signin () → payload: ', payload)

    return this.$axios
      .post('/api/login', { id, password })
      .then((response) => {
        // console.log('[actions.js] signin () → response: ', response)

        const { accessToken } = response.data
        // console.log('[actions.js] signin () → accessToken: ', accessToken)

        commit(SET_ACCESS_TOKEN, accessToken)

        return this.$axios.get('/api/me', {
          params: {
            accessToken
          }
        })
      })
      .then((response) => {
        // console.log('[actions.js] signin () → [SET_MY_INFO] > response: ', response)

        commit(SET_MY_INFO, response.data.user2)
      })
  },
  signinByToken({ commit }, token) {
    // console.log('[actions.js] signinByToken () → token: ', token)

    commit(SET_ACCESS_TOKEN, token)

    return this.$axios.get('/api/me', { params: { accessToken: token } }).then((response) => {
      // console.log('[actions.js] signinByToken () → response: ', response)

      commit(SET_MY_INFO, response.data.user2)
    })
  },
  signout({ commit }) {
    return this.$axios.get('/api/logout').then((response) => {
      // console.log('[actions.js] signout () → response: ', response.data)

      commit(DESTROY_MY_INFO)
      commit(DESTROY_ACCESS_TOKEN)
    })
  }
}
