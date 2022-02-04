import { apiConstants } from '../_constants'
import axios from "axios"
export const controlService = {
    // createChannel,
    // updateChannel
    getAllFixtime
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