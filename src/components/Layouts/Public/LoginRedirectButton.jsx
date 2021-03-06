import React from "react";
import { browserRedirect } from "../../../helpers/helpers";
import { FiLogIn } from "react-icons/fi";

const LoginRedirectButton = () => {
  return (
    <button
      onClick={() => browserRedirect("/login")}
      className="w-36 h-50 flex flex-row bg-blue-700 text-white p-3 rounded-xl justify-center align-items-center"
    >
      <FiLogIn className=""></FiLogIn>
      <span className="ml-3">Login</span>
    </button>
  );
};

export default LoginRedirectButton;
