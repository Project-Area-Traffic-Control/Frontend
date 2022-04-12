import { apiConstants } from '../_constants'
import axios from "axios"
export const controlService = {
    // createChannel,
    // updateChannel
    getAllFixtime,
    updateFixtime,
    createFixtime,
    deleteFixtime
};

async function getAllFixtime() {
    return axios.get(`${apiConstants.uri}/fixtime_mode`,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(fixtime => {
            // console.log(junction.data)
            return fixtime.data;
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

async function updateFixtime(data, id) {
    return axios.put(`${apiConstants.uri}/fixtime_mode/${id}`, data,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(fixtime => {
            console.log("update: ", fixtime.data)
            return fixtime.data
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

async function createFixtime(data) {
    return axios.post(`${apiConstants.uri}/fixtime_mode`, data,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(fixtime => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(fixtime.data)
            return fixtime.data;
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

async function deleteFixtime(id) {
    // console.log("data delete id: ", id)
    return axios.delete(`${apiConstants.uri}/fixtime_mode/${id}`,
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