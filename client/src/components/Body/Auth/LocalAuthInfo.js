import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const LoginWithLocal = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setCurrentPath();
    return () => {};
  }, []);

  return (
    <>
      {location?.pathname.split("/")[1] === "login" ? (
        <div className="mb-[40px]">
          <p>local 아이디로 로그인</p>
        </div>
      ) : location?.pathname.split("/")[1] === "signup" ? (
        <div className="mb-[40px]">
          <p>회원가입에 필요한 기본정보를 입력해주세요.</p>
        </div>
      ) : (
        <div className="mb-[40px]">
          <div className="border-t border-gray-500"></div>
        </div>
      )}
    </>
  );
};

export default LoginWithLocal;
