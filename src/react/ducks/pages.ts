import { createAction, handleActions } from 'redux-actions';
import PageSchema from '../../dataTypes/PageSchema';

export const FETCH = 'pages/FETCH';
export const FETCH_LIST = 'pages/FETCH_LIST';
export const FETCH_LIST_SUCCESS = 'pages/FETCH_LIST_SUCCESS';
export const FETCH_BY_ID = 'pages/FETCH_BY_ID';
export const SET_CURRENT_PAGE = 'pages/SET_CURRENT_PAGE';
export const ERROR = 'pages/ERROR';
export const RESET = 'pages/RESET';
export const UPDATE = 'pages/UPDATE';
export const CREATE = 'pages/CREATE';
export const FETCH_NEXT_PAGE = 'pages/FETCH_NEXT_PAGE';
export const ADD_NEXT_PAGE = 'pages/ADD_NEXT_PAGE';

export interface PagesStore {
    current: PageSchema;
    list: PageSchema[];
    loading: boolean;
    error: string;
}

export const initialState: PagesStore = {
    current: null,
    list: [],
    loading: false,
    error: null
};

export default handleActions(
    {
        [FETCH]: (state: object): object => ({ ...state, loading: true }),
        [FETCH_BY_ID]: (state: object): object => ({ ...state, loading: true }),
        [SET_CURRENT_PAGE]: (state: object, action: { payload: any }):
            object => ({ ...state, loading: false, current: action.payload }),
        [UPDATE]: (state: object): object => ({ ...state, loading: true }),
        [CREATE]: (state: object): object => ({ ...state, loading: true }),
        [FETCH_LIST]:  (state: object): object => ({ ...state, loading: true }),
        [FETCH_LIST_SUCCESS]:  (state: object, action: { payload: any }): object =>
            ({ ...state, loading: false, list: action.payload }),
        [ERROR]: (state: object, action: { payload: any }):
            object => ({ ...state, loading: false, error: action.payload }),
        [RESET]: (state: object): object  => ({ ...state, current: null, loading: false }),
        [ADD_NEXT_PAGE]: (state: PagesStore, action: { payload: any }): object => {
            const nextPages = state.current.next || [];
            return ({
                ...state,
                current: { ...state.current, next: [...nextPages, action.payload] }
            });
        }
    },
    initialState
);

export const fetch: any = createAction(FETCH, (alias: string): string => alias);
export const fetchById: any = createAction(FETCH_BY_ID, (id: number): number => id);
export const setCurrentPage: any = createAction(SET_CURRENT_PAGE, (page: PageSchema): PageSchema => page);
export const failure: any = createAction(ERROR, (error: any): any  => error);
export const reset: any = createAction(RESET, (): void => {});
export const update: any = createAction(UPDATE, (id: number, page: PageSchema): object => ({ id, page }));
export const create: any = createAction(CREATE, (data: PageSchema): object => data);
export const fetchList: any = createAction(FETCH_LIST, (pageNumber: number): number => pageNumber);
export const fetchListSuccess: any = createAction(FETCH_LIST_SUCCESS, (list: PageSchema[]): PageSchema[]  => list);
export const fetchNextPage: any = createAction(FETCH_NEXT_PAGE, (id: number): number => id);
export const addNextPage: any = createAction(ADD_NEXT_PAGE, (page: PageSchema): PageSchema => page);
