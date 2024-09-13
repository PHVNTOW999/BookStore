import {defineStore} from 'pinia';
import {ref} from "vue";
import axios from "axios";

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const token = ref(null)
    const login = async (payload) => {
        await axios.post('/api/login/', payload).then(res => {
            // console.log(res.data)
            localStorage.setItem('user', res.data.user)
            localStorage.setItem('token', res.data.token)
        })
    }

    return {login}
});