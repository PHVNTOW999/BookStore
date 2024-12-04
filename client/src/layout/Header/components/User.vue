<script lang="ts">
import {useAuthStore} from "@/stores/auth";
import {mapActions} from "pinia";
import {ShoppingCart, Star, SwitchButton, Tickets, User as UserIcon} from "@element-plus/icons-vue";

export default {
  name: "User",
  components: {Tickets, SwitchButton, ShoppingCart, Star, UserIcon},
  props: {
    USER: {
      type: Object,
      default: false
    }
  },
  methods: {
    ...mapActions(useAuthStore, {logout: 'logout'})
  }
}
</script>

<template>
  <el-sub-menu v-if="USER" class="ml-auto" style="margin-left: auto;" index="2">
    <template #title>{{ USER['email'] }}</template>
<!--    Wishlist-->
    <el-menu-item>
      <el-icon>
        <Star/>
      </el-icon>
      Wishlist <span v-if="USER['wishlist'].length">&nbsp;[{{ USER['wishlist'].length }}]</span>
    </el-menu-item>
<!--    Basket-->
    <el-menu-item>
      <el-icon>
        <ShoppingCart/>
      </el-icon>
      Basket <span v-if="USER['basket'].length">&nbsp;[{{ USER['basket'].length }}]</span>
    </el-menu-item>
<!--    Order History-->
    <el-menu-item index="/orders">
      <el-icon>
        <Tickets/>
      </el-icon>
      Order History
    </el-menu-item>
<!--    Logout-->
    <el-menu-item @click="logout()">
      <el-icon>
        <SwitchButton/>
      </el-icon>
      Logout
    </el-menu-item>
  </el-sub-menu>


  <el-sub-menu v-else class="ml-auto" style="margin-left: auto;" index="/auth">
    <template #title>Authorize</template>
    <el-menu-item index="/auth/signin">Sign In</el-menu-item>
    <el-menu-item index="/auth/signup">Sign Up</el-menu-item>
  </el-sub-menu>
</template>