<script setup lang="ts">

import {onMounted} from "vue";
import {useAuthStore} from "@/stores/auth.ts";

const {oauthLogin} = useAuthStore()

onMounted( async () => { await oauthLogin() })

</script>