import { ChangeEvent, useMemo } from "react";
import './style.scss'

interface props {
    className?: string;
    container?: string;
    label?: string;
    value?: any;
    type: "text" | "number" | "checkbox" | "radio" | "email" | "password" | "date" | "file";
    name: string;
    placeholder: string;
    required?: boolean;
    readOnly?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ className, container, label, ...other }: props) => {
    const height = useMemo((): string => {
        const regex = /(?<!\w|-)\bh-(full|\d+)\b/;

        if (className && regex.test(className)) {
            return ''
        } else {
            return 'h-8'
        }
    }, [className])

    return (
        <div className={`flex flex-col ${container}`}>
            {
                label && (<label className="text-sm text-primary-black font-semibold capitalize">
                    {other?.required && <span className='pr-1 text-red-500'>*</span>}{label}
                </label>)
            }
            <input
                id="custom-input"
                className={`border border-primary-border bg-white text-sm text-primary-black rounded-md py-1 px-3 ease-in-out duration-500 focus:border-primary-blue ${className} ${height}`}
                {...other}
            />
        </div>
    )
}

export default Input