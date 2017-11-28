<template>
  <div id="rank">
    <v-rank />
  </div>
</template>

<script>
import Rank from '@/components/Rank'
export default {
  name: 'rank',
  data: () => ({
  }),
  components: {
    'v-rank': Rank
  }
}
</script>

<style lang="less" scoped>
#rank {}
</style>
