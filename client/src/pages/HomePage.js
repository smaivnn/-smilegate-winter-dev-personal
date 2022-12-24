import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userStore } from "../app/store";
import jwt_decode from "jwt-decode";
/**
 * 1. accesstoken을 decode해서 role을 알아낸다.
 * 2. 이 role에 admin이 있으면 허락한다.
 *
 */

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, accessToken, setAccessToken } =
    userStore();

  const logout = () => {
    setIsLoggedIn(false);
    setAccessToken("");
    alert("로그아웃 되었습니다.");
  };

  const navigateAdminPage = () => {
    const { roles } = jwt_decode(accessToken);

    if (roles.admin === 5150) {
      navigate("/admin?page=0");
    } else {
      alert(`권한이 없습니다.`);
    }
  };

  return (
    <>
      <div>
        <p className="text-lg">카테고리는 현재 작동하지 않습니다.</p>
        <p className="text-lg">현재 회원가입시 admin으로 세팅됩니다.</p>
        <p className="text-lg">관리자 기능 사용 시 토큰이 갱신됩니다.</p>
      </div>
      {isLoggedIn ? (
        <div className="py-[50px] border-b border-black min-h-[500px]">
          <button onClick={navigateAdminPage}>관리자</button>
          <div>
            <button onClick={logout}>로그아웃</button>
          </div>
        </div>
      ) : (
        <div className="py-[50px] border-b border-black min-h-[500px]">
          <p>기능 사용을 위해서 로그인을 해주세요.</p>
          <Link to={`/login`}>로그인</Link>
          <p>아직 회원이 아니신가요?</p>
          <Link to={`/signup`}>회원가입</Link>
        </div>
      )}
    </>
  );
};

export default HomePage;
