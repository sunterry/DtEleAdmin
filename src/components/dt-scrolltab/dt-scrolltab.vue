<template>
  <div class="scroll-bar">
    <div class="scroll-bar__icon"  @click="handleScroll(220)">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="scroll-bar__scroll scroll-outer" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
        <Tag
          ref="tagsPageOpened"
          v-for="(item, index) in tagList"
          :key="`tag-nav-${index}`"
          :text="item.name"
          :closable="item.name !== 'home'"
          :type="isCurrentTag(item) ? 'primary' : 'info'"
          class="dt-tag"
          @click.native="tagSelect(item)"
          @close="closeTag(item)"
         >
        {{showTitle(item)}}
        </Tag>
      </div>
    </div>
    <div class="scroll-bar__icon"  @click="handleScroll(-220)">
      <i class="el-icon-arrow-right"></i>
    </div>
    <Dropdown size="mini" @command="handleTagsOption">
      <div class="scroll-bar__icon">
        <i class="el-icon-circle-close close"></i>
      </div>
      <DropdownMenu slot="dropdown">
        <DropdownItem command="close-all">关闭所有</DropdownItem>
        <DropdownItem command="close-others">关闭其他</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { DropdownMenu, Dropdown, Tag, DropdownItem } from 'element-ui'
import DtIcon from '@/components/dt-icon/dt-icon'
import { routeEqual } from '@/utils/dt-util-router'
import filter from 'lodash/filter'
export default {
  name: 'dt-scrolltab',
  data () {
    return {
      tagBodyLeft: 0,
      rightOffset: 64,
      outerPadding: 5
    }
  },
  props: {
    routeValue: Object,
    tagList: {
      type: Array,
      default: () => []
    },
    isScroll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentRouteObj () {
      const { name, params, query } = this.routeValue
      return { name, params, query }
    }
  },
  watch: {
    '$route' (to) {
      setTimeout(() => {
        this.getTagElementByName(to.name)
      }, 200)
    }
  },
  mounted () {
    setTimeout(() => {
      this.getTagElementByName(this.$route.name)
    }, 200)
  },
  methods: {
    handlescroll (e) {
      let type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    },
    handleScroll (offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    handleTagsOption (type) {
      if (type === 'close-all') {
        // 关闭所有，除了home
        let res = this.tagList.filter(item => item.name === 'home')
        this.$emit('on-close', res, 'all')
      } else {
        let res = this.tagList.filter(item => routeEqual(this.currentRouteObj, item) || item.name === 'home')
        this.$emit('on-close', res, 'others', this.currentRouteObj)
        setTimeout(() => {
          this.getTagElementByName(this.currentRouteObj.name)
        }, 100)
      }
    },
    closeTag (current) {
      let res = filter(this.tagList, item => !routeEqual(current, item))
      this.$emit('on-close', res, undefined, current)
    },
    tagSelect (item) {
      this.$emit('input', item)
    },
    showTitle (item) {
      return item.meta && item.meta.title
    },
    isCurrentTag (item) {
      return routeEqual(this.routeValue, item)
    },
    moveToView (tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
      } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
      }
    },
    getTagElementByName (name) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened
        this.refsTag.forEach((item, index) => {
          if (name === item.text) {
            let tag = this.refsTag[index].$el
            this.moveToView(tag)
          }
        })
      })
    }
  },
  components: {
    DropdownMenu,
    Dropdown,
    Tag,
    DtIcon,
    DropdownItem
  }
}
</script>
<style lang="scss" scoped>
  .scroll-bar {
    display: flex;
    &__icon {
      flex: 0 0 36px;
      width: 36px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      margin-right: 0;
      background: #fff;
    }
  }
  .scroll-outer{
    position: relative;
    flex: 1;
    width: calc(100% - 96px);
    overflow: hidden;
    .scroll-body{
      height: 100%;
      display: inline-block;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left .3s ease;
      padding:2px 4px 0 4px;
      .ivu-tag-dot-inner{
        transition: background .2s ease;
      }
    }
  }
  .el-tag {
    border-radius: 0;
    margin-right: 5px;
    cursor: pointer;
    background: #fff;
  }
</style>
