import axios, { AxiosInstance } from "axios";
import { FieldValues } from "react-hook-form";

class SingUpAPI {
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
      }
      else{
        throw new Error("에러가 발생하였습니다.");
      }
    }
  }
}

export default SingUpAPI;
