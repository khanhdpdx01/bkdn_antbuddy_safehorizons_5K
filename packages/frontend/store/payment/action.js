export const actionTypes = {
    GET_PAYMENT: 'GET_PAYMENT',
    GET_PAYMENT_SUCCESS: 'GET_PAYMENT_SUCCESS',
}

export function getPayments(payload) {
    return {
        type: actionTypes.GET_PAYMENT,
        payload,
    }
}

export function getPaymentsSuccess(payload) {
    return {
        type: actionTypes.GET_PAYMENT_SUCCESS,
        payload,
    }
}