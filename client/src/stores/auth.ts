import {defineStore} from 'pinia';
import {computed, reactive, ref} from "vue";
import api from "@/config/axios";
import {useRouter} from "vue-router";
import {ElLoading} from "element-plus";
import Notification from "@/helpers/notification";
import type {FormInstance, FormRules} from "element-plus";
import {useCookies} from "vue3-cookies";
import axios from "axios";
import asyncPattern from "@/helpers/asyncPattern";

export const useAuthStore = defineStore('Auth', () => {
    const router = useRouter();
    const {cookies} = useCookies()

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
                }), true)
            } else {
                Notification('Form invalid!', 'warning')
            }
        }).then(() => resetForm)
    }

    const submitSignUpForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate(async (valid) => {
            if (valid) {
                await asyncPattern(register(Form).then(async () => {
                    await login(Form).then(() => {
                        router.push({'name': 'home'})
                    })
                }), true)
            } else {
                Notification('Form invalid!', 'error')
            }
        }).then(() => resetForm)
    }

    const clearAuth = () => {
        localStorage.removeItem('token')
        cookies.remove('sessionid')
        user.value = null
    }

    // states
    const user = ref(null)

    const ruleFormRefStore = ref(null)

    const Form = reactive({
        email: 'admin99@gmail.com',
        password: 'qwerty',
        confirmPassword: 'qwerty',
    })

    const rules = reactive<FormRules<typeof ruleFormRefStore>>({
        email: [{validator: validateEmail, trigger: 'blur'}],
        password: [{validator: validatePass, trigger: 'blur'}],
        confirmPassword: [{validator: validateConfirmPassword, trigger: 'blur'}]
    })

    // getters
    const USER = computed(() => {
        return user
    })

    const RULE_FORM_REF_STORE = computed(() => {
        return ruleFormRefStore
    })

    //actions
    const register = async (payload) => {
        await asyncPattern(api.post('/api/auth/register/', payload).then(() => {
            Notification('You have successfully registered!', 'success')
        }), true)
    }

    const login = async (payload) => {
        await asyncPattern(api.post('/api/auth/login/', payload).then(res => {
            localStorage.setItem('token', JSON.stringify(res.data.token))
            user.value = res.data.user
        }).then(() => {
            Notification('You have successfully sign in!', 'success')
        }), true)
    }

    const current = async () => {
        await asyncPattern(api.get('/api/auth/current/').then(res => {
            user.value = res.data
        }), false)
    }

    const oauthLogin = async () => {
        await asyncPattern(api.get('/api/auth/oauthLogin/').then(async res => {
            localStorage.setItem('token', JSON.stringify(res.data.token))
            user.value = res.data.user
            await router.push({'name': 'home'})
        }), true)
    }

    const tokenVerify = async (payload) => {
        await asyncPattern(api.post('/api/auth/token/verify/', {'token': payload}), true)
    }

    const tokenRefresh = async (payload) => {
        const loading = ElLoading.service({
            fullscreen: true,
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })

        try {
            return await axios.post('/api/auth/token/refresh/', {refresh: payload.refresh}, {
                headers: {
                    'Authorization': `JWT ${payload.access}`
                }
            })
        } catch (e) {
            Notification(e.data.detail || e.statusText, 'error')
        } finally {
            loading.close()
        }
    }

    const logout = async () => {
        await asyncPattern(api.post('/api/auth/logout/').then(res => {
            Notification(res.data, 'success')
        }).then(clearAuth), true)
    }

    return {
        // Main
        user,
        USER,
        current,
        register,
        login,
        oauthLogin,
        tokenVerify,
        tokenRefresh,
        clearAuth,
        logout,
        // Form
        Form,
        rules,
        ruleFormRefStore,
        RULE_FORM_REF_STORE,
        ruleFormRefReplace,
        submitSignInForm,
        submitSignUpForm,
    }
});