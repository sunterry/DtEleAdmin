<template>
  <div>
    <Button @click="createTagQuery">添加一个标签</Button>
    <Button @click="createTagParams">添加一个标签</Button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { Button } from 'element-ui'
export default {
  name: 'tools_methods_page',
  methods: {
    ...mapMutations([
      'addTag'
    ]),
    createTagParams () {
      const id = parseInt(Math.random() * 100000)
      const route = {
        name: 'params',
        params: {
          id
        },
        meta: {
          title: `动态路由-${id}`
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    },
    createTagQuery () {
      const id = parseInt(Math.random() * 100000)
      const route = {
        name: 'query',
        query: {
          id
        },
        meta: {
          title: `参数-${id}`
        }
      }
      this.addTag({
        route: route,
        type: 'push'
      })
      this.$router.push(route)
    }
  },
  components: {
    Button
  }
}
</script>
