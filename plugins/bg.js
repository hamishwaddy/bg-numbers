import Vue from 'vue'

const convertToMmol = (val) => {
  return (val / 18.018018).toFixed(1)
}

Vue.filter('toMmol', convertToMmol)
