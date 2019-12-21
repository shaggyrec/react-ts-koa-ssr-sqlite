import { combineReducers, Reducer, Store } from 'redux';
import application, { ApplicationState, initialState as applicationState } from './application';
import pages, { initialState as pagesState, PagesStore } from './pages';
import user, { initialState as userState, UserState } from './user';

export interface AppStore extends Store {
    pages: PagesStore;
    application: ApplicationState;
    user: UserState;
}

export default (router: any = null): Reducer => combineReducers({
    router,
    application,
    pages,
    user
});

export const initialState = {
    pages: pagesState,
    application: applicationState,
    user: userState
};
