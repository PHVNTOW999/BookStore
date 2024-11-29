<template>
  <div class="bookCart">
    {{DATA.title}}
  </div>
</template>

<script>
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

<style scoped>

</style>