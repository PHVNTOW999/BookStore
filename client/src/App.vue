<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";
import {onBeforeMount} from "vue";
import Header from "@/components/Header.vue";

const {current, USER} = useAuthStore()
onBeforeMount( async () => {await current()})

</script>

<template>
  <div class="layout">
    <Header :USER="USER" />
    <RouterView />
  </div>
</template>