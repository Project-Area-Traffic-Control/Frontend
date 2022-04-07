import { apiConstants } from '../_constants'
import axios from "axios"
export const patternService = {
    // createChannel,
    // updateChannel
    createPattern,
    updatePattern,
    deletePattern
};

async function createPattern(data) {
    return axios.post(`${apiConstants.uri}/patterns`, data,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(pattern => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(pattern.data)
            return pattern;
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

async function updatePattern(data, id) {
    return axios.put(`${apiConstants.uri}/patterns/${id}`, data,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(pattern => {
            console.log("update: ", pattern.data)
            return pattern.data
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

async function deletePattern(id) {
    // console.log("data delete id: ", id)
    return axios.delete(`${apiConstants.uri}/patterns/${id}`,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    ).then(() => true)
        .catch((e) => {
            if (e.response.status === 401) {
                window.location.reload(true)
            }
            else if (e.response.status > 300) {
                e.message = e.response.data
                return Promise.reject(e);
            }
            // window.location.reload(true)
        })
}