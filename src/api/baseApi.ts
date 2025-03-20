import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';
// import { getData } from '../utils/storage';

class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, data: any) {
    super(`API Error ${status}`);
    this.status = status;
    this.data = data;
  }
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const createApiInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      // If any token is needed later
      // const token = getData('auth_token');
      // if (token) {
      //   config.headers['Authorization'] = `Bearer ${token}`;
      // }
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error('API Request Error:', error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      if (response.data.status === 'success') {
        return response.data.data;
      }
      return response.data;
    },
    (error) => {
      if (error.response) {
        const { status, data } = error.response;
        console.error(`API Error ${status}:`, data);
        throw new ApiError(status, data); // Throw structured error
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Request error:', error.message);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export class BaseApi {
  protected api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = createApiInstance(baseURL);
  }

  protected async get<T>(
    url: string,
    config?: AxiosRequestConfig,
    cancelToken?: CancelTokenSource
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    try {
      const response = await this.api.get<ApiResponse<T>>(url, {
        ...config,
        cancelToken: cancelToken?.token,
      });
      return response;
    } catch (error) {
      console.error('Error in GET request:', error);
      throw error;
    }
  }

  protected async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    timeout?: number
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    try {
      if (timeout) {
        config = { ...config, timeout };
      }
      const response = await this.api.post<ApiResponse<T>>(url, data, config);
      return response;
    } catch (error) {
      console.error('Error in POST request:', error);
      throw error;
    }
  }

  protected async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    timeout?: number
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    try {
      if (timeout) {
        config = { ...config, timeout };
      }
      const response = await this.api.put<ApiResponse<T>>(url, data, config);
      return response;
    } catch (error) {
      console.error('Error in PUT request:', error);
      throw error;
    }
  }

  protected async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
    timeout?: number
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    try {
      if (timeout) {
        config = { ...config, timeout };
      }
      const response = await this.api.delete<ApiResponse<T>>(url, config);
      return response;
    } catch (error) {
      console.error('Error in DELETE request:', error);
      throw error;
    }
  }

  protected async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
    timeout?: number
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    try {
      if (timeout) {
        config = { ...config, timeout };
      }
      const response = await this.api.patch<ApiResponse<T>>(url, data, config);
      return response;
    } catch (error) {
      console.error('Error in PATCH request:', error);
      throw error;
    }
  }
}
