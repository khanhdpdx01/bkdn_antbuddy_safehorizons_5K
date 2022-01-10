import { actionTypes } from './action';

export const initialState = {
    roles: [],
    limit: null,
    page: null,
    totalPages: null,
    totalRoles: null,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_ROLES_SUCCESS:
            return {
                ...state,
                ...action.payload,
            };
        case actionTypes.GET_ROLES_FAILURE:
            return {
                ...state,
                ...{ error: action.error }
            }
        default:
            return state;
    }
}

export default reducer;
