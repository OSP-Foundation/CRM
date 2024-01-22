import React, { MouseEvent } from 'react'

interface props {
    children: React.ReactNode,
    type?: "button" | "submit" | "reset",
    className?: string,
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const WhiteBtn = ({ children, className, type, onClick }: props) => {
    return (
        <button
            onClick={(e) => onClick?.(e)}
            type={type ? type : "submit"}
            className={`bg-white border border-primary-border rounded-md px-5 py-1 text-sm capitalize text-primary-black ease-in-out duration-500 hover:bg-primary-border ${className}`}
        >
            {children}
        </button>
    )
}

export default WhiteBtn