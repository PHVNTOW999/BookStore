<script lang="ts">
import {useAuthStore} from "@/stores/auth";
import {mapActions} from "pinia";

export default {
  name: "User",
  methods: {useAuthStore},
  props: {
    USER: {
      type: Object,
      default: false
    }
  },
  // computed: {
  //   ...mapActions(useAuthStore, [logout])
  // }
}

</script>

<template>
  <el-sub-menu v-if="USER" class="ml-auto" style="margin-left: auto;" index="2">
    <template #title>{{ USER['email'] }}</template>
    <el-menu-item index="/profile">Profile</el-menu-item>
<!--    <el-menu-item @click="logout">Logout</el-menu-item>-->
  </el-sub-menu>


  <el-sub-menu v-else class="ml-auto" style="margin-left: auto;" index="/auth">
    <template #title>Authorize</template>
    <el-menu-item index="/auth/signin">Sign In</el-menu-item>
    <el-menu-item index="/auth/signup">Sign Up</el-menu-item>
  </el-sub-menu>
</template>