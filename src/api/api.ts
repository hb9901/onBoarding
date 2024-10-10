import axios from "axios";
import AuthAPI from "./auth.api";
import MovieAPI from "./movie.api";

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;
const MOVIE_BASE_URL = import.meta.env.VITE_MOVIE_BASE_URL;

class API {
  #authAxios;
  #movieAxios;

  auth;
  movie;

  constructor() {
    this.#authAxios = axios.create({ baseURL: AUTH_BASE_URL });
    this.#movieAxios = axios.create({ baseURL: MOVIE_BASE_URL });

    this.auth = new AuthAPI(this.#authAxios);
    this.movie = new MovieAPI(this.#movieAxios);
  }
}

const api = new API();

export default api;
