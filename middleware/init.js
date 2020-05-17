export default function({ app, store }) {
  console.log('[middleware] → init.js')

  // const savedToken = Cookies.get('accessToken')
  const savedToken = app.$cookies.get('accessToken')
  console.log('[middleware] → init.js → savedToken: ', savedToken)

  if (savedToken) {
    console.log('[middleware] → init.js → savedToken: ', savedToken)

    return store.dispatch('signinByToken', savedToken)
  } else {
    return Promise.resolve()
  }
}
