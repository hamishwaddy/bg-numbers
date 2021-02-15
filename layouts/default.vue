<template>
  <v-app>
    <!-- <v-navigation-drawer v-model="drawer" :clipped="clipped" right absolute app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <!-- <v-app-bar :clipped-right="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar> -->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Footer,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-account',
          title: 'Profile',
          to: '/user-profile',
        },
        {
          icon: 'mdi-chart-bar',
          title: 'Statistics',
          to: '/statistics',
        },
      ],
      // miniVariant: false,
      // right: true,
      // rightDrawer: false,
      title: 'BG NUMBERS',
    }
  },
}
</script>
