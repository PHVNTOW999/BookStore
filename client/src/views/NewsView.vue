<script setup lang="ts">
import {useBooksStore} from "@/stores/books";

const BOOKS = useBooksStore()
const ggg = async () => {
  await BOOKS.getBookList()
}
</script>

<template>
  <main>
    <button @click="ggg">testnjjnj</button>
    <router-link to="/test">Test</router-link>
  </main>
</template>