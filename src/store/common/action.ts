import * as actions from '../const';
import { AnyAction } from 'redux';
import { AppDispatch, RootState } from '@/store/types';
import { HydrateAxiosInstance } from '@/store/types';
import * as Koa from 'koa';
import { getParams } from '@/client/utils';

export const increaseTest = (): AnyAction => {
    return {
        type: actions.TEST
    }
}

export const increaseAsync = () => {
    return (dispatch: AppDispatch, getState: () => RootState, request: HydrateAxiosInstance) => {
        return new Promise((resolve: any , reject: any) => {
            setTimeout(() => {
                dispatch(increaseTest());
                resolve();
            }, 500)
        })
        
    }
}
