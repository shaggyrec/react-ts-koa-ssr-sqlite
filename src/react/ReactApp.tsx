import { ConnectedRouter, connectRouter } from 'connected-react-router';
import inline from 'glamor/inline';
import { createBrowserHistory } from 'history';
import React, { Component } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import Meta from '../dataTypes/Meta';
import App from './containers/App';
import rootReducer from './ducks';
import Layout from './Layout';
import rootSaga from './sagas';
import store from './store';

interface ClientAppInterface {
    state: object;
}

export class Client extends Component<ClientAppInterface> {
    private readonly store: any;
    private readonly history: History;

    public constructor(props: { state: object }) {
        super(props);
        this.history = createBrowserHistory();
        const sagas = createSagaMiddleware();
        this.store = configureStore(this.history, props.state, connectRouter(this.history), sagas);
        sagas.run(rootSaga);
    }

    public render(): any {
        return(
            <Provider store={this.store}>
                <ConnectedRouter history={this.history}>
                    <App/>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export class Server {
    private readonly history: any;
    private readonly state: object;
    private readonly url: string;
    private readonly context: object;
    private readonly meta: Meta;

    public constructor(history: any, state: object, url: string, context: object, meta: Meta = {}) {
        this.history = history;
        this.state = state;
        this.url = url;
        this.context = context;
        this.meta = meta;
    }
    public render(): string {
        return (renderToString(
            <Layout meta={this.meta}>
                <div id="app" dangerouslySetInnerHTML={{__html:
                    inline(renderToStaticMarkup(
                        <Provider store={configureStore(this.history, this.state)}>
                            <StaticRouter context={ this.context } location={ this.url }>
                                <App/>
                            </StaticRouter>
                        </Provider>
                    ))
                }} />
                <script
                    dangerouslySetInnerHTML={{__html: 'window["__PRELOADED_STATE__"] = ' +  JSON.stringify(this.state)}}
                />
                <script dangerouslySetInnerHTML={{__html: '(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter39201010 = new Ya.Metrika({ id:39201010, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");'}} />
                <noscript><div><img src="https://mc.yandex.ru/watch/39201010" style={{ position: 'absolute', left: '-9999px' }} alt="" /></div></noscript>
            </Layout>
        ));
    }
}

const configureStore = (history: any, state: object, router: any = null, sagas: any = null): any => {
    return store(
        rootReducer(router),
        state || {},
        history,
        sagas
    );
};
