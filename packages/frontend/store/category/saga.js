import { all, put, call, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';
import { actionTypes, getCategoriesSuccess } from './action';
import CategoryService from '../../services/CategoryService';
polyfill();

function* getCategories({ payload }) {
    try {
        const data = yield call(
            CategoryService.getCategories,
            payload
        );
        yield put(getCategoriesSuccess(data.categories));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_CATEGORIES, getCategories)]);
}
