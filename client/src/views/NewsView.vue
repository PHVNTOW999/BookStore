<script setup lang="ts">
import {useBooksStore} from "@/stores/books";
import {useAuthStore} from "@/stores/auth";

const {USER, logout} = useAuthStore()
const BOOKS = useBooksStore()
const ggg = async () => {
  await BOOKS.getBookList()
}
</script>

<template>
  <main>
    <div v-if="!USER">
      <router-link to="/auth">Auth</router-link>
      <br/>
    </div>
    <router-link to="/test">Test</router-link>
    <br/>
    <button @click="ggg">get books</button>
    <br/>
    <button @click="logout">Logout</button>
  </main>
</template>