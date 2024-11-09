<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";
import {onMounted} from "vue";

const {user, USER, current, oauthLogin} = useAuthStore()
onMounted(async () => {
  // try {
  //   await current()
    // await oauthLogin()
  // } catch (e) {
  //   console.log(e)
  // }
})
</script>

<template>
  <div v-if="USER">
    <div>{{ USER.email }}</div>
  </div>
  <div v-else><p>(index) Not Auth</p></div>
  <RouterView/>
</template>

<style scoped>
</style>