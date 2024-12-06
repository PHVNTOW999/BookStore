<script lang="ts">
import BookCart from "@/components/BookCart.vue";
import Filter from "@/layout/Books/components/Filter.vue";

export default {
  name: "Books",
  components: {Filter, BookCart},
  props: {
    BOOKS: {
      type: Object,
      default: null
    }
  }
}
</script>

<template>
  <div class="Books p-5 grid grid-cols-4 gap-4 m-auto" ref="bookLayout">
    <Filter class="row-span-2" />
    <BookCart @update="$emit('update')" v-for="book in BOOKS" :DATA="book"/>
  </div>
</template>