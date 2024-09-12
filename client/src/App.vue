<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

</script>

<template>
  <RouterView />
</template>


<style scoped>
</style>