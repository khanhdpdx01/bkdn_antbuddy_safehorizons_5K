export const getOrders = payload => {
    return {
        type: 'GET_ORDERS',
        payload: payload
    }
}

export const getOrderSuccess = payload => {
    return {
        type: 'GET_ORDER_SUCCESS',
        payload: payload
    }
}