import axios from "axios";
import product from "../interface/product";

const api: string = `${process.env.REACT_APP_API}/myFavCard`;

export function getMyFavCard(userId: number) {
    return axios.get(`${api}?userId=${userId}`);
}

export function createMyFavCard(userId: number) {
    return axios.post(api, { userId, products: [] });
}

export async function addToMyFavCard(userId: number, productToAdd: product) {
    try {
        let res = await getMyFavCard(userId);
        console.log("Response from getMyFavCard:", res.data); // Log the entire response

        if (res.data.length > 0) {
            console.log("Existing products:", res.data[0].products); // Log the products array
            res.data[0].products.push({ ...productToAdd });

            return axios.patch(`${api}/${res.data[0].id}`, { products: res.data[0].products });
        } else {
            console.log("No existing card data found."); // Log a message if no card data exists
        }
    } catch (error) {
        console.log("Error in addToMyFavCard:", error);
    }
}

export async function removeFromMyFavCard(userId: number, productId: number) {
    try {
        let res = await getMyFavCard(userId)
        res.data[0].products = res.data[0].products.filter((product: product) => product.id !== productId)
        return axios.patch(`${api}/${res.data[0].id}`, {
            products: res.data[0].products,
        });
    } catch (err) {
        console.log(err);

    }
}