import routes from '@/router/routes'
import { GROUP } from './../types'
import { getMenuByRouterFilterHiddenMenu, getMenuByRouter, getBreadCrumbList, getHomeRoute, routeHasExist } from '@/utils/dt-util-router'
import { getTagNavListFromLocalStorage, setTagNavListFromLocalStorage } from '@/utils/dt-storage-tag-nav'
export default {
  state: {
    menuList: [],
    homeRoute: getHomeRoute(routes),
    breadCrumbList: [],
    tagNavList: []
  },
  actions: {},
  mutations: {
    setBreadCrumb (state, routeMetched) {
      state.breadCrumbList = getBreadCrumbList(routeMetched, state.homeRoute)
    },
    setTagNavList (state, arr) {
      if (arr) {
        state.tagNavList = [...arr]
        setTagNavListFromLocalStorage(arr)
      } else {
        state.tagNavList = getTagNavListFromLocalStorage()
      }
    },
    addTag (state, { route, type = 'unshift' }) {
      if (!routeHasExist(state.tagNavList, route)) {
        if (type === 'push') state.tagNavList.push(route)
        else {
          if (route.name === 'home') {
            state.tagNavList.unshift(route)
          } else {
            state.tagNavList.splice(1, 0, route)
          }
        }
        setTagNavListFromLocalStorage([...state.tagNavList])
      }
    }
  },
  getters: {
    menuList (state, getters, rootState) {
      if (getters.userinfo && getters.userinfo.group === GROUP) {
        return getMenuByRouterFilterHiddenMenu(routes)
      }
      if (rootState.user && rootState.user.vueAuth.length > 0) {
        return getMenuByRouter(routes, rootState.user.vueAuth)
      }
    },
    homeRoute (state) {
      return state.homeRoute
    },
    breadCrumbList (state) {
      return state.breadCrumbList
    },
    tagNavList (state) {
      return state.tagNavList
    }
  }
}
