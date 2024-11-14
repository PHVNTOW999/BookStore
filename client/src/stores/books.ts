import {defineStore} from 'pinia';
import api from "@/api/axios";
import Notification from "@/constants/notifications";

export const useBooksStore = defineStore('Books', () => {
    const getBookList = async () => {
        await api.get('/api/booklist/').then(res => {
            return res.data
        })
            // .catch(e => {console.log("e")})
    }

    return {getBookList}
});