import axios, { AxiosInstance } from "axios";
import { FieldValues } from "react-hook-form";
import { TrequestUserInfo } from "../types/userInfo.type";
import { setCookie } from "../utils/cookieFunctions";

class authAPI {
  #axios: AxiosInstance;
  #accessToken: string | null;

  constructor(axios: AxiosInstance) {
    this.#axios = axios;
    this.#accessToken = null;

    this.#axios.interceptors.request.use((config) => {
      if (this.#accessToken) {
        config.headers.Authorization = `Bearer ${this.#accessToken}`;
      }
      return config;
    });
  }

  updateAccessToken(token: string) {
    this.#accessToken = token;
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
        this.#accessToken = accessToken;
        setCookie("accessToken", accessToken, {
          path: "/",
          secure: "/",
          expires: new Date(Date.now() + 60 * 1000),
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
    const reponseData = response.data;
    return reponseData;
  }

  async updateUserInfo({ avatar, nickname }: TrequestUserInfo) {
    const path = "/profile";
    const formData = new FormData();
    if (avatar) formData.append("avatar", avatar);
    formData.append("nickname", nickname);

    const response = await this.#axios.patch(path, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const reponseData = response.data;
    return reponseData;
  }
}

export default authAPI;
