import { apiConstants } from '../_constants'
import axios from "axios"
export const manualControlService = {
    setPhase,
    setMode
};

async function setPhase(data, id) {
    return await axios.put(`${apiConstants.uri}/junctions/${id}/setPhase`, data,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(data.data)
            return data.data;
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

async function setMode(data, id) {
    return await axios.put(`${apiConstants.uri}/junctions/${id}/setMode`, data,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(data => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(data.data)
            return data.data;
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