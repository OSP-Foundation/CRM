import React, { FormEvent } from 'react'
import { BlueBtn } from '../../buttons'

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
            <BlueBtn
                type='submit'
                className='mr-auto'
            >
                submit
            </BlueBtn>
        </form>
    )
}

export default SimpleForm