import React from "react";
import { Background } from "../../../assets/svg/auth";

interface props {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const Authlayout = ({ children, title, subtitle }: props) => {
  return (
    <div className="flex flex-col md:flex-row gap-8npm w-full p-[1.5rem] md:p-[3rem] m-auto items-center justify-center bg-primary-bg">
      <div className="max-w-xl w-full hidden md:block">
        <Background width={"100%"} height={"100%"} />
      </div>
      <div className="max-w-sm w-full bg-white shadow-primary-box-shadow p-3 rounded-md flex flex-col items-center">
        <div className="py-4 text-center">
          <h2 className="text-xl text-pure-black font-bold">{title}</h2>
          {subtitle && (
            <p className="text-xs text-primary-black font-light pt-2">
              {subtitle}
            </p>
          )}
        </div>
        <div className="w-full p-4 flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
};

export default Authlayout;