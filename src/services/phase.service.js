import { apiConstants } from '../_constants'
import axios from "axios"
export const phaseService = {
    // createChannel,
    // updateChannel
    createPhase,
    updatePhase
};

async function createPhase(data) {
    return axios.post(`${apiConstants.uri}/phases`, data,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(phase => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(phase.data)
            return phase.data;
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

async function updatePhase(data, id) {
    return axios.put(`${apiConstants.uri}/phases/${id}`, data,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(phases => {
            console.log("update: ", phases.data)
            return phases.data
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
