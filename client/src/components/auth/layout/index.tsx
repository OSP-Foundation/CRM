import React, { FormEvent } from "react";
import { Background } from "../../../assets/svg/auth";

interface props {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  error?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
}

const Authlayout = ({ children, title, subtitle, error, onSubmit }: props) => {
  return (
    <div className="flex flex-col md:flex-row min-h-[100vh] w-full p-[1.5rem] md:p-[3rem] m-auto items-center justify-center bg-primary-bg">
      <div className="max-w-xl w-full hidden md:block">
        <Background width={"100%"} height={"100%"} />
      </div>
      <div className="my-auto max-w-sm w-full bg-white shadow-primary-box-shadow p-7 rounded-md flex flex-col items-center">
        <div className="py-4 flex flex-col w-full gap-1 text-center">
          <h2 className="text-lg capitalize text-pure-black font-bold">
            {title}
          </h2>

          {subtitle && (
            <p className="text-xs text-primary-black font-light">{subtitle}</p>
          )}

          {
            error && <p className="text-xs text-red-500 font-medium capitalize">{error}</p>
          }
        </div>
        <form
          onSubmit={(e) => onSubmit?.(e)}
          className="w-full flex flex-col gap-4"
        >
          {children}
        </form>
      </div>
    </div>
  );
};

export default Authlayout;
