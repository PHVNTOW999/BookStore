import {defineStore} from 'pinia';
import api from "@/config/axios";
import asyncPattern from "@/helpers/asyncPattern";
import {computed, ref} from "vue";

export const useBooksStore = defineStore('Books', () => {
    // states
    const list = ref(null)

    // getters
    const LIST = computed(() => {
        return list
    })

    // actions
    const AddWish = async (payload) => {
        await asyncPattern(api.post('/api/books/addWish/', {'book': payload}), true)
    }

    const RemoveWish = async (payload) => {
        await asyncPattern(api.post('/api/books/removeWish/', {'book': payload}), true)
    }

    const NewsList = async () => {
        await asyncPattern(api.get('/api/books/newslist/').then(res => {list.value = res.data}), true)
    }

    return {NewsList, LIST, AddWish, RemoveWish}
});