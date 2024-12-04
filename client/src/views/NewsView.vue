<script setup lang="ts">
import {useBooksStore} from "@/stores/books";
import {onBeforeMount} from "vue";
import Books from "@/layout/Books/index.vue";
import {useAuthStore} from "@/stores/auth";

const {NewsList, LIST} = useBooksStore()
const {current} = useAuthStore()

onBeforeMount( async () => {await NewsList()})
</script>

<template>
  <div class="news">
    <Books @update="NewsList().then(async () => {await current()})" :BOOKS="LIST" />
  </div>
</template>