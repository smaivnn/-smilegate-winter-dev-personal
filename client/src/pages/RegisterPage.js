import React from "react";
import GreetingTitle from "../components/Body/Auth/GreetingTitle";
import OAuthSignupContainer from "../components/Body/Auth/OAuthSignupContainer";
import LocalAuthInfo from "../components/Body/Auth/LocalAuthInfo";
import AuthSignupContainer from "../components/Body/Auth/AuthSignupContainer";

const RegisterPage = () => {
  return (
    <div className="container mx-auto w-[449px]">
      <GreetingTitle />
      <OAuthSignupContainer />
      <LocalAuthInfo />
      <AuthSignupContainer />
    </div>
  );
};

export default RegisterPage;
