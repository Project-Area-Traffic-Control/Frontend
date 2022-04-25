import { authHeader } from '../helpers';
import {apiConstants} from '../_constants'
import  axios from "axios" 
export const userService = {
    login,
    logout,
    register,
};

 
axios.defaults.withCredentials = true;

function login(username, password) {
    const data = JSON.stringify({ username, password })
    return axios.post( `${apiConstants.uri}/api/signin`,
    data, { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
    { withCredentials: true }
    )
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        })
        .catch((e)=>{
            console.log(e)
            if(e.response.status === 400) {
            e.message = "Incorrect username or password."
            return Promise.reject(e);
            }
            // window.location.reload(true)
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(user)
    };

    return fetch(`${apiConstants.uri}/users/register`, requestOptions);
}


