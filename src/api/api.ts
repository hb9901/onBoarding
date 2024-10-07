import axios from "axios";
import SingUpAPI from "./signUp.api";

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL;

class API {
  #authAxios;

  auth;

  constructor() {
    this.#authAxios = axios.create({ baseURL: AUTH_BASE_URL });

    this.auth = new SingUpAPI(this.#authAxios);
  }
}

const api = new API();

export default api;
