import { useNavigate } from "react-router-dom";
import { Authlayout, Input } from "../../../components/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { axios } from "../../../lib";

const Forgot = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<{
    email: string,
    password: string,
    OTP?: string,
  }>({
    email: '',
    password: ''
  })

  const [conditions, setConditions] = useState<{
    otp?: boolean,
    error?: string,
    submiting?: boolean
  }>({})

  const InputHandle = (e: ChangeEvent<HTMLInputElement>) => {
    if (!conditions?.submiting && e?.target?.name == 'email') {
      setForm((state) => ({
        ...state,
        [e?.target?.name]: e?.target?.value,
        OTP: undefined
      }))

      setConditions((state) => ({ ...state, otp: undefined }))
    } else if (!conditions?.submiting) {
      setForm((state) => ({
        ...state,
        [e?.target?.name]: e?.target?.value
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
      if (!resend && conditions?.otp) {
        const res = await axios.post('/user/forgot-verify', form)

        if (res?.['data']) navigate('/sign-in')
      } else {
        const res = await axios.post('/user/forgot-request', form)

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
      subtitle="Please enter your details to forgot."
      error={conditions?.error}
      onSubmit={FormHandle}
    >
      <Input
        label={"Email"}
        type={"email"}
        name={"email"}
        value={form?.email}
        required
        onChange={InputHandle}
      />

      {
        conditions?.otp && (
          <>
            <Input
              label={"New Password"}
              type={"password"}
              name={"password"}
              value={form?.password}
              required
              onChange={InputHandle}
            />
            <div className="flex flex-col gap-2 w-full">
              <Input
                label={"Verification code"}
                type={"text"}
                name={"OTP"}
                value={form?.OTP}
                required
                onChange={InputHandle}
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
            </div>
          </>
        )
      }

      <div className="flex justify-center items-center pt-2">
        <button
          type={conditions?.submiting ? "button" : "submit"}
          className="bg-primary-blue capitalize text-primary-bg rounded-md py-1.5 hover:bg-secondary-black duration-500 w-full"
        >
          {
            conditions?.submiting ? "wait..." : conditions?.otp ? "forgot" : "send verification code"
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

      <div className="text-center text-primary-black text-sm font-medium select-none py-4">
        Remember password?
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

export default Forgot;
