import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';

// Simple axios instance for public API
const apiClient: AxiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Simple request interceptor - just logging
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Simple response interceptor - just logging
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error(`❌ ${error.response?.status || 'Network Error'} ${error.config?.url}`);
    return Promise.reject(error);
  }
);

export default apiClient;