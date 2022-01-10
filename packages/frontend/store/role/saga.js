import { all, put, call, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import { actionTypes, getRolesSuccess } from './action';
import RoleService from '../../services/RoleService';
polyfill();

function* getRoles({ payload }) {
    try {
        const data = yield call(
            RoleService.getRoles,
            payload
        );
        yield put(getRolesSuccess(data.roles));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_ROLES, getRoles)]);
}
