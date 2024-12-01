<script lang="ts">
export default {
  name: "BookCart",
  props: {
    DATA: {
      type: Object,
      default: null
    }
  }
}
</script>

<template>
  <div class="bookCart relative content-center justify-items-center
              mw-36 w-36 mh-52 h-52 p-2
              rounded border border-sky-500 bg-zinc-950">

    <div class="preview contents w-full h-full">
      <img class="w-full h-full" :src="DATA['preview']['file']" :alt="DATA['title']"/>
    </div>

    <div class="wrap absolute top-0 left-0 w-full h-full p-2 justify-items-center">
      <div class="info mw-28 w-28 mt-20">
        <div class="bookCart__title underline text-center truncate">
          <router-link :to="'/book/' + DATA['uuid']">
            <h1>{{ DATA['title'] }}</h1>
          </router-link>
        </div>

        <div class="bookCart__authors justify-items-center truncate">
          <span class="block truncate" v-for="(author, i) in DATA['authors']" :key="i">
            <p>{{ author['short_name'] }}</p>
          </span>
        </div>
        <!--       <p class="bookCart__title underline text-xs text-center truncate">Max Davidson</p>-->
        <!--        <p class="bookCart__title text-xs text-center truncate">Horror, Roman</p>-->
      </div>

      <div class="bts">
        <el-button-group class="">
          <el-button type="primary" icon="Sell"/>
          <el-button type="primary" icon="Star"/>
          <!--        <el-button type="primary" icon="StarFilled"/>-->
        </el-button-group>
      </div>
    </div>
  </div>
</template>