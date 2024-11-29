<script lang="ts">
import Menu from "@/components/Menu.vue";

export default {
  name: "Header",
  components: {Menu},
  props: {
    USER: {
      type: Object,
      default: false
    }
  }
}
</script>

<template>
  <div class="header">
    <Menu :USER="$props.USER"/>
  </div>
</template>