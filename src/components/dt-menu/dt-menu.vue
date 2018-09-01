<template>
  <div>
    <slot />
    <Menu
      :default-active="activeName"
      class="dt-menu-vertical"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      :uniqueOpened="uniqueOpened"
      :menuTrigger="menuTrigger"
      :router="router"
      :collapse-transition="collapseTransition"
      :default-openeds="openedNames"
      @select="handleSelect"
      :collapse="isCollapse"
    >
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <dt-side-menu-item
            v-if="showChildren(item)"
            :key="`menu-${item.name}`"
            :parent-item="item"
          />
          <menu-item
            :key="`menu-${item.children[0].name}`"
            :index="getNamehasHref(item, true)"
          >
            <dt-icon :icon="getIcon(item.children[0])"/>
            <span>{{ showTitle(item.children[0]) }}</span>
          </menu-item>
        </template>
        <template v-else>
          <dt-side-menu-item
            v-if="showChildren(item)"
            :key="`menu-${item.name}`"
            :parent-item="item"
          />
          <menu-item
            v-else
            :key="`menu-${item.name}`"
            :index="getNamehasHref(item)"
          >
            <dt-icon :icon="getIcon(item)"/>
            <span>{{ showTitle(item) }}</span>
          </menu-item>
        </template>
      </template>
    </Menu>
  </div>
</template>

<script>
import DtIcon from '@components/dt-icon/dt-icon'
import DtSideMenuItem from './dt-side-menu-item'
import { Menu, MenuItem, Submenu } from 'element-ui'
import mixin from './mixin'
import { getUnion } from '@/utils/dt-util-router'

export default {
  name: 'dt-meniu',
  mixins: [mixin],
  data () {
    return {
      openedNames: []
    }
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'vertical'
    },
    activeName: {
      type: String,
      required: true
    },
    menuList: {
      type: Array,
      default: () => []
    },
    uniqueOpened: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: '#409EFF'
    },
    activeTextColor: {
      type: String,
      default: '#409EFF'
    },
    textColor: {
      type: String,
      deafult: '#303133'
    },
    menuTrigger: {
      type: String,
      default: 'hover'
    },
    router: {
      type: Boolean,
      default: false
    },
    collapseTransition: {
      type: Boolean,
      default: true
    },
    openNames: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    // 通过active-name 的变化来确定当前应该展开哪一个
    activeName (name) {
      if (this.uniqueOpened) this.openedNames = this.getOpenedNamesByActiveName(name)
      else this.openedNames = this.getOpenedNames(name)
    },
    // 当前激活的路由
    openNames (newNames) {
      this.openedNames = newNames
    }
  },
  methods: {
    handleSelect (path) {
      this.$emit('on-select', path)
    },
    // 展开的数组驱虫
    getOpenedNames (name) {
      return getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
    },
    // 通过获取当前选中的路由来判断应该展开哪一个 ['components', 'components/icon']  => ['components']
    getOpenedNamesByActiveName (name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    },
    updateOpenName (name) {
      if (name === 'home') this.openedNames = []
      else this.openedNames = this.getOpenedNamesByActiveName(name)
    }
  },
  components: {
    DtIcon,
    Menu,
    MenuItem,
    Submenu,
    DtSideMenuItem
  }
}
</script>

<style scoped lang="scss">
  $bg-color: #001529;
  .dt-menu-vertical {
    flex: 0 0 200px;
    width: 200px;
    min-height: 100vh;
    background: $bg-color;
    overflow-x: hidden;
  }
</style>
