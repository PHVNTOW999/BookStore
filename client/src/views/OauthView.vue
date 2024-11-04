<script setup lang="ts">

import {onMounted} from "vue";
import {useAuthStore} from "@/stores/auth.ts";
import {useRouter} from "vue-router";
import {ElLoading} from "element-plus";

const {user, current, oauthLogin} = useAuthStore()
const router = useRouter();

onMounted(async () => {
  if (!user) {
    const loading = ElLoading.service({
      fullscreen: true,
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })

    try {
      setTimeout(async () => {
        await oauthLogin().then(async () => {
          await current().catch((e) => {
            router.push({'name': 'auth'})
          })
        }).then(() => {
          router.push({'name': 'test'})
        }).finally(() => {
          return user
        })
      }, 0)

    } catch (e) {
      console.log(e)
    } finally {
      await user
      loading.close()
    }
  } else {
    // await router.push({'name': 'auth'})
  }
})
</script>

<template>
  <main>
    <div class="ggg">
      jjj
      <div v-if="user">
        <p>user</p>
        <p>{{ user.email }}</p>
      </div>
      <div v-else><p>(index) Not Auth</p></div>
    </div>
  </main>
</template>