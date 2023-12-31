import React from 'react'

interface props {
    children: React.ReactNode,
    className?: string
}

const Card = ({ children, className }: props) => {
    return (
        <div
            className={`bg-white w-full shadow-primary-box-shadow rounded-md ${className}`}
        >
            {children}
        </div>
    )
}

export default Card