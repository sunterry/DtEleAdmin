<template>
  <Submenu :index="`${parentName}`">
    <template slot="title">
      <dt-icon :icon="getIcon(parentItem)"/>
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length === 1">
        <dt-side-menu-item
          v-if="showChildren(item)"
          :key="`menu-${item.name}`"
          :parent-item="item"
        />
        <menu-item
          v-else
          :index="getNamehasHref(item, true)"
          :key="`menu-${item.children[0].name}`"
        >
          <dt-icon :icon="getIcon(item.children[0])" />
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
          :index="getNamehasHref(item)"
          :key="`menu-${item.name}`"
        >
          <dt-icon :icon="getIcon(item)" />
          <span>{{ showTitle(item) }}</span>
        </menu-item>
      </template>
    </template>
  </Submenu>
</template>

<script>
import mixinItem from './mixin-item'
import mixin from './mixin'
import DtIcon from '@/components/dt-icon/dt-icon'
import { Submenu, MenuItem } from 'element-ui'
export default {
  name: 'dt-side-menu-item',
  mixins: [mixin, mixinItem],
  components: {
    DtIcon,
    Submenu,
    MenuItem
  }
}
</script>
