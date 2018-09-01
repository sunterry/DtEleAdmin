<template>
  <Breadcrumb class="dt-breadcrumb" separator="/">
    <breadcrumb-item v-for="item in breadCrumbList" :key="`bread-${item.name}`" :to="item.to">
      <dt-icon v-show="showIcon" :icon="getIcon(item)" />
      <span>{{getTitle(item)}}</span>
    </breadcrumb-item>
  </Breadcrumb>
</template>

<script>
import DtIcon from '@/components/dt-icon/dt-icon'
import { Breadcrumb, BreadcrumbItem } from 'element-ui'
export default {
  name: 'dt-breadcrumb',
  props: {
    breadCrumbList: {
      type: Array,
      default: () => []
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getTitle (item) {
      return item.meta && item.meta.title
    },
    getIcon (item) {
      return (item.meta && item.meta.icon) || ''
    }
  },
  components: {
    DtIcon,
    Breadcrumb,
    BreadcrumbItem
  }
}
</script>

<style scoped lang="scss">
  .no-select{
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .dt-breadcrumb /deep/ {
    @extend .no-select;
    .el-breadcrumb__item {
      a, span{
        line-height: 60px;
        vertical-align: top;
      }
      i {
        line-height: 60px;
      }
    }
  }
</style>
