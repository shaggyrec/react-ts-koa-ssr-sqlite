import { all } from 'redux-saga/effects';
import * as pages from './pages';
import * as user from './user';

export default function* rootSaga(): any {
    yield all([
        pages.watchPageFetching(),
        pages.watchPageUpdating(),
        pages.watchPageFetchingById(),
        pages.watchPageCreating(),
        pages.watchListFetching(),
        pages.watchNextPageFetching(),
        user.watchLogin(),
        user.watchFetch(),
        user.watchLogout()
    ]);
}
