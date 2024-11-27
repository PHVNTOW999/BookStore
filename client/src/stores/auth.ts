import {defineStore} from 'pinia';
import {computed, reactive, ref} from "vue";
import api from "@/api/axios";
import {useRouter} from "vue-router";
import {ElLoading} from "element-plus";
import Notification from "@/constants/notifications";
import type {FormInstance, FormRules} from "element-plus";
import {useCookies} from "vue3-cookies";
import axios from "axios";

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
                    Notification(e, 'error')
                } finally {
                    loading.close()
                }
            } else {
                Notification('Form invalid!', 'warning')
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
                    Notification(e, 'error')
                } finally {
                    loading.close()
                }
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
        const loading = ElLoading.service({
            fullscreen: true,
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })

        try {
            await api.post('/api/auth/register/', payload).then(() => {
                Notification('You have successfully registered!', 'success')
            })
        } catch (e) {
            Notification(e.data.detail || e.statusText, 'error')
        } finally {
            loading.close()
        }
    }

    const login = async (payload) => {
        const loading = ElLoading.service({
            fullscreen: true,
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })

        try {
            await api.post('/api/auth/login/', payload).then(res => {
                localStorage.setItem('token', JSON.stringify(res.data.token))
                user.value = res.data.user
            }).then(() => {
                Notification('You have successfully sign in!', 'success')
            })
        } catch (e) {
            Notification(e.data.detail || e.statusText, 'error')
        } finally {
            loading.close()
        }
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
            // null
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
            await api.get('/api/auth/oauthLogin/').then(async res => {
                localStorage.setItem('token', JSON.stringify(res.data.token))
                user.value = res.data.user
                await router.push({'name': 'home'})
            })
        } catch (e) {
            await router.push({'name': 'auth'})
            Notification(e.data.detail || e.statusText, 'error')
        } finally {
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
            Notification(e.data.detail || e.statusText, 'error')
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
            Notification(e.data.detail || e.statusText, 'error')
        } finally {
            loading.close()
        }
    }

    const logout = async () => {
        const loading = ElLoading.service({
            fullscreen: true,
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })

        try {
            await api.post('/api/auth/logout/').then(res => {
                Notification(res.data, 'success')
            }).then(clearAuth)
        } catch (e) {
            Notification(e.data.detail || e.statusText, 'error')
        } finally {
            loading.close()
        }
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