<script setup lang="ts">
import {useBooksStore} from "@/stores/books";
import Notification from "@/constants/notifications";

const BOOKS = useBooksStore()
const ggg = async () => {
  try {
    await BOOKS.getBookList()
  } catch (e) {
    console.log(e)
    Notification(e.statusText, 'error')
  }
}
</script>

<template>
  <main>
    <button @click="ggg">getbooks </button>
    <br />
    <router-link to="/test">Test</router-link>
  </main>
</template>