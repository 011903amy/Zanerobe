import React from "react";
import Spinner from "./Spinner";

const SpinnerTable = () => {
  return (
    <>
      <div className="absolute top-0 left-0 h-full w-full bg-[rgba(var(--primary),0.7)] z-[9999]  flex justify-center items-center">
        <Spinner diameter="w-[40px]" css="stroke-accent" />
      </div>
    </>
  );
};

export default SpinnerTable;
