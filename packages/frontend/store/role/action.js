export const actionTypes = {
    GET_ROLES: 'GET_ROLES',
    GET_ROLES_SUCCESS: 'GET_ROLES_SUCCESS',
    GET_ROLES_FAILURE: 'GET_ROLES_FAILURE',
};

export function getRoles(payload) {
    return { type: actionTypes.GET_ROLES, payload };
}

export function getRolesSuccess(payload) {
    return {
        type: actionTypes.GET_ROLES_SUCCESS,
        payload,
    };
}

export function getRolesFailure(payload) {
    return {
        type: actionTypes.GET_ROLES_FAILURE,
        payload,
    }
}
