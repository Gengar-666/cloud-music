<template>
  <div id="search">
      <search></search>
  </div>
</template>

<script>
import search from '@/components/Search'
export default {
  name: 'search',
  data: () => ({
  }),
  components: {
    search
  }
}
</script>

<style lang="less" scoped>
#search {}
</style>