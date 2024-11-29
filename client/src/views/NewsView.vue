<script setup lang="ts">
import {useBooksStore} from "@/stores/books";
import {onBeforeMount} from "vue";
import Books from "@/layout/Books/index.vue";

const {NewsList, LIST} = useBooksStore()

onBeforeMount( async () => {await NewsList()})
</script>

<template>
  <div class="news">
    <Books :BOOKS="LIST" />
  </div>
</template>