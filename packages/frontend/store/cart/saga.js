import { all, put, takeEvery, call } from 'redux-saga/effects';
import { notification } from 'antd';
import CartService from '../../services/CartService';

import {
    actionTypes,
    getCartError,
    getCartSuccess,
    updateCartSuccess,
    updateCartError,
    removeItemSuccess,
} from './action';

const modalSuccess = (type) => {
    notification[type]({
        message: 'Success',
        description: 'This product has been added to your cart!',
        duration: 1,
    });
};
const modalWarning = (type) => {
    notification[type]({
        message: 'Remove A Item',
        description: 'This product has been removed from your cart!',
        duration: 1,
    });
};

export const calculateAmount = (obj) =>
    Object.values(obj)
        .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
        .toFixed(2);

function* getCartSaga() {
    try {
        const cartId = JSON.parse(localStorage.getItem('persist:antbuddy')).cart_id;
        const data = yield call(CartService.getCart, cartId);
        yield put(getCartSuccess(data));
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* addItemSaga({ product }) {
    try {
        const data = yield call(CartService.addProductToCart, product);
        yield put(updateCartSuccess(data));
        modalSuccess('success');
    } catch (err) {
        console.log(err);
        yield put(getCartError(err));
    }
}

function* removeItemSaga({ product }) {
    try {
        yield call(CartService.deleteProductFromCart, product);
        yield put(removeItemSuccess(product));
        modalWarning('warning');
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* increaseQtySaga({ product }) {
    try {
        const data = yield call(CartService.addProductToCart, product);
        yield put(updateCartSuccess(data));
    } catch (err) {
        yield put(getCartError(err));
    }
}

function* decreaseItemQtySaga({ product }) {
    try {
        const data = yield call(CartService.descreaseQuantityProduct, product);
        yield put(updateCartSuccess(data));
    } catch (err) {
        yield put(getCartError(err));
        notification['warning']({
            message: 'Decrease A Item',
            description: "This product shouldn't decrease quantity!",
            duration: 1,
        });
    }
}

function* clearCartSaga() {
    try {
        const emptyCart = {
            cartItems: [],
            amount: 0,
            cartTotal: 0,
        };
        yield put(updateCartSuccess(emptyCart));
    } catch (err) {
        yield put(updateCartError(err));
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CART, getCartSaga)]);
    yield all([takeEvery(actionTypes.ADD_ITEM, addItemSaga)]);
    yield all([takeEvery(actionTypes.REMOVE_ITEM, removeItemSaga)]);
    yield all([takeEvery(actionTypes.INCREASE_QTY, increaseQtySaga)]);
    yield all([takeEvery(actionTypes.DECREASE_QTY, decreaseItemQtySaga)]);
}
