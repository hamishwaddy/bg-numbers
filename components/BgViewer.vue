<template>
  <div class="bg-viewer">
    <div class="bg-number">
      <div class="bg-value-left">
        <h1>{{ currentBgInfo.sgv | toMmol }}</h1>
      </div>
      <div class="bg-arrow-right">
        <span
          v-if="currentBgInfo.direction === 'DoubleUp'"
          class="double-arrow"
        >
          <v-icon>mdi-arrow-up-thick</v-icon>
          <v-icon>mdi-arrow-up-thick</v-icon>
        </span>
        <span v-else-if="currentBgInfo.direction === 'SingleUp'">
          <v-icon>mdi-arrow-up-thick</v-icon>
        </span>
        <span v-else-if="currentBgInfo.direction === 'FortyFiveUp'">
          <v-icon>mdi-arrow-top-right-thick</v-icon>
        </span>
        <span v-else-if="currentBgInfo.direction === 'Flat'">
          <v-icon>mdi-arrow-right-thick</v-icon>
        </span>
        <span v-else-if="currentBgInfo.direction === 'FortyFiveDown'">
          <v-icon>mdi-arrow-bottom-right-thick</v-icon>
        </span>
        <span v-else-if="currentBgInfo.direction === 'SingleDown'">
          <v-icon>mdi-arrow-down-thick</v-icon>
        </span>
        <span
          v-else-if="currentBgInfo.direction === 'DoubleDown'"
          class="double-arrow"
        >
          <v-icon>mdi-arrow-down-thick</v-icon>
          <v-icon>mdi-arrow-down-thick</v-icon>
        </span>
      </div>
    </div>
    <h3>{{ currentBgInfo.time }}</h3>
  </div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns'
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
    setInterval(async () => {
      await this.fetchCurrentBgInfo()
    }, 30000)
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
          time: formatDistanceToNow(Date.parse(data[0].sysTime), {
            includeSeconds: true,
            addSuffix: true,
          }),
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
  h1 {
    font-size: 48px;
  }

  h3,
  h1 {
    color: #bada55;
  }
}

.bg-number {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg-value-left {
  padding: 6px;
}

.v-icon {
  font-size: 48px;
  // margin: 0;
  // padding: 0;
}

.double-arrow {
  v-icon :nth-child(2) {
    margin-right: -20px;
  }
}
</style>
