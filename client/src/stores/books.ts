import {defineStore} from 'pinia';
import api from "@/config/axios";
import Notification from "@/helpers/notification";
import {ElLoading} from "element-plus";

export const useBooksStore = defineStore('Books', () => {
    const getBookList = async () => {
        const loading = ElLoading.service({
            fullscreen: true,
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })

        try {
            await api.get('/api/booklist/').then(res => {
                return res.data
            })
        } catch (e) {
            Notification(e.data.detail || e.statusText, 'error')
        } finally {
            loading.close()
        }
    }

    return {getBookList}
});