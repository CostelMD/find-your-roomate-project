import React from "react";
import Passion from "./Passion";

const CommonPassionsList = (props) => {
  const { passions } = props;
  return (
    <>
      <h1 className="font-bold text-4xl mt-4 mb-3">Common passions</h1>
      <div className="flex ">
        {passions ? (
          passions.map((value) => <Passion data={value} />)
        ) : (
          <span className="text-2xl">No common passions</span>
        )}
      </div>
    </>
  );
};

export default CommonPassionsList;
