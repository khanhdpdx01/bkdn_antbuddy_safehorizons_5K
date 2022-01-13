import { actionTypes } from './action';

export const initState = {
    payments: [],
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_PAYMENT_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

export default reducer;
