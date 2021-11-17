import {apiConstants} from '../_constants'
import  axios from "axios" 
export const userService = {
    getAlldevice,
    addDevice
};

 
axios.defaults.withCredentials = true;

function getAlldevice() {
    return axios.get( `${apiConstants.uri}/api/devicesAll`,
     { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
    { withCredentials: true }
    )
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            return user;
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

