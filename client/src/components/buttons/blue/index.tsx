import React, { MouseEvent } from 'react'

interface props {
    children: React.ReactNode,
    type?: "button" | "submit" | "reset",
    className?: string,
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const BlueBtn = ({ children, type, onClick, className }: props) => {
    return (
        <button
            type={type ? type : "submit"}
            onClick={(e) => onClick?.(e)}
            className={`font-semibold border border-primary-blue bg-primary-blue rounded-md text-white px-3 py-1 text-sm capitalize ease-in-out duration-500 hover:bg-secondary-blue hover:border-secondary-blue ${className}`}
        >
            {children}
        </button>
    )
}

export default BlueBtn