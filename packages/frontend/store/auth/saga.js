import { all, put, takeEvery, call } from 'redux-saga/effects';
import { notification } from 'antd';
import AuthService from '../../services/AuthService';

import {
    actionTypes, loginSuccess, logOutSuccess, registerSuccess,
} from './action';

const modal = (type, msg, description) => {
    notification[type]({
        message: msg,
        description: description,
    });
};

// const modalWarning = type => {
//     notification[type]({
//         message: 'Good bye!',
//         description: 'Your account has been logged out!',
//     });
// };

function* registerSaga({ payload }) {
    try {
        const data = yield call(
            AuthService.register,
            payload,
        );
        if (data.Error) {
            modal('error', 'Register failure', `${data.Error}`);
        } else {
            yield put(registerSuccess(data));
            modal('success', 'Register Success', 'You are registered successfully.');
        }
    } catch (error) {
        console.log(error);
    }
}

function* loginSaga({ payload }) {
    try {
        const data = yield call(
            AuthService.login,
            payload,
        );
        if (data.Error) {
            modal('error', 'Login failure', `${data.Error}`);
        } else {
            yield put(loginSuccess(data));
            modal('success', 'Wellcome back', 'You are login successful!');
        }
    } catch (error) {
        console.log(error);
    }
}

function* logOutSaga() {
    try {
        yield put(logOutSuccess());
        modal('warning', 'Good bye!', 'Your account has been logged out!');
    } catch (err) {
        console.log(err);
    }
}

function* verifyEmail({ payload }) {
    try {
        yield call(AuthService.verifyEmail, payload);
        modal('success', 'Verify email success!', 'Please your login again');
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
    yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
    yield all([takeEvery(actionTypes.REGISTER_REQUEST, registerSaga)]);
    yield all([takeEvery(actionTypes.VERIFY_EMAIL_REQUEST, verifyEmail)]);
}
