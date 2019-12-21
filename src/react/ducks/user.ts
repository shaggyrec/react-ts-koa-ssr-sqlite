import { createAction, handleActions } from 'redux-actions';
import UserSchema from '../../dataTypes/UserSchema';

export const LOGIN = 'user/LOGIN';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const ERROR = 'user/ERROR';
export const FETCH = 'user/FETCH';
export const FETCH_SUCCESS = 'user/FETCH_SUCCESS';
export const LOGOUT = 'user/LOGOUT';

export interface UserState {
    current: UserSchema;
    loading: boolean;
    error: string;
}

export const initialState: UserState = {
    current: null,
    loading: false,
    error: null,
};

export default handleActions({
    [LOGIN]: (state: object): object => ({ ...state, loading: true }),
    [LOGIN_SUCCESS]: (state: object): object => ({ ...state, loading: false, error: null }),
    [ERROR]: (state: object, action: any): object => ({ ...state, loading: false, error: action.payload }),
    [FETCH]: (state: object): object => ({ ...state, loading: true }),
    [FETCH_SUCCESS]: (state: object, action: any): object => ({ ...state, loading: false, current: action.payload }),
    [LOGOUT]: (state: object): object => ({ ...state, loading: false, current: null }),
}, initialState);

export const fetch = createAction(FETCH, (): void => {});
export const fetchSuccess = createAction(FETCH_SUCCESS, (user: UserSchema): UserSchema => user);
export const login = createAction(LOGIN, (email: string, password: string): object => ({ email, password }));
export const loginSuccess = createAction(LOGIN_SUCCESS, (): void => {});
export const failure = createAction(ERROR, (error: string): string => error);
export const logout = createAction(LOGOUT, (): void => {});
