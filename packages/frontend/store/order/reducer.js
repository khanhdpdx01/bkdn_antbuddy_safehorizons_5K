import { actionTypes } from './action';

export const initState = {
    orders: [],
    currentOrder: {},
    currentOrderAddress: '',
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.ADD_ORDER_SUCCESS:
            return {
                ...state,
                ...{ currentOrder: action.payload.newOrder}
            };
        case actionTypes.ADD_ORDER_ERROR:
            return {
                ...state,
                ...{ error: action.payload.error }
            };
        case actionTypes.UPDATE_ORDER_ADDRESS_SUCCESS:
            return {
                ...state,
                ...{ currentOrderAddress: action.address}
            }
        default:
            return state;
    }
}

export default reducer;
