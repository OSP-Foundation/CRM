import { Authlayout, Inputbox } from "../../../components/auth";

const Forgot = () => {
  return (
    <Authlayout
      title="Welcome! Let's get you started."
      subtitle="Please enter your details to forgot."
    >
      <Inputbox label={"Email"} type={"email"} name={"email"} />
      <Inputbox label={"New Password"} type={"password"} name={"password"} />
      <div className="flex flex-col gap-2 w-full">
        <Inputbox label={"Verification code"} type={"text"} name={"otp"} />
        <button
          type="button"
          className="ml-auto text-xs text-primary-black hover:text-primary-blue duration-300"
        >
          Resend
        </button>
      </div>

      <div className="flex justify-center items-center pt-2">
        <button className="bg-primary-blue text-primary-bg rounded-md py-1.5 hover:bg-secondary-black duration-500 w-full">
          Forgot
        </button>
      </div>

      <div className="flex flex-row items-center w-full">
        <div className="border-t border-primary-border w-full" />
        <span className="bg-primary-bg text-xs px-2 text-secondary-black">
          OR
        </span>
        <div className="border-t border-primary-border w-full" />
      </div>

      <div className="text-center text-primary-black text-sm font-medium select-none py-4">
        Remember password?
        <span className="pl-1 font-base font-bold hover:text-primary-blue duration-300 cursor-pointer">
          Sign in
        </span>
      </div>
    </Authlayout>
  );
};

export default Forgot;
