<script setup lang="ts">

import {onMounted} from "vue";
import {useAuthStore} from "@/stores/auth.ts";
import {useRouter} from "vue-router";
import {ElLoading} from "element-plus";
import {useCookies} from "vue3-cookies";

const {cookies} = useCookies();
const {oauthLogin} = useAuthStore()
const router = useRouter();

onMounted(async () => {
  const sessionid = cookies.get('sessionid')

  if (sessionid) {
    const loading = ElLoading.service({
      fullscreen: true,
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })

    try {
      await oauthLogin().then(() => {
        router.push({'name': 'home'})
      })
    } catch (e) {
      console.log(e)
    } finally {
      loading.close()
    }
  }
})
</script>