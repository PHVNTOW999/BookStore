import {defineStore} from 'pinia';
import {computed, reactive, ref} from "vue";
import api from "@/api/axios";
import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";
import {ElLoading} from "element-plus";
import Notification from "@/constants/notifications";
import ruleFormRef from "../views/Auth/SignInView.vue"

export const useAuthStore = defineStore('Auth', () => {
    const router = useRouter();
    const {cookies} = useCookies();


    // getters
    const USER = computed(() => { return user })

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

    const submitSignInForm = (formEl) => {
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
        })
    }

    // state

    // const test2 = ref(null)

    const user = ref(null)

    const Form = reactive({
        email: 'admin99@gmail.com',
        password: 'qwerty',
        confirmPassword: 'qwerty',
    })

    const rules = reactive({
        email: [{validator: validateEmail, trigger: 'blur'}],
        password: [{validator: validatePass, trigger: 'blur'}],
        confirmPassword: [{validator: validateConfirmPassword, trigger: 'blur'}]
    })

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

    const current = async () => {
        try {
            await api.get('/api/auth/current/').then(res => { user.value = res.data})
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

    return {user, USER, register, login, logout, current, oauthLogin, tokenVerify, Form, rules, submitSignInForm}
});