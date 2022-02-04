import { apiConstants } from '../_constants'
import axios from "axios"
export const planService = {
    // createChannel,
    // updateChannel
    getAllPlan
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