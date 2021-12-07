import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

const AcceptButton = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={() => onClick()}
      className="  flex-row justify-between p-2 rounded-md hover:bg-gray-100 hover:text-blue-500 transition-colors transform"
    >
      <AiFillCheckCircle className="text-5xl m-auto" />
      <p>Accept Request</p>
    </button>
  );
};

export default AcceptButton;
