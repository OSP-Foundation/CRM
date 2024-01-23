import { Authlayout, Input } from "../../../components/auth";
import { Google } from "../../../assets/svg/auth";
import { axios } from "../../../lib";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<{
    email: string,
    password: string
  }>({
    email: '',
    password: ''
  })

  const [conditions, setConditions] = useState<{
    error?: string,
    submiting?: boolean
  }>({})

  const google = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get("/user/login-google", {
          params: {
            token: response?.access_token
          }
        });

        if (res?.['data']) {
          navigate('/')
        }
      } catch (err: any) {
        setConditions((state) => ({ ...state, submiting: false, error: err?.response?.data?.message || "Google Verification Failed" }))
      }
    },
    onError: () => {
      setConditions((state) => ({ ...state, submiting: false, error: "Google Verification Failed" }))
    }
  })

  const InputHandle = (e: ChangeEvent<HTMLInputElement>) => {
    if (!conditions?.submiting) {
      setForm((state) => ({
        ...state,
        [e?.target?.name]: e?.target?.value,
      }))
    }
  }

  const FormHandle = async (e: FormEvent<HTMLFormElement>) => {
    e?.preventDefault?.()

    setConditions((state) => ({
      ...state,
      submiting: true,
      error: undefined
    }))

    try {
      const res = await axios.get('/user/login-manual', {
        params: form
      })

      if (res?.['data']) { navigate('/') }
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
      subtitle="Please enter your details to sign in."
      error={conditions?.error}
      onSubmit={FormHandle}
    >
      <Input
        label={"Email"}
        type={"email"}
        name={"email"}
        required
        value={form?.email}
        onChange={InputHandle}
      />
      <div className="flex flex-col gap-2 w-full">
        <Input
          label={"Password"}
          type={"password"}
          name={"password"}
          required
          value={form?.password}
          onChange={InputHandle}
        />
        <button
          type="button"
          onClick={() => navigate('/forgot')}
          className="ml-auto text-xs text-primary-black"
        >
          Forgot password?
        </button>
      </div>

      <div className="flex justify-center items-center pt-2">
        <button
          type={conditions?.submiting ? "button" : 'submit'}
          className="bg-primary-blue capitalize text-primary-bg rounded-md py-1.5 hover:bg-secondary-black duration-500 w-full"
        >
          {conditions?.submiting ? "wait..." : "sign in"}
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
        onClick={() => {
          if (!conditions?.submiting) {
            setConditions((state) => ({ ...state, submiting: true }))

            google?.()
          }
        }}
        type='button'
        className="flex items-center justify-center border border-primary-border p-1 w-full rounded-md hover:bg-light-blue ease-out duration-500"
      >
        <Google size={"26"} />
      </button>

      <div className="text-center text-primary-black text-sm font-medium select-none py-4">
        Don't have an account yet?
        <button
          type="button"
          onClick={() => navigate('/sign-up')}
          className="pl-1 capitalize font-base font-bold hover:text-primary-blue duration-300 cursor-pointer"
        >
          Sign up
        </button>
      </div>
    </Authlayout>
  );
};

export default SignIn;
