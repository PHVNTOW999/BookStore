<script setup lang="ts">
import {computed} from 'vue'
import {default as routerList} from "@/router"
import {useRouter} from "vue-router";

const props = defineProps({
  USER: {
    type: Object,
    default: false
  }
})

const router = useRouter();

const newRouter = computed(() => {
  return routerList.options.routes.filter((route) => {
    if (route.name === 'Home' || route.name === 'Auth') return false
    if (!props.USER && route.meta?.['requiresAuth'] === true) return false
    return !(props.USER && route.meta?.['requiresAuth'] === false);
  })
})

const activeIndex = computed((USER) => {
  return routerList.currentRoute.value.path
})

const handleSelect = (key) => {
  router.push({'path': key})
}

</script>

<template>
  <div class="menu">
    <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
      <el-menu-item v-for="(page, i) of newRouter" :index="page.path" :key="i">
        {{ page.name }}
      </el-menu-item>
    </el-menu>
  </div>
</template>