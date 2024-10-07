import axios, { AxiosInstance } from "axios";
import { FieldValues } from "react-hook-form";
import { getCookie, setCookie } from "../utils/cookieFunctions";

class authAPI {
  #axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    const accessToken = getCookie("accessToken");
    this.#axios = axios;

    this.#axios.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
  }

  async signUp(userInfo: FieldValues) {
    try {
      const path = "/register";
      const response = await this.#axios.post(path, userInfo);
      const responseData = response.data;

      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        return { message, success: false };
      } else {
        throw new Error("에러가 발생하였습니다.");
      }
    }
  }

  async logIn(userInfo: FieldValues, EXPIRE_TIME: number) {
    try {
      const path = `/login?expiresIn=${EXPIRE_TIME}m`;
      const response = await this.#axios.post(path, userInfo);
      const responseData = response.data;
      const accessToken = responseData.accessToken;

      if (accessToken) {
        setCookie("accessToken", accessToken, {
          path: "/",
          secure: "/",
        });
      }

      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        return { message, success: false };
      } else {
        throw new Error("에러가 발생하였습니다.");
      }
    }
  }

  async getUserInfo() {
    const path = "/user";
    const response = await this.#axios.get(path, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }
}

export default authAPI;
