export default {
  methods: {
    showTitle (item) {
      return (item.meta && item.meta.title) || item.name
    },
    getIcon (item) {
      return (item.meta && item.meta.icon) || ''
    },
    getNamehasHref (item, children) {
      return item.href ? `hasHrefInName_${item.href}` : (children ? item.children[0].name : item.name)
    },
    showChildren (item) {
      return item.children && (item.children.length > 1 || (item.meta && item.meta.always))
    }
  }
}
