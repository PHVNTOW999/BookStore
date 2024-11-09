import {defineStore} from 'pinia';
import api from "@/api/axios";

export const useBooksStore = defineStore('Books', () => {
    const getBookList = async () => {
        await api.get('/api/booklist/').then(res => { return res.data })
    }

    return {getBookList}
});