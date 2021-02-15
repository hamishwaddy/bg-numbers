<template>
  <div class="wrapper">
    <div class="logo-wrapper">
      <Logo />
    </div>
    <div class="bg-viewer">
      <BgViewer />
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import BgViewer from '~/components/BgViewer.vue'

export default {
  components: {
    Logo,
    BgViewer,
  },
}
</script>

<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  justify-content: center;
}
</style>
