import { actionTypes } from './action';

export const initState = {
    isLoggedIn: false,
    roles: [],
    account: {},
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...{ isLoggedIn: true },
                ...{ roles: action.payload.data}
            };
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                ...{ account: action.payload }
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                ...{ isLoggedIn: false },
            };
        default:
            return state;
    }
}

export default reducer;
