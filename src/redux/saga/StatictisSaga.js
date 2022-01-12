import { all, put, takeEvery, call } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import StatictisService from '../../services/StatictisService';

import {
    statictis,
    statictisSuccess
} from '../actions/StatictisAction';
polyfill();

function* statictisSaga({ payload }) {
    try {
        const data = yield call(StatictisService.statictis, payload);
        yield put(statictisSuccess(data));
    } catch (err) {
        console.log(err)
    }
}

export default function* rootSaga() {   
    yield all([takeEvery('STATICTIS', statictisSaga)]);
}
