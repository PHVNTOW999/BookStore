<template>
  <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="Form"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
  >
    <el-form-item label="Email" prop="email">
      <el-input v-model="Form.email"/>
    </el-form-item>
    <el-form-item label="Password" prop="pass">
      <el-input v-model="Form.password" type="password" autocomplete="off"/>
    </el-form-item>
    <el-form-item label="Confirm Password" prop="checkPass">
      <el-input
          v-model="Form.checkPass"
          type="password"
          autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        Submit
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {useAuthStore} from "@/stores/auth";

const AUTH = useAuthStore()
const ruleFormRef = ref<FormInstance>()

const Form = reactive({
  email: 'admin2@gmail.com',
  password: 'qwerty',
  checkPass: 'qwerty',
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
    if (Form.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value?.validateField('checkPass')
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
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
  checkPass: [{validator: validatePass2, trigger: 'blur'}]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      AUTH.login(Form)
    } else {
      console.log('error submit!')
    }
  })
}
</script>
