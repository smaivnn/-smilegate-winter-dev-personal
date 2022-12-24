import { axiosPrivate } from "../api/axios";
import { useEffect, useState } from "react";
import useRefreshToken from "./useRefreshToken";
import { userStore } from "../app/store";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const [accessToken, setAccessToken] = useState(
    userStore((state) => state.accessToken)
  );

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        // token expired
        const prevRequest = error?.config;
        if (error?.response?.status === 406 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          console.log("newAccessToken", newAccessToken);
          setAccessToken(newAccessToken);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
