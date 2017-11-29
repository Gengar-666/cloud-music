<template>
  <div id="search">
       <music-search></music-search>
  </div>
</template>

<script>
import musicSearch from '@/components/Search'
export default {
  name: 'search',
  data: () => ({
  }),
  components: {
    musicSearch
  }
}
</script>

<style lang="less" scoped>
#search {}
</style>