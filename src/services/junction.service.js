import { apiConstants } from '../_constants'
import axios from "axios"
export const junctionService = {
    createJunction,
    getAllJunction,
    getJunctionByID,
    updateJuncionID,
    deleteJunction
};

async function createJunction(data) {
    return axios.post(`${apiConstants.uri}/junctions`, data,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(junction => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(junction.data)
            return junction.data;
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

async function getAllJunction() {
    return axios.get(`${apiConstants.uri}/junctions`,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(junction => {
            // console.log(junction.data)
            return junction.data;
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

async function getJunctionByID(id) {
    return axios.get(`${apiConstants.uri}/junctions/${id}`,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(junction => {

            return junction.data;
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

async function updateJuncionID(data, id) {
    return axios.put(`${apiConstants.uri}/junctions/${id}`, data,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(junction => {
            console.log("update: ", junction.data)
            return junction.data
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

async function deleteJunction(id) {
    // console.log("data delete id: ", id)
    return axios.delete(`${apiConstants.uri}/junctions/${id}`,
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