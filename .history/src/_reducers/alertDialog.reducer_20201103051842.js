import { alertDialogConstants } from '../_constants';

export function alert(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'success',
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                type: 'error',
                message: action.message
            };
        case alertDialogConstants.PENDDING:
            return {
                type:'pendding',
                 message: action.message
            };
        default:
            return state
    }
}