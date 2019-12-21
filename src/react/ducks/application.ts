import { createAction, handleActions } from 'redux-actions';
import Meta from '../../dataTypes/Meta';
import AppMessageInterface from '../dataTypes/AppMessage';

const SET_META = 'application/SET_META';
const ADD_MESSAGE = 'application/ADD_MESSAGE';
const DELETE_MESSAGE = 'application/DELETE_MESSAGE';

export interface ApplicationState {
    meta: Meta;
    messages: AppMessageInterface[];
}

export const initialState: ApplicationState = {
    meta: {
        title: 'Shogenov.com',
    },
    messages: []
};

export default handleActions({
    [SET_META]: (state: any, action: any): object => ({ ...state, meta: { ...state.meta, ...action.payload } }),
    [ADD_MESSAGE]: (state: any, action: any): object => ({ ...state, messages: [...state.messages, action.payload] }),
    [DELETE_MESSAGE]: (state: any, action: any): object => ({
        ...state,
        messages: state.messages.filter(({}, i: number): boolean => i !== action.payload)
    }),
}, initialState);

export const setMeta: any = createAction(SET_META, (meta: Meta): Meta => meta);
export const addMessage: any = createAction(ADD_MESSAGE, (message: AppMessageInterface): AppMessageInterface => message);
export const deleteMessage: any = createAction(DELETE_MESSAGE, (i: number): number => i);
