import React, { useMemo } from 'react'
import './style.scss'

interface props {
    className?: string; // className for add extra styles
    container?: string; // className for div
    label?: string; // if label need to show label name
    value?: string | number;
    placeholder: string;
    type: "text" | "number";
    required?: boolean;
    onSelect?: (v: React.ChangeEvent<HTMLOptionElement>) => void; // on click item button action
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void; // fot on input change
    children?: React.ReactNode
}

const Select = ({ className, container,
    children,
    onSelect,
    onInput, value, label, ...other
}: props) => {
    // for checking element is option element or not
    const isOptionElement = (element: any): element is React.ReactElement => {
        return element?.type == 'option'
    }

    const options = useMemo(() => {
        const data = Array?.isArray(children) ? children : [children]

        return data?.map?.((elm: any, k: number) => {
            // checking element is option element or not
            if (isOptionElement(elm)) {
                return React.cloneElement(elm, {
                    onClick: onSelect,
                    key: k
                })
            } else {
                return elm
            }
        })
    }, [children])

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

            <div
                id='custom-select'
                className={`relative flex flex-row items-center gap-2 border border-primary-border bg-white text-sm text-primary-black rounded-md py-1 px-3 ease-in-out duration-500 focus-within:border-primary-blue ${className} ${height}`}
            >
                <input
                    className={`bg-transparent mr-auto w-full h-auto`}
                    onChange={(e) => onInput?.(e)}
                    readOnly={onInput ? false : true}
                    value={value ? value : ""}
                    {...other}
                />

                <div className="arrow" />

                <div id="select-options">
                    {options}
                </div>
            </div>
        </div>
    )
}

export default Select