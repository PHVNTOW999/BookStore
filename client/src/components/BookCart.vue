<script setup lang="ts">
import {useBooksStore} from "@/stores/books";

const {AddWish, RemoveWish, AddBasket, RemoveBasket} = useBooksStore()

defineProps({
  DATA: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <div class="bookCart relative content-center justify-items-center
              m-auto mw-36 w-36 mh-52 h-52 p-2
              rounded border border-sky-500 bg-zinc-950">

    <div class="bookCart__preview contents w-full h-full">
      <img class="w-full h-full" :src="DATA['preview']['file']" :alt="DATA['title']"/>
    </div>

    <div class="bookCart__wrap absolute top-0 left-0 w-full h-full p-2 justify-items-center">
      <div class="info mw-28 w-28 mt-5">
        <div class="bookCart__title">
          <el-tooltip
              class="box-item"
              effect="dark"
              :content="DATA['title']"
              placement="top"
          >
            <router-link :to="'/book/' + DATA['uuid']">
              <h1 class="underline text-center truncate">{{ DATA['title'] }}</h1>
            </router-link>
          </el-tooltip>
        </div>

        <div class="bookCart__authors mt-4 flex justify-center">
          <p class="bookCart__authors__name text-[10px] mr-1 ml-1" v-for="(author, i) in DATA['authors']"
             :key="i">
            <el-tooltip
                class="box-item"
                effect="dark"
                :content="author['fullname']"
                placement="top"
            >
              <router-link :to="'/author/' + author['uuid']">
                <span class="truncate underline">{{ author['short_name'] }}</span>
              </router-link>
            </el-tooltip>
          </p>
        </div>

        <div class="bookCart__genres mt-2 flex justify-center">
          <p class="bookCart__genres__name text-[10px] mr-1 ml-1" v-for="(genre, i) in DATA['genres']"
             :key="i">
            <el-tooltip
                class="box-item"
                effect="dark"
                :content="genre['title']"
                placement="top"
            >
              <router-link :to="'/genre/' + genre['uuid']">
                <span class="truncate underline">{{ genre['title'] }}</span>
              </router-link>
            </el-tooltip>
          </p>
        </div>
      </div>

      <div class="bookCart__price mt-2">
        <h1 class="underline text-center truncate">$ {{ DATA['price'] }}</h1>
      </div>

      <div class="bts mt-3">
        <el-button-group>
          <!--wishlist-->
          <el-button v-if="DATA['inBasket']" @click="RemoveBasket(DATA['uuid']).then($emit('update'))" type="primary" icon="GoodsFilled"/>
          <el-button v-else type="primary" @click="AddBasket(DATA['uuid']).then($emit('update'))" icon="Goods"/>
          <!--basket-->
          <el-button v-if="DATA['wished']" @click="RemoveWish(DATA['uuid']).then($emit('update'))" type="primary" icon="StarFilled"/>
          <el-button v-else @click="AddWish(DATA['uuid']).then($emit('update'))" type="primary" icon="Star"/>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bookCart:hover {
  .bookCart__wrap {
    opacity: 1;
    visibility: visible;
  }
}

.bookCart__wrap {
  background-color: #3c3c3ce0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease
}

.bookCart__authors__name, .bookCart__genres__name {
  &:not(:last-child) {
    &:after {
      content: ","
    }
  }
}
</style>