import { ChangeEvent, useState } from "react";
import { Eyeclosed, Eyeopened } from "../../../assets/svg/auth";

interface props {
  label: string;
  name: string;
  type: "text" | "number" | "email" | "password";
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: any
}

const Inputbox = ({ label, name, type, value, required, onChange }: props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div>
      <label
        htmlFor={name}
        className="block capitalize mb-0 text-sm font-medium text-pure-black pointer-events-none select-none"
      >
        {label}
      </label>

      <div className="flex items-center justify-end relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          id={name}
          value={value ? value : ""}
          onChange={(e) => onChange?.(e)}
          required={required}
          className="bg-gray-50 border border-primary-border text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-8 py-1 transition duration-300 px-2 hover:border-primary-black"
        />

        {type === "password" && (
          <span
            className={`absolute pr-2 select-none ${showPassword ? "" : ""}`}
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            {showPassword ? (
              <Eyeclosed classPath={"fill-secondary-black"} />
            ) : (
              <Eyeopened classPath={"stroke-secondary-black"} />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Inputbox;
