import axios, { AxiosInstance } from "axios";
import { FieldValues } from "react-hook-form";
import { TrequestUserInfo } from "../types/userInfo.type";
import { getCookie, setCookie } from "../utils/cookieFunctions";

class authAPI {
  #axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.#axios = axios;
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
        throw new Error(error + "에러가 발생하였습니다.");
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
          expires: new Date(Date.now() + EXPIRE_TIME * 60 * 1000),
        });
      }

      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        return { message, success: false };
      } else {
        throw new Error(error + "에러가 발생하였습니다.");
      }
    }
  }

  async getUserInfo() {
    const accessToken = getCookie("accessToken");
    try {
      const path = "/user";
      const response = await this.#axios.get(path, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const reponseData = response.data;
      return reponseData;
    } catch (error) {
      console.log(error);
      return { message: error, success: false };
    }
  }

  async updateUserInfo({ avatar, nickname }: TrequestUserInfo) {
    const path = "/profile";
    const accessToken = getCookie("accessToken");
    const formData = new FormData();
    if (avatar) formData.append("avatar", avatar);
    formData.append("nickname", nickname);

    const response = await this.#axios.patch(path, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const reponseData = response.data;
    return reponseData;
  }
}

export default authAPI;
