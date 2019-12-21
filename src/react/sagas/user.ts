import { call, ForkEffect, put, takeEvery } from '@redux-saga/core/effects';
import { push } from 'react-router-redux';
import { AnyAction } from 'redux';
import api from '../api';
import * as userActions from '../ducks/user';

function* fetchProcess(): IterableIterator<any> {
    try {
        const user = yield call(api , '/user/me');
        yield put(userActions.fetchSuccess(user));
    } catch (e) {
        yield put(userActions.failure(e.message));
    }
}

function* loginProcess(action: AnyAction): IterableIterator<any> {
    const { email, password }: { email: string; password: string } = action.payload;

    try {
        yield call(api , '/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        yield put(userActions.loginSuccess());
        yield call(fetchProcess);
        yield put(push('/me'));
    } catch (e) {
        yield put(userActions.failure(e.message));
    }
}

function* logoutProcess(): IterableIterator<any> {
    yield call(api, '/user/logout', { method: 'POST' });
    if (window !== undefined ) {
        window.location.reload();
    }
}

export function* watchLogin(): IterableIterator<ForkEffect> {
    yield takeEvery(userActions.LOGIN, loginProcess);
}

export function* watchFetch(): IterableIterator<ForkEffect> {
    yield takeEvery(userActions.FETCH, fetchProcess);
}

export function* watchLogout(): IterableIterator<ForkEffect> {
    yield takeEvery(userActions.LOGOUT, logoutProcess);
}
