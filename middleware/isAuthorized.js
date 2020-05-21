export default function(context) {
  const { store, redirect, error } = context

  const { isAuthorized } = store.getters
  console.log('[middleware] → isAuthorized.js → isAuthorized: ', isAuthorized)

  console.log('[middleware] → isAuthorized.js → process.browser: ', process.browser)
  console.log('[middleware] → isAuthorized.js → process.client: ', process.client)
  console.log('[middleware] → isAuthorized.js → process.server : ', process.server)

  if (!isAuthorized) {
    console.log('* [middleware] → isAuthorized.js → isAuthorized: ', isAuthorized)

    if (process.client) {
      alert('로그인 안 한 상태에서는 접근할 수 없어요!')

      return redirect('/member/login')
    } else {
      console.log('else 로그인 안 한 상태에서는 접근할 수 없어요!')

      error({ statusCode: 404, message: 'Post not found123' })
    }
  }
}
