import { legacy_createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import createReducer from '@/store/reducer';
import createClientRequest from '@/client/utils/request'

const request = createClientRequest();
window.__PRELOADED_STATE__.ctx = null;
const store = legacy_createStore(createReducer(), window.__PRELOADED_STATE__, applyMiddleware(thunk.withExtraArgument(request)));

// delete window.__PRELOADED_STATE__;
// const script = document.getElementById('server-script');
// document.head.removeChild(script);

export default store