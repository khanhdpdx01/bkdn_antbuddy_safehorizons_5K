import { all } from 'redux-saga/effects';
import OrderSaga from '../saga/OrderSaga';
import StatictisSaga from '../saga/StatictisSaga';

export default function* rootSaga() {
    yield all([
        OrderSaga(),
        StatictisSaga()
    ]);
}
