import Request from './request';

import type { RequestConfig } from './request/types';
interface BmRequestConfig<T> extends RequestConfig {
  data?: T;
}
interface BmResponse<T> {
  statusCode: number;
  desc: string;
  result: T;
}

const request = new Request({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: config => config,
    // 响应拦截器
    responseInterceptors: result => result,
  },
});

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {BmRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const bmRequest = <D = any, T = any>(config: BmRequestConfig<D>) => {
  const { method = 'GET' } = config;
  if (method === 'get' || method === 'GET') {
    config.params = config.data;
  }
  return request.request<BmResponse<T>>(config);
};
// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url);
};
// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest();
};

export default bmRequest;
