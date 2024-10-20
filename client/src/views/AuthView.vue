<script>
import {onMounted} from "vue";
import LoginForm from "@/components/form/LoginForm.vue";
import {useAuthStore} from "@/stores/auth";

export default {
  name: "AuthView",
  components: {LoginForm},
  setup() {
    const {oauthLogin} = useAuthStore()
    onMounted(async () => {
      try {
        await oauthLogin()
      } catch (e) {
        console.log(e)
      }
    });
  }
}
</script>

<template>
  <div class="auth">
    <LoginForm/>
  </div>
</template>
