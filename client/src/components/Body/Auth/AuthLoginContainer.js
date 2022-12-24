import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { userStore } from "../../../app/store";

const loginURL = `/auth/login`;
const AuthLoginContainer = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = userStore((state) => state.setIsLoggedIn);
  const setAccessToken = userStore((state) => state.setAccessToken);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        loginURL,
        {
          id,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        setIsLoggedIn(true);
        setAccessToken(response.data.accessToken);
        navigate(`/`);
      }
    } catch (error) {}
  };

  return (
    <div className=" w-full ">
      {/* ID & PASSWORD */}
      <form onSubmit={loginSubmit}>
        <div className="mb-[30px]">
          <div className="mb-[20px]">
            <label>
              <div className="flex justify-start">
                <p>아이디</p>
              </div>
              <input
                className="border border-1 border-black mb-[5px] pl-[10px] w-full h-[42px] rounded-md"
                type="text"
                placeholder=""
                required
                onChange={(e) => setId(e.target.value)}
              ></input>
            </label>
          </div>
          <div>
            <label>
              <div className="flex justify-start">
                <p>비밀번호</p>
              </div>
              <input
                className="border border-1 border-black mb-[5px] pl-[10px] w-full h-[42px] rounded-md"
                type="password"
                placeholder=""
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </label>
          </div>
        </div>

        {/* Find ID */}
        <div className="mb-[30px]">
          <div className="flex justify-end">
            <button className="">계정찾기</button>
          </div>
        </div>

        {/* Login BTN */}
        <div className="mb-[30px]">
          <div className="w-full">
            <button
              className="w-full h-[40px] rounded-md bg-sky-500 text-white"
              type="submit"
            >
              로그인
            </button>
          </div>
        </div>
      </form>
      {/* navigate to signup */}
      <div className="">
        <p>
          아직 회원이 아니신가요?
          <Link to={`/signup`} className="underline text-sky-600">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLoginContainer;
