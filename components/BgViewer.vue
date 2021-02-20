<template>
  <v-row>
    <v-col>
      <v-card class="card">
        <div class="card-header-section">
          <div class="text-info">
            <v-card-title
              class="title"
              v-text="convertToMmol(currentBgInfo.sgv)"
            />
            <v-card-subtitle class="subtitle" v-text="currentBgInfo.timeAgo" />
          </div>
          <div class="arrow-info">
            <span
              v-if="currentBgInfo.direction === 'DoubleUp'"
              class="double-arrow-up"
            >
              <font-awesome-icon :icon="['fas', 'arrow-up']" />
              <font-awesome-icon :icon="['fas', 'arrow-up']" />
            </span>
            <span v-else-if="currentBgInfo.direction === 'SingleUp'">
              <font-awesome-icon :icon="['fas', 'arrow-up']" />
            </span>
            <span v-else-if="currentBgInfo.direction === 'FortyFiveUp'">
              <font-awesome-icon
                class="forty-five-up"
                :icon="['fas', 'arrow-right']"
              />
            </span>
            <span v-else-if="currentBgInfo.direction === 'Flat'">
              <font-awesome-icon :icon="['fas', 'arrow-right']" />
            </span>
            <span v-else-if="currentBgInfo.direction === 'FortyFiveDown'">
              <font-awesome-icon
                class="forty-five-down"
                :icon="['fas', 'arrow-right']"
              />
            </span>
            <span v-else-if="currentBgInfo.direction === 'SingleDown'">
              <font-awesome-icon :icon="['fas', 'arrow-down']" />
            </span>
            <span
              v-else-if="currentBgInfo.direction === 'DoubleDown'"
              class="double-arrow-down"
            >
              <font-awesome-icon :icon="['fas', 'arrow-down']" />
              <font-awesome-icon :icon="['fas', 'arrow-down']" />
            </span>
            <span
              v-else-if="currentBgInfo.direction === 'NOT COMPUTABLE'"
              class="no-data"
            >
              <font-awesome-icon :icon="['fas', 'exclamation']" />
            </span>
          </div>
        </div>
        <hr />
        <div class="info-chips">
          <v-chip color="primary">
            <font-awesome-icon :icon="['fas', 'syringe']" />
            IOB</v-chip
          >
          <v-chip color="primary">
            <font-awesome-icon :icon="['fas', 'pizza-slice']" />
            CARBS</v-chip
          >
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
  padding: 16px;
}

.card-header-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 16px;
}

.text-info {
  display: flex;
  flex-direction: column;
}

.v-card__title {
  font-size: 60px !important;
  font-weight: 700;
  padding: 12px 0;
  margin-bottom: 12px;
}

.v-card__subtitle {
  font-size: 14px !important;
  font-weight: 300;
  padding: 0;
  text-align: center;
}

.bg-number {
  display: flex;
  justify-content: center;
  align-items: center;
}

span svg {
  font-size: 40px;
}

.double-arrow-up,
.double-arrow-down {
  display: flex;
}

.forty-five-up {
  transform: rotate(-45deg);
}

.forty-five-down {
  transform: rotate(45deg);
}

.no-data {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  svg,
  span {
    color: $color-primary-light;
  }
}
.info-chips {
  margin-top: 16px;
  display: flex;
  justify-content: space-around;

  svg {
    font-size: 16px;
    margin-right: 4px;
  }
}
</style>
