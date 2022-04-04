import { apiConstants } from '../_constants'
import axios from "axios"
export const planService = {
    // createChannel,
    // updateChannel
    getAllPlan,
    getPlanByID,
    createPlan,
    updatePlan
};

async function getAllPlan() {
    return axios.get(`${apiConstants.uri}/plans`,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(plan => {
            // console.log(junction.data)
            return plan.data;
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

async function getPlanByID(id) {
    return axios.get(`${apiConstants.uri}/plans/${id}`,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(plan => {
            // console.log(junction.data)
            return plan;
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

async function createPlan(data) {
    return axios.post(`${apiConstants.uri}/plans`, data,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(plan => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(plan.data)
            return plan;
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

async function updatePlan(data, id) {
    return axios.put(`${apiConstants.uri}/plans/${id}`, data,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(plan => {
            console.log("update: ", plan.data)
            return plan.data
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