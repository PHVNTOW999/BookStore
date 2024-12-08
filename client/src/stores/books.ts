import {defineStore} from 'pinia';
import api from "@/config/axios";
import asyncPattern from "@/helpers/asyncPattern";
import {computed, ref} from "vue";

export const useBooksStore = defineStore('Books', () => {
    // states
    const list = ref(null)

    const authors = ref(null)

    const genres = ref(null)

    // getters
    const LIST = computed(() => {
        return list
    })

    const AUTHORS = computed(() => {
        return authors
    })

    const GENRES = computed(() => {
        return genres
    })

    // actions
    const AddWish = async (payload) => {
        await asyncPattern(api.post('/api/books/addWish/', {'book': payload}), true)
    }

    const RemoveWish = async (payload) => {
        await asyncPattern(api.post('/api/books/removeWish/', {'book': payload}), true)
    }

    const AddBasket = async (payload) => {
        await asyncPattern(api.post('/api/books/addBasket/', {'book': payload}), true)
    }

    const RemoveBasket = async (payload) => {
        await asyncPattern(api.post('/api/books/removeBasket/', {'book': payload}), true)
    }

    const NewsList = async () => {
        await asyncPattern(api.get('/api/books/newslist/').then(res => {list.value = res.data}), true)
    }

    const AuthorList = async () => {
        await asyncPattern(api.get('/api/books/authorlist/').then(res => {authors.value = res.data}), true)
    }

    const GenreList = async () => {
        await asyncPattern(api.get('/api/books/genrelist/').then(res => {genres.value = res.data}), true)
    }

    return {NewsList, LIST, AUTHORS, GENRES, AddWish, RemoveWish, AddBasket, RemoveBasket, AuthorList, GenreList}
});