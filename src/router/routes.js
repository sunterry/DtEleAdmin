import DashBoard from '@/views/dashboard/dashboard'
import parentView from '@/components/dt-parent-children/dt-parent-children'

/**
 * title 导航标题并设置document标题
 * isMenuHidden 为true是不显示
 * access 配置权限列表
 * notCache 页面不会被缓存
 * icon 导航图标， 面包屑图标，标题图标
 */
// import { hasOneOf } from '@/utils/dt-utils-router'
// import {mapGetters} from 'vuex'
// export default {
//   name: 'page',
//   computed: {
//         ...mapGetters(['access'])
//     viewAccessAll () {
//       return hasOneOf(['addGoods'], this.access)
//     },
//     viewAccessSuper () {
//       return hasOneOf(['super_admin'], this.access)
//     }
//   }
// }
// <component2 v-if="viewAccessSuper"></component2>
export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      isMenuHidden: true
    },
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/login')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    meta: {
      title: '首页',
      icon: 'home',
      notCache: true
    },
    component: DashBoard,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'home',
          notCache: true
        },
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/home')
      }
    ]
  },
  {
    path: '/project',
    name: 'project',
    meta: {
      title: '源码地址',
      href: 'https://github.com/sunterry/DtEleAdmin',
      icon: '_github-fill'
    }
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: '_codepen',
      title: '组件'
    },
    component: DashBoard,
    children: [
      {
        path: 'table',
        name: 'table',
        meta: {
          icon: 'md-grid',
          title: '表格',
          access: ['table']
        },
        component: () => import(/* webpackChunkName: 'table' */'@/views/components/tables/tables')
      },
      {
        path: 'icon',
        name: 'icon',
        meta: {
          icon: 'reddit',
          title: '图标',
          access: ['icon']
        },
        component: () => import(/* webpackChunkName: 'icon-comp' */'@/views/components/icon-comp/icon-comp')
      }
    ]
  },
  {
    path: '/directive',
    name: 'directive',
    meta: {
      hide: true
    },
    component: DashBoard,
    children: [
      {
        path: 'directive_page',
        name: 'directive_page',
        meta: {
          icon: 'api',
          title: '指令'
        },
        component: () => import(/* webpackChunkName: 'directive' */'@/views/directive/directive')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: DashBoard,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import(/* webpackChunkName: 'level-2-1' */'@/views/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          icon: 'md-funnel',
          always: true,
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import(/* webpackChunkName: 'level-3-1' */'@/views/multilevel/level-2-2/level-3-1.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import(/* webpackChunkName: 'level-2-3' */'@/views/multilevel/level-2-3.vue')
      }
    ]
  },
  {
    path: '/tools_methods',
    name: 'tools_methods',
    meta: {
      hide: true
    },
    component: DashBoard,
    children: [
      {
        path: 'tools_methods_page',
        name: 'tools_methods_page',
        meta: {
          icon: 'el-icon-setting',
          title: '工具方法'
        },
        component: () => import('@/views/tools-methods/tools-methods.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      isMenuHidden: true
    },
    component: DashBoard,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: '动态路由'
        },
        component: () => import(/* webpackChunkName: 'params' */'@/views/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: '带参路由'
        },
        component: () => import('@/views/argu-page/query.vue')
      }
    ]
  }
]
