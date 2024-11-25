<script setup lang="ts">
import {useAuthStore} from "@/stores/auth"
import type {FormInstance} from "element-plus";
import {ref, watch} from "vue";

const {rules, Form, submitSignUpForm, ruleFormRefReplace} = useAuthStore()
const ruleFormRef = ref<FormInstance>()

watch(() => ruleFormRef.value, () => {
  ruleFormRefReplace(ruleFormRef.value)
})

</script>

<template>
  <div class="signup mt-10">
    <el-form
        ref="ruleFormRef"
        :model="Form"
        status-icon
        :rules="rules"
        label-width="auto"
        label-position="left"
        class="m-auto w-3/4 rounded border border-sky-500 p-5"
    >
      <!-- Email -->
      <el-form-item label="Email" prop="email">
        <el-input class="float-left" v-model="Form.email"/>
      </el-form-item>
      <!-- Password -->
      <el-form-item label="Password" prop="password">
        <el-input v-model="Form.password" type="password" autocomplete="off"/>
      </el-form-item>
      <!-- Confirm Password -->
      <el-form-item label="Confirm Password" prop="confirmPassword">
        <el-input v-model="Form.confirmPassword" type="password" autocomplete="off"/>
      </el-form-item>
      <!-- Submit -->
      <el-form-item>
        <el-button class="w-full" type="primary" @click="submitSignUpForm(ruleFormRef)">Sign Up</el-button>
      </el-form-item>

      <!-- Social Networks -->
      <el-form-item label="Sign in via Social Networks :">
        <!-- GitHub -->
        <span class="social-block bg-white rounded border mr-2">
          <a href="http://localhost:5173/api/oauth/login/github/">
            <img src="@/assets/icons/github.svg" width="25" alt="Github" title="Sign in via Github">
          </a>
        </span>
        <!-- Gmail -->
        <span class="social-block bg-white rounded border">
          <a href="http://localhost:5173/api/oauth/login/gmail/">
            <img src="@/assets/icons/gmail.svg" width="25" alt="Github" title="Sign in via Gmail">
          </a>
        </span>
      </el-form-item>

      <!-- Link to Sign Up page -->
      <div class=" text-center">
        <el-text class="mx-1">
          If you have an account, you can
          <el-text class="mx-1" type="primary" tag="ins">
            <router-link to="/auth/signin">Sign In</router-link>
          </el-text>
        </el-text>
      </div>
    </el-form>
  </div>
</template>