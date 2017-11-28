<template>
  <div id="search">
      <v-search />
  </div>
</template>

<script>
import Search from '@/components/Search'
export default {
  name: 'search',
  data: () => ({
  }),
  components: {
    'v-search': Search
  }
}
</script>

<style lang="less" scoped>
#search {}
</style>