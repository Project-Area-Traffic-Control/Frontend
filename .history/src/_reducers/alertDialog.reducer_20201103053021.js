import { alertDialogConstants } from '../_constants';

export function alertDialog(state = {
    message:"Say Hello"
}, action) {
    switch (action.type) {
        case alertDialogConstants.SUCCESS:
            return {
                type: 'success',
                message: action.message
            };
        case alertDialogConstants.ERROR:
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