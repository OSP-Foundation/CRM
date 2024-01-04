import React from 'react'
import { Td } from '..'
import './style.scss'

interface props {
    children: React.ReactNode
}

const TdMenu = ({ children }: props) => {
    return (
        <Td className='td-menu'>
            <button id='menu-open' className='flex flex-row items-center gap-1 justify-center p-1'>
                <span className='h-1 w-1 rounded-full bg-primary-black' />
                <span className='h-1 w-1 rounded-full bg-primary-black' />
                <span className='h-1 w-1 rounded-full bg-primary-black' />
            </button>
            <div
                id='menu-display'
                className='absolute shadow-primary-box-shadow p-1 rounded-md right-2 z-50 bg-white'
            >
                {children}
            </div>
        </Td>
    )
}

export default TdMenu