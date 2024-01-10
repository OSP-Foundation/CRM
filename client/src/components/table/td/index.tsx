import React from 'react'

interface props {
    children: React.ReactNode;
    className?: string;
}

const Td = ({ children, className }: props) => {
    return <td className={`relative border-b border-primary-bg text-sm text-primary-black px-4 py-3 ${className}`}>{children}</td>
}
export default Td