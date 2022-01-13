import { all, put, takeEvery, call } from 'redux-saga/effects';
import { notification } from 'antd';
import OrderService from '../../services/OrderService';

import {
    actionTypes,
    addOrder,
    addOrderError,
    addOrderSuccess,
    updateOrderAddressSuccess,
} from './action';

const modalSuccess = (type) => {
    notification[type]({
        message: 'Success',
        description: 'This order has been added success!',
        duration: 1,
    });
};
const modalWarning = (type) => {
    notification[type]({
        message: 'Remove A Item',
        description: 'This order has been falured! Please try again.',
        duration: 1,
    });
};

function* addOrderSaga({ order }) {
    try {
        const data = yield call(OrderService.addOrder, order);
        yield put(addOrderSuccess(data));
        modalSuccess('success');
    } catch (err) {
        console.log(err);
        yield put(addOrderError(err));
        modalWarning('error');
    }
}

function* updateOrderAddressSaga({ address }) {
    try {
        yield put(updateOrderAddressSuccess(address));
    } catch (err) {
        console.error(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.ADD_ORDER, addOrderSaga)]);
    yield all([takeEvery(actionTypes.UPDATE_ORDER_ADDRESS, updateOrderAddressSaga)])
}
