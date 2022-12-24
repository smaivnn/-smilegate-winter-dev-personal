import React from "react";

const OAuthLoginContainer = () => {
  return (
    <div className="mb-[40px] pb-[40px] w-full border-b border-black">
      <div className="flex justify-start">
        <p className="text-sm mb-[5px]">SNS 로그인</p>
      </div>
      <div>
        <button className="text-lg mr-[10px] w-[143px] h-[40px] border border-1 border-black rounded-md">
          업데이트
        </button>
        <button className="text-lg mr-[10px] w-[143px] h-[40px] border border-1 border-black rounded-md">
          업데이트
        </button>
        <button className="text-lg w-[143px] h-[40px] border border-1 border-black rounded-md">
          업데이트
        </button>
      </div>
    </div>
  );
};

export default OAuthLoginContainer;
