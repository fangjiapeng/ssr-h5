import { AnyAction, combineReducers } from 'redux';
import * as Koa from 'koa';

import common from './common/reducer';
import home from './home/reducer';


const createReducer = (ctx?: Koa.ParameterizedContext) => {

    const ctxReducer = (state= {ctx: ctx ? ctx : null as any}, action: AnyAction) => {
        return state;
    }
    const reducer = combineReducers({
        common,
        home,
        ctx: ctxReducer
    })
    return reducer
}

export default createReducer;