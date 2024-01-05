import React from "react";
import { Background } from "../../../assets/svg/auth";

interface props {
  children: React.ReactNode;
  className?: string;
}

const Authlayout = ({ children }: props) => {
  return (
    <div className="flex flex-col md:flex-row gap-8npm w-full p-[1.5rem] md:p-[3rem] m-auto items-center justify-center bg-primary-bg">
      <div className="max-w-xl w-full hidden md:block">
        <Background width={"100%"} height={"100%"} />
      </div>
      <div className="max-w-sm w-full bg-white shadow-primary-box-shadow p-3 rounded-md flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};

export default Authlayout;
