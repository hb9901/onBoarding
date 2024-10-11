import axios, { AxiosInstance } from "axios";

class MovieAPI {
  #axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.#axios = axios;
  }

  async getMovies() {
    try {
      const path = "/trending/movie/day??language=ko-KR";
      const accessToken = import.meta.env.VITE_MOVIE_TOKEN;

      const response = await this.#axios.get(path, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const responseData = response.data;
      
      return responseData;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        throw new Error(error + "에러가 발생하였습니다.");
      } else {
        throw new Error(error + "에러가 발생하였습니다.");
      }
    }
  }
}

export default MovieAPI;
