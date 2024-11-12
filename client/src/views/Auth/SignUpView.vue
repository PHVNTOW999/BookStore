<script setup lang="ts">
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {useAuthStore} from "@/stores/auth";
import {useRouter} from "vue-router";
import {ElLoading} from "element-plus";

const {register, login} = useAuthStore()
const ruleFormRef = ref<FormInstance>()
const router = useRouter();

const Form = reactive({
  email: 'admin99@gmail.com',
  password: 'qwerty',
  confirmPassword: 'qwerty',
})

const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input your email'))
  } else {
    const emailReg = /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+(\.[A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i
    if (emailReg.test(Form.email)) {
      callback()
    } else {
      callback(new Error('Please input correct email'))
    }
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (Form.confirmPassword !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value?.validateField('confirmPassword')
    }
    callback()
  }
}

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== Form.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof Form>>({
  email: [{validator: validateEmail, trigger: 'blur'}],
  password: [{validator: validatePass, trigger: 'blur'}],
  confirmPassword: [{validator: validateConfirmPassword, trigger: 'blur'}]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const loading = ElLoading.service({
        fullscreen: true,
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      try {
        await register(Form).then(() => {
          login(Form).then(() => {router.push({'name': 'test'})})
        })
      } catch (e) {
        console.log(e)
      } finally {
        loading.close()
      }
    } else {
      console.log('error submit!')
    }
  })
}
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
        <el-button class="w-full" type="primary" @click="submitForm(ruleFormRef)">Sign Up</el-button>
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

      <!-- Link to Sign In page -->
      <div class=" text-center">
        <el-text class="mx-1">
          If you have an account, you can
          <el-text class="mx-1" type="primary" tag="ins"><router-link to="/auth/signin">Sign In</router-link></el-text>
        </el-text>
      </div>
    </el-form>
  </div>
</template>