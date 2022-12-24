import React from "react";
import GreetingTitle from "../components/Body/Auth/GreetingTitle";
import OAuthLoginContainer from "../components/Body/Auth/OAuthLoginContainer";
import LocalAuthInfo from "../components/Body/Auth/LocalAuthInfo";
import AuthLoginContainer from "../components/Body/Auth/AuthLoginContainer";

const LoginPage = () => {
  return (
    <div className="container mx-auto w-[449px] ">
      <GreetingTitle />
      <OAuthLoginContainer />
      <LocalAuthInfo />
      <AuthLoginContainer />
    </div>
  );
};

export default LoginPage;
