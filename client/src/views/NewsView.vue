<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import {useBooksStore} from "@/stores/books";
// import {onMounted} from "vue";

const BOOKS = useBooksStore()
const ggg = async () => {
  await BOOKS.getBookList()
}
// onMounted(() => {
//   setTimeout(async () => {
//     await BOOKS.getBookList()
//   }, 500)
// })
</script>

<template>
  <main>
    <button @click="ggg">test</button>
    <router-link to="/test">Test</router-link>
    <TheWelcome/>
  </main>
</template>