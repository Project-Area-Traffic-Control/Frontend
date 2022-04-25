import { alertDialogConstants } from '../_constants';

export const alertDialogActions = {
    success,
    error,
    pending
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function pending() {
    return { type: alertConstants.CLEAR };
}