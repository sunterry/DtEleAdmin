<template>
  <div>
    <Container class="dt-container">
      <Aside class="dt-aside" width="200px">
        <dt-menu
          ref="sideMenu"
          :active-name="$route.name"
          :menu-list="menuList"
          @on-select="onSelect"
          background-color="rgb(81, 90, 110)"
          text-color="#fff"
          active-text-color="#ffd04b"
          uniqueOpened
        >
          <dt-logo />
        </dt-menu>
      </Aside>
      <Container class="dt-child-container">
        <Header height="60px" class="dt-header">
          <Row>
            <Col :span="21">
              <dt-bread-crumb :breadCrumbList="breadCrumbList"/>
            </Col>
            <Col :span="3">
              <dt-user
                :userinfo="userinfo"
                @edit-pass="editPass"
                @login-out="loginOut"
              />
            </Col>
          </Row>
        </Header>
        <Header height="36" class="dt-header-bar">
          <dt-scrolltab
            :routeValue="$route"
            :tagList="tagNavList"
            @input="tagNative"
            @on-close="closeNative" />
        </Header>
        <Main>
          <keep-alive :include="cacheList">
            <router-view/>
          </keep-alive>
        </Main>
      </Container>
    </Container>
  </div>
</template>
<script>
import { Container, Header, Aside, Main, Row, Col } from 'element-ui'
import filter from 'lodash/filter'
import { mapGetters, mapMutations } from 'vuex'
import DtMenu from '@/components/dt-menu/dt-menu'
import DtLogo from '@/components/dt-logo/dt-logo'
import DtUser from '@/components/dt-user/dt-user'
import DtScrolltab from '@/components/dt-scrolltab/dt-scrolltab'
import DtBreadCrumb from '@/components/dt-breadcrumb/dt-breadcrumb'
import { DTADMIN } from '@/utils/dt-common-types'
import { getNewTagList, routeEqual, getNextRoute } from '@/utils/dt-util-router'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['menuList', 'breadCrumbList', 'userinfo', 'homeRoute', 'tagNavList']),
    cacheList () {
      return this.tagNavList.length ? filter(this.tagNavList, item => !(item.meta && item.meta.notCache)).map(item => item.name) : []
    }
  },
  watch: {
    '$route' (targetRoute) {
      this.setBreadCrumb(targetRoute.matched)
      this.setDocumentTitle(targetRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, targetRoute))
    }
  },
  mounted () {
    this.setBreadCrumb(this.$route.matched)
    this.setDocumentTitle(this.$route)
    this.setTagNavList()
    this.addTag({ route: this.homeRoute })
  },
  methods: {
    ...mapMutations(['setBreadCrumb', 'setTagNavList', 'addTag']),
    onSelect (route) {
      let { name, params, query } = route
      if (typeof route === 'string') {
        name = route
      } else {
        params = route.params
        query = route.query
        name = route.name
      }
      if (name.indexOf('hasHrefInName_') === 0) {
        window.open(name.split('_')[1])
        return false
      } else {
        this.$router.push({
          name,
          params,
          query
        })
      }
    },
    setDocumentTitle (route) {
      document.title = (route.meta && route.meta.title) || DTADMIN
      // this.title = (route.meta && route.meta.title) || ''
    },
    // tag标签切换
    tagNative (value) {
      this.onSelect(value)
    },
    // 关闭标签
    closeNative (res, type, route) {
      let openName = ''
      if (type === 'all') {
        this.onSelect('home')
        openName = 'home'
      } else if (routeEqual(this.$route, route)) {
        if (type === 'others') {
          openName = route.name
        } else {
          const nextRoute = getNextRoute(this.tagNavList, route)
          this.$router.push(nextRoute)
          openName = nextRoute.name
        }
      }
      this.setTagNavList(res)
      this.$refs.sideMenu.updateOpenName(openName)
    },
    editPass () {
      console.log('editpass')
    },
    loginOut () {
      console.log('loginout')
    }
  },
  components: {
    DtMenu,
    Container,
    Header,
    Aside,
    Main,
    DtBreadCrumb,
    DtLogo,
    DtUser,
    DtScrolltab,
    Row,
    Col
  }
}
</script>
<style lang="scss" scoped>
  .size {
    width: 100%;
    height: 100%;
  }
  .dt-container {
    @extend .size
  }
  .dt-child-container {
    display: flex;
    flex-direction: column;
    background: #f5f7f9;
  }
  .dt-aside {
    min-height: 100vh;
    background: #515a6e;
    overflow-x: hidden;
  }
  .dt-header {
    width: 100%;
    background: #fff;
  }
  .dt-header-bar {
    padding: 0;
  }
  .dt-main {
    width: 100%;
  }
</style>
