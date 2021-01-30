<template>
  <div class="bg-viewer">
    <h3>Current BG</h3>
    <h1>{{ currentBgInfo.sgv }}</h1>
    <h3>{{ currentBgInfo.time }}</h3>
    <p>{{ currentBgInfo.direction }}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'BgViewer',
  data() {
    return {
      currentBgInfo: {
        sgv: null,
        time: '',
        direction: '',
      },
    }
  },
  mounted() {
    this.fetchCurrentBgInfo()
  },
  methods: {
    async fetchCurrentBgInfo() {
      try {
        const { data } = await axios.get(
          'https://orriebetes.herokuapp.com/api/v1/entries.json',
          {
            params: {
              count: 1,
            },
          }
        )
        return (this.currentBgInfo = {
          sgv: data[0].sgv,
          time: data[0].sysTime,
          direction: data[0].direction,
        })
      } catch (e) {
        console.log('Err: ', e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.bg-viewer {
  h3,
  h1 {
    color: #bada55;
  }
}
</style>
