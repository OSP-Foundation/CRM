import { Authlayout, Checkbox, Inputbox } from "../../../components/auth";
import { Facebook, Google } from "../../../assets/svg/auth";

const Signup = () => {
  return (
    <Authlayout>
      <div className="py-4 text-center">
        <h2 className="text-xl font-bold">Welcome! Let's get you started.</h2>
        <p className="text-xs font-light pt-2">
          Please enter your details to sign up.
        </p>
      </div>

      <div className="w-10/12 mt-6">
        <Inputbox label={"Name"} type={"text"} name={"name"} />
        <Inputbox label={"Email"} type={"email"} name={"email"} />
        <Inputbox label={"Password"} type={"password"} name={"password"} />

        <div className="my-6 ">
          <Checkbox label={"Remember Me"} />
        </div>

        <div className="flex justify-center items-center pt-2">
          <button className="bg-primary-blue text-primary-bg rounded-md py-1.5 hover:bg-secondary-black duration-500 w-full">
            Sign Up
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase font-normal text-pure-black opacity-75 select-none mt-5">
            <span className="bg-primary-bg px-2 text-muted-foreground">OR</span>
          </div>
        </div>

        <div className="flex w-full gap-6 pt-6">
          <button className="flex items-center justify-center border border-primary-border p-1 w-full rounded-md hover:bg-light-blue ease-out duration-500">
            <Google size={"26"} />
          </button>
          <button className="flex items-center justify-center border border-primary-border p-1 w-full rounded-md hover:bg-light-blue ease-out duration-500">
            <Facebook size={"26"} />
          </button>
        </div>

        <div className="text-center text-sm font-medium select-none pt-8 pb-4">
          Already have an account?
          <span className="pl-1 font-base font-semibold hover:text-primary-blue duration-300 cursor-pointer">
            Sign in
          </span>
        </div>
      </div>
    </Authlayout>
  );
};

export default Signup;
