import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'
import setAuthorizationToken from '@/utils/dt-authorization'
import { getStorage } from '@/utils/dt-storage'
import { isPermission } from '@/utils/dt-util-router'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const LOGIN_PAGE_NAME = 'login'
router.beforeEach((to, from, next) => {
  const token = getStorage('token')
  setAuthorizationToken(token)
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: 'home' // 跳转到home页
    })
  } else {
    store.dispatch('getUserInfo').then((data) => {
      const { vueAuth: access } = data
      if (isPermission(to.name, access, routes)) next()
      else next({ replace: true, name: 'home' })
    })
  }
})

export default router
