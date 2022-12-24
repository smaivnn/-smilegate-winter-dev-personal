import axios from "../api/axios";
import { userStore } from "../app/store";

const useRefreshToken = () => {
  const { setAccessToken } = userStore();

  const refresh = async () => {
    const response = await axios.get("/api/user/refresh", {
      withCredentials: true, // req에 쿠키를 보내는걸 allow해줌.
    });
    if (response.data.success) {
      setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    }
  };
  return refresh;
};

export default useRefreshToken;
