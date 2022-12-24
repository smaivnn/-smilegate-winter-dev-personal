import create from "zustand";
import { devtools, persist } from "zustand/middleware";


export const userStore = create(
  devtools(
    persist(
      (set) => ({
        userInfo: {},
        isLoggedIn: false,
        accessToken: "",
        setUserInfo: (userInfo) =>
          set(
            (state) => ({
              userInfo: userInfo,
            }),
            false,
            "userInfo"
          ),
        setIsLoggedIn: (value) => {
          set(
            (state) => ({
              isLoggedIn: value,
            }),
            false,
            "Login"
          );
        },
        setAccessToken: (value) => {
          set(
            (state) => ({
              accessToken: value,
            }),
            false,
            "Login"
          );
        },
      }),
      {
        name: "userInfo",
        getStorage: () => sessionStorage,
      }
    )
  )
);