import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

const baseURL = "https://content-publish-services.onrender.com"; // Ensure this environment variable is set - Jobbers

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const crud = {
  get: async <TResponse = unknown>(endpoint: string, config?: AxiosRequestConfig): Promise<TResponse> => {
    const { data } = await api.get<TResponse>(endpoint, config);
    return data;
  },

  create: async <TRequest = unknown, TResponse = unknown>(
    endpoint: string,
    payload: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> => {
    const { data } = await api.post<TResponse>(endpoint, payload, config);
    return data;
  },

  update: async <TRequest = unknown, TResponse = unknown>(
    endpoint: string,
    payload: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> => {
    const { data } = await api.put<TResponse>(endpoint, payload, config);
    return data;
  },

  delete: async <TResponse = unknown>(endpoint: string, config?: AxiosRequestConfig): Promise<TResponse> => {
    const { data } = await api.delete<TResponse>(endpoint, config);
    return data;
  },
};

export default crud;
