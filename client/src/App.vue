<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";
import {onBeforeMount} from "vue";

const {current, USER} = useAuthStore()
onBeforeMount( async () => {await current()})

</script>

<template>
  <div v-if="USER">
    {{ USER.email }}
  </div>
  <RouterView/>
</template>