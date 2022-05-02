import { apiConstants } from "./_constants";
import socketIOClient from 'socket.io-client';
const socket = socketIOClient(apiConstants.socketUri, { path: '/socket' });


export default socket