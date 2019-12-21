import React from 'react';
import ReactDOM from 'react-dom';
import { Client } from './ReactApp';

const mountElement = document.getElementById('app');

if (mountElement) {
    ReactDOM.render(
        // @ts-ignore
        <Client state={window.__PRELOADED_STATE__ || {}}/>,
        mountElement
    );
}
