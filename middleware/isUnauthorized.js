export default function(context) {
  const { store, redirect } = context

  const { isAuthorized } = store.getters

  console.log('[middleware] → isUnauthorized.js → isAuthorized: ', isAuthorized)
  if (isAuthorized) {
    console.log('[middleware] → isUnauthorized.js → process.client: ', process.client)
    if (process.client) {
      console.log('[middleware] → isUnauthorized.js → process.client → 로그인한 상태에서는 접근할 수 없어요!')

      console.log('store.$router.push: ', store.$router.push)

      // store.commit('ERROR_MESSAGE', { message: '로그인한 상태에서는 접근할 수 없어요!' })
      // store.$router.push({ name: 'index' })
      redirect('/')
    }

    console.log('[middleware] → isUnauthorized.js → process.server : ', process.server)
    if (process.server) {
      console.log('[middleware] → isUnauthorized.js → process.server → 로그인한 상태에서는 접근할 수 없어요!')

      // store.commit('ERROR_MESSAGE', { message: '로그인한 상태에서는 접근할 수 없어요!' })
      // store.$router.push({ name: 'index' })
      redirect('/')
    }
  }
}
