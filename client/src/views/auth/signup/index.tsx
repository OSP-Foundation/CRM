import { Authlayout, Inputbox } from "../../../components/auth";
import { Facebook, Google } from "../../../assets/svg/auth";

const SignUp = () => {
  return (
    <Authlayout
      title="Welcome! Let's get you started."
      subtitle="Please enter your details to sign up."
    >
      <Inputbox label={"Name"} type={"text"} name={"name"} />
      <Inputbox label={"Email"} type={"email"} name={"email"} />
      <Inputbox label={"Password"} type={"password"} name={"password"} />
      <div className="flex flex-col gap-2 w-full">
        <Inputbox label={"OTP"} type={"text"} name={"otp"} />
        <button type="button" className="ml-auto text-xs text-primary-black">
          Resend
        </button>
      </div>

      <div className="flex justify-center items-center pt-2">
        <button className="bg-primary-blue text-primary-bg rounded-md py-1.5 hover:bg-secondary-black duration-500 w-full">
          Sign Up
        </button>
      </div>

      <div className="flex flex-row items-center w-full">
        <div className="border-t border-primary-border w-full" />
        <span className="bg-primary-bg text-xs px-2 text-secondary-black">
          OR
        </span>
        <div className="border-t border-primary-border w-full" />
      </div>

      <div className="flex w-full gap-6 pt-4">
        <button className="flex items-center justify-center border border-primary-border p-1 w-full rounded-md hover:bg-light-blue ease-out duration-500">
          <Google size={"26"} />
        </button>
        <button className="flex items-center justify-center border border-primary-border p-1 w-full rounded-md hover:bg-light-blue ease-out duration-500">
          <Facebook size={"26"} />
        </button>
      </div>

      <div className="text-center text-primary-black text-sm font-medium select-none py-4">
        Already have an account?
        <span className="pl-1 font-base font-semibold hover:text-primary-blue duration-300 cursor-pointer">
          Sign in
        </span>
      </div>
    </Authlayout>
  );
};

export default SignUp;
