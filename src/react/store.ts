import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux';
import { Saga } from 'redux-saga';

export default function configureStore(rootReducer: Reducer, initialState: object, history: History, sagas: Saga): Store {

    const middlewares = [];

    if (sagas) {
        middlewares.push(sagas);
    }

    middlewares.push(routerMiddleware(history));

    const composeEnhancers = typeof window === 'object' &&
        // @ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...middlewares),
        )
    );
}
