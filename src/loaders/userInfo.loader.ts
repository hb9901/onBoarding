import api from "../api/api";
import { getCookie } from "../utils/cookieFunctions";

async function userInfoLoader() {
  const accessToken = getCookie("accessToken");
  if(!accessToken) return null;
  
  api.auth.updateAccessToken(accessToken);
  const data = await api.auth.getUserInfo();
  return data;
}

export default userInfoLoader;