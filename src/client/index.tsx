import * as React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from '@/containers/app';
import { Provider } from 'react-redux';
import store from '@/store/index';
import StyleContext from 'isomorphic-style-loader/StyleContext'
const container = document.getElementById('root');

const insertCss = (...styles: any[]) => {
    const removeCss = styles.map(style => style._insertCss())
    return () => removeCss.forEach(dispose => dispose())
}

hydrateRoot(container, 
    <Provider store={store}>
        <StyleContext.Provider value={{ insertCss }}>
            <App />
        </StyleContext.Provider>
    </Provider>
);