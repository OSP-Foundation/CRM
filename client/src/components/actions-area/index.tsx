import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from '../../assets/svg';

interface props {
    children?: React.ReactNode,
    className?: string
}

const ActionsArea = ({ children, className }: props) => {
    const navigate = useNavigate();

    return (
        <div className={`flex flex-wrap items-center gap-3 pb-5 ${className}`}>
            <button
                className='group mr-auto'
                onClick={() => navigate('/')}
            >
                <ArrowLeft
                    width='1.5rem'
                    height='1.5rem'
                    className='pointer-events-none'
                    classChild='ease-in-out duration-500 fill-primary-black group-hover:fill-primary-blue'
                />
            </button>

            {children}
        </div>
    )
}

export default ActionsArea