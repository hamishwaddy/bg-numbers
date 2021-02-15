<template>
  <v-row>
    <v-col cols="12">
      <v-card class="card">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title
              class="headline"
              v-text="convertToMmol(currentBgInfo.sgv)"
            />
            <v-card-subtitle v-text="currentBgInfo.timeAgo"></v-card-subtitle>
          </div>
          <v-avatar class="ma-3" size="125" tile>
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
          </v-avatar>
        </div>
      </v-card>
    </v-col>
  </v-row>
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
        timeAgo: '',
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
  beforeDestroy() {
    clearInterval(this.fetchCurrentBgInfo)
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
          timeAgo: formatDistanceToNow(Date.parse(data[0].sysTime), {
            includeSeconds: true,
            addSuffix: true,
          }),
          direction: data[0].direction,
        })
      } catch (err) {
        throw new Error('Failed to fetch current BG info. \nErr: ', err)
      }
    },
    convertToMmol(val) {
      return (val / 18.018018).toFixed(1)
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  background-color: $color-primary-dark;
  border-radius: 16px;
}

.headline {
  font-size: 58px !important;
  font-weight: 700;
  margin: 12px 0 16px;
}

.bg-number {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-icon {
  font-size: 96px;
  color: $color-secondary-dark;
}

.double-arrow {
  v-icon :nth-child(2) {
    margin-right: -20px;
  }
}
</style>
