import { apiConstants } from '../_constants'
import axios from "axios"
export const channelService = {
    createChannel,
    updateChannel,
    deleteChannel
};

async function createChannel(data) {
    return await axios.post(`${apiConstants.uri}/channels`, data,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(channel => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(channel.data)
            return channel;
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

async function updateChannel(data, id) {
    return await axios.put(`${apiConstants.uri}/channels/${id}`, data,
        { headers: { 'Content-Type': 'application/json', crossDomain: true, } },
        { withCredentials: true }
    )
        .then(channel => {
            console.log("update: ", channel.data)
            return channel.data
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

async function deleteChannel(id) {
    // console.log("data delete id: ", id)
    return axios.delete(`${apiConstants.uri}/channels/${id}`,
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