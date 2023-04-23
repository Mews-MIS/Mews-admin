import { ILogin } from "../pages/Login";
import HttpClient from "../services/HttpClient";

const LoginAPI = {
  postLogin: async (adminInfo: ILogin) => {
    try {
      const path = "/auth/admin/login";
      const response = await HttpClient.post(path, adminInfo);
      return response.data;
    } catch (e) {
      return null;
    }
  },
};

export default LoginAPI;
