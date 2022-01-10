export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_REQUEST: 'REGISTER_REQUEST',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
    VERIFY_EMAIL_REQUEST: 'VERIFY_EMAIL_REQUEST',
};

export function login(payload) {
    return { type: actionTypes.LOGIN_REQUEST, payload };
}

export function loginSuccess(payload) {
    return { type: actionTypes.LOGIN_SUCCESS, payload };
}

export function logOut() {
    return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
    return { type: actionTypes.LOGOUT_SUCCESS };
}

export function register(payload) {
    return { type: actionTypes.REGISTER_REQUEST, payload };
}

export function registerSuccess(payload) {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        payload,
    }
}

export function verifyEmail(payload) {
    return { type: actionTypes.VERIFY_EMAIL_REQUEST, payload };
}
