import axios from "axios";
import product from "../interface/product";

let api: string = `${process.env.REACT_APP_API}/products`;

export function getProudct() {
    return axios.get(api)
}
export function addProduct(newProduct: product) {
    return axios.post(api, newProduct)
}

export function getProductByEmail(email: string) {
    return axios.get(`${api}/${email}`)
}
export function getProductById(id: number) {
    return axios.get(`${api}/${id}`)
}

export function updateProduct(updateProduct: product, id: number) {
    return axios.put(`${api}/${id}`, updateProduct)
}

export function deleteProduct(id: number) {
    return axios.delete(`${api}/${id}`)
}





