<script lang="ts">
export default {
  name: "Header",
  props: {
    newRouter: {
      type: Array,
      required: true,
      default: null
    }
  }
}
</script>

<template>
  <el-menu-item v-for="(page, i) of newRouter" :index="page.path" :key="i">{{ page.name }}</el-menu-item>
</template>