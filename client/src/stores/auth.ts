import {defineStore} from 'pinia';
import {computed, reactive, ref} from "vue";
import api from "@/api/axios";
import {useRouter} from "vue-router";
import {ElLoading} from "element-plus";
import Notification from "@/constants/notifications";
import type {FormInstance, FormRules} from "element-plus";
import axios from "axios";
import {useCookies} from "vue3-cookies";

export const useAuthStore = defineStore('Auth', () => {
    const router = useRouter();

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
                const loading = ElLoading.service({
                    fullscreen: true,
                    lock: true,
                    text: 'Loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                })
                try {
                    await login(Form).then(() => {
                        router.push({'name': 'home'})
                    })
                } catch (e) {
                    // console.log(e)
                    Notification('Error', 'error')
                } finally {
                    loading.close()
                }
            } else {
                console.log('error submit!')
            }
        }).then(() => resetForm)
    }

    const submitSignUpForm = (formEl: FormInstance | undefined) => {
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
                    await register(Form).then(async () => {
                        await login(Form).then(() => {
                            router.push({'name': 'home'})
                        })
                    })
                } catch (e) {
                    console.log(e)
                } finally {
                    loading.close()
                }
            } else {
                console.log('error submit!')
            }
        }).then(() => resetForm)
    }

    const clearAuth = () => {
        // console.log('clearAuth')
        localStorage.removeItem('token')
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

    const TOKEN = computed(() => {
        return JSON.parse(localStorage.getItem('token'))
    })

    const RULE_FORM_REF_STORE = computed(() => {
        return ruleFormRefStore
    })

    //actions
    const register = async (payload) => {
        await api.post('/api/auth/register/', payload)
    }

    const login = async (payload) => {
        console.log('login')
        await api.post('/api/auth/login/', payload).then(res => {
            localStorage.setItem('token', JSON.stringify(res.data.token))
            user.value = res.data.user
        })
    }

    const current = async () => {
        const loading = ElLoading.service({
            fullscreen: true,
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })

        try {
            await api.get('/api/auth/current/').then(res => {
                user.value = res.data
            })
        } catch (e) {
            // console.log(e)
            // Notification('User not auth', 'error')
            // clearAuth()
        } finally {
            loading.close()
        }
    }

    const checkUp = async () => {
        const loading = ElLoading.service({
            fullscreen: true,
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })

        try {
            await api.get('/api/auth/checkup/')
        } catch (e) {
            console.log(e)
        } finally {
            loading.close()
        }
    }

    const oauthLogin = async () => {
        const loading = ElLoading.service({
            fullscreen: true,
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })

        try {
            await axios.get('/api/auth/oauthLogin/').then(res => {
                localStorage.setItem('token', JSON.stringify(res.data.token))
                user.value = res.data.user
            })
            console.log('ggg')
        } catch (e) {
            // console.log(e)
        } finally {
            // await router.push({'name': 'home'})
            loading.close()
        }
    }

    const tokenVerify = async (payload) => {
        const loading = ElLoading.service({
            fullscreen: true,
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })

        try {
            return await api.post('/api/auth/token/verify/', {'token': payload})
        } catch (e) {
            console.log(e)
            Notification(e.detail, 'error')
        } finally {
            loading.close()
        }
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
            console.log(e)
            // Notification(e.detail, 'error')
            clearAuth()
            return Promise.reject()
        } finally {
            loading.close()
        }
    }

    const logout = async () => {
        await api.post('/api/auth/logout/')
    }

    return {
        // Main
        user,
        USER,
        TOKEN,
        current,
        checkUp,
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