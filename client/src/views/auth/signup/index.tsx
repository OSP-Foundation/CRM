import { Authlayout, Inputbox } from "../../../components/auth";
import { Google } from "../../../assets/svg/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "../../../lib";
import axios_ from "axios";
import { useGoogleLogin } from "@react-oauth/google";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<{
    name: string,
    email: string,
    password: string,
    token?: string,
    OTP?: string | number
  }>({ name: "", email: "", password: "" })

  const [conditions, setConditions] = useState<{
    error?: string,
    otp?: boolean,
    submiting?: boolean
  }>({})

  const google = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios_.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response?.access_token}`,
            }
          }
        );

        if (res?.['data']) {
          setForm((state) => ({
            ...state,
            name: res?.['data']?.name,
            email: res?.['data']?.email,
            token: response?.access_token,
            OTP: undefined
          }))
        }
      } catch (err) {
        setConditions((state) => ({ ...state, error: "Google Verification Failed" }))
      }
    },
    onError: () => {
      setConditions((state) => ({ ...state, error: "Google Verification Failed" }))
    }
  })

  const InputHandle = (e: ChangeEvent<HTMLInputElement>) => {
    if (!conditions?.submiting && e?.target?.name == 'email') {
      setForm((state) => ({
        ...state,
        [e?.target?.name]: e?.target?.value,
        token: undefined,
        OTP: undefined
      }))

      setConditions((state) => ({ ...state, otp: undefined }))
    } else if (!conditions?.submiting) {
      setForm((state) => ({
        ...state,
        [e?.target?.name]: e?.target?.value,
      }))
    }
  }

  const FormHandle = async (e?: FormEvent<HTMLFormElement>, resend?: boolean) => {
    e?.preventDefault?.()

    setConditions((state) => ({
      ...state,
      submiting: true,
      error: undefined
    }))

    try {
      if (form?.token) {
        const res = await axios.post('/user/register-google', form)

        if (res?.['data']) navigate('/sign-in')
      } else if (!resend && conditions?.otp) {
        const res = await axios.post('/user/register-verify', form)

        if (res?.['data']) navigate('/sign-in')
      } else {
        const res = await axios.post('/user/register-request', form)

        if (res?.['data']) setConditions((state) => ({ ...state, otp: true }))
      }
    } catch (err: any) {
      setConditions((state) => ({
        ...state,
        error: err?.response?.data?.message || "Something Went Wrong"
      }))
    } finally {
      setConditions((state) => ({
        ...state,
        submiting: false
      }))
    }
  }

  return (
    <Authlayout
      title="Welcome! Let's get you started."
      subtitle="Please enter your details to sign up."
      onSubmit={FormHandle}
      error={conditions?.error}
    >
      <Inputbox
        label={"Name"}
        type={"text"}
        name={"name"}
        value={form?.name}
        onChange={InputHandle}
        required
      />
      <Inputbox
        label={"Email"}
        type={"email"}
        name={"email"}
        value={form?.email}
        onChange={InputHandle}
        required
      />
      <Inputbox
        label={"Password"}
        type={"password"}
        name={"password"}
        value={form?.password}
        onChange={InputHandle}
        required
      />

      {
        conditions?.otp && (<div className="flex flex-col gap-2 w-full">
          <Inputbox
            label={"Verification code"}
            type={"text"}
            name={"OTP"}
            value={form?.OTP}
            onChange={InputHandle}
            required
          />
          <button
            type="button"
            onClick={() => {
              if (!conditions?.submiting) {
                FormHandle?.(undefined, true)
              }
            }}
            className="ml-auto text-xs text-primary-black hover:text-primary-blue duration-300"
          >
            Resend
          </button>
        </div>)
      }

      <div className="flex justify-center items-center pt-2">
        <button
          type={conditions?.submiting ? "button" : "submit"}
          className="capitalize bg-primary-blue text-primary-bg rounded-md py-1.5 hover:bg-secondary-black duration-500 w-full"
        >
          {
            conditions?.submiting ? "wait..." : form?.token || conditions?.otp ? "sign up" : "send verification code"
          }
        </button>
      </div>

      <div className="flex flex-row items-center w-full">
        <div className="border-t border-primary-border w-full" />
        <span className="bg-primary-bg text-xs px-2 text-secondary-black">
          OR
        </span>
        <div className="border-t border-primary-border w-full" />
      </div>

      <button
        type="button"
        onClick={() => {
          if (!conditions?.submiting) {
            setConditions((state) => ({ ...state, otp: undefined }))

            google?.()
          }
        }}
        className="flex items-center justify-center border border-primary-border p-1 w-full rounded-md hover:bg-light-blue ease-out duration-500"
      >
        <Google size={"26"} />
      </button>

      <div className="text-center text-primary-black text-sm font-medium select-none py-4">
        Already have an account?
        <button
          type="button"
          onClick={() => navigate('/sign-in')}
          className="pl-1 capitalize font-base font-bold hover:text-primary-blue duration-300 cursor-pointer"
        >
          Sign in
        </button>
      </div>
    </Authlayout>
  );
};

export default SignUp;
