<template>
  <div id="rank">
    <music-rank></music-rank>
  </div>
</template>

<script>
import musicRank from '@/components/Rank'
export default {
  name: 'rank',
  data: () => ({
  }),
  components: {
    musicRank
  }
}
</script>

<style lang="less" scoped>
#rank {}
</style>