import React, { FormEvent } from 'react'

interface props {
    children: React.ReactNode,
    onSubmit(e: FormEvent): void
}

const SimpleForm = ({ children, onSubmit }: props) => {
    return (
        <form
            onSubmit={onSubmit}
            className='flex flex-col gap-2'
        >
            {children}
            <button
                className='mr-auto px-3 py-1 rounded-md text-sm capitalize text-white font-semibold bg-primary-blue ease-in-out duration-500 hover:bg-secondary-blue'
                type='submit'
            >
                submit
            </button>
        </form>
    )
}

export default SimpleForm