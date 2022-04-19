import { authHeader } from '../helpers';
import { apiConstants } from '../_constants'
import axios from "axios"

export const vehicleService = {
    getTotalBySearch
};

async function getTotalBySearch(data) {
    return axios.put(`${apiConstants.uri}/vehicle/getSearch`, data,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(vehicle => {
            console.log("update: ", vehicle.data)
            return vehicle.data
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