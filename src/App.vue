<!-- app.vue -->
<script>
import sideBarView from './views/side-Bar-View.vue'
import searchBarView from './views/Search-bar.vue'

export default {
  components: {
    sideBarView,
    searchBarView,
  },

  computed: {
    isLogiPage(){
      return this.$route.name === 'Login';
    },
    isLoadingPage(){
      return this.$route.name === 'pageLoading';
    }
  }
};
</script>

<template>
  <div id="app">
    <header>
      <sideBarView v-if="!isLogiPage && !isLoadingPage"></sideBarView>
    </header>

    <main>
      <searchBarView v-if="!isLogiPage && !isLoadingPage"></searchBarView>
      <router-view />
    </main>
  </div>
</template>