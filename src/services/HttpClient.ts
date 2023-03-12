import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: import.meta.env.local.VITE_SERVER_BASE_URL,
  baseURL: "http://13.209.163.188:8080/",
  // withCredentials: true,
  // headers: {
  //   Authorization: import.meta.env.VITE_TMP_ACCESS_TOKEN,
  // },
});

const HttpClient = {
  get: async (path: string, params = {}, headers = {}) => {
    const response = await axiosInstance.get(path, { params, headers });
    return response.data;
  },

  post: async (path: string, body: unknown, headers = {}) => {
    const response = await axiosInstance.post(path, body, { headers });
    return response;
  },

  fetch: async (path: string, body: unknown, headers = {}) => {
    const response = await axiosInstance.patch(path, body, { headers });
    return response.data;
  },

  delete: async (path: string, headers = {}) => {
    const response = await axiosInstance.delete(path, { headers });
    return response.data;
  },
};

export default HttpClient;
