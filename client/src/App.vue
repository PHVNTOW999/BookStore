<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";
import {onMounted} from "vue";

const {user, oauthLogin} = useAuthStore()
onMounted(async () => {
  // try {
    await oauthLogin()
  // } catch (e) {
  //   console.log(e)
  // }
})
</script>

<template>
  <div v-if="user">
    <p>user</p>
    <p>{{ user.email }}</p>
  </div>
  <div v-else><p>(index) Not Auth</p></div>
  <RouterView/>
</template>

<style scoped>
</style>