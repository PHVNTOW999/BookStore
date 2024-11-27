import {defineStore} from 'pinia';
import {computed, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import Notification from "@/helpers/notification";
import type {FormInstance, FormRules} from "element-plus";
import asyncPattern from "@/helpers/asyncPattern";
import {useAuthStore} from "@/stores/auth";

export const useAuthFormStore = defineStore('AuthForm', () => {
    const router = useRouter();

    const {login, register} = useAuthStore()

    // mutations
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
                if (!ruleFormRefStore.value) return
                ruleFormRefStore.value?.validateField('confirmPassword')
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

    const ruleFormRefReplace = (payload) => {
        return ruleFormRefStore.value = payload
    }

    const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
    }

    const submitSignInForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate(async (valid) => {
            if (valid) {
                await asyncPattern(login(Form).then(() => {
                    router.push({'name': 'home'})
                }), true).then(() => {
                    resetForm(ruleFormRefStore.value)
                })
            } else {
                Notification('Form invalid!', 'warnin g')
            }
        }).then()
    }

    const submitSignUpForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate(async (valid) => {
            if (valid) {
                await asyncPattern(register(Form).then(async () => {
                    await login(Form).then(() => {
                        router.push({'name': 'home'})
                    })
                }), true).then(() => {
                    resetForm(ruleFormRefStore.value)
                })
            } else {
                Notification('Form invalid!', 'error')
            }
        }).then()
    }

    // states
    const Form = reactive({
        // email: '',
        // password: '',
        // confirmPassword: '',

        email: 'admin99@gmail.com',
        password: 'qwerty',
        confirmPassword: 'qwerty',
    })

    const rules = reactive<FormRules<typeof ruleFormRefStore>>({
        email: [{validator: validateEmail, trigger: 'blur'}],
        password: [{validator: validatePass, trigger: 'blur'}],
        confirmPassword: [{validator: validateConfirmPassword, trigger: 'blur'}]
    })

    const ruleFormRefStore = ref(null)

    return {
        Form,
        rules,
        ruleFormRefStore,
        ruleFormRefReplace,
        submitSignInForm,
        submitSignUpForm,
    }
});