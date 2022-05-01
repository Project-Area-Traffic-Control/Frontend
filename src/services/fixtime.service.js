import { apiConstants } from '../_constants'
import axios from "axios"
export const fixtimeService = {
    getFixtimeByID,
    getAllFixtime
};

async function getFixtimeByID(id) {
    return axios.get(`${apiConstants.uri}/fixtime_mode/${id}`,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(fixtime_mode => {

            return fixtime_mode.data;
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

function getAllFixtime() {
    return axios.get( `${apiConstants.uri}/fixtime_mode`,
     { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
    { withCredentials: true }
    )
        .then(device => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return device.data;
        })
        .catch((e)=>{
            if(e.response.status === 400) {
                e.message = e.response.data
                return Promise.reject(e);
            }
            if(e.response.status === 401) {
                    window.location.reload(true)
            }
            // window.location.reload(true)
        })
}