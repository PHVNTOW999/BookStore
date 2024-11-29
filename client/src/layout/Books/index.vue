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
  <div class="Books flex justify-between">
    <BookCart v-for="book in BOOKS" :DATA="book" />
  </div>
</template>