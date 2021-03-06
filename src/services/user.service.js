import { authHeader } from '../helpers';
import { apiConstants } from '../_constants'
import axios from "axios"
export const userService = {
    login,
    logout,
    register,
    verify,
    getAllUser,
    createUser,
    getUserByID
};


axios.defaults.withCredentials = true;

async function login(username, password) {
    const data = JSON.stringify({ username, password })
    return axios.post(`${apiConstants.uri}/users/login`,
        data, { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.data.user.result));

            return user;
        })
        .catch((e) => {
            if (e.response.status === 400) {
                e.message = e.response.data
                return Promise.reject(e);
            }
            if (e.response.status === 401) {
                window.location.reload(true)
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

async function createUser(data) {
    return axios.post(`${apiConstants.uri}/users`, data,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(user.data)
            return user.data;
        })
        .catch((e) => {
            if (e.response.status === 400) {
                e.message = e.response.data
                return Promise.reject(e);
            }
            if (e.response.status === 401) {
                window.location.reload(true)
            }
            // window.location.reload(true)
        })
}

function verify() {
    return axios.post(`${apiConstants.uri}/api/verify`,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(user)
            return user;
        })
        .catch((e) => {
            if (e.response.status === 400) {
                e.message = e.response.data
                return Promise.reject(e);
            }
            if (e.response.status === 401) {
                window.location.reload(true)
            }
            // window.location.reload(true)
        })
}

async function getAllUser() {
    return axios.get(`${apiConstants.uri}/users`,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return user.data;
        })
        .catch((e) => {
            if (e.response.status === 400) {
                e.message = e.response.data
                return Promise.reject(e);
            }
            if (e.response.status === 401) {
                window.location.reload(true)
            }
            // window.location.reload(true)
        })
}

async function getUserByID(id) {
    return axios.get(`${apiConstants.uri}/users/${id}`,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(user => {

            return user.data;
        })
        .catch((e) => {
            if (e.response.status === 400) {
                e.message = e.response.data
                return Promise.reject(e);
            }
            if (e.response.status === 401) {
                window.location.reload(true)
            }
            // window.location.reload(true)
        })
}
