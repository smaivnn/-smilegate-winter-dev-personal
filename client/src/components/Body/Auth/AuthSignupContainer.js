import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";

const signupURL = `/auth/signup`;
const AuthSignupContainer = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const signupBtnClk = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(signupURL, {
        id,
        password,
        name,
        nickname,
        email,
      });
      if (response.data.success === true) {
        alert(`${response.data.message}`);
        navigate(`/`);
      }
    } catch (error) {}
  };

  return (
    <div className=" w-full">
      {/* ID & PASSWORD */}
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
        <div className="mb-[20px]">
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
        <div className="mb-[20px]">
          <label>
            <div className="flex justify-start">
              <p>이메일</p>
            </div>
            <input
              className="border border-1 border-black mb-[5px] pl-[10px] w-full h-[42px] rounded-md"
              type="email"
              placeholder=""
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </label>
        </div>
        <div className="mb-[20px]">
          <label>
            <div className="flex justify-start">
              <p>실명</p>
            </div>
            <input
              className="border border-1 border-black mb-[5px] pl-[10px] w-full h-[42px] rounded-md"
              type="text"
              placeholder=""
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
          </label>
        </div>
        <div className="mb-[20px]">
          <label>
            <div className="flex justify-start">
              <p>닉네임</p>
            </div>
            <input
              className="border border-1 border-black mb-[5px] pl-[10px] w-full h-[42px] rounded-md"
              type="text"
              placeholder=""
              required
              onChange={(e) => setNickname(e.target.value)}
            ></input>
          </label>
        </div>
      </div>

      {/* Login BTN */}
      <div className="mb-[30px]">
        <div className="w-full">
          <button
            className="w-full h-[40px] rounded-md bg-sky-500 text-white"
            onClick={signupBtnClk}
          >
            회원가입
          </button>
        </div>
      </div>

      {/* navigate to signup */}
      <div className="">
        <p>
          이미 회원이신가요?
          <Link to={`/login`} className="underline text-sky-600">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthSignupContainer;
