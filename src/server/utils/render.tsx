import * as React from 'react';
import * as Koa from 'koa';
import { renderToString } from 'react-dom/server';
import App from '@/containers/app';
import { Provider } from 'react-redux';
import { legacy_createStore, applyMiddleware } from 'redux';
import createReducer from '@/store/reducer';
import thunk from 'redux-thunk';
import { Store } from 'redux';
import createServerRequest from '@/server/utils/request';
import StyleContext from 'isomorphic-style-loader/StyleContext';

const render: Function = async (ctx: Koa.ParameterizedContext): Promise<string> => {
    console.log('render')
    const css = new Set();
    const insertCss = (...styles: any[]) => styles.forEach(style => {
        return css.add(style._getCss())
    });
    const axiosInstance = createServerRequest(ctx);
    const store: Store = legacy_createStore(createReducer(ctx), applyMiddleware(thunk.withExtraArgument(axiosInstance)));
    await App.loadData(store);
    const body = renderToString(<Provider store={store}><StyleContext.Provider value={{ insertCss }}><App /></StyleContext.Provider></Provider>);
    const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <script id="server-script">
                window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(
                    /</g,
                    '\\u003c'
                )}
            </script>
            <style>${[...css].join('')}</style>
        </head>
        <body>
            <div id="root">${body}</div>
            <script src='bundle.js'></script>
        </body>
        </html>
    `;
    return html;
}

export default render