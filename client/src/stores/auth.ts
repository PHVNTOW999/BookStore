import {defineStore} from 'pinia';
import {computed, reactive, ref} from "vue";
import api from "@/api/axios";
import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";
import {ElLoading} from "element-plus";
import Notification from "@/constants/notifications";
import type { FormInstance, FormRules } from "element-plus";

export const useAuthStore = defineStore('Auth', () => {
    const router = useRouter();
    const {cookies} = useCookies();

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
                        router.push({'name': 'test'})
                    })
                } catch (e) {
                    Notification('Error', 'error')
                } finally {
                    loading.close()
                }
            } else {
                console.log('error submit!')
            }
        }).then(() => resetForm)
    }

    // state
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
    const USER = computed(() => { return user })

    const RULE_FORM_REF_STORE = computed(() => { return ruleFormRefStore })

    //actions
    const register = async (payload) => {
        await api.post('/api/auth/register/', payload)
    }

    const login = async (payload) => {
        await api.post('/api/auth/login/', payload).then(res => {
            localStorage.setItem('token', JSON.stringify(res.data.token))
            user.value = res.data.user
        })
    }

    const current = async () => {
        try {
            await api.get('/api/auth/current/').then(res => { user.value = res.data})
        } catch (e) {
            console.log(e)
        }
    }

    const oauthLogin = async () => {
        try {
            await api.get('/api/auth/oauthLogin/').then(res => {
                localStorage.setItem('token', JSON.stringify(res.data.token))
                user.value = res.data.user
            })
        } catch (e) {
            console.log(e)
        }
    }

    const tokenVerify = async () => {
        const token = JSON.parse(localStorage.getItem('token'))

        try {
            await api.post('/api/auth/token/verify/', {'token': token.access})
        } catch (e) {
            console.log(e)
        }
    }

    const logout = async () => {
        localStorage.removeItem('token')
        cookies.remove('sessionid')

        await api.post('/api/auth/logout/')
        await router.go(0)
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
        logout,
        // Form
        Form,
        rules,
        ruleFormRefStore,
        RULE_FORM_REF_STORE,
        ruleFormRefReplace,
        submitSignInForm,
    }
});