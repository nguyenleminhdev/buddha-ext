<template>
  <Loading v-if="commonStore.is_loading_full_screen" type="FULL" size="50" />
  <div>
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { useCommonStore } from './store'

import Loading from '../components/Loading.vue'

const commonStore = useCommonStore()
</script>
<style></style>
