export {}
import 'redux-thunk/extend-redux';
import * as React from 'react';
import { Store } from 'redux';
declare global {
    interface Window {
        __PRELOADED_STATE__: any,
        webkit: any,
    }

    interface FunctionComponent extends React.FC {
        loadData?: (store: Store) => Promise<any>
    }
}