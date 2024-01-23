import React, { FormEvent } from 'react'
import { BlueBtn } from '../../buttons'

interface props {
    children: React.ReactNode,
    submiting?: boolean,
    className?: string,
    error?: string,
    onSubmit(e: FormEvent): void,
}

const SimpleForm = ({ children, onSubmit, submiting, className, error }: props) => {
    return (
        <form
            onSubmit={onSubmit}
            className={`flex flex-col gap-2 ${className}`}
        >
            {
                error && <p className="w-full text-xs text-red-500 text-center font-medium capitalize mb-2">{error}</p>
            }

            {children}

            <BlueBtn
                type={submiting ? "button" : "submit"}
                className='mr-auto'
            >
                {submiting ? "wait..." : "submit"}
            </BlueBtn>
        </form>
    )
}

export default SimpleForm