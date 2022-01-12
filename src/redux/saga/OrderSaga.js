import { all, put, takeEvery, call } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import OrderService from '../../services/OrderService';

import {
    getOrders,
    getOrderSuccess
} from '../actions/OrderAction';
polyfill();

function* getOrdersSaga({ payload }) {
    try {
        const data = yield call(OrderService.getOrders, payload);
        yield put(getOrderSuccess(data));
    } catch (err) {
        console.log(err)
    }
}

export default function* rootSaga() {   
    yield all([takeEvery('GET_ORDERS', getOrdersSaga)]);
}
