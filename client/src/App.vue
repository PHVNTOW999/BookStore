<script setup lang="ts">

import {useAuthStore} from "@/stores/auth";
import {ElLoading} from "element-plus";
import {onMounted} from "vue";

const {current, USER} = useAuthStore()

onMounted(async () => {
  const loading = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  try {
    await current()
  } catch (e) {
    console.log(e)
  } finally {
    loading.close()
  }
})

</script>

<template>
  <div v-if="USER">
    {{ USER.email }}
  </div>
  <RouterView/>
</template>