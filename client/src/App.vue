<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";

const {isAuth, auth} = useAuthStore()
</script>

<template>
  <div v-if="isAuth">
    <p>Auth</p>
    <p>{{ auth.user.email }}</p>
  </div>
  <div v-else><p>(index) Not Auth</p></div>
  <RouterView/>
</template>

<style scoped>
</style>