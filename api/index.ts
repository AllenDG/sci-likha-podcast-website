import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const baseURL = process.env.API_BASE_URL || "https://localhost:3000/"; // Ensure this environment variable is set - Jobbers

const api: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const crud = {
  get: async <TResponse>(endpoint: string, config?: AxiosRequestConfig): Promise<TResponse> => {
    const { data } = await api.get<TResponse>(endpoint, config);
    return data;
  },

  create: async <TRequest, TResponse>(
    endpoint: string,
    payload: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> => {
    const { data } = await api.post<TResponse>(endpoint, payload, config);
    return data;
  },

  update: async <TRequest, TResponse>(
    endpoint: string,
    payload: TRequest,
    config?: AxiosRequestConfig
  ): Promise<TResponse> => {
    const { data } = await api.put<TResponse>(endpoint, payload, config);
    return data;
  },

  delete: async <TResponse>(endpoint: string, config?: AxiosRequestConfig): Promise<TResponse> => {
    const { data } = await api.delete<TResponse>(endpoint, config);
    return data;
  },
};

export default crud;