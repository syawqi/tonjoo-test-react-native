import axios from 'axios';
import {baseApi} from "./variables";

export function LoginUser(username, password) {
    return axios.post(baseApi + 'authenticate',{
        username : username,
        password : password,
    }).then(response => {
        return response.data
    }).catch(err => {
        return err.response.data
    })
}

export function getContact(token) {
    return axios.get(baseApi + 'contacts?token='+token).then(response => {
        return response.data
    }).catch(err => {
        return err.response.data
    })
}

