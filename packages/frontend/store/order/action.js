export const actionTypes = {
    GET_ORDER: 'GET_ORDER',
    GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS',
    GET_ORDER_ERROR: 'GET_ORDER_ERROR',

    ADD_ORDER: 'ADD_ORDER',
    ADD_ORDER_SUCCESS: 'ADD_ORDER_SUCCESS',
    ADD_ORDER_ERROR: 'ADD_ORDER_ERROR',
    UPDATE_ORDER_ADDRESS: 'UPDATE_ORDER_ADRESS',
    UPDATE_ORDER_ADDRESS_SUCCESS: 'UPDATE_ORDER_ADDRESS_SUCCESS',
};

export function getOrder() {
    return { type: actionTypes.GET_ORDER };
}

export function getOrderSuccess(payload) {
    return {
        type: actionTypes.GET_ORDER_SUCCESS,
        payload,
    };
}

export function getOrderError(error) {
    return {
        type: actionTypes.GET_ORDER_ERROR,
        error,
    };
}

export function addOrder(order) {
    return { type: actionTypes.ADD_ORDER, order };
}

export function addOrderSuccess(payload) {
    return {
        type: actionTypes.ADD_ORDER_SUCCESS,
        payload,
    };
}

export function addOrderError(payload) {
    return {
        type: actionTypes.ADD_ORDER_ERROR,
        payload,
    };
}

export function updateOrderAddress(address) {
    return {
        type: actionTypes.UPDATE_ORDER_ADDRESS,
        address,
    }
}

export function updateOrderAddressSuccess(address) {
        return {
        type: actionTypes.UPDATE_ORDER_ADDRESS_SUCCESS,
        address,
    }
}
