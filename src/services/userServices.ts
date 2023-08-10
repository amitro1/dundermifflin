import user from "../interface/user";
import axios from "axios";

let api: string = `${process.env.REACT_APP_API}/users`;

export function checkUser(userToCheck: user) {
    return axios.get(`${api}?email=${userToCheck.email}&password=${userToCheck.password}`)
}
export function addUser(newUser: user) {
    return axios.post(api, newUser);
}

export function getUserByEmail(email: string) {
    return axios.get(`${api}?email=${email}`);
}











