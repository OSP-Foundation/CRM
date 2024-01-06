import { Fragment } from "react";

interface props {
    className?: string;
    value?: any;
    type: string;
    name: string;
    placeholder: string;
    label?: string;
}

const Input = ({ className, label, ...other }: props) => {
    return (
        <Fragment>
            {
                label && (<label className="text-sm text-primary-black font-medium">
                    {label}
                </label>)
            }
            <input
                className={`border border-primary-border bg-white text-sm text-primary-black rounded-md py-1 px-3 ease-in-out duration-500 focus:border-primary-blue ${className}`}
                {...other}
            />
        </Fragment>
    )
}

export default Input