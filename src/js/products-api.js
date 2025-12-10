import axios from "axios"
import { BASE_URL, LIMIT } from "./constants"

const server = axios.create({
   baseURL: BASE_URL,
})

export async function fetchAllCategories() {
    const response = await server.get('/products/category-list');
    return response.data;
}

export async function fetchAllProducts(page) {

    // оскільки сервер не приймає сторінки, а лише кількість елементів щоб показати і щоб пропустити на наступній сторінці
    //пишемо формулу щоб порахувати скільки проскати, задаючи сторінку у іншій ф-ї
    const skip = (page - 1) * LIMIT; 

    const response = await server.get('/products', {
        params: {
            limit: LIMIT,
            skip: skip,
        }
    });
    return response.data;
}

export async function fetchProductById(id, page) {
    const skip = (page - 1) * LIMIT;
    const response = await server.get(`/products/${id}`);
    return response.data;
}

export async function fetchProductByQuery(query, page) {
    const skip = (page - 1) * LIMIT;
    const response = await server.get('/products/search', {
        params: {
            q: query,
            limit: LIMIT,
            skip: skip,
        }
    });
    return response.data;
}

export async function fetchProductByCategory(category, page) {
    const skip = (page - 1) * LIMIT;
    const response = await server.get(`/products/category/${category}`, {
         params: {
            limit: LIMIT,
            skip: skip,
        }
    });
    return response.data;
}