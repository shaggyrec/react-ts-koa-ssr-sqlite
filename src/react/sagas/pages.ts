import { call, CallEffect, ForkEffect, put, takeEvery } from '@redux-saga/core/effects';
import PageSchema from '../../dataTypes/PageSchema';
import NotFound from '../../errors/NotFound';
import api from '../api';
import * as appActions from '../ducks/application';
import * as pagesActions from '../ducks/pages';

function* fetchPage(url: string): IterableIterator<any> {
    try {
        const page: PageSchema = yield call(api, url);
        yield put(appActions.setMeta({
            title: page.title,
            description: page.description,
        }));
        yield put(pagesActions.setCurrentPage(page));
    } catch (e) {
        if (e instanceof NotFound) {
            yield put(pagesActions.reset());
        } else {
            yield put(pagesActions.failure(e.message));
        }
    }

}

function* fetchPageByAlias(action: { payload: any }): IterableIterator<CallEffect> {
    yield call(fetchPage, `/pages/${action.payload}`);
}

function* fetchPageById(action: { payload: any }): IterableIterator<CallEffect> {
    yield call(fetchPage, `/pages/id/${action.payload}`);
}

function* updatePage(action: { payload: any }): IterableIterator<any> {
    const { id, page } = action.payload;
    try {
        yield call(api, `/pages/${id}`, {
            method: 'put',
            body: JSON.stringify(page)
        });
        location.href = '/' + page.alias;
    } catch (e) {
        yield put(appActions.addMessage({
            type: 'error',
            content: e.message
        }));
        yield put(pagesActions.failure(e.message));
    }
}

function* createPage(action: { payload: PageSchema }): IterableIterator<any> {
    const page: PageSchema = action.payload;
    try {
        yield call(api, '/pages', {
            method: 'post',
            body: JSON.stringify(page)
        });
        location.href = '/' + page.alias;
    } catch (e) {
        yield put(appActions.addMessage({
            type: 'error',
            content: e.message
        }));
        yield put(pagesActions.failure(e.message));
    }
}

function* fetchList(action: { payload: number }): IterableIterator<any> {
    try {
        const pageNumber = action.payload || 1;
        const pages = yield call(api, '/pages?page=' + pageNumber);
        yield put(pagesActions.fetchListSuccess(pages));
    } catch (e) {
        yield put(pagesActions.failure(e.message));
    }
}

function* fetchNextPage(action: { payload: number }): IterableIterator<any> {
    try {
        const nextPage = yield call(api, '/pages/next/' + action.payload);
        yield put(pagesActions.addNextPage(nextPage));
        // tslint:disable-next-line:no-empty
    } catch (e) {}
}

export function* watchPageFetching(): IterableIterator<ForkEffect> {
    // @ts-ignore
    yield takeEvery(pagesActions.FETCH, fetchPageByAlias);
}

export function* watchPageUpdating(): IterableIterator<ForkEffect>  {
    // @ts-ignore
    yield takeEvery(pagesActions.UPDATE, updatePage);
}

export function* watchPageFetchingById(): IterableIterator<ForkEffect>  {
    // @ts-ignore
    yield takeEvery(pagesActions.FETCH_BY_ID, fetchPageById);
}

export function* watchPageCreating(): IterableIterator<ForkEffect>  {
    // @ts-ignore
    yield takeEvery(pagesActions.CREATE, createPage);
}

export function* watchListFetching(): IterableIterator<ForkEffect> {
    // @ts-ignore
    yield takeEvery(pagesActions.FETCH_LIST, fetchList);
}

export function* watchNextPageFetching(): IterableIterator<ForkEffect> {
    // @ts-ignore
    yield takeEvery(pagesActions.FETCH_NEXT_PAGE, fetchNextPage);
}
