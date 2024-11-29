<script lang="ts">
import Nav from "@/layout/Header/components/Nav.vue";
import User from "@/layout/Header/components/User.vue";
import router, {default as routerList} from "@/router"

export default {
  name: "Header",
  components: {User, Nav},
  props: {
    USER: {
      type: Object,
      default: false
    }
  },
  computed: {
    activeIndex() {
      return routerList.currentRoute.value.path
    },
    newRouter(USER) {
      return routerList.options.routes.filter((route) => {
        if (route.name === 'Home' || route.name === 'Auth') return false
        if (!USER && route.meta?.['requiresAuth'] === true) return false
        return !(USER && route.meta?.['requiresAuth'] === false);
      })
    }
  },
  methods: {
    handleSelect(key) {
      return router.push({'path': key})
    }
  }
}
</script>

<template>
  <div class="header">
    <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
      <Nav :newRouter="newRouter"/>
      <User :USER="USER"/>
    </el-menu>
  </div>
</template>