<script setup lang="ts">
import {useBooksStore} from "@/stores/books";
import {onMounted, ref} from "vue";

const {AuthorList, GenreList, GENRES} = useBooksStore()

const SelectedGenres = ref([])

onMounted(async () => {
  await AuthorList()
  await GenreList()
})
</script>

<template>
  <div class="filter w-full h-52 rounded border border-sky-500 bg-zinc-950">
    <el-select
        v-model="SelectedGenres"
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="Select"
        style="width: 240px"
    >
      <el-option
          v-for="item in GENRES"
          :key="item.title"
          :label="item.title"
          :value="item.title"
      />
    </el-select>
<!--  Authors  -->
<!--  Genres  -->
<!--  Price range  -->
  </div>
</template>