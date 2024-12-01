<script lang="ts">
import BookCart from "@/components/BookCart.vue";

export default {
  name: "Books",
  components: {BookCart},
  props: {
    BOOKS: {
      type: Object,
      default: null
    }
  }
}
</script>

<template>
  <div class="Books p-5 grid grid-cols-4 gap-4" ref="bookLayout">
    <BookCart v-for="book in BOOKS" :DATA="book"/>
  </div>
</template>