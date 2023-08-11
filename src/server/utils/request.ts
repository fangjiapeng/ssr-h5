import axios, { AxiosInstance } from 'axios';
import { STATUS_CODE } from '@/commonUtils/const';
import { Toast } from 'antd-mobile';
import * as Koa from 'koa';
import { HydrateAxiosInstance } from '@/store/types';

const createServerRequest = (ctx: Koa.ParameterizedContext): HydrateAxiosInstance => {
    const requestInstance = axios.create({
        withCredentials: true,
        timeout: 5000,
        headers: {
            token: ctx.request.query ? ctx.request.query.token as string : '',
        }
    });
    requestInstance.interceptors.response.use(res => {
        return res.data
    }, err => {
        return err
    });
    return {
        request: requestInstance,
        ctx,
    };
}

export default createServerRequest