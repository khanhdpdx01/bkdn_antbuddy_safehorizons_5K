import { all, put, takeEvery, call } from 'redux-saga/effects';
import PaymentService from '../../services/PaymentService';

import {
    actionTypes,
    getPaymentsSuccess
} from './action';

function* getPaymentsSaga({ payload }) {
    try {
        const data = yield call(PaymentService.getPayments, payload);
        yield put(getPaymentsSuccess(data));
    } catch (err) {
        console.error(err);
    }
}


export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_PAYMENT, getPaymentsSaga)]);
}
