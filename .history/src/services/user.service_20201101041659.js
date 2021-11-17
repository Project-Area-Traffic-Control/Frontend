import { authHeader } from '../helpers';
import {apiConstants} from '../_constants'
import  axios from "axios" 
export const userService = {
    login,
    logout,
    register,
};

 
axios.defaults.withCredentials = true;

// function login(username, password) {
//     const data = JSON.stringify({ username, password })
//     return axios.post( `${apiConstants.uri}/api/signin`,
//     data, { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
//     { withCredentials: true }
//     ).then
//         .then(user => {
//             // store user details and jwt token in local storage to keep user logged in between page refreshes
//             localStorage.setItem('user', JSON.stringify(user));

//             return user;
//         })
//         .catch((e)=>{
//             // window.location.reload(true)
//         })
// }


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


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}