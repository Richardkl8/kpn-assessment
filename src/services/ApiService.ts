import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/* eslint-disable no-shadow */
enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: process.env.VUE_APP_API_BASEURL,
      withCredentials: true,
    });

    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      },
    );

    this.instance = http;
    return http;
  }

  get<T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  handleError = (error: AxiosResponse) => {
    const { status } = error;
    // In a real project, the console logs would be handled appropriate of course
    // Displaying a  proper error message on the screen, fire an alert to our
    // monitoring / analytics etc
    switch (status) {
      case StatusCode.InternalServerError: {
        console.log('InternalServerError');
        break;
      }
      case StatusCode.Forbidden: {
        console.log('Forbidden');
        break;
      }
      case StatusCode.Unauthorized: {
        console.log('Unauthorized');
        break;
      }
      case StatusCode.NotFound: {
        console.log('NotFound');
        break;
      }
      default: {
        break;
      }
    }

    return Promise.reject(error);
  }
}
// eslint-disable-next-line
export const http = new Http();
