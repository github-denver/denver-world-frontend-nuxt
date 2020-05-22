export default function(context) {
  // console.log('context: ', context)
  const { store, redirect } = context

  const { isAuthorized } = store.getters
  console.log('[middleware] → isAuthorized.js → isAuthorized: ', isAuthorized)
  console.log('[middleware] → isAuthorized.js → !isAuthorized: ', !isAuthorized)

  if (!isAuthorized) {
    console.log('* [middleware] → isAuthorized.js → isAuthorized: ', isAuthorized)

    console.log('[middleware] → isAuthorized.js → process.browser: ', process.browser)
    console.log('[middleware] → isAuthorized.js → process.client: ', process.client)
    if (process.client) {
      console.log('[middleware] → isAuthorized.js → process.client → 로그인 안 한 상태에서는 접근할 수 없어요!')

      console.log('store.$router.push: ', store.$router.push)

      // store.commit('ERROR_MESSAGE', { message: '로그인 안 한 상태에서는 접근할 수 없어요!' })
      // store.$router.push({ name: 'member-login' })
      redirect('/member/login')
    }

    console.log('[middleware] → isAuthorized.js → process.server : ', process.server)
    if (process.server) {
      console.log('[middleware] → isAuthorized.js → process.server → 로그인 안 한 상태에서는 접근할 수 없어요!')

      console.log('store.$router.push: ', store.$router.push)

      // store.commit('ERROR_MESSAGE', { message: '로그인 안 한 상태에서는 접근할 수 없어요!' })
      // store.$router.push({ name: 'member-login' })
      redirect('/member/login')
    }
  }
}
