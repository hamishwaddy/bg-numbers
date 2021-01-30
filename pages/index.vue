<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <div class="text-center">
          <Logo />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="text-center">
          <BgViewer />
        </div>
      </v-col>
    </v-row>
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
