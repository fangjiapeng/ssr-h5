import axios, { AxiosInstance } from 'axios';
import { STATUS_CODE } from '@/commonUtils/const';
// import { Toast } from 'antd-mobile';
import { getParams } from './index';
import { HydrateAxiosInstance } from '@/store/types';

const createClientRequest = (): HydrateAxiosInstance => {
    const requestInstance = axios.create({
        baseURL: 'https://api-sit.miaocode.com/api',
        withCredentials: true,
        timeout: 5000,
        headers: {
            token: getParams('token'),
        }
    });
    requestInstance.interceptors.request.use(config => {
        return config;
    });
    requestInstance.interceptors.response.use(res => {
        const { code, message } = res.data
        if (code !== STATUS_CODE.SUCCESS) {
            // 统一toast错误
            // Toast.show({
            //     content: message,
            // })
        }
        return res.data
    }, err => {
        // Toast.show({
        //     content: err.message ? err.message : '网络错误',
        // })
        return err
    });
    return {
        request: requestInstance
    }
}

export default createClientRequest